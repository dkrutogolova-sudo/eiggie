"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  /** stagger direct children instead of the wrapper itself */
  stagger?: boolean;
  /** playful rotation overshoot on entry */
  wonky?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

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

    const targets = stagger ? Array.from(el.children) : [el];
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        yPercent: 24,
        opacity: 0,
        rotate: wonky ? () => gsap.utils.random(-4, 4) : 0,
        duration: 0.9,
        ease: "back.out(1.5)",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, wonky]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
