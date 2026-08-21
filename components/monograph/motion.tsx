"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Oversized rounded media plate: curtain-reveal crop on entry plus a slow
 * inner scale ("crop shift"). Reduced-motion users get the final state.
 */
export function Plate({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { clipPath: "inset(6% 3% 12% 3% round 40px)" }}
      whileInView={
        reduceMotion ? undefined : { clipPath: "inset(0% 0% 0% 0% round 40px)" }
      }
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.15, delay, ease: easeOutExpo }}
      className={cn("relative overflow-hidden bg-surface", className)}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 1.07 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.7, delay, ease: easeOutExpo }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A single line of display copy rising out of a mask. */
export function MaskedLine({
  children,
  delay = 0,
  className,
  as = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  return (
    <Tag className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", className)}>
      <motion.span
        initial={reduceMotion ? false : { y: "112%" }}
        whileInView={reduceMotion ? undefined : { y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: easeOutExpo }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/** Quiet rise-and-fade for supporting blocks. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Small serif spread label with hairline, e.g. “02 — Selected work”. */
export function SpreadLabel({
  number,
  title,
  className,
}: {
  number: string;
  title: string;
  className?: string;
}) {
  return (
    <Rise
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-border pb-4",
        className
      )}
    >
      <span className="font-serif text-lg italic tracking-wide text-foreground/85 md:text-xl">
        {title}
      </span>
      <span className="font-serif text-base italic text-muted-foreground md:text-lg">
        {number}
      </span>
    </Rise>
  );
}
