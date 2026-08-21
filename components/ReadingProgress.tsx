"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Tracks scroll position directly (no spring), so it behaves like a
 * scrollbar. This is acceptable for reduced-motion users with no tree branching.
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[110] h-0.5 origin-left bg-terracotta"
    />
  );
};

export default ReadingProgress;
