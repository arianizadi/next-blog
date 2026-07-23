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
      {/* grep search */}
      <div className="mb-10 flex items-center gap-3 border border-border bg-card px-4 py-3 focus-within:border-phosphor/50">
        <span className="font-mono text-sm text-phosphor">&gt;</span>
        <span className="font-mono text-sm text-foreground/55">grep</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search the log…"
          aria-label="Search posts"
          className="w-full bg-transparent font-mono text-base text-foreground placeholder:text-foreground/50 focus:outline-hidden sm:text-sm"
        />
        <span
          role="status"
          aria-live="polite"
          className="shrink-0 font-mono text-[10px] tracking-[0.18em] text-foreground/50"
        >
          {visible.length}/{posts.length} RECORDS
        </span>
      </div>

      {visible.length === 0 ? (
        <p
          role="status"
          className="border border-dashed border-border py-16 text-center font-mono text-sm text-foreground/55"
        >
          — no matches. the log keeps its secrets.
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
              className="border-b border-border"
            >
              <Link
                href={`/blog/${post.id}`}
                className="group flex flex-col gap-2 py-6 transition-colors hover:bg-foreground/3 md:flex-row md:items-baseline md:gap-8 md:py-7"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-foreground/55"
                >
                  {formatDate(post.date)}
                </time>
                <span className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-phosphor md:text-3xl">
                    {post.title}
                  </h2>
                  <span className="mt-2 line-clamp-2 block max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </span>
                </span>
                <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50 lg:block">
                  {post.tags.map((t) => `#${t}`).join(" ")}
                </span>
                <span className="shrink-0 font-mono text-sm text-foreground/55 transition-all group-hover:translate-x-1 group-hover:text-phosphor">
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
