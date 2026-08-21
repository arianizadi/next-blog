"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  /** Heading level. Use "h1" for the page's primary title. */
  level?: "h1" | "h2";
  /** Surface tone: paper document or dark instrument panel. */
  tone?: "paper" | "panel";
};

const SectionHeader = ({
  index,
  label,
  title,
  description,
  level = "h2",
  tone = "paper",
}: SectionHeaderProps) => {
  const TitleTag = level;

  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        tone === "panel" && "text-panel-foreground"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="flex items-center gap-3"
      >
        <span
          aria-hidden
          className={cn(
            "inline-block h-1.5 w-1.5",
            tone === "panel" ? "bg-panel-accent" : "bg-accent"
          )}
        />
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-[0.34em]",
            tone === "panel" ? "text-panel-accent" : "text-accent"
          )}
        >
          § {index} / {label}
        </p>
      </motion.div>

      <TitleTag className="mt-5 font-display text-display-lg font-normal text-balance text-current">
        {title}
      </TitleTag>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className={cn(
            "mt-5 max-w-xl text-sm leading-7 md:text-base md:leading-7",
            tone === "panel" ? "text-panel-muted" : "text-muted-foreground"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
