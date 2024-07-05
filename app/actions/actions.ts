"use server"

import prisma from "@/prisma/db"
import { revalidatePath } from "next/cache"

export async function createTestPost() {

  // await prisma.blogPost.deleteMany()

  await prisma.blogPost.create({
    data: {
      title: "HelloWorld",
      description: "First blog!",
      tags: ["bruh"],
      content: "Yeeee"
    }
  })

  console.log("Created Test Post")

  revalidatePath("/")
}

export async function getPosts() {
  const posts = await prisma.blogPost.findMany()
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