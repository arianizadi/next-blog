"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work", label: "Work", id: "01" },
  { href: "/#systems", label: "Systems", id: "02" },
  { href: "/blog", label: "Blog", id: "03" },
  { href: "/#contact", label: "Contact", id: "04" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    const first = requestAnimationFrame(update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const main = document.querySelector("main");
    if (open) {
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
    } else {
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
    }
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const menu = document.getElementById("mobile-navigation");
      const menuControls = Array.from(
        menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
      const controls = [toggleRef.current, ...menuControls].filter(
        (control): control is HTMLElement => Boolean(control)
      );
      const first = controls[0];
      const last = controls.at(-1);

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    const focusFirst = requestAnimationFrame(() =>
      firstLinkRef.current?.focus()
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
      cancelAnimationFrame(focusFirst);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-void"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="flex items-center justify-between border-b border-border/60 bg-background/70 px-5 py-3 backdrop-blur-xl md:px-8">
          <Link
            href="/"
            aria-hidden={open}
            tabIndex={open ? -1 : undefined}
            className="group flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.26em] text-foreground"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_hsl(187_100%_55%/0.9)]" />
            Arian Izadi
          </Link>

          <nav
            className="hidden items-center gap-4 md:flex lg:gap-7"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  isActive(link.href)
                    ? link.href.startsWith("/#")
                      ? "location"
                      : "page"
                    : undefined
                }
                className={cn(
                  "group flex items-baseline gap-1.5 font-mono text-xs uppercase tracking-[0.22em] transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                <span className="text-xs text-cyan">{link.id}</span>
                {link.label}
                {isActive(link.href) && (
                  <span className="ml-0.5 inline-block h-1 w-1 translate-y-px rounded-full bg-cyan" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-foreground/25 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-cyan hover:text-cyan lg:inline-block"
            >
              Resume
            </a>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
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
                  open && "translate-y-[-3.5px] -rotate-45"
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
            id="mobile-navigation"
            data-lenis-prevent
            className="fixed inset-0 z-[95] flex flex-col justify-end overflow-x-hidden overflow-y-auto bg-background px-6 pb-10 pt-24 md:hidden"
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
                      aria-current={
                        isActive(link.href)
                          ? link.href.startsWith("/#")
                            ? "location"
                            : "page"
                          : undefined
                      }
                      ref={index === 0 ? firstLinkRef : undefined}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-border py-4"
                    >
                      <span className="shrink-0 font-mono text-xs text-cyan">
                        {link.id}
                      </span>
                      <span className="min-w-0 font-display text-[clamp(1.75rem,9vw,2.6rem)] font-black uppercase leading-none text-foreground transition-colors group-hover:text-cyan">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 flex items-center justify-between font-mono text-xs uppercase tracking-[0.24em] text-foreground/70">
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan"
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
