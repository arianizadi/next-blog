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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="mb-12"
    >
      <Link
        href="/blog"
        className="mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground no-underline transition-colors hover:text-accent-ink"
      >
        <span aria-hidden>←</span> /blog
      </Link>

      <header>
        <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-accent-ink">
          <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
          Log entry ·{" "}
          <time dateTime={dateISO} className="text-muted-foreground tabular-nums">
            {dateLabel}
          </time>
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground wrap-anywhere md:text-6xl">
          {title}
        </h1>
      </header>

      <div className="mt-10 h-px w-full bg-border" />
    </motion.div>
  );
}
