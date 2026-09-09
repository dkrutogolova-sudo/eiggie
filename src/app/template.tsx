"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps every route. `template.tsx` (unlike `layout.tsx`) re-mounts on
 * navigation, so this is where the page-level enter transition lives. The
 * persistent WebGL background in the root layout stays put underneath.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
