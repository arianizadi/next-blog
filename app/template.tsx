"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

/**
 * Route transition: content rises in while a thin scanline sweeps down.
 * template.tsx remounts on every navigation, so this plays per-route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[150] h-px bg-phosphor/70"
        initial={{ y: -4, opacity: 0 }}
        animate={{
          y: "100vh",
          opacity: [0, 1, 1, 0],
          transition: { duration: 0.7, ease: easeOutExpo },
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOutExpo },
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
