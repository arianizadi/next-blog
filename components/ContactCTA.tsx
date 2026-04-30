"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  FileText,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/app/config/site";
import { Icons } from "@/components/Icons";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

const ContactCTA = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: linkStagger, item: linkItem } =
    staggerVariants(reduceMotion);
  const tapHover = {
    whileHover: { y: reduceMotion ? 0 : -2 },
    whileTap: { scale: reduceMotion ? 1 : 0.98 },
  };

  const links = [
    {
      label: "Email",
      detail: "izadi2000@gmail.com",
      href: "mailto:izadi2000@gmail.com",
      icon: <Mail size={18} />,
      primary: true,
    },
    {
      label: "Resume",
      detail: "PDF via Google Drive",
      href: siteConfig.links.resume,
      icon: <FileText size={18} />,
    },
    {
      label: "LinkedIn",
      detail: "Professional profile",
      href: siteConfig.links.linkedin,
      icon: <Icons.Linkedin className="h-[18px] w-[18px] fill-current" />,
    },
    {
      label: "GitHub",
      detail: "Code and PRs",
      href: siteConfig.links.github,
      icon: <Icons.Github className="h-[18px] w-[18px] fill-current" />,
    },
    {
      label: "GitRoll",
      detail: "Contribution profile",
      href: siteConfig.links.gitroll,
      icon: <Code2 size={18} />,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <motion.div className="max-w-3xl" {...headerMotion}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              07 / Contact
            </p>

            <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">
              Let&apos;s talk systems, robotics, or backend work.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              I&apos;m open to software engineering roles where reliability,
              low-level reasoning, and product impact matter. Email is the best
              way to reach me, and my resume is linked here too.
            </p>

            <div className="mt-10 grid gap-4 border-y border-border py-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Based in
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Las Vegas, NV
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Focus
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Systems, backend, robotics
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Resume
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF linked above
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-3"
            variants={linkStagger}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {links.map((link) => (
              <motion.a
                key={link.label}
                variants={linkItem}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={`group flex items-center justify-between rounded-lg border p-4 transition-colors ${
                  link.primary
                    ? "border-foreground bg-foreground text-background hover:bg-foreground/90"
                    : "border-border text-foreground/70 hover:border-foreground/35 hover:text-foreground"
                }`}
                {...tapHover}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`rounded-md border p-2 ${
                      link.primary
                        ? "border-background/20 bg-background/10"
                        : "border-border bg-card"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {link.label}
                    </span>
                    <span
                      className={`block truncate text-xs ${
                        link.primary
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.detail}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground/70 md:flex-row md:items-center">
          <span>&copy; 2026 Arian Izadi. All rights reserved.</span>
          <span>Built with Next.js.</span>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
