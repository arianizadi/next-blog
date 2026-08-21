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
    <div className="lab-container min-h-screen pb-24 pt-32 md:pt-40">
      <BlogIndexHeader />
      <BlogPostGrid posts={summaries} />
    </div>
  );
}
