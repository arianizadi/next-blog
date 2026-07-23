import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { BlogPost } from "@prisma/client";
import { getPost, getPosts } from "@/app/actions/actions";
import { BlogArticleHeader } from "@/components/BlogArticleHeader";
import ReadingProgress from "@/components/ReadingProgress";

import rehypeCodeTitles from "rehype-code-titles";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/tokyo-night-dark.min.css";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeCodeTitles, rehypeKatex],
  },
};

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: BlogPost) => ({
    post: post.id,
  }));
}

type PageProps = {
  params: Promise<{ post: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const postData = await getPost(resolvedParams.post);

  if (!postData) {
    notFound();
  }

  return {
    title: postData.title,
    description: postData.description || postData.title,
    openGraph: {
      title: postData.title,
      description: postData.description || postData.title,
      type: "article",
      publishedTime: postData.date.toISOString(),
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const postData = await getPost(resolvedParams.post);

  if (!postData) {
    notFound();
  }

  const dateLabel = postData.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto w-full min-w-0 max-w-3xl">
      <ReadingProgress />
      <div className="article-prose prose max-w-none min-w-0 pt-16 dark:prose-invert prose-headings:font-display prose-headings:uppercase prose-a:text-phosphor prose-a:decoration-phosphor/40 prose-strong:text-foreground prose-code:text-phosphor/90 prose-img:border prose-img:border-border">
        <BlogArticleHeader
          title={postData.title}
          dateLabel={dateLabel}
          dateISO={postData.date.toISOString()}
        />

        <MDXRemote source={postData.content} options={options} />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossOrigin="anonymous"
        />
      </div>
    </article>
  );
}
