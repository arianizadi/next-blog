"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work", label: "Work", id: "01" },
  { href: "/journey", label: "Journey", id: "02" },
  { href: "/blog", label: "Blog", id: "03" },
  { href: "/#contact", label: "Contact", id: "04" },
];

const Clock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    const first = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      window.clearInterval(id);
    };
  }, []);
  return (
    <span className="hidden font-mono text-[10px] tracking-[0.2em] text-foreground/55 lg:inline">
      {time}
    </span>
  );
};

export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Close the mobile menu on navigation (derived-state reset during render)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="flex items-center justify-between border-b border-border/60 bg-background/72 px-5 py-3 backdrop-blur-xl md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-phosphor/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 bg-phosphor" />
            </span>
            Arian Izadi
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground/55 hover:text-foreground"
                )}
              >
                <span className="text-[8px] text-phosphor/70">{link.id}</span>
                {link.label}
                {isActive(link.href) && (
                  <span className="ml-0.5 inline-block h-1 w-1 translate-y-px bg-phosphor" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Clock />
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor/80 md:flex">
              SYS.OK
            </span>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-foreground/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-phosphor hover:text-phosphor md:inline-block"
            >
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="fixed inset-0 z-[95] flex flex-col justify-end bg-background px-6 pb-10 pt-24 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : 0.15 + index * 0.07,
                      ease: easeOutExpo,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-border py-4"
                    >
                      <span className="font-mono text-xs text-phosphor">
                        {link.id}
                      </span>
                      <span className="font-display text-5xl font-black uppercase leading-none text-foreground transition-colors group-hover:text-phosphor">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55">
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-phosphor"
              >
                Resume ↗
              </a>
              <span>Las Vegas, NV</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
