import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogPost } from "@prisma/client";
import { getPost } from "@/app/actions/actions";

import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import 'highlight.js/styles/tokyo-night-dark.min.css'

import rehypeHighlight from 'rehype-highlight';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeCodeTitles, rehypeKatex],
  }
}

interface RemoteMdxPageProps {
  params: Promise<{
    post: string;
  }>
}


export default async function RemoteMdxPage(props: RemoteMdxPageProps) {
  const params = await props.params;
  const post: BlogPost = await getPost(params.post)
  return (
    <div className='dark:prose-invert prose pt-20'>
      <MDXRemote source={post.content} options={options} />
      {/* <!-- Get the latest one from: https://katex.org/docs/browser --> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossOrigin="anonymous" />
    </div>
  )
}