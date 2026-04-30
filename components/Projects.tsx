"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import { projects, type Project } from "@/lib/portfolio";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

const projectSearchText = (project: Project) =>
  [project.eyebrow, project.problem, project.contribution, project.impact].join(
    " "
  );

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-2">
    {project.githubUrl && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/35 hover:text-foreground"
      >
        <Icons.Github className="h-3.5 w-3.5 fill-current" />
        Code
      </a>
    )}
    {project.liveUrl && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
      >
        <ExternalLink size={14} />
        Demo
      </a>
    )}
  </div>
);

const ProjectCard = ({
  project,
  isHighlighted,
  isFocused,
  priority = false,
}: {
  project: Project;
  isHighlighted: boolean;
  isFocused: boolean;
  priority?: boolean;
}) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted
    ? "opacity-100"
    : "opacity-25 grayscale pointer-events-none";
  const highlightRing = isFocused ? "ring-2 ring-cyan-300/40" : "";

  return (
    <article
      ref={cardRef}
      className={`card-surface group flex h-full flex-col overflow-hidden rounded-lg transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      {project.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted/20">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.55)_100%)]" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <header>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/60">
            {project.eyebrow}
          </p>
          <h3 className="font-display text-xl font-semibold leading-snug text-foreground">
            {project.title}
          </h3>
        </header>

        <dl className="grid gap-4 text-sm leading-6 text-muted-foreground">
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/44">
              Problem
            </dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/44">
              Contribution
            </dt>
            <dd>{project.contribution}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/44">
              Impact
            </dt>
            <dd>{project.impact}</dd>
          </div>
        </dl>

        <div className="mt-auto space-y-4 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border/80 bg-card px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
};

const ProjectRow = ({
  project,
  isHighlighted,
  isFocused,
}: {
  project: Project;
  isHighlighted: boolean;
  isFocused: boolean;
}) => {
  const rowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFocused && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted
    ? "opacity-100"
    : "opacity-25 grayscale pointer-events-none";
  const highlightRing = isFocused ? "ring-2 ring-cyan-300/40" : "";

  return (
    <article
      ref={rowRef}
      className={`card-surface rounded-lg p-5 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/40">
            {project.eyebrow}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {project.contribution} {project.impact}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/80 bg-card px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
};

const Projects = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } =
    useCategory();

  useEffect(() => {
    const items: SearchableItem[] = projects.map((project) => ({
      id: project.id,
      title: project.title,
      subtitle: project.eyebrow,
      description: projectSearchText(project),
      technologies: project.technologies,
      type: "project",
    }));

    setSearchableItems((prev) => {
      const otherTypes = prev.filter((item) => item.type !== "project");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some(
      (result) =>
        result.item.type === "project" && result.item.id === project.id
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      project.title.toLowerCase().includes(searchLower) ||
      project.eyebrow.toLowerCase().includes(searchLower) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      ) ||
      projectSearchText(project).toLowerCase().includes(searchLower);

    return isFuzzyMatch || matchesExact;
  });

  const featuredProjects = projects.filter((project) => project.featured);
  const secondaryProjects = projects.filter((project) => !project.featured);
  const visibleProjectIds = new Set(filteredProjects.map((project) => project.id));

  const isFocused = (project: Project) =>
    Boolean(
      searchQuery &&
        fuzzyResults[currentMatchIndex]?.item.id === project.id &&
        fuzzyResults[currentMatchIndex]?.item.type === "project"
    );

  return (
    <section id="projects" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="mb-12 max-w-3xl" {...headerMotion}>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            02 / Projects
          </p>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">
            Primary projects.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            A few projects that show the problem I was working on, what I
            built, and what changed. The smaller builds below fill in more of
            the systems, perception, security, and product work.
          </p>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  className="min-w-0"
                >
                  <ProjectCard
                    project={project}
                    isHighlighted={visibleProjectIds.has(project.id)}
                    isFocused={isFocused(project)}
                    priority={project.id === featuredProjects[0]?.id}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16">
              <motion.div
                className="mb-6 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between"
                {...revealMotionProps(reduceMotion)}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                    Additional projects
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-foreground">
                    More of the range.
                  </h3>
                </div>
                <a
                  href="https://github.com/arianizadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Full GitHub profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                className="grid gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {secondaryProjects.map((project) => (
                  <motion.div key={project.id} variants={staggerItem}>
                    <ProjectRow
                      project={project}
                      isHighlighted={visibleProjectIds.has(project.id)}
                      isFocused={isFocused(project)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No projects match your search.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
