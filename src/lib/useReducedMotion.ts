"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`. Every animated surface in the site should
 * check this and fall back to an instant / opacity-only state when true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
