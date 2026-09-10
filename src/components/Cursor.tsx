"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Custom cursor: a small solid dot that tracks 1:1, plus a thin ring that lags
 * behind and, over a [data-cursor-target], grows into a modest disc and shows a
 * label. Deliberately small and mostly-transparent — it accents the pointer,
 * it doesn't cover what you're pointing at. Desktop / fine-pointer only.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.body.dataset.cursor = "on";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let target = 1;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor-target]");
      target = t ? 1.9 : 1;
      const text = t?.getAttribute("data-cursor-label") ?? "";
      if (label.textContent !== text) label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };
    const down = () => (target *= 0.8);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (target - scale) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `translate(${rx}px, ${ry + 26}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-burgundy/70"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-burgundy"
        style={{ willChange: "transform" }}
      />
      <span
        ref={labelRef}
        className="absolute left-0 top-0 select-none whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-burgundy opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
