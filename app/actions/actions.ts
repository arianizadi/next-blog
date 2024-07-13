"use server"

import prisma from "@/prisma/db"

export async function getPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      date: 'desc'
    }
  })
  return posts
}

export async function getPost(postId: string) {
  const post = await prisma.blogPost.findUniqueOrThrow({
    where: {
      id: postId
    }
  })
  return post
}