"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useCategory, Category, SearchableItem } from "@/contexts/CategoryContext";

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
  categories: Category[];
}

const ProjectCard = ({ project, index, isHighlighted, isFocused }: { project: Project; index: number; isHighlighted: boolean; isFocused: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [showAllTech, setShowAllTech] = useState(false);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";
  const highlightRing = isFocused 
    ? "ring-2 ring-emerald-500 border-emerald-500 bg-zinc-900/90 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-[1.02]" 
    : isHighlighted 
    ? "ring-1 ring-emerald-500/20 border-emerald-500/30 bg-zinc-900/80" 
    : "border-zinc-800/50 bg-zinc-900/40";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className={`group relative rounded-xl p-6 border transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="relative w-full h-44 mb-5 rounded-lg overflow-hidden bg-zinc-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-zinc-500 text-sm">{project.year}</span>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div
          className="flex flex-wrap gap-2 pt-2"
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-[10px] uppercase tracking-wider font-semibold rounded border border-zinc-700/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] text-zinc-500 flex items-center">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md transition-colors duration-200 text-sm border border-zinc-700/50 hover:border-zinc-600"
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
              className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-md transition-colors duration-200 text-sm border border-emerald-500/20 hover:border-emerald-500/40"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { selectedCategories, searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const projects: Project[] = [
    {
      id: 8,
      title: "RustOS: Bare-metal RISC-V Kernel",
      description: "A minimal, from-scratch operating system kernel for RISC-V, implementing bootloading, UART drivers, and memory management in Rust.",
      longDescription: "A deep dive into systems programming and OS development. This project implements a bootloader in RISC-V assembly, custom linker scripts for precise memory layout, and a UART driver for serial communication.",
      image: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
      technologies: ["Rust", "Assembly", "RISC-V", "QEMU", "Systems Programming", "Bare Metal"],
      githubUrl: "https://github.com/arianizadi/rustos",
      status: "In Progress",
      year: "2025",
      categories: ["systems"] as Category[],
    },
    {
      id: 10,
      title: "SEALCrypt",
      description: "Thread-safe C++17 wrapper library for Microsoft SEAL homomorphic encryption engine with automated CMake/GTest CI pipeline.",
      longDescription: "A modern C++ wrapper library that abstracts complex encryption context initialization for Microsoft SEAL.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYL_2VvThixV3iCXrp3qzMlb5eWt8BE-sag&s",
      technologies: ["C++17", "CMake", "Google Test", "Homomorphic Encryption", "GitHub Actions", "Thread Safety"],
      githubUrl: "https://github.com/arianizadi/sealcrypt",
      status: "Completed",
      year: "2024",
      categories: ["systems", "security"] as Category[],
    },
    {
      id: 3,
      title: "LiDAR 2D Room Mapping",
      description: "C++ application using Livox Mid-360 LiDAR sensor with PCL and OpenCV to create 2D maps of indoor environments with floor plane detection.",
      longDescription: "A real-time point cloud processing system that captures LiDAR data, detects and removes floor planes using RANSAC algorithm.",
      image: "https://github.com/arianizadi/PointClouds_LIVOX/raw/master/room_2d_map.png",
      technologies: ["C++", "PCL", "OpenCV", "CMake", "LiDAR"],
      githubUrl: "https://github.com/arianizadi/pointclouds_livox",
      status: "Completed",
      year: "2024",
      categories: ["systems", "robotics"] as Category[],
    },
    {
      id: 2,
      title: "T-REX: Rust WCET Analyzer",
      description: "Python tool for analyzing LLVM IR from Rust programs to estimate Worst-Case Execution Time (WCET) with call graph visualization.",
      longDescription: "Advanced static analysis tool that parses LLVM IR to estimate execution timing, build call graphs, and detect cycles.",
      image: "https://code.visualstudio.com/assets/docs/languages/rust/inlay-hints.png",
      technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
      githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
      status: "Completed",
      year: "2025",
      categories: ["systems"] as Category[],
    },
    {
      id: 6,
      title: "Reverse Engineering Tutorials",
      description: "Collection of reverse engineering tutorials covering crackme challenges, keygen development, and binary patching techniques.",
      longDescription: "Educational repository featuring step-by-step reverse engineering tutorials including CrackMe solutions with keygen development.",
      image: "https://blog.brakmic.com/wp-content/uploads/2016/08/scratch_code.png",
      technologies: ["C++", "Python", "Assembly", "Ghidra", "IDA Pro"],
      githubUrl: "https://github.com/arianizadi/ReverseEngineering",
      status: "Completed",
      year: "2021",
      categories: ["security", "systems"] as Category[],
    },
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
      categories: ["data", "robotics"] as Category[],
    },
    {
      id: 9,
      title: "Knowledge Mapper",
      description: "AI-powered knowledge assessments with personalized quizzes. Visual progress tracking via radar charts and instant AI-driven feedback.",
      longDescription: "A platform that enables users to evaluate their understanding through AI-generated dynamic assessments.",
      image: "https://cdn.sanity.io/images/7m9jw85w/production/e8afb8b2b1304f867e0becfc4d5ddbbd9dd94ec1-1784x1044.png?w=1784",
      technologies: ["Next.js", "TypeScript", "React", "AI/LLM", "Tailwind CSS"],
      liveUrl: "https://knowledge-mapper.vercel.app",
      status: "Completed",
      year: "2025",
      categories: ["data"] as Category[],
    },
    {
      id: 4,
      title: "Lazy Wordler",
      description: "Next.js app that scrapes the Wordle website to display current puzzle answers using server-side rendering.",
      longDescription: "A reverse-engineered Wordle solver that fetches answers from the NYT API.",
      image: "https://1000logos.net/wp-content/uploads/2023/05/Wordle-Emblem.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
      githubUrl: "https://github.com/arianizadi/lazy-wordler",
      liveUrl: "https://lazy-wordler.vercel.app",
      status: "Completed",
      year: "2024",
      categories: ["data"] as Category[],
    },
    {
      id: 5,
      title: "Proton Pass to Chrome Converter",
      description: "Python script that converts Proton Pass password exports to Chrome-compatible CSV format.",
      longDescription: "A simple utility for password manager migration.",
      image: "https://res.cloudinary.com/dbulfrlrz/images/w_1024,h_452,c_scale/f_auto,q_auto/v1720692280/wp-pme/Proton-Pass-logo_6738181c82/Proton-Pass-logo_6738181c82.jpg?_i=AA",
      technologies: ["Python", "JSON", "CSV"],
      githubUrl: "https://github.com/arianizadi/protonpasstochrome",
      status: "Completed",
      year: "2024",
      categories: ["security"] as Category[],
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
      categories: p.categories
    }));
    
    setSearchableItems(prev => {
      const otherTypes = prev.filter(item => item.type !== "project");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredProjects = projects.filter((project) => {
    const isAllSelected = selectedCategories.includes("all");
    const matchesCategory = 
      isAllSelected || 
      selectedCategories.some(cat => project.categories.includes(cat));
    
    if (!searchQuery) return matchesCategory;

    // Use fuzzy results for "likeness" matching
    const isFuzzyMatch = fuzzyResults.some(result => 
      result.item.type === "project" && result.item.id === project.id
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact = 
      project.title.toLowerCase().includes(searchLower) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
      project.description.toLowerCase().includes(searchLower);

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
                Featured Projects
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Research and development projects in systems, robotics, and security.
              </p>
            </div>
            <div className="bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm">
              <span className="text-emerald-400 font-medium">{filteredProjects.length}</span> projects showing
            </div>
          </div>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isVisible = filteredProjects.some(p => p.id === project.id);
              const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === project.id && fuzzyResults[currentMatchIndex]?.item.type === "project";
              
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  isHighlighted={isVisible}
                  isFocused={!!isFocused}
                />
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl"
          >
            <p className="text-zinc-500 text-lg">No projects match your current filters.</p>
            <p className="text-zinc-600 text-sm mt-2">Try adjusting your search or categories to find what you're looking for.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
