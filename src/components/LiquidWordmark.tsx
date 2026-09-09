"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Logo PLACEHOLDER. The letters of "eiggie" are goo-filtered blobs of type that
 * settle apart with spring physics on load and shy away from the pointer, so
 * they keep merging and separating like a single liquid mass. Swap for the real
 * mark when it exists.
 */
const LETTERS = "eiggie".split("");

export function LiquidWordmark({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const spans = Array.from(wrap.querySelectorAll<HTMLElement>("[data-l]"));

    const state = spans.map(() => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 22 - 10,
    }));

    let pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => (pointer = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      spans.forEach((el, i) => {
        const s = state[i];
        // spring back to rest
        s.vx += -s.x * 0.06;
        s.vy += -s.y * 0.06;
        // pointer repulsion
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - pointer.x;
        const dy = cy - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          const f = (1 - dist / 140) * 3.2;
          s.vx += (dx / (dist || 1)) * f;
          s.vy += (dy / (dist || 1)) * f;
        }
        s.vx *= 0.86;
        s.vy *= 0.86;
        s.x += s.vx;
        s.y += s.vy;
        el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
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
          style={{ marginInline: "-0.02em" }}
          aria-hidden
        >
          {l}
        </span>
      ))}
    </div>
  );
}
