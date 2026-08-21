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
    <div className="mx-auto min-h-screen w-full max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36 lg:px-12">
      <BlogIndexHeader />
      <BlogPostGrid posts={summaries} />
    </div>
  );
}
