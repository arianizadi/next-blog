import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogPost } from "@prisma/client";
import { getPost } from "@/app/actions/actions";
import remarkGfm from 'remark-gfm'

import 'highlight.js/styles/github-dark.min.css'

import rehypeHighlight from 'rehype-highlight';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  }
}

interface RemoteMdxPageProps {
  params: {
    post: string;
  }
}


export default async function RemoteMdxPage({ params }: RemoteMdxPageProps) {
  const post: BlogPost = await getPost(params.post)
  return (
    <div className='dark:prose-invert prose'>
      <MDXRemote source={post.content} options={options} />
    </div>
  )
}