"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GitPullRequest, ExternalLink, Code, CheckCircle, Circle, AlertCircle, GitFork } from "lucide-react";
import { useCategory, Category, SearchableItem } from "@/contexts/CategoryContext";

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
      className: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    },
    pending: {
      icon: <Circle size={14} />,
      text: "Pending",
      className: "text-zinc-400 bg-zinc-500/10 border-zinc-500/30",
    },
    forked: {
      icon: <GitFork size={14} />,
      text: "Forked",
      className: "text-blue-400 bg-blue-500/10 border-blue-500/30",
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
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";
  const highlightRing = isFocused 
    ? "ring-2 ring-emerald-500 border-emerald-500 bg-zinc-900/90 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-[1.02]" 
    : isHighlighted 
    ? "ring-1 ring-emerald-500/20 border-emerald-500/30 bg-zinc-900/80 shadow-[0_0_20px_rgba(16,185,129,0.05)]" 
    : "border-zinc-800/50 bg-zinc-900/40";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={`group relative rounded-xl p-6 border transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest size={18} className={isHighlighted ? "text-emerald-500" : "text-zinc-500"} />
              <span className={isHighlighted ? "text-emerald-500 text-sm font-medium" : "text-zinc-500 text-sm font-medium"}>Open Source</span>
              <StatusBadge status={contribution.status} />
            </div>
            <h3 className="text-lg font-medium text-white">
              {contribution.project}
            </h3>
          </div>
          <div className="flex gap-2">
            {contribution.prUrl && (
              <a
                href={contribution.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors duration-200 text-sm border border-zinc-700/50 hover:border-zinc-600"
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors duration-200 text-sm border border-zinc-700/50 hover:border-zinc-600"
            >
              <Code size={14} />
              <span className="hidden sm:inline">Repo</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white font-medium text-sm group-hover:text-emerald-400 transition-colors">
            [{contribution.feature}]
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {contribution.description}
          </p>
        </div>

        {contribution.technologies && contribution.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {contribution.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-[10px] uppercase tracking-wider font-semibold rounded border border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
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
    description: "Implemented Z-layer increment/decrement functionality for annotation layers",
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
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
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

    // Use fuzzy results for "likeness" matching
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
    <div ref={containerRef} className="py-24 bg-zinc-950 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Open Source Contributions
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Contributions to open source projects and libraries.
              </p>
            </div>
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className="bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm animate-in fade-in zoom-in duration-300">
                <span className="text-emerald-400 font-medium">{filteredContributions.length}</span> contributions
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributions.map((contribution, index) => {
            const isVisible = filteredContributions.some(c => c.id === contribution.id);
            const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === contribution.id && fuzzyResults[currentMatchIndex]?.item.type === "opensource";

            return (
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution} 
                index={index} 
                isHighlighted={isVisible}
                isFocused={!!isFocused}
              />
            );
          })}
        </div>

        {filteredContributions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center border border-dashed border-zinc-800 rounded-2xl"
          >
            <p className="text-zinc-500">No contributions match your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OpenSource;
