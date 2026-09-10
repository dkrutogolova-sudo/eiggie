"use client";

import { useRef } from "react";
import type { Media, Project } from "@/data/projects";
import { Video } from "./Video";
import { asset } from "@/lib/asset";

/** Renders a project's media list: video blocks, single stills, and draggable
 *  image series (a group of frames that belong to one project). */
export function MediaGallery({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-[7vh]">
      {project.media.map((m, i) => (
        <MediaBlock key={i} media={m} order={i} />
      ))}
    </div>
  );
}

function MediaBlock({ media, order }: { media: Media; order: number }) {
  if (media.kind === "video") {
    return (
      <Video
        src={media.src}
        poster={media.poster}
        aspect={media.aspect}
        caption={media.caption}
      />
    );
  }

  if (media.kind === "series") {
    return <Series media={media} order={order} />;
  }

  return (
    <figure className="px-[var(--edge)]">
      <img
        src={asset(media.src)}
        alt={media.caption ?? ""}
        loading="lazy"
        className="mx-auto w-full rounded-[10px] bg-ink/5"
        style={{
          aspectRatio: String(media.aspect),
          objectFit: "cover",
          maxWidth: media.aspect >= 1 ? "1100px" : `calc(78vh * ${media.aspect})`,
        }}
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
  order,
}: {
  media: Extract<Media, { kind: "series" }>;
  order: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });

  const down = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = scroller.current!;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const up = (e: React.PointerEvent) => {
    drag.current.active = false;
    scroller.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between px-[var(--edge)]">
        <span className="text-sm text-ink/50">
          {media.caption ?? "Серия"} — {media.images.length} кадров
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-ink/40">тяните →</span>
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
        {media.images.map((src, i) => (
          <img
            key={i}
            src={asset(src)}
            alt={`${media.caption ?? "Кадр"} ${i + 1}`}
            loading="lazy"
            draggable={false}
            className="shrink-0 rounded-[10px] bg-ink/5"
            style={{
              aspectRatio: String(media.aspect),
              objectFit: "cover",
              height: "min(66vh, 620px)",
              width: "auto",
            }}
          />
        ))}
      </div>
    </div>
  );
}
