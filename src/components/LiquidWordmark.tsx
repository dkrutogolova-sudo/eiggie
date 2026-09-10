"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Logo PLACEHOLDER — "eiggie" as a permanently liquid mass of type.
 *
 * Every letter rides a sum of sine waves (position + rotation + vertical
 * stretch) with its own phase, so neighbours are always pulling apart and the
 * goo filter bridges them into blobs. On load there's an extra decaying burst
 * that flings them out and settles. It rests at transform:none (a legible solid
 * "eiggie") only before the first frame / under reduced-motion, and offsets are
 * clamped so a paused frame loop can't fling it off screen.
 */
const LETTERS = "eiggie".split("");
const MAX_OFFSET = 78;

export function LiquidWordmark({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const spans = Array.from(wrap.querySelectorAll<HTMLElement>("[data-l]"));

    const state = spans.map((_, i) => ({
      x: 0,
      y: 0,
      phase: i * 1.6 + i * i * 0.35,
      // per-letter entrance direction
      bx: (Math.random() - 0.5) * 2,
      by: -(0.5 + Math.random()),
    }));

    let pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => (pointer = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    let t = 0; // seconds of real elapsed animation
    let last = 0;
    const clamp = (v: number, m: number) => (v < -m ? -m : v > m ? m : v);

    const loop = (now: number) => {
      if (!running) return;
      const dtMs = last ? now - last : 16;
      last = now;
      if (dtMs > 120) {
        raf = requestAnimationFrame(loop);
        return;
      }
      t += dtMs / 1000;
      const ramp = Math.min(1, t / 0.9);
      const burst = Math.exp(-t * 1.6) * 46; // decays over ~1.5s

      spans.forEach((el, i) => {
        const s = state[i];
        const ph = s.phase;

        // organic multi-frequency drift — big enough to keep the goo bridging
        let tx =
          (Math.sin(t * 0.7 + ph) * 17 + Math.sin(t * 1.9 + ph * 1.7) * 11) * ramp;
        let ty =
          (Math.cos(t * 0.6 + ph * 1.3) * 15 + Math.cos(t * 2.3 + ph * 0.9) * 9) *
          ramp;

        // entrance burst
        tx += s.bx * burst;
        ty += s.by * burst;

        // pointer repulsion — rips the word into blobs on hover
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - pointer.x;
        const dy = r.top + r.height / 2 - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const f = (1 - dist / 180) * 70;
          tx += (dx / (dist || 1)) * f;
          ty += (dy / (dist || 1)) * f;
        }

        // ease toward the target
        s.x += (clamp(tx, MAX_OFFSET) - s.x) * 0.12;
        s.y += (clamp(ty, MAX_OFFSET) - s.y) * 0.12;

        const rot = Math.sin(t * 0.9 + ph * 2.1) * 8 * ramp;
        const sy = 1 + Math.sin(t * 1.3 + ph * 1.1) * 0.14 * ramp;

        el.style.transform =
          `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px) ` +
          `rotate(${rot.toFixed(2)}deg) scaleY(${sy.toFixed(3)})`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      running = !document.hidden;
      last = 0;
      if (running) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`u-display inline-flex leading-none text-burgundy ${className}`}
      style={{
        // goo blobs + a hair of blur over the whole thing = that soft, smeared
        // "effect on top" look from the moodboard, not crisp plain letters
        filter: reduced ? undefined : "url(#goo-hard) blur(0.6px)",
        fontVariationSettings: '"SOFT" 68, "WONK" 1',
      }}
      aria-label="eiggie"
      role="img"
    >
      {LETTERS.map((l, i) => (
        <span
          key={i}
          data-l
          className="inline-block will-change-transform"
          style={{ marginInline: "-0.04em" }}
          aria-hidden
        >
          {l}
        </span>
      ))}
    </div>
  );
}
