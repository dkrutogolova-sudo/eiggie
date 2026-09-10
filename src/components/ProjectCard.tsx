"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/asset";

/** Sticker-ish card used for the mobile project grid. Tilts toward the pointer. */
export function ProjectCard({ project }: { project: Project; index?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      data-cursor-target
      data-cursor-label="Смотреть"
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group block transition-transform duration-300 ease-spring-soft will-change-transform"
    >
      <div
        className="overflow-hidden rounded-[10px] bg-ink/5"
        style={{ aspectRatio: String(project.coverAspect) }}
      >
        <img
          src={asset(project.cover)}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-spring group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="u-display text-2xl">{project.title}</h3>
        <span className="shrink-0 text-sm text-ink/50">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink/60">{project.summary}</p>
    </Link>
  );
}
