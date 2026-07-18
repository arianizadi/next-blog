"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { easeOutExpo } from "@/lib/motion";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

const SectionHeader = ({
  index,
  label,
  title,
  description,
}: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mb-16 md:mb-24">
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-phosphor/80"
      >
        <span className="inline-block h-1.5 w-1.5 bg-phosphor" />
        {index} {"//"} {label}
      </motion.p>

      <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.92] tracking-tight text-foreground">
        <ScrambleText text={title} />
      </h2>

      {description && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
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
