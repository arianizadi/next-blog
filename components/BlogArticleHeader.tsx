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
        className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 no-underline transition-colors hover:text-terracotta"
      >
        ← /blog
      </Link>

      <header>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-terracotta">
          Log entry ·{" "}
          <time dateTime={dateISO} className="text-foreground/70">
            {dateLabel}
          </time>
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground wrap-anywhere md:text-6xl">
          {title}
        </h1>
      </header>

      <div className="mt-10 h-px w-full bg-border" />
    </motion.div>
  );
}
