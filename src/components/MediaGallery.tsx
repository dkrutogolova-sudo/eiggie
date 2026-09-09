"use client";

import { useRef } from "react";
import type { Media, Project } from "@/data/projects";
import { PlaceholderMedia } from "./PlaceholderMedia";

/** Renders a project's media list: single frames, video blocks, and draggable
 *  image series (a group of frames that belong to one project). */
export function MediaGallery({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-[6vh]">
      {project.media.map((m, i) => (
        <MediaBlock key={i} media={m} project={project} order={i} />
      ))}
    </div>
  );
}

function MediaBlock({
  media,
  project,
  order,
}: {
  media: Media;
  project: Project;
  order: number;
}) {
  if (media.kind === "series") {
    return <Series media={media} project={project} order={order} />;
  }

  return (
    <figure className="px-[var(--edge)]">
      <PlaceholderMedia
        seed={`${project.slug}-${order}`}
        accent={project.accent}
        aspect={media.aspect ?? 16 / 9}
        kind={media.kind}
        className="mx-auto max-w-[1100px]"
      />
      {media.caption && (
        <figcaption className="mx-auto mt-3 max-w-[1100px] text-sm text-ink/50">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Series({
  media,
  project,
  order,
}: {
  media: Extract<Media, { kind: "series" }>;
  project: Project;
  order: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const down = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = scroller.current!;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const up = (e: React.PointerEvent) => {
    drag.current.active = false;
    scroller.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between px-[var(--edge)]">
        <span className="text-sm text-ink/50">
          {media.caption ?? "Серия"} — {media.count} кадров
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-ink/40">
          тяните →
        </span>
      </div>
      <div
        ref={scroller}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        data-cursor-target
        data-cursor-label="Тянуть"
        className="flex gap-4 overflow-x-auto scroll-smooth px-[var(--edge)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab", touchAction: "pan-x" }}
      >
        {Array.from({ length: media.count }).map((_, i) => (
          <PlaceholderMedia
            key={i}
            seed={`${project.slug}-${order}-${i}`}
            accent={project.accent}
            aspect={media.aspect ?? 1}
            index={i}
            className="w-[68vw] shrink-0 sm:w-[40vw] md:w-[26vw]"
          />
        ))}
      </div>
    </div>
  );
}
