"use client";

import { Fragment, useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Kinetic heading: splits text into words that rise, unblur and settle with a
 * per-word stagger when the block scrolls into view. Same bulletproof pattern
 * as <Reveal> — visible by default, JS only parks it once, an
 * IntersectionObserver (plus a load failsafe) releases it. Reduced-motion shows
 * the text flat.
 */
export function Kinetic({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    spans.forEach((s, i) => {
      s.style.transitionDelay = `${(delay + i * stagger).toFixed(3)}s`;
    });

    const near = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.92;

    if (near()) {
      el.dataset.k = "pending";
      requestAnimationFrame(() => requestAnimationFrame(() => (el.dataset.k = "in")));
    } else {
      el.dataset.k = "pending";
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.k = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => (el.dataset.k = "in"), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [reduced, delay, stagger]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} aria-label={text} data-kinetic>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span data-w aria-hidden className="inline-block will-change-transform">
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
