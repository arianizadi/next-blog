"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Rise,
  SpreadLabel,
} from "@/components/monograph/motion";
import {
  TechnicalObject,
  type TechnicalObjectKind,
} from "@/components/monograph/TechnicalObject";
import { projects, type Project } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SlideMedia =
  | { type: "image"; src: string }
  | { type: "object"; kind: TechnicalObjectKind };

const GALLERY_IDS = [15, 16, 8, 2, 1, 10, 13];

const MEDIA_BY_ID: Record<number, SlideMedia> = {
  15: { type: "object", kind: "pointcloud" },
  16: { type: "object", kind: "heartbeat" },
  8: {
    type: "image",
    src: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
  },
  2: { type: "object", kind: "callgraph" },
  1: { type: "image", src: "https://www.wilddash.cc/static/images/lab3-rs19.jpg" },
  10: { type: "object", kind: "lattice" },
  13: { type: "object", kind: "tunnel" },
};

const slides: Project[] = GALLERY_IDS.map(
  (id) => projects.find((p) => p.id === id) as Project
);

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d={direction === "left" ? "M14.5 6 9 12l5.5 6" : "M9.5 6 15 12l-5.5 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlideMediaView({ media }: { media: SlideMedia }) {
  if (media.type === "image") {
    return (
      <Image
        src={media.src}
        alt=""
        fill
        sizes="(max-width: 768px) 92vw, 88vw"
        className="object-cover grayscale contrast-[1.04]"
      />
    );
  }
  return (
    <TechnicalObject kind={media.kind} idPrefix={`plate-${media.kind}`} />
  );
}

