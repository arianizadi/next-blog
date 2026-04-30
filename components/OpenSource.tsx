"use client";

import React, { useEffect, useRef } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Circle,
  Code,
  GitFork,
  GitPullRequest,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import { contributions, type Contribution } from "@/lib/portfolio";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

const StatusBadge = ({ status }: { status: Contribution["status"] }) => {
  const config = {
    merged: {
      icon: <CheckCircle size={14} />,
      text: "Merged",
      className: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    },
    open: {
      icon: <AlertCircle size={14} />,
      text: "Open",
      className: "text-cyan-200 bg-cyan-500/10 border-cyan-500/30",
    },
    pending: {
      icon: <Circle size={14} />,
      text: "Pending",
      className: "text-muted-foreground bg-muted border-border",
    },
    forked: {
      icon: <GitFork size={14} />,
      text: "Forked",
      className: "text-amber-200 bg-amber-500/10 border-amber-500/30",
    },
  };

  const { icon, text, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${className}`}
    >
      {icon}
      {text}
    </span>
  );
};

const ContributionCard = ({
  contribution,
  isHighlighted,
  isFocused,
}: {
  contribution: Contribution;
  isHighlighted: boolean;
  isFocused: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={cardRef}
      className={`card-surface rounded-lg p-6 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <GitPullRequest size={18} className="text-foreground/45" />
            <span className="text-sm font-medium text-foreground/50">
              Open Source
            </span>
            <StatusBadge status={contribution.status} />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {contribution.project}
          </h3>
          <p className="mt-1 text-sm font-medium text-foreground/70">
            {contribution.feature}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {contribution.prUrl && (
            <a
              href={contribution.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/35 hover:text-foreground"
              aria-label={`${contribution.project} pull request`}
            >
              <GitPullRequest size={15} />
            </a>
          )}
          <a
            href={contribution.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/35 hover:text-foreground"
            aria-label={`${contribution.project} repository`}
          >
            <Code size={15} />
          </a>
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {contribution.description}
      </p>

      {contribution.technologies && contribution.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {contribution.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/80 bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const OpenSource = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } =
    useCategory();

  useEffect(() => {
    const items: SearchableItem[] = contributions.map((contribution) => ({
      id: contribution.id,
      title: contribution.project,
      subtitle: contribution.feature,
      description: contribution.description,
      technologies: contribution.technologies,
      type: "opensource",
    }));

    setSearchableItems((prev) => {
      const otherTypes = prev.filter((item) => item.type !== "opensource");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredContributions = contributions.filter((contribution) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some(
      (result) =>
        result.item.type === "opensource" &&
        result.item.id === contribution.id
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      contribution.project.toLowerCase().includes(searchLower) ||
      contribution.feature.toLowerCase().includes(searchLower) ||
      contribution.description.toLowerCase().includes(searchLower) ||
      contribution.technologies?.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      );

    return Boolean(isFuzzyMatch || matchesExact);
  });

  const visibleContributionIds = new Set(
    filteredContributions.map((contribution) => contribution.id)
  );

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          {...headerMotion}
        >
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              05 / Open Source
            </p>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Open source contributions.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
              These are changes I contributed to existing robotics, annotation,
              and segmentation projects where the code had to fit the project
              around it.
            </p>
          </div>
          <a
            href="https://github.com/arianizadi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {contributions.map((contribution) => {
            const isFocused = Boolean(
              searchQuery &&
                fuzzyResults[currentMatchIndex]?.item.id === contribution.id &&
                fuzzyResults[currentMatchIndex]?.item.type === "opensource"
            );

            return (
              <motion.div
                key={contribution.id}
                variants={staggerItem}
                className="min-w-0"
              >
                <ContributionCard
                  contribution={contribution}
                  isHighlighted={visibleContributionIds.has(contribution.id)}
                  isFocused={isFocused}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredContributions.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-border py-12 text-center">
            <p className="text-muted-foreground">
              No contributions match your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenSource;
