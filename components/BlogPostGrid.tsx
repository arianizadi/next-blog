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
      {/* Search */}
      <div className="mb-12 flex items-baseline gap-4 border-b border-border pb-3 focus-within:border-accent/60">
        <label htmlFor="post-search" className="sr-only">
          Search posts
        </label>
        <input
          id="post-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the notes…"
          className="w-full bg-transparent font-serif text-lg italic text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <span
          role="status"
          aria-live="polite"
          className="shrink-0 font-serif text-base tabular-nums italic text-muted-foreground"
        >
          {visible.length}/{posts.length}
        </span>
      </div>

      {visible.length === 0 ? (
        <p role="status" className="py-16 text-center font-serif text-lg italic text-muted-foreground">
          Nothing found under that title.
        </p>
      ) : (
        <ul>
          {visible.map((post, index) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 18 }}
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
                className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10 md:py-8"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 font-serif text-base tabular-nums italic text-muted-foreground"
                >
                  {formatDate(post.date)}
                </time>
                <span className="min-w-0 flex-1">
                  <h2 className="text-2xl font-light leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent motion-reduce:transition-none wrap-anywhere md:text-3xl">
                    {post.title}
                  </h2>
                  <span className="mt-2 line-clamp-2 block max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </span>
                </span>
                <span className="hidden shrink-0 text-xs uppercase tracking-[0.16em] text-muted-foreground lg:block">
                  {post.tags.map((t) => `#${t}`).join(" ")}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 font-serif text-xl text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none"
                >
                  ↗
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
