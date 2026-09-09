"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { studio } from "@/data/studio";
import { LiquidWordmark } from "./LiquidWordmark";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    let tween: gsap.core.Tween;
    const ctx = gsap.context(() => {
      tween = gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
    }, ref);
    // Failsafe: if the frame loop was paused (page opened in a background tab),
    // snap the intro to its end state when the page becomes visible.
    const onVis = () => {
      if (!document.hidden && tween) tween.progress(1);
    };
    document.addEventListener("visibilitychange", onVis);
    const t = window.setTimeout(() => tween && tween.progress(1), 2200);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="flex min-h-[88svh] flex-col px-[var(--edge)] pb-[16vh] pt-[26vh]"
    >
      <LiquidWordmark className="text-[27vw] leading-[0.8] md:text-[24vw]" />

      <p
        data-hero-fade
        className="u-display mt-[7vh] max-w-[22ch] text-[clamp(1.5rem,3.6vw,2.7rem)] leading-[1.05] text-ink"
      >
        {studio.tagline}. {studio.founders[0].name.split(" ")[0]} и{" "}
        {studio.founders[1].name.split(" ")[0]} делают визуальные истории на стыке
        генеративных моделей и рук.
      </p>

      <div className="mt-[15vh] flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <p data-hero-fade className="max-w-[40ch] text-sm leading-relaxed text-ink/60">
          {studio.blurb}
        </p>
        <a
          data-hero-fade
          href="#work"
          data-cursor-target
          className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-burgundy"
        >
          Работы
          <span className="inline-block motion-safe:animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
