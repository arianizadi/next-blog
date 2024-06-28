import prisma from "@/prisma/db"

import { ModeToggle } from "@/components/ModeToggle";
import { BlogPost } from "@prisma/client";
import { createPost, getPosts } from "./actions/actions";
import { Button } from "@/components/ui/button";


export default async function Home() {
  const posts: BlogPost[] = await getPosts()
  return (
    <main>
      <ModeToggle />
      <form action={createPost}>
        <Button className="m-5">Create Test Post</Button>
      </form>
      <ul>
        {posts.map((post: BlogPost) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
