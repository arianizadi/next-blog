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
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="mb-12"
    >
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 font-serif text-lg italic text-muted-foreground no-underline transition-colors hover:text-foreground motion-reduce:transition-none"
      >
        ← All notes
      </Link>

      <header>
        <p className="mb-5 font-serif text-base italic text-muted-foreground md:text-lg">
          <time dateTime={dateISO}>{dateLabel}</time>
        </p>
        <h1 className="max-w-3xl text-statement font-light leading-[1.05] tracking-tight text-foreground wrap-anywhere">
          {title}
        </h1>
      </header>

      <div className="mt-10 h-px w-full bg-border" />
    </motion.div>
  );
}
