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
    <div className="mx-auto min-h-dvh max-w-[1200px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <BlogIndexHeader />
      <div className="mt-14 md:mt-20">
        <BlogPostGrid posts={summaries} />
      </div>
    </div>
  );
}
