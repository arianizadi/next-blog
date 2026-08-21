"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const INDEX_ENTRIES = [
  { href: "/#work", label: "Selected work", id: "01" },
  { href: "/#experience", label: "Experience", id: "02" },
  { href: "/#materials", label: "Materials", id: "03" },
  { href: "/blog", label: "Writing", id: "04" },
  { href: "/journey", label: "Journey", id: "05" },
  { href: siteConfig.links.resume, label: "Résumé", id: "06", external: true },
  { href: "/#contact", label: "Contact", id: "07" },
];

export function Masthead() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Reset derived state on navigation (during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Scroll lock (native + Lenis) while the index overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const root = document.getElementById("main");
    if (open) {
      root?.setAttribute("inert", "");
    } else {
      root?.removeAttribute("inert");
    }
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      root?.removeAttribute("inert");
      window.__lenis?.start();
    };
  }, [open]);

  // Escape key and focus trap inside the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const menu = document.getElementById("site-index");
      const focusables = Array.from(
        menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ??
          []
      );
      const controls = [toggleRef.current, ...focusables].filter(
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
    document.addEventListener("keydown", onKey);
    const focusFirst = requestAnimationFrame(() =>
      firstLinkRef.current?.focus()
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(focusFirst);
    };
  }, [open]);

  // Return focus to the trigger only after a real open→close cycle.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
    return href !== siteConfig.links.resume && pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-100 flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link
          href="/"
          tabIndex={open ? -1 : undefined}
          aria-hidden={open}
          className={cn(
            "group flex items-center gap-2.5",
            open && "pointer-events-none"
          )}
        >
          <span
            aria-hidden
            className="inline-block h-[7px] w-[7px] rounded-full bg-accent transition-transform duration-300 group-hover:scale-125 motion-reduce:transition-none"
          />
          <span className="font-serif text-lg tracking-wide text-foreground md:text-xl">
            Arian Izadi
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-baseline gap-6 md:gap-8">
          <Link
            href="/#work"
            tabIndex={open ? -1 : undefined}
            aria-hidden={open}
            className={cn(
              "hidden font-serif text-lg tracking-wide text-foreground/80 transition-colors hover:text-foreground sm:inline-block md:text-xl",
              open && "pointer-events-none"
            )}
          >
            Work
          </Link>
          <Link
            href="/#contact"
            tabIndex={open ? -1 : undefined}
            aria-hidden={open}
            className={cn(
              "hidden font-serif text-lg tracking-wide text-foreground/80 transition-colors hover:text-foreground sm:inline-block md:text-xl",
              open && "pointer-events-none"
            )}
          >
            Contact
          </Link>
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-index"
            className="font-serif text-lg italic tracking-wide text-accent md:text-xl"
          >
            {open ? "Close" : "Index"}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            id="site-index"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Site index"
            className="fixed inset-0 z-95 overflow-y-auto overflow-x-hidden bg-background px-5 pb-10 pt-24 md:px-10 md:pt-28"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
              <nav aria-label="Index">
                <ul>
                  {INDEX_ENTRIES.map((entry, i) => (
                    <motion.li
                      key={entry.label}
                      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: reduceMotion ? 0 : 0.12 + i * 0.05,
                        ease: easeOutExpo,
                      }}
                      className="border-b border-border"
                    >
                      <a
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={entry.href}
                        target={entry.external ? "_blank" : undefined}
                        rel={entry.external ? "noopener noreferrer" : undefined}
                        aria-current={
                          !entry.external && isActive(entry.href)
                            ? entry.href.startsWith("/#")
                              ? "location"
                              : "page"
                            : undefined
                        }
                        className="group flex items-baseline gap-5 py-4 md:gap-8 md:py-5"
                      >
                        <span
                          className={cn(
                            "w-8 shrink-0 font-serif text-sm italic md:text-base",
                            isActive(entry.href) && !entry.external
                              ? "text-accent"
                              : "text-muted-foreground"
                          )}
                        >
                          {entry.id}
                        </span>
                        <span
                          className={cn(
                            "min-w-0 text-[clamp(1.9rem,5.2vw,3.6rem)] font-light leading-tight tracking-tight transition-colors duration-300 wrap-anywhere",
                            isActive(entry.href) && !entry.external
                              ? "text-accent"
                              : "text-foreground group-hover:text-accent motion-reduce:transition-none"
                          )}
                        >
                          {entry.label}
                        </span>
                        {entry.external && (
                          <span
                            aria-hidden
                            className="ml-1 shrink-0 font-serif text-xl text-muted-foreground"
                          >
                            ↗
                          </span>
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.6 }}
                className="flex flex-col justify-end gap-8 text-sm leading-6 text-muted-foreground lg:pb-2"
              >
                <p>
                  Arian Izadi — embedded software engineer in Las Vegas.
                  Currently at Konami Gaming, Inc.
                </p>
                <a
                  href="mailto:izadi2000@gmail.com"
                  className="font-serif text-xl italic text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
                >
                  izadi2000@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
