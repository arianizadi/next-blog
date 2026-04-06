"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealMotionProps } from "@/lib/motion";

export function BlogIndexHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className="mb-12" {...revealMotionProps(reduceMotion)}>
      <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
        Field notes
      </p>
      <h1 className="mb-3 font-display text-4xl text-foreground md:text-5xl">
        Blog
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Thoughts on engineering, security, research, and everything in between.
      </p>
    </motion.div>
  );
}
