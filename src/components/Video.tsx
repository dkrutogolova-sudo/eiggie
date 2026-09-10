"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/asset";

/**
 * Portfolio video block. Muted loop that plays only while it's on screen
 * (IntersectionObserver), a poster so there's no layout shift or black flash,
 * and a sound toggle (unmuting is a real user gesture, so it's allowed).
 * Under reduced-motion it never autoplays — poster + a play button.
 */
export function Video({
  src,
  poster,
  aspect,
  caption,
  className = "",
}: {
  src: string;
  poster: string;
  aspect: number;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className={`px-[var(--edge)] ${className}`}>
      <div
        className="group relative mx-auto w-full overflow-hidden rounded-[10px] bg-ink/5"
        style={{
          aspectRatio: String(aspect),
          // portrait clips: cap by height so a 9:16 film isn't a 2000px monster
          maxWidth: aspect >= 1 ? "1100px" : `calc(78vh * ${aspect})`,
        }}
      >
        <video
          ref={ref}
          src={asset(src)}
          poster={asset(poster)}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onClick={togglePlay}
          className="h-full w-full cursor-pointer object-cover"
        />

        {/* play affordance when paused */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Воспроизвести"
            data-cursor-target
            className="absolute inset-0 grid place-items-center bg-ink/10 transition-colors hover:bg-ink/20"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-paper/90 text-ink shadow-lg">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                <path d="M0 0l16 9L0 18z" />
              </svg>
            </span>
          </button>
        )}

        {/* sound toggle */}
        <button
          type="button"
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
            if (v.paused) togglePlay();
          }}
          aria-label={muted ? "Включить звук" : "Выключить звук"}
          data-cursor-target
          className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-paper backdrop-blur transition-opacity hover:bg-ink/85"
        >
          {muted ? "Звук" : "Без звука"}
        </button>
      </div>
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-[1100px] text-sm text-ink/50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
