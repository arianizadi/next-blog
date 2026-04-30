"use client";

import React, { useEffect, useRef } from "react";
import { Cpu, Database, Radar, ShieldCheck, SquareCode } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import { techGroups, type TechGroup } from "@/lib/portfolio";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

const icons: Record<string, React.ReactNode> = {
  systems: <Cpu size={18} />,
  backend: <Database size={18} />,
  perception: <Radar size={18} />,
  security: <ShieldCheck size={18} />,
  product: <SquareCode size={18} />,
};

const TechGroupCard = ({
  group,
  isHighlighted,
  focusedSkill,
}: {
  group: TechGroup;
  isHighlighted: boolean;
  focusedSkill?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedSkill && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusedSkill]);

  const opacityClass = isHighlighted
    ? "opacity-100"
    : "opacity-25 grayscale pointer-events-none";
  const highlightRing = focusedSkill ? "ring-2 ring-amber-300/35" : "";

  return (
    <div
      ref={cardRef}
      className={`card-surface rounded-lg p-5 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-md border border-border bg-amber-300/10 p-2 text-amber-200">
          {icons[group.id]}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {group.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {group.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => {
          const focused = focusedSkill === skill;

          return (
            <span
              key={skill}
              className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                focused
                  ? "border-amber-300/60 bg-amber-300/15 text-foreground"
                  : "border-border/80 bg-card text-muted-foreground"
              }`}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const CurrentTech = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } =
    useCategory();

  useEffect(() => {
    const items: SearchableItem[] = techGroups.flatMap((group) =>
      group.skills.map((skill) => ({
        id: `${group.id}:${skill}`,
        title: skill,
        subtitle: group.title,
        description: group.description,
        type: "tech" as const,
      }))
    );

    setSearchableItems((prev) => {
      const otherTypes = prev.filter((item) => item.type !== "tech");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const getSkillHighlightStatus = (group: TechGroup, skill: string) => {
    if (!searchQuery) return true;

    const skillId = `${group.id}:${skill}`;
    const isFuzzyMatch = fuzzyResults.some(
      (result) => result.item.type === "tech" && result.item.id === skillId
    );
    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      skill.toLowerCase().includes(searchLower) ||
      group.title.toLowerCase().includes(searchLower) ||
      group.description.toLowerCase().includes(searchLower);

    return isFuzzyMatch || matchesExact;
  };

  const getFocusedSkill = (group: TechGroup) => {
    if (!searchQuery) return undefined;

    const focusedItem = fuzzyResults[currentMatchIndex]?.item;
    if (!focusedItem || focusedItem.type !== "tech") return undefined;

    const prefix = `${group.id}:`;
    if (typeof focusedItem.id !== "string" || !focusedItem.id.startsWith(prefix)) {
      return undefined;
    }

    return focusedItem.id.slice(prefix.length);
  };

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="mb-12 max-w-3xl" {...headerMotion}>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            06 / Stack
          </p>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">
            Skills I use most.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            A tighter map of the tools I reach for across systems, backend,
            robotics perception, security, and product-facing work.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {techGroups.map((group) => {
            const hasMatchingSkill =
              !searchQuery ||
              group.skills.some((skill) => getSkillHighlightStatus(group, skill));

            return (
              <motion.div key={group.id} variants={staggerItem}>
                <TechGroupCard
                  group={group}
                  isHighlighted={hasMatchingSkill}
                  focusedSkill={getFocusedSkill(group)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentTech;
