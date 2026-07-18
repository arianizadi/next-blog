"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Tracks scroll position directly (no spring), so it behaves like a
 * scrollbar — acceptable for reduced-motion users, no tree branching.
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[110] h-0.5 origin-left bg-phosphor"
    />
  );
};

export default ReadingProgress;
