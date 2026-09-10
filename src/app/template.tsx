"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { getProject, type AccentKey } from "@/data/projects";

/**
 * Page transition — a liquid shroud. `template.tsx` re-mounts on every
 * navigation, so on arrival coloured strips already cover the screen and retract
 * upward with a per-strip stagger; the group is goo-filtered so the trailing
 * edges merge into a wave. Colour = the project's accent (burgundy off the
 * project routes).
 *
 * Safety: strips retract via a CSS animation with `forwards`, so they end
 * off-screen even if the frame loop was throttled; it's pointer-events-none; and
 * it hard-unmounts after 950ms regardless. Reduced-motion hides the strips at
 * once (see globals.css).
 */
const ACCENT_HEX: Record<AccentKey, string> = {
  burgundy: "#7C2B3B",
  glacier: "#5E93AE",
  nightsky: "#1E2A3A",
  silver: "#9BA0A6",
};

const STRIPS = 5;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [shroud, setShroud] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShroud(false), 950);
    return () => window.clearTimeout(t);
  }, []);

  const slug = pathname.startsWith("/work/") ? pathname.split("/")[2] : null;
  const accent = (slug && getProject(slug)?.accent) || "burgundy";
  const color = ACCENT_HEX[accent];

  return (
    <>
      {shroud && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex"
          style={{ filter: "url(#goo-hard)" }}
        >
          {Array.from({ length: STRIPS }).map((_, i) => (
            <div
              key={i}
              className="shroud-strip h-full flex-1"
              style={{
                background: color,
                animationDelay: `${(0.05 + (i % 2 === 0 ? i : STRIPS - i) * 0.05).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      )}
      <motion.div
        initial={reduced ? false : { y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
