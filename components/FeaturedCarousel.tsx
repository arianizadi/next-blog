"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const ProjectLinks = ({ project }: { project: Project }) => {
  const hasExternalLink = project.githubUrl || project.liveUrl;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em]">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
        >
          Code
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
        >
          Live
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      )}
      {!hasExternalLink && (
        <span className="text-muted-foreground">Professional work</span>
      )}
    </div>
  );
};

const SpecRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-[4.5rem_1fr] gap-x-3 border-t border-border pt-3">
    <span className="font-mono text-xs uppercase leading-5 tracking-[0.18em] text-muted-foreground">
      {label}
    </span>
    <div className="min-w-0 text-sm leading-6 text-foreground/80">{children}</div>
  </div>
);

const SchematicFrame = ({ project }: { project: Project }) => (
  <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-inverse">
    <div
      aria-hidden
      className="absolute inset-4 border border-inverse-border"
    />
    <div
      aria-hidden
      className="absolute inset-y-4 left-1/4 w-px bg-inverse-border"
    />
    <div
      aria-hidden
      className="absolute inset-y-4 right-1/4 w-px bg-inverse-border"
    />
    <div
      aria-hidden
      className="absolute inset-x-4 top-1/2 h-px bg-inverse-border"
    />
    <p className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.22em] text-inverse-muted">
      FIG.{String(project.id).padStart(2, "0")}
    </p>
    <p className="absolute bottom-6 left-6 max-w-[70%] font-mono text-xs uppercase leading-5 tracking-[0.14em] text-inverse-muted">
      {project.technologies.slice(0, 3).join(" / ")}
    </p>
    <span
      aria-hidden
      className="absolute bottom-5 right-5 h-2 w-2 bg-accent"
    />
  </div>
);

const Slide = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => (
  <li
    className="w-[86vw] max-w-[36rem] shrink-0 snap-start border border-border bg-card"
    aria-label={`${index + 1} of ${total}`}
  >
    <article className="flex h-full flex-col">
      <div className="relative min-h-56">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 640px) 86vw, 36rem"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="object-cover"
          />
        ) : (
          <SchematicFrame project={project} />
        )}
        <p className="absolute left-4 top-4 border bg-background px-2 py-1 font-mono text-xs uppercase tracking-[0.2em] text-foreground">
          {project.eyebrow}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
          <span
            aria-hidden
            className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <SpecRow label="Problem">{project.problem}</SpecRow>
          <SpecRow label="Built">{project.contribution}</SpecRow>
          <SpecRow label="Result">
            <span className="text-foreground">{project.impact}</span>
          </SpecRow>
        </div>

        <div className="mt-auto pt-6">
          <p className="mb-4 font-mono text-xs uppercase leading-5 tracking-[0.14em] text-muted-foreground">
            {project.technologies.join(" · ")}
          </p>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  </li>
);

const FeaturedCarousel = ({ projects }: { projects: Project[] }) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const children = Array.from(track.children) as HTMLElement[];
    const offset = track.scrollLeft;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - offset - parseFloat(getComputedStyle(track).paddingLeft || "0"));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
    setAtStart(offset <= 2);
    setAtEnd(offset >= track.scrollWidth - track.clientWidth - 2);
  }, []);

  const scrollToIndex = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, target));
      const child = track.children[clamped] as HTMLElement | undefined;
      if (!child) return;
      track.scrollTo({
        left: child.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || "0"),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [projects.length, reduceMotion]
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      <ul
        ref={trackRef}
        onScroll={sync}
        tabIndex={0}
        aria-label="Featured projects, scroll horizontally"
        className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:gap-5 md:px-8 lg:px-12"
      >
        {projects.map((project, i) => (
          <Slide
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
          />
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-6 px-5 md:px-8 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="text-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden> / </span>
          <span className="tabular-nums">
            {String(projects.length).padStart(2, "0")}
          </span>
          <span className="sr-only">
            slide {index + 1} of {projects.length}
          </span>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            disabled={atStart}
            aria-label="Previous project"
            className={cn(
              "flex h-10 w-10 items-center justify-center border font-mono text-sm transition-colors duration-200 active:translate-y-px",
              atStart
                ? "cursor-not-allowed border-border text-muted-foreground/40"
                : "border-foreground text-foreground hover:bg-foreground hover:text-background"
            )}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            disabled={atEnd}
            aria-label="Next project"
            className={cn(
              "flex h-10 w-10 items-center justify-center border font-mono text-sm transition-colors duration-200 active:translate-y-px",
              atEnd
                ? "cursor-not-allowed border-border text-muted-foreground/40"
                : "border-foreground text-foreground hover:bg-foreground hover:text-background"
            )}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="mt-5 px-5 md:px-8 lg:px-12" aria-hidden>
        <div className="relative h-px w-full bg-border">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-300 ease-out"
            style={{ width: `${((index + 1) / projects.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
