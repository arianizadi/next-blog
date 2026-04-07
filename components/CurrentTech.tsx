"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

interface Technology {
  icon: string;
  name: string;
  description: string;
  category: string;
}

const TechnologyCard = ({
  icon,
  name,
  description,
  isHighlighted,
  isFocused,
  highlightRing,
}: {
  icon: string;
  name: string;
  description: string;
  isHighlighted: boolean;
  isFocused: boolean;
  highlightRing: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  const opacityClass = isHighlighted ? "opacity-100" : "opacity-50 grayscale";
  const focusRing = isFocused ? "ring-2 ring-foreground/30 scale-105 z-10" : "";

  return (
    <div
      ref={cardRef}
      className={`card-surface flex items-center gap-3 rounded-lg p-4 text-balance transition-all duration-300 ${opacityClass} ${highlightRing} ${focusRing}`}
    >
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={icon}
          alt={`${name} icon`}
          fill
          sizes="40px"
          className="object-contain rounded-md"
        />
      </div>
      <div>
        <h3 className="text-foreground font-medium mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

const CurrentTech = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const technologies: Technology[] = [
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cpp.webp",
      name: "C++",
      description: "Systems programming",
      category: "backend",
    },
    {
      icon: "https://doc.rust-lang.org/book/img/ferris/does_not_compile.svg",
      name: "Rust",
      description: "Systems programming",
      category: "backend",
    },
    {
      icon: "https://www.gnu.org/software/gdb/images/archer.svg",
      name: "GDB",
      description: "Debugger",
      category: "backend",
    },
    {
      icon: "https://img.icons8.com/color/96/assembly.png",
      name: "Assembly",
      description: "Low level programming",
      category: "backend",
    },
    {
      icon: "https://llvm.org/img/LLVM-Logo-Derivative-1.png",
      name: "LLVM",
      description: "Compiler infrastructure",
      category: "backend",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cmake.webp",
      name: "CMake",
      description: "Build system",
      category: "tools",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
      name: "GitHub Actions",
      description: "CI/CD",
      category: "tools",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      name: "Docker",
      description: "Containerization",
      category: "tools",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      name: "Linux",
      description: "Operating system",
      category: "tools",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/ida.webp",
      name: "IDA Pro",
      description: "Disassembler",
      category: "security",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Ghidra_logo.svg",
      name: "Ghidra",
      description: "Reverse engineering",
      category: "security",
    },
    {
      icon: "https://images.icon-icons.com/3053/PNG/512/burp_suite_macos_bigsur_icon_190319.png",
      name: "Burp Suite",
      description: "Web security testing",
      category: "security",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Wireshark_icon_new.png/960px-Wireshark_icon_new.png",
      name: "Wireshark",
      description: "Network analyzer",
      category: "security",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      name: "Python",
      description: "Programming language",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      name: "PyTorch",
      description: "ML framework",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
      name: "TensorFlow",
      description: "ML framework",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg",
      name: "Airflow",
      description: "Workflow orchestration",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      name: "SQL",
      description: "Query language",
      category: "data",
    },
    {
      icon: "https://logos-world.net/wp-content/uploads/2022/11/Snowflake-Symbol.png",
      name: "Snowflake",
      description: "Cloud data platform",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      name: "AWS",
      description: "Cloud platform",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
      name: "Google Cloud",
      description: "Cloud platform",
      category: "data",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/mongo.webp",
      name: "MongoDB",
      description: "Database",
      category: "data",
    },
    {
      icon: "https://pointclouds.org/assets/images/logo.png",
      name: "PCL",
      description: "Point Cloud Library",
      category: "data",
    },
    {
      icon: "https://www.livoxtech.com/dps/2d9e037e6d457ef7ffec037f7d16dcf8.png",
      name: "Livox Mid 360",
      description: "LiDAR sensor",
      category: "data",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      name: "OpenCV",
      description: "Computer vision",
      category: "data",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/typescript.webp",
      name: "TypeScript",
      description: "Premium JS",
      category: "frontend",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/next-js.webp",
      name: "NextJS",
      description: "React framework",
      category: "frontend",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/tailwindcss.webp",
      name: "TailwindCSS",
      description: "CSS framework",
      category: "frontend",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
      name: "Framer Motion",
      description: "Animation library",
      category: "frontend",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/git.webp",
      name: "Git",
      description: "Version control",
      category: "tools",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
      name: "Conda",
      description: "Package manager",
      category: "tools",
    },
    {
      icon: "https://www.proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png",
      name: "Proxmox",
      description: "Virtualization platform",
      category: "tools",
    },
  ];

  // Index technologies for global fuzzy search
  useEffect(() => {
    const items: SearchableItem[] = technologies.map((tech) => ({
      id: tech.name,
      title: tech.name,
      description: tech.description,
      subtitle: tech.category,
      type: "tech",
    }));

    setSearchableItems(prev => {
      const filteredPrev = prev.filter(p => !items.some(item => item.id === p.id));
      return [...filteredPrev, ...items];
    });
  }, [setSearchableItems]);

  const categoryDisplayOrder = {
    backend: { name: "Systems" },
    security: { name: "Security" },
    data: { name: "Data & Analytics" },
    tools: { name: "Tools" },
    frontend: { name: "Frontend" },
  };

  const groupedTech = Object.keys(categoryDisplayOrder).reduce((acc, category) => {
    acc[category] = technologies.filter(tech => tech.category === category);
    return acc;
  }, {} as Record<string, Technology[]>);

  const getTechHighlightStatus = (tech: Technology) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some((result) => result.item.id === tech.name);

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      tech.name.toLowerCase().includes(searchLower) ||
      tech.description.toLowerCase().includes(searchLower);

    return isFuzzyMatch || matchesExact;
  };

  const getCategoryHighlight = (categoryKey: string): { isHighlighted: boolean } => {
    const techsInCategory = groupedTech[categoryKey] || [];
    const hasMatchingTech = techsInCategory.some(getTechHighlightStatus);

    return {
      isHighlighted: hasMatchingTech || !searchQuery,
    };
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12" {...headerMotion}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">06 / Stack</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Current Technologies
          </h2>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(categoryDisplayOrder).map(([categoryKey, categoryConfig]) => {
            const techs = groupedTech[categoryKey] || [];
            const { isHighlighted: categoryHighlighted } = getCategoryHighlight(categoryKey);
            const categoryOpacity = categoryHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";

            return (
              <div key={categoryKey} className={`space-y-4 ${categoryOpacity} transition-all duration-500`}>
                <motion.div
                  className="mb-6 flex items-center gap-3"
                  {...revealMotionProps(reduceMotion)}
                >
                  <h2 className="text-2xl font-semibold text-foreground">
                    {categoryConfig.name}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </motion.div>

                <motion.div
                  className={`grid gap-4 ${
                  techs.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                  techs.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
                  techs.length <= 4 ? 'grid-cols-2 md:grid-cols-4' :
                  'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                }`}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  {techs.map((tech) => {
                    const isHighlighted = getTechHighlightStatus(tech);
                    const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === tech.name;
                    const highlightRing = isHighlighted && searchQuery ? "ring-1 ring-foreground/20" : "";

                    return (
                      <motion.div key={tech.name} variants={staggerItem} className="min-w-0">
                        <TechnologyCard
                          icon={tech.icon}
                          name={tech.name}
                          description={tech.description}
                          isHighlighted={isHighlighted}
                          isFocused={!!isFocused}
                          highlightRing={highlightRing}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentTech;
