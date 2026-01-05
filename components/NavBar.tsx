"use client"

import { useState } from "react";
import { siteConfig } from "@/app/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/journey", label: "Journey" },
  ];

  const socialLinks = [
    { href: siteConfig.links.github, icon: Icons.Github, label: "Github" },
    { href: siteConfig.links.x, icon: Icons.X, label: "X (Twitter)" },
    { href: siteConfig.links.linkedin, icon: Icons.Linkedin, label: "Linkedin" },
  ];

  return (
    <header className="top-0 z-50 fixed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border w-full">
      <div className="flex justify-between items-center max-w-screen-2xl h-14 container">
        {/* Logo/Name */}
        <div className="flex justify-start items-center space-x-2">
          <strong className="text-center">Arian Izadi</strong>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex justify-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              prefetch={true} 
              href={link.href} 
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Social Icons & Mobile Menu */}
        <div className="flex justify-end items-center">
          {/* Social Icons - hidden on mobile */}
          <nav className="hidden md:flex items-center">
            {socialLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                target="_blank" 
                rel="noreferrer"
              >
                <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                  <link.icon className="w-4 h-4 fill-black dark:fill-white" />
                  <span className="sr-only">{link.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Dropdown */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-10 w-10 px-0"
                  )}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {socialLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link 
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <link.icon className="w-4 h-4 fill-black dark:fill-white" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}