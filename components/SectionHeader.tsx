"use client";

import { motion } from "framer-motion";
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

  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="flex items-center gap-4"
      >
        <span
          aria-hidden
          className="inline-block h-2 w-2 shrink-0 bg-accent transition-transform duration-300 group-hover:rotate-45"
        />
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink">
          {index} / {label}
        </p>
        <span aria-hidden className="h-px min-w-8 flex-1 bg-border" />
      </motion.div>

      <TitleTag className="mt-6 font-display text-[clamp(2.4rem,7.5vw,5.5rem)] font-black uppercase leading-[0.92] tracking-tight text-foreground">
        {title}
      </TitleTag>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="mt-6 max-w-xl text-base leading-7 text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
