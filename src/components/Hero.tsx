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
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 120,
        duration: 1,
        ease: "back.out(1.4)",
        stagger: 0.09,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-between px-[var(--edge)] pb-10 pt-[28vh]"
    >
      <div>
        <div className="overflow-hidden">
          <div data-hero-line>
            <LiquidWordmark className="text-[26vw] leading-[0.78] md:text-[22vw]" />
          </div>
        </div>
        <div className="mt-4 max-w-[54ch] overflow-hidden">
          <p
            data-hero-line
            className="u-display text-[clamp(1.4rem,3.4vw,2.6rem)] text-ink"
          >
            {studio.tagline}. {studio.founders[0].name.split(" ")[0]} и{" "}
            {studio.founders[1].name.split(" ")[0]} делают визуальные истории на
            стыке генеративных моделей и рук.
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p data-hero-fade className="max-w-[40ch] text-sm text-ink/60">
          {studio.blurb}
        </p>
        <a
          data-hero-fade
          href="#work"
          data-cursor-target
          className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink/70 hover:text-burgundy"
        >
          Работы
          <span className="inline-block animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
