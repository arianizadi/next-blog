export const dynamic = "force-dynamic";

import { BlogPost } from "@prisma/client";
import { getPosts } from "@/app/actions/actions";
import { BlogPostGrid } from "@/components/BlogPostGrid";
import { BlogIndexHeader } from "@/components/BlogIndexHeader";

export default async function BlogPage() {
  const posts: BlogPost[] = await getPosts();
  const summaries = posts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    date: p.date.toISOString(),
    tags: p.tags,
  }));

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 pb-24 pt-12 md:px-12 md:pt-16">
      <BlogIndexHeader />
      <BlogPostGrid posts={summaries} />
    </div>
  );
}
