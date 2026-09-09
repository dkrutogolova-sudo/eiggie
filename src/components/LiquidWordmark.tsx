"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Logo PLACEHOLDER. "eiggie" as goo-filtered blobs of type: a slow per-letter
 * drift keeps the goo bridging and pinching so the mark always reads as liquid,
 * and the letters shy away from the pointer.
 *
 * Robustness: letters REST at translate(0,0) — a plain solid "eiggie" — and the
 * drift only accumulates while frames are actually running. If the frame loop
 * is paused (page opened in a background tab, reduced-motion), the mark just
 * sits there fully legible instead of freezing mid-scatter and vanishing under
 * the goo threshold. Displacement is also hard-clamped.
 */
const LETTERS = "eiggie".split("");
const MAX_OFFSET = 42;

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
      vx: 0,
      vy: 0,
      phase: i * 1.7 + i * i * 0.3,
    }));

    let pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => (pointer = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    let animTime = 0; // seconds of *actual* elapsed animation, not wall clock
    let last = 0;
    const clamp = (v: number, m: number) => (v < -m ? -m : v > m ? m : v);

    const loop = (now: number) => {
      if (!running) return;
      const dtMs = last ? now - last : 16;
      last = now;
      // A big gap => the tab was throttled/hidden. Skip the step so nothing flies off.
      if (dtMs > 120) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(dtMs, 32) / 16; // ~1 at 60fps
      animTime += dtMs / 1000;
      const ramp = Math.min(1, animTime / 1.5);

      spans.forEach((el, i) => {
        const s = state[i];
        const tx = Math.sin(animTime * 0.9 + s.phase) * 6 * ramp;
        const ty = Math.cos(animTime * 0.7 + s.phase * 1.6) * 4.5 * ramp;

        s.vx += (tx - s.x) * 0.04 * dt;
        s.vy += (ty - s.y) * 0.04 * dt;

        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - pointer.x;
        const dy = r.top + r.height / 2 - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const f = (1 - dist / 150) * 3.4 * dt;
          s.vx += (dx / (dist || 1)) * f;
          s.vy += (dy / (dist || 1)) * f;
        }

        s.vx *= 0.9;
        s.vy *= 0.9;
        s.x = clamp(s.x + s.vx, MAX_OFFSET);
        s.y = clamp(s.y + s.vy, MAX_OFFSET);
        el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
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
      style={{ filter: reduced ? undefined : "url(#goo-hard)" }}
      aria-label="eiggie"
      role="img"
    >
      {LETTERS.map((l, i) => (
        <span
          key={i}
          data-l
          className="inline-block will-change-transform"
          style={{ marginInline: "-0.03em" }}
          aria-hidden
        >
          {l}
        </span>
      ))}
    </div>
  );
}
