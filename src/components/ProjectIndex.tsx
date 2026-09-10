"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * Home index. Desktop: a big type list with the hovered project's cover riding
 * near the cursor. Mobile: a card grid.
 *
 * The preview is always mounted and every cover is eager-loaded (no fetch gap).
 * A single window-level pointermove both positions the preview and hit-tests
 * which row is under the cursor — no reliance on React synthetic enter/leave,
 * which is what was dropping the preview before.
 */
export function ProjectIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // position
      const el = previewRef.current;
      if (el) {
        const x = e.clientX + 26;
        const y = Math.min(Math.max(e.clientY - 110, 12), window.innerHeight - 236);
        el.style.transform = `translate(${x}px, ${y}px) rotate(-3deg)`;
      }
      // which row?
      const list = listRef.current;
      if (!list) return;
      const row = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest<HTMLElement>("[data-row]");
      const idx = row && list.contains(row) ? Number(row.dataset.row) : null;
      setHover((prev) => (prev === idx ? prev : idx));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="work" className="px-[var(--edge)] py-[15vh]">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink/50">
          Работы — {projects.length}
        </h2>
        <span className="text-[13px] text-ink/40">2025 — 2026</span>
      </div>

      {/* desktop list */}
      <ul ref={listRef} className="hidden md:block">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-ink/12 last:border-b">
            <Link
              href={`/work/${p.slug}`}
              data-row={i}
              data-cursor-target
              data-cursor-label="Смотреть"
              className="group grid grid-cols-[1fr_auto_auto] items-center gap-8 py-7 transition-colors"
            >
              <span className="u-display pointer-events-none text-[clamp(2rem,4.6vw,4rem)] leading-[1] transition-[transform,color] duration-300 ease-spring group-hover:translate-x-3 group-hover:text-burgundy">
                {p.title}
              </span>
              <span className="pointer-events-none justify-self-end text-sm text-ink/45 transition-colors group-hover:text-ink/70">
                {p.author.split(" ")[0]}
              </span>
              <span className="pointer-events-none w-14 justify-self-end text-right text-sm tabular-nums text-ink/45 group-hover:text-ink/70">
                {p.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* desktop floating preview — always mounted, all covers preloaded */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[220px] w-[300px] overflow-hidden rounded-[10px] shadow-2xl md:block"
        style={{ opacity: hover === null ? 0 : 1, transition: "opacity .3s ease" }}
      >
        {projects.map((p, i) => (
          <img
            key={p.slug}
            src={p.cover}
            alt=""
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
            style={{ opacity: hover === i ? 1 : 0 }}
          />
        ))}
      </div>

      {/* mobile grid */}
      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:hidden">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