export function ProjectGallery() {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const active = slides[index];
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.min(count - 1, Math.max(0, next)));
    },
    [count]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => Math.min(count - 1, i + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    },
    [count]
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const endX = event.changedTouches[0]?.clientX;
      if (endX === undefined) return;
      const delta = endX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 48) return;
      setIndex((i) =>
        delta < 0
          ? Math.min(count - 1, i + 1)
          : Math.max(0, i - 1)
      );
    },
    [count]
  );

  const announcement = useMemo(
    () => `Slide ${index + 1} of ${count}: ${active.title}`,
    [index, count, active.title]
  );

  return (
    <section
      id="work"
      className="relative scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
    >
      {/* Legacy anchor alias */}
      <span id="projects" aria-hidden className="absolute -top-24" />

      <div className="mx-auto max-w-[1500px]">
        <SpreadLabel number="02" title="Selected work" />
        <Rise delay={0.05}>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            Robotics perception, a bare-metal kernel, timing analysis, and the
            systems around them — shown one at a time, at scale.
          </p>
        </Rise>

        <div
          ref={regionRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected work"
          onKeyDown={onKeyDown}
          className="mt-10 outline-none md:mt-14"
        >
          <div
            className="relative overflow-hidden rounded-[26px] md:rounded-[36px]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              transition={{
                duration: 0.75,
                ease: easeOutExpo,
              }}
              className="flex h-[56vh] min-h-[340px] md:h-[66vh] md:max-h-[720px] md:min-h-[480px]"
            >
              {slides.map((project, i) => {
                const isActiveSlide = i === index;
                return (
                  <div
                    key={project.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={!isActiveSlide}
                    inert={!isActiveSlide}
                    className="relative h-full w-full shrink-0 bg-surface"
                  >
                    <SlideMediaView media={MEDIA_BY_ID[project.id]} />
                    {/* Edge vignettes keep the plate photographic */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_55%,rgba(0,0,0,0.42)_100%)]"
                    />
                  </div>
                );
              })}
            </motion.div>

            {/* Understated edge arrows */}
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-foreground backdrop-blur-sm transition-colors hover:bg-black/70 disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none md:left-6"
            >
              <Chevron direction="left" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label="Next project"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-foreground backdrop-blur-sm transition-colors hover:bg-black/70 disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none md:right-6"
            >
              <Chevron direction="right" />
            </button>
          </div>

          {/* Index + counter */}
          <div className="mt-5 flex items-center justify-between gap-6">
            <ol className="flex flex-wrap gap-x-4 gap-y-1">
              {slides.map((project, i) => (
                <li key={project.id}>
                  <button
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${project.title}`}
                    aria-current={i === index}
                    className={cn(
                      "font-serif text-base italic tabular-nums transition-colors motion-reduce:transition-none md:text-lg",
                      i === index
                        ? "text-accent underline decoration-accent/50 underline-offset-4"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>
            <p aria-hidden className="font-serif text-base italic text-muted-foreground md:text-lg">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
          </div>

          <p role="status" aria-live="polite" className="sr-only">
            {announcement}
          </p>

          {/* Caption for the active plate */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: easeOutExpo }}
              className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[auto_1fr] md:gap-x-10"
            >
              <span
                aria-hidden
                className="font-serif text-3xl italic leading-none text-accent md:text-5xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
                  {active.eyebrow}
                </p>
                <h3 className="mt-3 text-title font-light text-foreground wrap-anywhere">
                  {active.title}
                </h3>

                <dl className="mt-6 space-y-3 text-[15px] leading-7 md:space-y-4 md:text-base">
                  <div className="grid gap-x-6 sm:grid-cols-[88px_1fr]">
                    <dt className="font-serif text-base italic text-muted-foreground">
                      Problem
                    </dt>
                    <dd className="text-foreground/85">{active.problem}</dd>
                  </div>
                  <div className="grid gap-x-6 sm:grid-cols-[88px_1fr]">
                    <dt className="font-serif text-base italic text-muted-foreground">
                      System
                    </dt>
                    <dd className="text-foreground/85">{active.contribution}</dd>
                  </div>
                  <div className="grid gap-x-6 sm:grid-cols-[88px_1fr]">
                    <dt className="font-serif text-base italic text-muted-foreground">
                      Result
                    </dt>
                    <dd className="text-foreground/85">{active.impact}</dd>
                  </div>
                </dl>

                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
                  {active.technologies.join(" · ")}
                </p>

                {(active.githubUrl || active.liveUrl) && (
                  <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-lg italic text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
                      >
                        Code ↗
                      </a>
                    )}
                    {active.liveUrl && (
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-lg italic text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** Full list of everything else built, kept as a typographic appendix. */
export function WorkAppendix() {
  const featuredIds = new Set(GALLERY_IDS);
  const archive = projects.filter((p) => !featuredIds.has(p.id));

  return (
    <section
      id="appendix"
      className="relative scroll-mt-24 px-5 pb-24 pt-4 md:px-10 md:pb-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <SpreadLabel number="03" title="Also built" className="mt-16 md:mt-24" />
        <ul className="mt-2">
          {archive.map((project) => {
            const primaryHref = project.githubUrl ?? project.liveUrl;
            const body = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-normal leading-snug text-foreground transition-colors group-hover:text-accent motion-reduce:transition-none md:text-2xl wrap-anywhere">
                    {project.title}
                  </span>
                  <span className="mt-1 block max-w-2xl text-sm leading-6 text-muted-foreground md:hidden">
                    {project.problem}
                  </span>
                </span>
                <span className="hidden shrink-0 text-right text-xs uppercase tracking-[0.16em] text-muted-foreground lg:block lg:max-w-[26rem]">
                  {project.eyebrow}
                </span>
                <span
                  aria-hidden
                  className="ml-2 shrink-0 font-serif text-xl text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none"
                >
                  ↗
                </span>
              </>
            );

            return (
              <li key={project.id} className="border-b border-border">
                {primaryHref ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-6 py-5 md:gap-10 md:py-6"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="group flex items-baseline gap-6 py-5 opacity-90 md:gap-10 md:py-6">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          The full record lives on{" "}
          <a
            href="https://github.com/arianizadi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
          >
            GitHub ↗
          </a>
          .
        </p>
      </div>
    </section>
  );
}
