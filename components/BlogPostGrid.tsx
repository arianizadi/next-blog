"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export type BlogPostSummary = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

const formatDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replaceAll("/", ".");

export function BlogPostGrid({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [posts]
  );

  const visible = query ? fuse.search(query).map((r) => r.item) : posts;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3 border border-border bg-card px-4 py-3 transition-colors focus-within:border-foreground">
        <span aria-hidden className="font-mono text-sm text-accent-ink">
          $
        </span>
        <label htmlFor="post-search" className="sr-only">
          Search posts
        </label>
        <input
          id="post-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="grep the log…"
          className="w-full bg-transparent font-mono text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden sm:text-sm"
        />
        <span
          role="status"
          aria-live="polite"
          className="shrink-0 font-mono text-xs tabular-nums tracking-[0.14em] text-muted-foreground"
        >
          {visible.length}/{posts.length}
        </span>
      </div>

      {visible.length === 0 ? (
        <p
          role="status"
          className="border border-dashed border-border py-16 text-center font-mono text-sm text-muted-foreground"
        >
          No matches. The log keeps its secrets.
        </p>
      ) : (
        <ul>
          {visible.map((post, index) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.05, 0.3),
                ease: easeOutExpo,
              }}
              className="group relative border-b border-border first:border-t"
            >
              <Link
                href={`/blog/${post.id}`}
                className="flex flex-col gap-2 py-6 transition-colors hover:bg-card md:flex-row md:items-baseline md:gap-8 md:py-7"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 pl-0 font-mono text-xs tabular-nums tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-accent-ink md:pl-6"
                >
                  {formatDate(post.date)}
                </time>
                <span className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent-ink md:text-2xl">
                    {post.title}
                  </h2>
                  <span className="mt-2 line-clamp-2 block max-w-2xl pr-6 text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </span>
                  <span className="mt-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/80 lg:hidden">
                    {post.tags.map((t) => `#${t}`).join(" ")}
                  </span>
                </span>
                <span className="hidden shrink-0 pr-6 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground lg:block">
                  {post.tags.map((t) => `#${t}`).join(" ")}
                </span>
                <span
                  aria-hidden
                  className="absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-sm text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-ink md:block"
                >
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
