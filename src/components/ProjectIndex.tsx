"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Home index. Desktop: a big type list with a media preview that chases the
 * cursor. Mobile: a plain card grid.
 */
export function ProjectIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  };

  return (
    <section id="work" className="px-[var(--edge)] py-[10vh]">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink/50">
          Избранное — {projects.length} проектов
        </h2>
        <span className="text-[13px] text-ink/40">2024 — 2025</span>
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
              className="group grid grid-cols-[1fr_auto_auto] items-center gap-6 py-5 transition-colors"
              onPointerEnter={() => setHover(i)}
            >
              <span
                className="u-display text-[clamp(2rem,5vw,4.25rem)] transition-[transform,color] duration-300 ease-spring group-hover:translate-x-3 group-hover:text-burgundy"
              >
                {p.title}
              </span>
              <span className="justify-self-end text-sm text-ink/45 transition-colors group-hover:text-ink/70">
                {p.stack.slice(0, 2).join(" · ")}
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
          className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[min(30vw,340px)] md:block"
          style={{
            opacity: hover === null ? 0 : 1,
            transition: "opacity .35s ease",
          }}
        >
          {hover !== null && (
            <PlaceholderMedia
              seed={projects[hover].slug}
              accent={projects[hover].accent}
              aspect={4 / 3}
              kind={projects[hover].media[0]?.kind ?? "image"}
              index={hover}
              className="rotate-[-3deg] shadow-2xl"
            />
          )}
        </div>
      )}

      {/* mobile grid */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:hidden">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
