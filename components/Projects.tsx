"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [showAllTech, setShowAllTech] = useState(false);

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
      className="group relative bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:bg-zinc-900/70"
    >

      {/* Project Image */}
      <div className="relative w-full h-44 mb-5 rounded-lg overflow-hidden bg-zinc-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            {project.title}
          </h3>
          <span className="text-zinc-500 text-sm">{project.year}</span>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div
          className="flex flex-wrap gap-2 pt-2 relative"
          onMouseEnter={() => setShowAllTech(true)}
          onMouseLeave={() => setShowAllTech(false)}
        >
          {(showAllTech ? project.technologies : project.technologies.slice(0, 4)).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded border border-zinc-700/50 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && !showAllTech && (
            <span
              className="px-2 py-1 bg-zinc-800/50 text-zinc-400 text-xs rounded border border-zinc-700/50 cursor-pointer hover:bg-zinc-700/50 hover:text-zinc-200 transition-colors duration-200"
              onClick={() => setShowAllTech(!showAllTech)}
              title="Click to show all technologies"
            >
              +{project.technologies.length - 4} more
            </span>
          )}
          {showAllTech && project.technologies.length > 4 && (
            <span
              className="px-2 py-1 bg-zinc-700/50 text-zinc-200 text-xs rounded border border-zinc-600/50 cursor-pointer hover:bg-zinc-600/50 transition-colors duration-200"
              onClick={() => setShowAllTech(false)}
              title="Click to show less"
            >
              show less
            </span>
          )}
        </div>

        {/* Action Buttons */}
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
              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-md transition-colors duration-200 text-sm border border-zinc-700/50 hover:border-zinc-600"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const projects: Project[] = [
    {
      id: 8,
      title: "RustOS: Bare-metal RISC-V Kernel",
      description: "A minimal, from-scratch operating system kernel for RISC-V, implementing bootloading, UART drivers, and memory management in Rust.",
      longDescription: "A deep dive into systems programming and OS development. This project implements a bootloader in RISC-V assembly, custom linker scripts for precise memory layout, and a UART driver for serial communication. It's designed to run on the QEMU 'virt' machine, serving as a foundation for exploring low-level hardware-software interfaces.",
      image: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
      technologies: ["Rust", "Assembly", "RISC-V", "QEMU", "Systems Programming", "Bare Metal"],
      githubUrl: "https://github.com/arianizadi/rustos",
      status: "In Progress",
      year: "2025"
    },
    {
      id: 1,
      title: "Railway Semantic Segmentation Research",
      description: "Research fork of MMSegmentation implementing semantic segmentation for railway infrastructure using RailSem19 and UNLV RTIS datasets.",
      longDescription: "Advanced computer vision research project focusing on semantic segmentation of railway environments. Implements custom models on the MMSegmentation framework to identify and classify railway infrastructure, tracks, signals, and surrounding elements using specialized railway datasets.",
      image: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
      technologies: ["Python", "PyTorch", "MMSegmentation", "Computer Vision", "Deep Learning"],
      githubUrl: "https://github.com/arianizadi/mmsegmentation",
      status: "In Progress",
      year: "2025"
    },
    {
      id: 2,
      title: "T-REX: Rust WCET Analyzer",
      description: "Python tool for analyzing LLVM IR from Rust programs to estimate Worst-Case Execution Time (WCET) with call graph visualization and cycle detection.",
      longDescription: "Advanced static analysis tool that parses LLVM Intermediate Representation generated from Rust code to estimate execution timing, build call graphs, detect cycles, and visualize program structure using heuristic instruction costs and graph analysis algorithms.",
      image: "https://code.visualstudio.com/assets/docs/languages/rust/inlay-hints.png",
      technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
      githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
      status: "Completed",
      year: "2025"
    },
    {
      id: 3,
      title: "Get Moving",
      description: "Fitness tracking web app that lets users track daily steps, set hourly walking goals, visualize progress, and celebrate completions with user auth and dashboard.",
      longDescription: "A comprehensive fitness tracking application built with Next.js, featuring user authentication, step tracking, goal setting, progress visualization with charts, and a complete dashboard for viewing history and statistics. Uses MongoDB with Prisma for data persistence and includes modern animations with Framer Motion.",
      image: "https://images.unsplash.com/photo-1489410342162-b4b300a0bb15?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2Fsa2luZyUyMHRvJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Prisma", "NextAuth.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://get-moving-three.vercel.app/",
      status: "Completed",
      year: "2025"
    },
    {
      id: 4,
      title: "LiDAR 2D Room Mapping",
      description: "C++ application using Livox Mid-360 LiDAR sensor with PCL and OpenCV to create 2D maps of indoor environments with floor plane detection.",
      longDescription: "A real-time point cloud processing system that captures LiDAR data, detects and removes floor planes using RANSAC algorithm, and generates 2D room maps with object outlines for indoor navigation.",
      image: "https://github.com/arianizadi/PointClouds_LIVOX/raw/master/room_2d_map.png",
      technologies: ["C++", "PCL", "OpenCV", "CMake", "LiDAR"],
      githubUrl: "https://github.com/arianizadi/pointclouds_livox",
      status: "Completed",
      year: "2024"
    },
    {
      id: 5,
      title: "Lazy Wordler",
      description: "Next.js app that scrapes the Wordle website to display current puzzle answers using server-side rendering to bypass CORS.",
      longDescription: "A reverse-engineered Wordle solver that fetches answers directly from the New York Times API by leveraging Next.js server-side rendering to bypass browser CORS restrictions.",
      image: "https://1000logos.net/wp-content/uploads/2023/05/Wordle-Emblem.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
      githubUrl: "https://github.com/arianizadi/lazy-wordler",
      liveUrl: "https://lazy-wordler.vercel.app",
      status: "Completed",
      year: "2024"
    },
    {
      id: 6,
      title: "Proton Pass to Chrome Converter",
      description: "Python script that converts Proton Pass password exports to Chrome-compatible CSV format for easy migration.",
      longDescription: "A simple utility that reads Proton Pass JSON exports and converts them to CSV format that can be directly imported into Google Chrome Password Manager.",
      image: "https://res.cloudinary.com/dbulfrlrz/images/w_1024,h_452,c_scale/f_auto,q_auto/v1720692280/wp-pme/Proton-Pass-logo_6738181c82/Proton-Pass-logo_6738181c82.jpg?_i=AA",
      technologies: ["Python", "JSON", "CSV"],
      githubUrl: "https://github.com/arianizadi/protonpasstochrome",
      status: "Completed",
      year: "2024"
    },
    {
      id: 7,
      title: "Reverse Engineering Tutorials",
      description: "Collection of reverse engineering tutorials covering crackme challenges, keygen development, and binary patching techniques.",
      longDescription: "Educational repository featuring step-by-step reverse engineering tutorials including CrackMe solutions with keygen development and binary patching using tools like Ghidra, IDA Pro, and custom C++ patchers.",
      image: "https://blog.brakmic.com/wp-content/uploads/2016/08/scratch_code.png",
      technologies: ["C++", "Python", "Assembly", "Ghidra", "IDA Pro"],
      githubUrl: "https://github.com/arianizadi/ReverseEngineering",
      status: "Completed",
      year: "2021"
    }
  ];

  return (
    <div ref={containerRef} className="py-24 bg-zinc-950 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Clean header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Things I&apos;ve Built
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            These are some projects I am working on for research or for fun.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;