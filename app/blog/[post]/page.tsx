import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogPost } from "@prisma/client";
import { getPost } from "@/app/actions/actions";

interface RemoteMdxPageProps {
  params: {
    post: string;
  }
}

export default async function RemoteMdxPage({ params }: RemoteMdxPageProps) {
  const post: BlogPost = await getPost(params.post)
  return <MDXRemote source={post.content} />
}