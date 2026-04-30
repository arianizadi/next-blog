"use client";

import React, { useEffect, useRef } from "react";
import { Building2, Calendar, Check, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import { experiences, type ExperienceItem } from "@/lib/portfolio";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

const ExperienceCard = ({
  experience,
  isHighlighted,
  isFocused,
}: {
  experience: ExperienceItem;
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
  const highlightRing = isFocused ? "ring-2 ring-emerald-300/40" : "";

  return (
    <div
      ref={cardRef}
      className={`card-surface rounded-lg p-6 transition-all duration-500 sm:p-8 ${opacityClass} ${highlightRing}`}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-md border border-border bg-emerald-400/10 p-2 text-emerald-200">
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {experience.company}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground/72">
                {experience.role}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {experience.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-foreground/35" />
                {experience.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-foreground/35" />
              {experience.dates}
            </span>
          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {experience.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/80 bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-4">
          {experience.bulletPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground">
              <Check
                size={16}
                className="mt-1 shrink-0 text-emerald-300/70"
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } =
    useCategory();

  useEffect(() => {
    const items: SearchableItem[] = experiences.map((experience) => ({
      id: experience.company,
      title: experience.company,
      subtitle: experience.role,
      description: [
        experience.location,
        experience.summary,
        ...experience.bulletPoints,
      ]
        .filter(Boolean)
        .join(" "),
      technologies: experience.technologies,
      type: "experience",
    }));

    setSearchableItems((prev) => {
      const otherTypes = prev.filter((item) => item.type !== "experience");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredExperiences = experiences.filter((experience) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some(
      (result) =>
        result.item.type === "experience" &&
        result.item.id === experience.company
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      experience.company.toLowerCase().includes(searchLower) ||
      experience.role.toLowerCase().includes(searchLower) ||
      experience.location?.toLowerCase().includes(searchLower) ||
      experience.summary.toLowerCase().includes(searchLower) ||
      experience.technologies.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      ) ||
      experience.bulletPoints.some((point) =>
        point.toLowerCase().includes(searchLower)
      );

    return Boolean(isFuzzyMatch || matchesExact);
  });

  const visibleExperienceIds = new Set(
    filteredExperiences.map((experience) => experience.company)
  );

  return (
    <section id="experience" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="mb-12 max-w-3xl" {...headerMotion}>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            03 / Experience
          </p>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">
            Production work, summarized by outcomes.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            The through-line is reliability: services that process financial
            events, robotics systems that fail safely, and student platforms
            hardened through better data access patterns.
          </p>
        </motion.div>

        <motion.div
          className="relative space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="absolute bottom-6 left-3 top-6 hidden w-px bg-border md:block" />

          {experiences.map((experience) => {
            const isFocused = Boolean(
              searchQuery &&
                fuzzyResults[currentMatchIndex]?.item.id === experience.company &&
                fuzzyResults[currentMatchIndex]?.item.type === "experience"
            );

            return (
              <motion.div
                key={experience.company}
                variants={staggerItem}
                className="relative md:pl-10"
              >
                <div className="absolute left-1.5 top-8 hidden h-3 w-3 rounded-full border-4 border-background bg-foreground md:block" />
                <ExperienceCard
                  experience={experience}
                  isHighlighted={visibleExperienceIds.has(experience.company)}
                  isFocused={isFocused}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredExperiences.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-border py-12 text-center">
            <p className="text-muted-foreground">
              No experience items match your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
