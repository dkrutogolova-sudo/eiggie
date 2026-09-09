"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  /** stagger direct children instead of the wrapper itself */
  stagger?: boolean;
  /** playful rotation overshoot on entry */
  wonky?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Scroll-in reveal. Deliberately NOT GSAP ScrollTrigger — that desyncs under
 * Lenis and can leave content parked at opacity:0. Here the content is visible
 * by default (CSS below); JS only *adds* the offset when it's safe to, an
 * IntersectionObserver clears it, and a load-time failsafe reveals anything
 * already on screen. No JS / reduced-motion => everything just shows.
 */
export function Reveal({
  children,
  stagger = false,
  wonky = false,
  className,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = (
      stagger ? Array.from(el.children) : [el]
    ) as HTMLElement[];

    targets.forEach((t, i) => {
      t.style.setProperty("--rv-rot", wonky ? `${(i % 2 ? 1 : -1) * 2.5}deg` : "0deg");
      t.style.transitionDelay = `${i * 80}ms`;
      // Already on screen at mount -> show immediately, no flash. Otherwise park it.
      const r = t.getBoundingClientRect();
      t.dataset.rv = r.top < window.innerHeight * 0.92 && r.bottom > 0 ? "in" : "pending";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.rv = "in";
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    targets.forEach((t) => io.observe(t));

    // failsafe: whatever is already near the viewport reveals on next frame
    const kick = () =>
      targets.forEach((t) => {
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.1) t.dataset.rv = "in";
      });
    const raf = requestAnimationFrame(kick);
    window.addEventListener("load", kick, { once: true });
    const failsafe = window.setTimeout(
      () => targets.forEach((t) => (t.dataset.rv = "in")),
      2500,
    );

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", kick);
    };
  }, [reduced, stagger, wonky]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
