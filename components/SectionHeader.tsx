"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  /** Heading level. Use "h1" for the page's primary title. */
  level?: "h1" | "h2";
};

const SectionHeader = ({
  index,
  label,
  title,
  description,
  level = "h2",
}: SectionHeaderProps) => {
  const TitleTag = level;
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative mb-14 md:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
        className="mb-5 font-mono text-xs tracking-[0.14em] text-signal"
      >
        {index}
        <span className="mx-2 text-muted-foreground/60">/</span>
        <span className="text-muted-foreground">{label}</span>
      </motion.p>

      <TitleTag className="max-w-4xl font-display text-display-title font-bold text-foreground">
        {title}
      </TitleTag>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: easeOutExpo }}
          className="mt-5 max-w-xl font-serif text-lg italic leading-7 text-muted-foreground md:text-xl md:leading-8"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        aria-hidden
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 100% 0 0)" }
        }
        whileInView={
          reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
        }
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
        className="tick-rule mt-8"
      />
    </header>
  );
};

export default SectionHeader;
