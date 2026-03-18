"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCategory, Category, SearchableItem } from "@/contexts/CategoryContext";

interface Technology {
  icon: string;
  name: string;
  description: string;
  category: string;
  filterCategories: Category[];
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
  const focusRing = isFocused ? "ring-2 ring-emerald-500 border-emerald-500 bg-zinc-800/90 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-105 z-10" : "";
  
  return (
    <div 
      ref={cardRef}
      className={`bg-zinc-900 rounded-xl text-balance p-4 flex items-center gap-3 hover:bg-zinc-800 transition-all duration-300 ${opacityClass} ${highlightRing} ${focusRing}`}
    >
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10">
        <Image
          src={icon}
          alt={`${name} icon`}
          width={40}
          height={40}
          className="rounded-md"
        />
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{name}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const CurrentTech = () => {
  const { selectedCategories, searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const technologies: Technology[] = [
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cpp.webp",
      name: "C++",
      description: "Systems programming",
      category: "backend",
      filterCategories: ["systems", "robotics"] as Category[],
    },
    {
      icon: "https://doc.rust-lang.org/book/img/ferris/does_not_compile.svg",
      name: "Rust",
      description: "Systems programming",
      category: "backend",
      filterCategories: ["systems"] as Category[],
    },
    {
      icon: "https://www.gnu.org/software/gdb/images/archer.svg",
      name: "GDB",
      description: "Debugger",
      category: "backend",
      filterCategories: ["systems"] as Category[],
    },
    {
      icon: "https://img.icons8.com/color/96/assembly.png",
      name: "Assembly",
      description: "Low-level programming",
      category: "backend",
      filterCategories: ["systems", "security"] as Category[],
    },
    {
      icon: "https://llvm.org/img/LLVM-Logo-Derivative-1.png",
      name: "LLVM",
      description: "Compiler infrastructure",
      category: "backend",
      filterCategories: ["systems"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cmake.webp",
      name: "CMake",
      description: "Build system",
      category: "tools",
      filterCategories: ["systems"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
      name: "GitHub Actions",
      description: "CI/CD",
      category: "tools",
      filterCategories: ["systems", "data"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      name: "Docker",
      description: "Containerization",
      category: "tools",
      filterCategories: ["systems", "data"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      name: "Linux",
      description: "Operating system",
      category: "tools",
      filterCategories: ["systems", "security"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/ida.webp",
      name: "IDA Pro",
      description: "Disassembler",
      category: "security",
      filterCategories: ["security"] as Category[],
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Ghidra_logo.svg",
      name: "Ghidra",
      description: "Reverse engineering",
      category: "security",
      filterCategories: ["security"] as Category[],
    },
    {
      icon: "https://images.icon-icons.com/3053/PNG/512/burp_suite_macos_bigsur_icon_190319.png",
      name: "Burp Suite",
      description: "Web security testing",
      category: "security",
      filterCategories: ["security"] as Category[],
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Wireshark_icon_new.png/960px-Wireshark_icon_new.png",
      name: "Wireshark",
      description: "Network analyzer",
      category: "security",
      filterCategories: ["security"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      name: "Python",
      description: "Programming language",
      category: "data",
      filterCategories: ["data", "robotics"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      name: "PyTorch",
      description: "ML framework",
      category: "data",
      filterCategories: ["data", "robotics"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
      name: "TensorFlow",
      description: "ML framework",
      category: "data",
      filterCategories: ["data", "robotics"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg",
      name: "Airflow",
      description: "Workflow orchestration",
      category: "data",
      filterCategories: ["data"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      name: "SQL",
      description: "Query language",
      category: "data",
      filterCategories: ["data"] as Category[],
    },
    {
      icon: "https://logos-world.net/wp-content/uploads/2022/11/Snowflake-Symbol.png",
      name: "Snowflake",
      description: "Cloud data platform",
      category: "data",
      filterCategories: ["data"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      name: "AWS",
      description: "Cloud platform",
      category: "data",
      filterCategories: ["data", "systems"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
      name: "Google Cloud",
      description: "Cloud platform",
      category: "data",
      filterCategories: ["data"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/mongo.webp",
      name: "MongoDB",
      description: "Database",
      category: "data",
      filterCategories: ["data"] as Category[],
    },
    {
      icon: "https://pointclouds.org/assets/images/logo.png",
      name: "PCL",
      description: "Point Cloud Library",
      category: "data",
      filterCategories: ["robotics", "systems"] as Category[],
    },
    {
      icon: "https://www.livoxtech.com/dps/2d9e037e6d457ef7ffec037f7d16dcf8.png",
      name: "Livox Mid-360",
      description: "LiDAR sensor",
      category: "data",
      filterCategories: ["robotics", "systems"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      name: "OpenCV",
      description: "Computer vision",
      category: "data",
      filterCategories: ["robotics", "data"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/typescript.webp",
      name: "TypeScript",
      description: "Premium JS",
      category: "frontend",
      filterCategories: ["all"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/next-js.webp",
      name: "NextJS",
      description: "React framework",
      category: "frontend",
      filterCategories: ["all"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/tailwindcss.webp",
      name: "TailwindCSS",
      description: "CSS framework",
      category: "frontend",
      filterCategories: ["all"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
      name: "Framer Motion",
      description: "Animation library",
      category: "frontend",
      filterCategories: ["all"] as Category[],
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/git.webp",
      name: "Git",
      description: "Version control",
      category: "tools",
      filterCategories: ["systems", "data", "robotics", "security"] as Category[],
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
      name: "Conda",
      description: "Package manager",
      category: "tools",
      filterCategories: ["data", "systems"] as Category[],
    },
    {
      icon: "https://www.proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png",
      name: "Proxmox",
      description: "Virtualization platform",
      category: "tools",
      filterCategories: ["systems", "security"] as Category[],
    },
  ];

  // Index technologies for global fuzzy search
  useEffect(() => {
    const items: SearchableItem[] = technologies.map(tech => ({
      id: tech.name,
      title: tech.name,
      description: tech.description,
      subtitle: tech.category,
      type: "opensource", // Use opensource as catch-all or update interface
      categories: tech.filterCategories
    }));
    
    setSearchableItems(prev => {
      const filteredPrev = prev.filter(p => !items.some(item => item.id === p.id));
      return [...filteredPrev, ...items];
    });
  }, [setSearchableItems]);

  const categoryDisplayOrder = {
    backend: { name: "Systems", color: "from-green-500 to-emerald-500" },
    security: { name: "Security", color: "from-red-500 to-rose-500" },
    data: { name: "Data & Analytics", color: "from-purple-500 to-pink-500" },
    tools: { name: "Tools", color: "from-orange-500 to-red-500" },
    frontend: { name: "Frontend", color: "from-blue-500 to-cyan-500" },
  };

  const groupedTech = Object.keys(categoryDisplayOrder).reduce((acc, category) => {
    acc[category] = technologies.filter(tech => tech.category === category);
    return acc;
  }, {} as Record<string, Technology[]>);

  const getTechHighlightStatus = (tech: Technology) => {
    const isAllSelected = selectedCategories.includes("all");
    const matchesCategory = 
      isAllSelected || 
      selectedCategories.some(cat => tech.filterCategories.includes(cat));
    
    if (!searchQuery) return matchesCategory;

    // Use fuzzy results for "likeness" matching
    const isFuzzyMatch = fuzzyResults.some(result => result.item.id === tech.name);

    const searchLower = searchQuery.toLowerCase();
    const matchesExact = 
      tech.name.toLowerCase().includes(searchLower) ||
      tech.description.toLowerCase().includes(searchLower);

    return matchesCategory && (isFuzzyMatch || matchesExact);
  };

  const getCategoryHighlight = (categoryKey: string): { isHighlighted: boolean } => {
    const techsInCategory = groupedTech[categoryKey] || [];
    const hasMatchingTech = techsInCategory.some(getTechHighlightStatus);
    
    return {
      isHighlighted: hasMatchingTech || (selectedCategories.length === 0 && !searchQuery),
    };
  };

  return (
    <div className="py-20 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Current Technologies
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl">
            Tools and technologies I use most frequently, organized by domain.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(categoryDisplayOrder).map(([categoryKey, categoryConfig]) => {
            const techs = groupedTech[categoryKey] || [];
            const { isHighlighted: categoryHighlighted } = getCategoryHighlight(categoryKey);
            const categoryOpacity = categoryHighlighted ? "opacity-100" : "opacity-20 grayscale pointer-events-none";

            return (
              <div key={categoryKey} className={`space-y-4 ${categoryOpacity} transition-all duration-500`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-1 w-12 bg-gradient-to-r ${categoryConfig.color} rounded-full`} />
                  <h2 className="text-2xl font-semibold text-white">
                    {categoryConfig.name}
                  </h2>
                  <div className={`h-1 flex-1 bg-gradient-to-r ${categoryConfig.color} opacity-20 rounded-full`} />
                </div>

                <div className={`grid gap-4 ${
                  techs.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                  techs.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
                  techs.length <= 4 ? 'grid-cols-2 md:grid-cols-4' :
                  'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                }`}>
                  {techs.map((tech, index) => {
                    const isHighlighted = getTechHighlightStatus(tech);
                    const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === tech.name;
                    const highlightRing = isHighlighted && (selectedCategories.length > 0 || searchQuery)
                      ? "ring-1 ring-emerald-500/50 ring-offset-2 ring-offset-black rounded-xl bg-zinc-800/80" 
                      : "";

                    return (
                      <div key={tech.name}>
                        <TechnologyCard
                          icon={tech.icon}
                          name={tech.name}
                          description={tech.description}
                          isHighlighted={isHighlighted}
                          isFocused={!!isFocused}
                          highlightRing={highlightRing}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentTech;
