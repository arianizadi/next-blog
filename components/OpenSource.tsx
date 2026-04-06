"use client";

import React, { useRef, useEffect } from "react";
import { GitPullRequest, ExternalLink, Code, CheckCircle, Circle, AlertCircle, GitFork } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, Category, SearchableItem } from "@/contexts/CategoryContext";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

interface Contribution {
  id: number;
  project: string;
  feature: string;
  description: string;
  githubUrl: string;
  prUrl?: string;
  status: "merged" | "open" | "pending" | "forked";
  technologies?: string[];
  categories: Category[];
}

const StatusBadge = ({ status }: { status: "merged" | "open" | "pending" | "forked" }) => {
  const config = {
    merged: {
      icon: <CheckCircle size={14} />,
      text: "Merged",
      className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    open: {
      icon: <AlertCircle size={14} />,
      text: "Open",
      className: "text-foreground/70 bg-foreground/10 border-foreground/20",
    },
    pending: {
      icon: <Circle size={14} />,
      text: "Pending",
      className: "text-muted-foreground bg-muted border-border",
    },
    forked: {
      icon: <GitFork size={14} />,
      text: "Forked",
      className: "text-foreground/70 bg-foreground/10 border-foreground/20",
    },
  };

  const { icon, text, className } = config[status];

  return (
    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${className}`}>
      {icon}
      {text}
    </span>
  );
};

const ContributionCard = ({ contribution, index, isHighlighted, isFocused }: { contribution: Contribution; index: number; isHighlighted: boolean; isFocused: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";
  const highlightRing = isFocused
    ? "ring-2 ring-foreground/30 scale-[1.02]"
    : "";

  return (
    <div
      ref={cardRef}
      className={`card-surface group relative rounded-xl p-6 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest size={18} className="text-foreground/40" />
              <span className="text-foreground/40 text-sm font-medium">Open Source</span>
              <StatusBadge status={contribution.status} />
            </div>
            <h3 className="text-lg font-medium text-foreground font-display">
              {contribution.project}
            </h3>
          </div>
          <div className="flex gap-2">
            {contribution.prUrl && (
              <a
                href={contribution.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-md transition-colors duration-200 text-sm"
              >
                <GitPullRequest size={14} />
                <span className="hidden sm:inline">PR</span>
                <ExternalLink size={12} />
              </a>
            )}
            <a
              href={contribution.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-md transition-colors duration-200 text-sm"
            >
              <Code size={14} />
              <span className="hidden sm:inline">Repo</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-foreground font-medium text-sm group-hover:text-foreground/80 transition-colors">
            [{contribution.feature}]
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {contribution.description}
          </p>
        </div>

        {contribution.technologies && contribution.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {contribution.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-card text-muted-foreground text-[10px] uppercase tracking-wider font-semibold rounded border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const contributions: Contribution[] = [
  {
    id: 1,
    project: "Octomap",
    feature: "PCD File Reading",
    description: "Added PCD (Point Cloud Data) file reading support to the Octomap library",
    githubUrl: "https://github.com/OctoMap/octomap",
    prUrl: "https://github.com/OctoMap/octomap/pull/430",
    status: "merged",
    technologies: ["C++", "Point Cloud", "3D Mapping"],
    categories: ["systems", "robotics"] as Category[],
  },
  {
    id: 2,
    project: "CVAT",
    feature: "Z Layer Increment/Decrement",
    description: "Implemented Z layer increment/decrement functionality for annotation layers",
    githubUrl: "https://github.com/cvat-ai/cvat",
    prUrl: "https://github.com/cvat-ai/cvat/pull/9063",
    status: "merged",
    technologies: ["TypeScript", "React", "Annotation Tools"],
    categories: ["data", "robotics"] as Category[],
  },
  {
    id: 3,
    project: "CVAT",
    feature: "Point Cloud Slider",
    description: "Added point cloud slider UI component for navigation",
    githubUrl: "https://github.com/cvat-ai/cvat",
    prUrl: "https://github.com/cvat-ai/cvat/pull/9464",
    status: "open",
    technologies: ["TypeScript", "React", "UI/UX"],
    categories: ["data", "robotics"] as Category[],
  },
  {
    id: 4,
    project: "MMSegmentation",
    feature: "Railseg19 Transfer Learning",
    description: "Added Railseg19 dataset transfer learning support for railway track segmentation",
    githubUrl: "https://github.com/arianizadi/mmsegmentation",
    status: "forked",
    technologies: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
    categories: ["data", "robotics"] as Category[],
  },
];

const OpenSource = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { selectedCategories, searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  // Index contributions for global fuzzy search
  useEffect(() => {
    const items: SearchableItem[] = contributions.map(con => ({
      id: con.id,
      title: con.project,
      subtitle: con.feature,
      description: con.description,
      technologies: con.technologies,
      type: "opensource",
      categories: con.categories
    }));

    setSearchableItems(prev => {
      const otherTypes = prev.filter(item => item.type !== "opensource");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredContributions = contributions.filter((con) => {
    const isAllSelected = selectedCategories.includes("all");
    const matchesCategory =
      isAllSelected ||
      selectedCategories.some(cat => con.categories.includes(cat));

    if (!searchQuery) return matchesCategory;

    const isFuzzyMatch = fuzzyResults.some(result =>
      result.item.type === "opensource" && result.item.id === con.id
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      con.project.toLowerCase().includes(searchLower) ||
      con.feature.toLowerCase().includes(searchLower) ||
      con.description.toLowerCase().includes(searchLower) ||
      (con.technologies && con.technologies.some(tech => tech.toLowerCase().includes(searchLower)));

    return matchesCategory && (isFuzzyMatch || matchesExact);
  });

  return (
    <div ref={containerRef} className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12" {...headerMotion}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">04 / Open Source</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Open Source Contributions
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {contributions.map((contribution, index) => {
            const isVisible = filteredContributions.some(c => c.id === contribution.id);
            const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === contribution.id && fuzzyResults[currentMatchIndex]?.item.type === "opensource";

            return (
              <motion.div key={contribution.id} variants={staggerItem} className="min-w-0">
                <ContributionCard
                  contribution={contribution}
                  index={index}
                  isHighlighted={isVisible}
                  isFocused={!!isFocused}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredContributions.length === 0 && (
          <div className="py-12 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">No contributions match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenSource;
