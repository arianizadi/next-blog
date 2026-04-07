"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ project, isHighlighted, isFocused }: { project: Project; isHighlighted: boolean; isFocused: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";
  const highlightRing = isFocused ? "ring-2 ring-foreground/30 scale-[1.02]" : "";

  return (
    <article
      ref={cardRef}
      className={`card-surface group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border bg-muted/20">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-5 sm:p-6">
        <header>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground font-display">
            {project.title}
          </h3>
        </header>

        <div className="text-[13px] leading-[1.65] text-muted-foreground sm:text-sm sm:leading-relaxed">
          <p className="text-pretty">{project.description}</p>
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border/80 bg-card px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Github size={14} />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm text-background transition-colors hover:bg-foreground/90"
              >
                <ExternalLink size={14} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const projects: Project[] = [
    {
      id: 1,
      title: "Railway Semantic Segmentation Research",
      description:
        "Advanced computer vision research project focusing on semantic segmentation of railway environments.",
      image: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
      technologies: ["Python", "PyTorch", "MMSegmentation", "Computer Vision", "Deep Learning"],
      githubUrl: "https://github.com/arianizadi/mmsegmentation",
    },
    {
      id: 11,
      title: "Inference Checker",
      description:
        "A visualization and analysis tool for comparing semantic segmentation models on the RailSem19 dataset. Features single view, side by side comparison, and pixel level diff modes with real time hover tooltips, adjustable overlay opacity, and per class IoU/accuracy metrics.",
      image: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/inference.png",
      technologies: ["Next.js", "TypeScript", "React", "Canvas API", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://inference-checker.vercel.app",
    },
    {
      id: 12,
      title: "Cal",
      description:
        "Cal is a privacy first alternative to subscription nutrition apps: clone the repo, build in Xcode, and run it on your own devices at no cost. There are no backend services or third party nutrition APIs. Nutrition facts from packaging are read with Apple’s on device Vision OCR and parsing, so scanning never sends images or macros to the cloud.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
      technologies: [
        "Swift",
        "SwiftUI",
        "SwiftData",
        "Vision",
        "HealthKit",
        "watchOS",
        "WidgetKit",
      ],
      githubUrl: "https://github.com/arianizadi/opensource-cal",
    },
    {
      id: 8,
      title: "RustOS: Bare Metal RISC V Kernel",
      description:
        "A deep dive into systems programming and OS development. This project implements a bootloader in RISC V assembly, custom linker scripts for precise memory layout, and a UART driver for serial communication.",
      image: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
      technologies: ["Rust", "Assembly", "RISC V", "QEMU", "Systems Programming", "Bare Metal"],
      githubUrl: "https://github.com/arianizadi/rustos",
    },
    {
      id: 10,
      title: "SEALCrypt",
      description:
        "A modern C++ wrapper library that abstracts complex encryption context initialization for Microsoft SEAL.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYL_2VvThixV3iCXrp3qzMlb5eWt8BE-sag&s",
      technologies: ["C++17", "CMake", "Google Test", "Homomorphic Encryption", "GitHub Actions", "Thread Safety"],
      githubUrl: "https://github.com/arianizadi/sealcrypt",
    },
    {
      id: 3,
      title: "LiDAR 2D Room Mapping",
      description:
        "A real time point cloud processing system that captures LiDAR data, detects and removes floor planes using RANSAC algorithm.",
      image: "https://github.com/arianizadi/PointClouds_LIVOX/raw/master/room_2d_map.png",
      technologies: ["C++", "PCL", "OpenCV", "CMake", "LiDAR"],
      githubUrl: "https://github.com/arianizadi/pointclouds_livox",
    },
    {
      id: 2,
      title: "T REX: Rust WCET Analyzer",
      description:
        "Advanced static analysis tool that parses LLVM IR to estimate execution timing, build call graphs, and detect cycles.",
      image: "https://code.visualstudio.com/assets/docs/languages/rust/inlay-hints.png",
      technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
      githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
    },
    {
      id: 6,
      title: "Reverse Engineering Tutorials",
      description:
        "Educational repository featuring step by step reverse engineering tutorials including CrackMe solutions with keygen development.",
      image: "https://blog.brakmic.com/wp-content/uploads/2016/08/scratch_code.png",
      technologies: ["C++", "Python", "Assembly", "Ghidra", "IDA Pro"],
      githubUrl: "https://github.com/arianizadi/ReverseEngineering",
    },
    {
      id: 9,
      title: "Knowledge Mapper",
      description:
        "A platform that enables users to evaluate their understanding through AI generated dynamic assessments.",
      image: "https://cdn.sanity.io/images/7m9jw85w/production/e8afb8b2b1304f867e0becfc4d5ddbbd9dd94ec1-1784x1044.png?w=1784",
      technologies: ["Next.js", "TypeScript", "React", "AI/LLM", "Tailwind CSS"],
      liveUrl: "https://knowledge-mapper.vercel.app",
    },
    {
      id: 4,
      title: "Lazy Wordler",
      description: "A reverse engineered Wordle solver that fetches answers from the NYT API.",
      image: "https://1000logos.net/wp-content/uploads/2023/05/Wordle-Emblem.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
      githubUrl: "https://github.com/arianizadi/lazy-wordler",
      liveUrl: "https://lazy-wordler.vercel.app",
    },
    {
      id: 5,
      title: "Proton Pass to Chrome Converter",
      description: "A simple utility for password manager migration.",
      image: "https://res.cloudinary.com/dbulfrlrz/images/w_1024,h_452,c_scale/f_auto,q_auto/v1720692280/wp-pme/Proton-Pass-logo_6738181c82/Proton-Pass-logo_6738181c82.jpg?_i=AA",
      technologies: ["Python", "JSON", "CSV"],
      githubUrl: "https://github.com/arianizadi/protonpasstochrome",
    },
  ];

  // Index projects for global fuzzy search
  useEffect(() => {
    const items: SearchableItem[] = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      type: "project",
    }));

    setSearchableItems(prev => {
      const otherTypes = prev.filter(item => item.type !== "project");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some(
      (result) => result.item.type === "project" && result.item.id === project.id
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      project.title.toLowerCase().includes(searchLower) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchLower)) ||
      project.description.toLowerCase().includes(searchLower);

    return isFuzzyMatch || matchesExact;
  });

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12" {...headerMotion}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">02 / Projects</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {projects.map((project) => {
              const isVisible = filteredProjects.some(p => p.id === project.id);
              const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === project.id && fuzzyResults[currentMatchIndex]?.item.type === "project";

              return (
                <motion.div key={project.id} variants={staggerItem} className="min-w-0">
                  <ProjectCard
                    project={project}
                    isHighlighted={isVisible}
                    isFocused={!!isFocused}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="py-20 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground text-lg">No projects match your search.</p>
            <p className="text-muted-foreground/60 text-sm mt-2">Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
