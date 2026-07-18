"use client";

import { motion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { easeOutExpo } from "@/lib/motion";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  /** Heading level — use "h1" for the page's primary title. */
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
    <div className="relative mb-16 md:mb-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-phosphor/80"
      >
        <span className="inline-block h-1.5 w-1.5 bg-phosphor" />
        {index} {"//"} {label}
      </motion.p>

      <TitleTag className="font-display text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.92] tracking-tight text-foreground">
        <ScrambleText text={title} />
      </TitleTag>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
