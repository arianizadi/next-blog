"use client"

import { siteConfig } from "@/app/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export function NavBar() {
  return (
    <header className="top-0 z-50 fixed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border w-full">
      <div className="flex justify-between items-center max-w-screen-2xl h-14 container">
        <div className="flex justify-start items-center space-x-2">
          <strong className="text-center">Arian Izadi</strong>
        </div>
        <div className="flex justify-center">
          <Link prefetch={true} href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            Home
          </Link>
          <Link prefetch={true} href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            Blog
          </Link>
          <Link prefetch={true} href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
            Projects
          </Link>
          <Link prefetch={true} href="/journey" className={cn(buttonVariants({ variant: "ghost" }))}>
            Journey
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <nav className="flex items-center">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.Github className="w-4 h-4 fill-black dark:fill-white" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <Link href={siteConfig.links.x} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.X className="w-4 h-4 fill-black dark:fill-white" />
                <span className="sr-only">X (Twitter)</span>
              </div>
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.Linkedin className="w-4 h-4 fill-black dark:fill-white" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}