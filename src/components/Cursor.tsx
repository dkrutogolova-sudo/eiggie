"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Metaball cursor: a fast dot and a lagging blob rendered inside a goo filter so
 * they fuse and stretch with movement. Swells and reads a label when hovering
 * anything marked [data-cursor-target] (optionally [data-cursor-label]).
 * Desktop / fine-pointer only.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const blob = blobRef.current!;
    const label = labelRef.current!;
    document.body.dataset.cursor = "on";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx;
    let by = my;
    let scale = 1;
    let targetScale = 1;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = (e.target as HTMLElement)?.closest("[data-cursor-target]");
      targetScale = t ? 2.6 : 1;
      const text = t?.getAttribute("data-cursor-label") ?? "";
      if (label.textContent !== text) label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };

    const down = () => (targetScale *= 0.7);
    const up = () => {};

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    let raf = 0;
    const loop = () => {
      bx += (mx - bx) * 0.14;
      by += (my - by) * 0.14;
      scale += (targetScale - scale) * 0.12;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      blob.style.transform = `translate(${bx}px, ${by}px) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div style={{ filter: "url(#goo-soft)" }} className="absolute inset-0">
        <div
          ref={blobRef}
          className="absolute left-0 top-0 h-6 w-6 rounded-full"
          style={{ background: "var(--burgundy)", willChange: "transform" }}
        />
        <div
          ref={dotRef}
          className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full"
          style={{ background: "var(--burgundy)", willChange: "transform" }}
        />
      </div>
      <div
        ref={labelRef}
        className="absolute left-0 top-0 select-none text-[11px] font-medium uppercase tracking-[0.14em] text-paper opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
