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
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "In Progress" | "Completed" | "Planning";
  year: string;
}

const statusColor: Record<string, string> = {
  "In Progress": "bg-foreground/50",
  Completed: "bg-emerald-500",
  Planning: "bg-foreground/20",
};

const ProjectCard = ({ project, index, isHighlighted, isFocused }: { project: Project; index: number; isHighlighted: boolean; isFocused: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";
  const highlightRing = isFocused
    ? "ring-2 ring-foreground/30 scale-[1.02]"
    : isHighlighted
    ? ""
    : "";

  return (
    <div
      ref={cardRef}
      className={`card-surface group relative rounded-xl p-6 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      {/* Project image */}
      <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3">
        {/* Title + status dot */}
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${statusColor[project.status] ?? "bg-muted-foreground"}`} />
          <h3 className="text-lg font-medium text-foreground group-hover:text-foreground transition-colors font-display">
            {project.title}
          </h3>
        </div>

        <div className="relative">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 group-hover:hidden group-focus-within:hidden">
            {project.description}
          </p>
          <p className="hidden text-pretty text-muted-foreground text-sm leading-relaxed group-hover:block group-focus-within:block">
            {project.longDescription}
          </p>
        </div>

        {/* Tech pills: overflow hidden until card hover (see title on +N more for touch / no hover) */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-card text-muted-foreground text-[10px] uppercase tracking-wider font-semibold rounded-full border border-border"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <>
              <span
                className="inline-flex items-center text-[10px] text-muted-foreground transition-opacity duration-200 group-hover:hidden"
                title={project.technologies.slice(4).join(", ")}
              >
                +{project.technologies.length - 4} more
              </span>
              {project.technologies.slice(4).map((tech) => (
                <span
                  key={tech}
                  className="hidden items-center px-2.5 py-1 bg-card text-muted-foreground text-[10px] uppercase tracking-wider font-semibold rounded-full border border-border group-hover:inline-flex"
                >
                  {tech}
                </span>
              ))}
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-md transition-colors duration-200 text-sm"
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
              className="flex items-center gap-2 px-3 py-2 bg-foreground text-background rounded-md transition-all duration-200 text-sm hover:bg-foreground/90"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const projects: Project[] = [
    {
      id: 1,
      title: "Railway Semantic Segmentation Research",
      description: "Research fork of MMSegmentation implementing semantic segmentation for railway infrastructure using RailSem19 and UNLV RTIS datasets.",
      longDescription: "Advanced computer vision research project focusing on semantic segmentation of railway environments.",
      image: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
      technologies: ["Python", "PyTorch", "MMSegmentation", "Computer Vision", "Deep Learning"],
      githubUrl: "https://github.com/arianizadi/mmsegmentation",
      status: "In Progress",
      year: "2025",
    },
    {
      id: 11,
      title: "Inference Checker",
      description: "Interactive web tool for comparing semantic segmentation model predictions on railway scenes with pixel level diff visualization and per class metrics.",
      longDescription: "A visualization and analysis tool for comparing semantic segmentation models on the RailSem19 dataset. Features single view, side by side comparison, and pixel level diff modes with real time hover tooltips, adjustable overlay opacity, and per class IoU/accuracy metrics.",
      image: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/inference.png",
      technologies: ["Next.js", "TypeScript", "React", "Canvas API", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://inference-checker.vercel.app",
      status: "Completed",
      year: "2025",
    },
    {
      id: 12,
      title: "Cal",
      description:
        "Open source alternative you can self install for free. No accounts or external APIs. Nutrition facts from labels use on device Vision OCR only; everything else stays local (SwiftData, HealthKit, widgets, watchOS).",
      longDescription:
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
      status: "In Progress",
      year: "2026",
    },
    {
      id: 8,
      title: "RustOS: Bare Metal RISC V Kernel",
      description: "A minimal, from scratch operating system kernel for RISC V, implementing bootloading, UART drivers, and memory management in Rust.",
      longDescription: "A deep dive into systems programming and OS development. This project implements a bootloader in RISC V assembly, custom linker scripts for precise memory layout, and a UART driver for serial communication.",
      image: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
      technologies: ["Rust", "Assembly", "RISC V", "QEMU", "Systems Programming", "Bare Metal"],
      githubUrl: "https://github.com/arianizadi/rustos",
      status: "In Progress",
      year: "2025",
    },
    {
      id: 10,
      title: "SEALCrypt",
      description: "Thread safe C++17 wrapper library for Microsoft SEAL homomorphic encryption engine with automated CMake and GTest CI pipeline.",
      longDescription: "A modern C++ wrapper library that abstracts complex encryption context initialization for Microsoft SEAL.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYL_2VvThixV3iCXrp3qzMlb5eWt8BE-sag&s",
      technologies: ["C++17", "CMake", "Google Test", "Homomorphic Encryption", "GitHub Actions", "Thread Safety"],
      githubUrl: "https://github.com/arianizadi/sealcrypt",
      status: "Completed",
      year: "2024",
    },
    {
      id: 3,
      title: "LiDAR 2D Room Mapping",
      description: "C++ application using Livox Mid 360 LiDAR sensor with PCL and OpenCV to create 2D maps of indoor environments with floor plane detection.",
      longDescription: "A real time point cloud processing system that captures LiDAR data, detects and removes floor planes using RANSAC algorithm.",
      image: "https://github.com/arianizadi/PointClouds_LIVOX/raw/master/room_2d_map.png",
      technologies: ["C++", "PCL", "OpenCV", "CMake", "LiDAR"],
      githubUrl: "https://github.com/arianizadi/pointclouds_livox",
      status: "Completed",
      year: "2024",
    },
    {
      id: 2,
      title: "T REX: Rust WCET Analyzer",
      description: "Python tool for analyzing LLVM IR from Rust programs to estimate Worst Case Execution Time (WCET) with call graph visualization.",
      longDescription: "Advanced static analysis tool that parses LLVM IR to estimate execution timing, build call graphs, and detect cycles.",
      image: "https://code.visualstudio.com/assets/docs/languages/rust/inlay-hints.png",
      technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
      githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
      status: "Completed",
      year: "2025",
    },
    {
      id: 6,
      title: "Reverse Engineering Tutorials",
      description: "Collection of reverse engineering tutorials covering crackme challenges, keygen development, and binary patching techniques.",
      longDescription: "Educational repository featuring step by step reverse engineering tutorials including CrackMe solutions with keygen development.",
      image: "https://blog.brakmic.com/wp-content/uploads/2016/08/scratch_code.png",
      technologies: ["C++", "Python", "Assembly", "Ghidra", "IDA Pro"],
      githubUrl: "https://github.com/arianizadi/ReverseEngineering",
      status: "Completed",
      year: "2021",
    },
    {
      id: 9,
      title: "Knowledge Mapper",
      description: "AI powered knowledge assessments with personalized quizzes. Visual progress tracking via radar charts and instant AI driven feedback.",
      longDescription: "A platform that enables users to evaluate their understanding through AI generated dynamic assessments.",
      image: "https://cdn.sanity.io/images/7m9jw85w/production/e8afb8b2b1304f867e0becfc4d5ddbbd9dd94ec1-1784x1044.png?w=1784",
      technologies: ["Next.js", "TypeScript", "React", "AI/LLM", "Tailwind CSS"],
      liveUrl: "https://knowledge-mapper.vercel.app",
      status: "Completed",
      year: "2025",
    },
    {
      id: 4,
      title: "Lazy Wordler",
      description: "Next.js app that scrapes the Wordle website to display current puzzle answers using server side rendering.",
      longDescription: "A reverse engineered Wordle solver that fetches answers from the NYT API.",
      image: "https://1000logos.net/wp-content/uploads/2023/05/Wordle-Emblem.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
      githubUrl: "https://github.com/arianizadi/lazy-wordler",
      liveUrl: "https://lazy-wordler.vercel.app",
      status: "Completed",
      year: "2024",
    },
    {
      id: 5,
      title: "Proton Pass to Chrome Converter",
      description: "Python script that converts Proton Pass password exports to Chrome compatible CSV format.",
      longDescription: "A simple utility for password manager migration.",
      image: "https://res.cloudinary.com/dbulfrlrz/images/w_1024,h_452,c_scale/f_auto,q_auto/v1720692280/wp-pme/Proton-Pass-logo_6738181c82/Proton-Pass-logo_6738181c82.jpg?_i=AA",
      technologies: ["Python", "JSON", "CSV"],
      githubUrl: "https://github.com/arianizadi/protonpasstochrome",
      status: "Completed",
      year: "2024",
    }
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
    <div ref={containerRef} className="py-20 bg-background">
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
            {projects.map((project, index) => {
              const isVisible = filteredProjects.some(p => p.id === project.id);
              const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === project.id && fuzzyResults[currentMatchIndex]?.item.type === "project";

              return (
                <motion.div key={project.id} variants={staggerItem} className="min-w-0">
                  <ProjectCard
                    project={project}
                    index={index}
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
