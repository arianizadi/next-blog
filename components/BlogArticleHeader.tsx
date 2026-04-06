"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { revealMotionProps } from "@/lib/motion";

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
  const reduceMotion = useReducedMotion();
  const reveal = revealMotionProps(reduceMotion);

  return (
    <motion.div className="mb-8" {...reveal}>
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground/40 no-underline transition-colors hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to blog
      </Link>

      <header>
        <h1 className="mb-2">{title}</h1>
        <time dateTime={dateISO} className="text-muted-foreground">
          {dateLabel}
        </time>
      </header>
    </motion.div>
  );
}
