"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, List } from "lucide-react";
import type { ReelSlide } from "@/lib/reel";
import { MenuOverlay } from "@/components/cinema/MenuOverlay";
import { StageVisual } from "@/components/cinema/visuals";
import { easeOutExpo } from "@/lib/motion";

function BackdropLayer({ slide }: { slide: ReelSlide }) {
  if (slide.media.kind === "image") {
    return (
      <Image
        src={slide.media.src}
        alt=""
        fill
        sizes="100vw"
        quality={40}
        className="scale-125 object-cover [filter:blur(64px)_saturate(1.15)_brightness(0.5)]"
      />
    );
  }
  return (
    <StageVisual
      visual={slide.media.visual}
      label=""
      className="scale-125 [filter:blur(58px)_saturate(1.2)_brightness(0.55)]"
    />
  );
}

function StageMedia({ slide }: { slide: ReelSlide }) {
  if (slide.media.kind === "image") {
    return (
      <Image
        src={slide.media.src}
        alt={slide.media.alt}
        fill
        sizes="(max-width: 767px) 88vw, min(78vw, 1500px)"
        quality={80}
        className="object-cover"
      />
    );
  }
  return <StageVisual visual={slide.media.visual} label={slide.media.label} />;
}

export function CinemaReel({ slides }: { slides: ReelSlide[] }) {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);

  const total = slides.length;
  const slide = slides[index];

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, step, goTo, total]);

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) menuButtonRef.current?.focus();
    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const selectSlide = useCallback(
    (next: number) => {
      goTo(next);
      setMenuOpen(false);
    },
    [goTo]
  );

  const announce = `Slide ${index + 1} of ${total}: ${slide.display} — ${slide.category}`;
  const position = String(index + 1).padStart(2, "0");
  const positionTotal = String(total).padStart(2, "0");

  return (
    <section
      aria-label="Selected work — project reel"
      className="cinema-root relative h-dvh w-full overflow-hidden bg-[#08080b] text-white"
    >
      <h1 className="sr-only">
        Arian Izadi — Embedded &amp; Systems Software Engineer
      </h1>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      <div aria-hidden className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide.id}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.9, ease: "linear" }}
          >
            <BackdropLayer slide={slide} />
          </motion.div>
        </AnimatePresence>
        <div className="veil absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${slide.display} — ${slide.category}. Slide ${index + 1} of ${total}.`}
        className="pointer-events-none absolute inset-0 z-10"
      >
        <AnimatePresence>
          <motion.div
            key={slide.id}
            className="absolute inset-0 flex flex-col items-center justify-center md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <div className="relative h-[46dvh] w-[88vw] shrink-0 md:absolute md:left-1/2 md:top-[44%] md:h-[min(66dvh,820px)] md:w-[min(78vw,1500px)] md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="absolute inset-0 overflow-hidden rounded-[clamp(1.25rem,3vw,2.25rem)] border border-white/15 bg-[#0a0a0d] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]">
                <motion.div
                  className="absolute inset-0"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, clipPath: "inset(0% 0% 0% 100%)" }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
                  }
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.65,
                    ease: easeOutExpo,
                  }}
                >
                  <StageMedia slide={slide} />
                </motion.div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                />
              </div>

              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[clamp(0.9rem,2.2vw,1.9rem)]"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.55,
                  ease: easeOutExpo,
                  delay: reduceMotion ? 0 : 0.08,
                }}
              >
                <h2
                  className="cinema-title whitespace-normal px-4 text-center font-condensed text-[clamp(3.2rem,17vw,6.5rem)] font-black uppercase leading-[0.92] tracking-[-0.012em] text-white md:whitespace-nowrap md:px-0 md:text-[clamp(6rem,13.5vw,17rem)]"
                  style={{
                    textShadow:
                      "0 4px 70px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.45)",
                  }}
                >
                  {slide.display}
                </h2>
                <p
                  className="max-w-full px-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/75 md:text-[13px]"
                  style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
                >
                  {slide.kicker}
                </p>
              </motion.div>
            </div>

            <motion.aside
              aria-label="Project details"
              className="pointer-events-auto relative z-20 -mt-14 w-[88vw] rounded-2xl border border-white/12 bg-black/55 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:absolute md:bottom-[12vh] md:right-[4.5vw] md:mt-0 md:w-[340px] md:p-6"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, x: 10 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }
              }
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.5,
                ease: easeOutExpo,
                delay: reduceMotion ? 0 : 0.16,
              }}
            >
              <div className="flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em]">
                <span className="text-white/55">
                  {position} / {positionTotal}
                </span>
                <span className="flex min-w-0 items-center gap-2 text-white/60">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: slide.accent }}
                  />
                  <span className="truncate">{slide.category}</span>
                </span>
              </div>
              {slide.kind !== "identity" && (
                <p className="mt-3.5 text-[15px] leading-relaxed text-white/85">
                  {slide.description}
                </p>
              )}
              <p className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-white/50">
                {slide.technologies.join(" · ")}
              </p>
              {slide.links.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  {slide.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                        style={{ textDecorationColor: `${slide.accent}99` }}
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-1 text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                        style={{ textDecorationColor: `${slide.accent}99` }}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </motion.aside>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 px-5 pt-5 md:px-10 md:pt-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">
          Arian Izadi{" "}
          <span className="hidden text-white/35 sm:inline">/ Systems Engineer</span>
        </p>
        <p className="flex items-center gap-2.5 text-right font-mono text-xs uppercase tracking-[0.28em] text-white/65">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden"
              style={{ backgroundColor: slide.accent }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: slide.accent }}
            />
          </span>
          <span className="hidden sm:inline">Konami — Embedded Software Engineer II</span>
          <span className="sm:hidden">Konami · Embedded SWE II</span>
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 bottom-7 z-30 hidden justify-between font-mono text-xs uppercase tracking-[0.28em] text-white/40 lg:flex"
      >
        <p>Selected Work — Reel 01</p>
        <p>Las Vegas, NV</p>
      </div>

      <nav
        aria-label="Reel controls"
        className="absolute inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <p
            aria-hidden
            className="flex h-11 min-w-[4.75rem] items-center justify-center gap-1.5 px-1 font-mono text-xs tracking-[0.18em] text-white/70"
          >
            <span className="text-white">{position}</span>
            <span className="text-white/35">/</span>
            <span>{positionTotal}</span>
          </p>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
          <span aria-hidden className="mx-1.5 h-6 w-px bg-white/15" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="flex h-11 items-center gap-2 rounded-full px-4 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <List aria-hidden className="h-4 w-4" />
            Index
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay onClose={closeMenu} onSelect={selectSlide} />
        )}
      </AnimatePresence>
    </section>
  );
}
