export const revalidate = 3600

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
    <main className="p-4">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post: BlogPost) => (
        <Link key={post.id} href={"/blog/" + post.id}>
            <Card>
              <CardHeader className="items-center">
              <CardTitle>{post.title}</CardTitle>
                <CardDescription className="flex flex-col items-center pt-5">
                  <p>{post.description}</p>
                  <p>{post.date.toDateString()}</p>
                </CardDescription>
            </CardHeader>
              <CardFooter className="justify-center items-center">
                {post.tags.map((tag: string, index: number) => (
                  <div key={index}>
                    <p className="px-2">#{tag}</p>
                </div>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
      </div>



    </main>
  );
}
