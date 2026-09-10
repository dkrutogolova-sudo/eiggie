"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Logo PLACEHOLDER — "eiggie" as goo-filtered blobs of type.
 *
 * On load the letters drip apart into separate blobs and coalesce (the impulse
 * only fires once real frames are flowing, so a background-tab load can't freeze
 * it mid-scatter). At rest they keep a slow drift so the goo is always pinching
 * and merging, and they shy away from the pointer. Offsets are clamped so it
 * can't fly off, and it rests at translate(0,0) — a legible solid "eiggie" —
 * whenever the frame loop isn't running.
 */
const LETTERS = "eiggie".split("");
const MAX_OFFSET = 95;

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
    let animTime = 0;
    let last = 0;
    let frames = 0;
    let kicked = false;
    const clamp = (v: number, m: number) => (v < -m ? -m : v > m ? m : v);

    const loop = (now: number) => {
      if (!running) return;
      const dtMs = last ? now - last : 16;
      last = now;
      if (dtMs > 120) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(dtMs, 32) / 16;
      animTime += dtMs / 1000;
      frames++;

      // entrance: once we've seen a few real frames, throw the letters apart
      if (!kicked && frames > 3) {
        kicked = true;
        state.forEach((s) => {
          s.vy = -(16 + Math.random() * 22);
          s.vx = (Math.random() - 0.5) * 18;
        });
      }

      const ramp = Math.min(1, animTime / 2);

      spans.forEach((el, i) => {
        const s = state[i];
        // perpetual drift target
        const tx = Math.sin(animTime * 0.85 + s.phase) * 10 * ramp;
        const ty = Math.cos(animTime * 0.7 + s.phase * 1.6) * 8 * ramp;

        s.vx += (tx - s.x) * 0.05 * dt;
        s.vy += (ty - s.y) * 0.05 * dt;

        // pointer repulsion — breaks the word into blobs on hover
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - pointer.x;
        const dy = r.top + r.height / 2 - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 170) {
          const f = (1 - dist / 170) * 4 * dt;
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
