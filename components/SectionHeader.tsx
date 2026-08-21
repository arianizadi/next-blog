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
    <div className="relative mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-border pb-8 gap-8">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-background bg-foreground px-2 py-1 tracking-[0.2em] font-bold">
            SEQ {index}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
            {label}
          </span>
        </motion.div>

        <TitleTag className="font-display text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
          {title}
        </TitleTag>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="max-w-sm text-sm font-mono uppercase tracking-wider leading-relaxed text-foreground/50 md:text-right border-l md:border-l-0 md:border-r border-phosphor/30 pl-4 md:pl-0 md:pr-4"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
