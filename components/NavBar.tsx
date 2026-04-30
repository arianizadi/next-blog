"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { FileText, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  const bgAlpha = useTransform(scrollY, [0, 100], [0.62, 0.88]);
  const blurPx = useTransform(scrollY, [0, 100], [20, 28]);
  const navBackground = useMotionTemplate`rgba(22, 22, 28, ${bgAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/journey", label: "Journey" },
  ];

  const socialLinks = [
    { href: siteConfig.links.github, icon: Icons.Github, label: "Github" },
    { href: siteConfig.links.x, icon: Icons.X, label: "X (Twitter)" },
    { href: siteConfig.links.linkedin, icon: Icons.Linkedin, label: "Linkedin" },
    { href: siteConfig.links.gitroll, icon: Icons.GitRoll, label: "GitRoll" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <motion.nav
        style={{
          backgroundColor: navBackground,
          backdropFilter: backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className={cn(
          "flex items-center justify-between gap-2",
          "w-full max-w-4xl px-4 py-2.5 md:px-6 md:py-3",
          "rounded-[2.25rem]",
          "border border-white/[0.12]",
          "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          "ring-1 ring-white/[0.06]"
        )}
      >
        <Link
          href="/"
          prefetch={true}
          className="whitespace-nowrap font-display text-base font-bold text-foreground transition-colors hover:text-foreground/80 md:text-lg"
        >
          Arian Izadi
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              prefetch={true}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors duration-200",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="navbar-active-pill"
                  className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-0.5">
          <nav className="hidden items-center gap-0.5 md:flex">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-foreground/5"
              >
                <link.icon className="h-3.5 w-3.5 fill-foreground/20 transition-colors group-hover:fill-foreground/60" />
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </nav>

          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden items-center gap-2 rounded-full border border-foreground/15 px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:border-foreground/35 hover:text-foreground md:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </a>

          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/40 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-3 w-52 rounded-lg border border-white/10 bg-card/95 p-1 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
              >
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md font-sans transition-colors",
                        isActive(link.href) ? "text-foreground" : "text-foreground/40"
                      )}
                    >
                      {isActive(link.href) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      )}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild>
                  <a
                    href={siteConfig.links.resume}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-md text-foreground/60 transition-colors hover:text-foreground"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Resume
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                {socialLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 rounded-md text-foreground/40 transition-colors hover:text-foreground"
                    >
                      <link.icon className="h-3.5 w-3.5 fill-foreground/40" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
