"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes framer-motion honor prefers-reduced-motion globally: transform and
 * layout animations become instant for reduced-motion users without
 * branching the render tree (keeps SSR and client markup identical).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
