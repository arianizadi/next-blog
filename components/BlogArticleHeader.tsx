"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type BlogArticleHeaderProps = {
  title: string;
  dateLabel: string;
  dateISO: string;
};

export function BlogArticleHeader({
  title,
  dateLabel,
  dateISO,
}: BlogArticleHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeOutExpo }}
      className="mb-12"
    >
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-[13px] tracking-tight text-muted-foreground no-underline transition-colors hover:text-signal"
      >
        ← All entries
      </Link>

      <header>
        <p className="mb-4 font-mono text-xs tracking-[0.14em] text-signal">
          Entry
          <span className="mx-2 text-muted-foreground/60">/</span>
          <time dateTime={dateISO} className="text-muted-foreground">
            {dateLabel}
          </time>
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground wrap-anywhere md:text-6xl">
          {title}
        </h1>
      </header>

      <div aria-hidden className="tick-rule mt-10" />
    </motion.div>
  );
}
