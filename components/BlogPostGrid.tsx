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
      <div className="mb-12 flex items-center gap-3 border-2 border-border bg-background px-4 py-3 focus-within:border-phosphor relative">
        <div className="absolute top-0 right-0 p-1 bg-phosphor/10 w-full h-full pointer-events-none opacity-20 bg-signal-grid mix-blend-overlay" />
        <span className="font-mono text-sm text-phosphor bg-phosphor/20 px-2 py-0.5 relative z-10">$ grep</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="query local datastore..."
          aria-label="Search posts"
          className="w-full bg-transparent font-mono text-base text-foreground placeholder:text-foreground/30 focus:outline-hidden sm:text-sm relative z-10"
        />
        <span
          role="status"
          aria-live="polite"
          className="shrink-0 font-mono text-xs tracking-[0.2em] text-foreground/50 border border-border px-2 py-1 relative z-10"
        >
          {visible.length}/{posts.length} HITS
        </span>
      </div>

      {visible.length === 0 ? (
        <div
          role="status"
          className="border-2 border-dashed border-border py-24 text-center font-mono text-sm text-foreground/55 bg-background relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-signal-grid opacity-10" />
          <p className="relative z-10">ERR_NO_MATCH_FOUND. Adjust query parameters.</p>
        </div>
      ) : (
        <ul className="border-t-2 border-border">
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
              className="border-b-2 border-border group bg-background hover:bg-card transition-colors"
            >
              <Link
                href={`/blog/${post.id}`}
                className="flex flex-col gap-4 py-8 px-4 md:px-6 md:flex-row md:items-start md:gap-12 relative"
              >
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-phosphor/0 group-hover:border-phosphor/30 transition-all duration-300 m-4" />

                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-xs tracking-[0.2em] text-foreground/50 bg-border/50 px-2 py-1 md:mt-1"
                >
                  LOG.{formatDate(post.date)}
                </time>

                <span className="min-w-0 flex-1 border-l border-border pl-4 md:border-l-0 md:pl-0">
                  <h2 className="font-display text-2xl font-black uppercase leading-[1.1] tracking-tight text-foreground transition-colors group-hover:text-phosphor md:text-4xl mb-4">
                    {post.title}
                  </h2>
                  <span className="block max-w-2xl text-sm leading-relaxed text-muted-foreground font-mono tracking-tight">
                    {post.description}
                  </span>
                </span>

                <div className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 lg:flex flex-col gap-2 w-32 items-end mt-2 border-l border-border pl-4">
                  {post.tags.map((t) => (
                    <span key={t} className="bg-foreground/5 px-2 py-0.5 border border-border/50">
                      SYS.{t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
