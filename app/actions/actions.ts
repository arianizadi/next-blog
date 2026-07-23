"use server";

import prisma from "@/prisma/db";

export async function getPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return posts;
}

export async function getPost(postId: string) {
  if (!/^[a-f\d]{24}$/i.test(postId)) {
    return null;
  }

  const post = await prisma.blogPost.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}
