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
    <main className="mx-auto p-4 container">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
      {posts.map((post: BlogPost) => (
        <Link key={post.id} href={"/blog/" + post.id}>
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {post.tags.map((tag: string) => (
                <div className="flex gap-1">
                  <p key={tag}>#{tag}</p>
                </div>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}


    </main>
  );
}
