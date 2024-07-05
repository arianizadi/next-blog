"use client"

import { siteConfig } from "@/app/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { Earth } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export function NavBar() {
  return (
    <header className="top-0 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border w-full">
      <div className="flex justify-between items-center max-w-screen-2xl h-14 container">
        <div className="flex justify-start items-center space-x-2">
          <ModeToggle />
          <Link href="/">
            <div className={cn(buttonVariants({ variant: "ghost" }))}>
              <span>Arian Izadi</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 justify-center space-x-5">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            Home
          </Link>
          <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            Blog
          </Link>
        </div>
        <div className="flex justify-end items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.Github className="w-4 h-4" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <Link href={siteConfig.links.x} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.X className="w-4 h-4" />
                <span className="sr-only">X (Twitter)</span>
              </div>
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                <Icons.Linkedin className="w-4 h-4" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}