"use server"

import prisma from "@/prisma/db"
import { revalidatePath } from "next/cache"

export async function createPost() {
  await prisma.blogPost.create({
    data: {
      title: "Hello World",
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