"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps every route. `template.tsx` (unlike `layout.tsx`) re-mounts on
 * navigation, so this is the page-level enter transition. It deliberately never
 * touches opacity — the page is always fully visible, it just settles a few
 * pixels — so a stalled frame loop (e.g. loaded in a background tab) can never
 * leave the page blank. The persistent WebGL background stays put underneath.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
