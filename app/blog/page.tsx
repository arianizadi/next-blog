export const dynamic = 'force-dynamic'

import { BlogPost } from "@prisma/client";
import { getPosts } from "@/app/actions/actions";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const posts: BlogPost[] = await getPosts()
  return (
    <main className="px-4 pt-20 pb-4">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post: BlogPost, index: number) => (
          <Link key={post.id} href={"/blog/" + post.id} prefetch={index < 3}>
            <Card>
              <CardHeader className="items-center">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="flex flex-col items-center gap-2 pt-3 text-center">
                  <span>{post.description}</span>
                  <span>{post.date.toDateString()}</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-center items-center">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-2">#{tag}</span>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
