"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Home index. Desktop: a big type list with the project's cover still chasing
 * the cursor. Mobile: a card grid.
 */
export function ProjectIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 130}px) rotate(-3deg)`;
  };

  const active = hover === null ? null : projects[hover];

  return (
    <section id="work" className="px-[var(--edge)] py-[15vh]">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink/50">
          Работы — {projects.length}
        </h2>
        <span className="text-[13px] text-ink/40">2025 — 2026</span>
      </div>

      {/* desktop list */}
      <ul
        className="hidden md:block"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-ink/12 last:border-b">
            <Link
              href={`/work/${p.slug}`}
              data-cursor-target
              data-cursor-label="Смотреть"
              className="group grid grid-cols-[1fr_auto_auto] items-center gap-8 py-7 transition-colors"
              onPointerEnter={() => setHover(i)}
            >
              <span className="u-display text-[clamp(2rem,4.6vw,4rem)] leading-[1] transition-[transform,color] duration-300 ease-spring group-hover:translate-x-3 group-hover:text-burgundy">
                {p.title}
              </span>
              <span className="justify-self-end text-sm text-ink/45 transition-colors group-hover:text-ink/70">
                {p.author.split(" ")[0]}
              </span>
              <span className="w-14 justify-self-end text-right text-sm tabular-nums text-ink/45 group-hover:text-ink/70">
                {p.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* desktop floating preview */}
      {!reduced && (
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[min(26vw,320px)] overflow-hidden rounded-[10px] shadow-2xl md:block"
          style={{
            aspectRatio: active ? String(active.coverAspect) : "1",
            opacity: active ? 1 : 0,
            transition: "opacity .35s ease",
          }}
        >
          {active && (
            <img
              src={active.cover}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* mobile grid */}
      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:hidden">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
