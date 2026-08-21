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
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground no-underline transition-colors hover:text-accent"
      >
        ← Field log
      </Link>

      <header>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Entry —{" "}
          <time dateTime={dateISO} className="text-muted-foreground">
            {dateLabel}
          </time>
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground wrap-anywhere md:text-6xl">
          {title}
        </h1>
      </header>

      <div className="relative mt-10 h-px w-full bg-border">
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-24 bg-accent"
        />
      </div>
    </motion.div>
  );
}
