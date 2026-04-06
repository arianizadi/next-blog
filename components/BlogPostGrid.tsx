"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { defaultViewport, staggerVariants } from "@/lib/motion";

export type BlogPostSummary = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export function BlogPostGrid({ posts }: { posts: BlogPostSummary[] }) {
  const reduceMotion = useReducedMotion();
  const { container, item } = staggerVariants(reduceMotion);

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item} className="min-w-0">
          <Link href={`/blog/${post.id}`} className="group block h-full">
            <div className="card-surface h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-foreground/80 font-display">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <time className="mb-3 block text-xs text-muted-foreground">
                    {new Date(post.date).toDateString()}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={`${post.id}-${tag}-${i}`}
                        className="rounded-full bg-foreground/5 border border-border px-2.5 py-1 text-xs font-medium text-foreground/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
