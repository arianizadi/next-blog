// app/blog/[post]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogPost } from "@prisma/client";
import { getPost, getPosts } from "@/app/actions/actions";

import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight';

import 'highlight.js/styles/tokyo-night-dark.min.css'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeCodeTitles, rehypeKatex],
  }
}

// Let TypeScript infer the types
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    post: post.id,
  }));
}

export async function generateMetadata({ params }: { params: any }) {
  const post = await getPost(params.post);

  return {
    title: post.title,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      type: 'article',
      publishedTime: post.date.toISOString(),
    },
  };
}

export const revalidate = 3600

export default async function RemoteMdxPage({ params }: { params: any }) {
  const post: BlogPost = await getPost(params.post);

  if (!post) {
    throw new Error('Post not found');
  }

  return (
    <article className="max-w-4xl mx-auto px-4">
      <div className='dark:prose-invert prose pt-20'>
        <header className="mb-8">
          <h1 className="mb-2">{post.title}</h1>
          <time dateTime={post.date.toISOString()} className="text-gray-500">
            {post.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        <MDXRemote source={post.content} options={options} />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossOrigin="anonymous"
        />
      </div>
    </article>
  )
}