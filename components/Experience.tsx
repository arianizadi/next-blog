"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Calendar, ChevronRight } from "lucide-react";
import { useCategory, Category, SearchableItem } from "@/contexts/CategoryContext";

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  technologies: string[];
  bulletPoints: string[];
  categories: Category[];
}

const ExperienceCard = ({ experience, index, isHighlighted, isFocused }: { experience: ExperienceItem; index: number; isHighlighted: boolean; isFocused: boolean }) => {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:bg-zinc-800/70 transition-colors duration-300">
              <Building2 size={18} className={isHighlighted ? "text-emerald-400" : "text-zinc-400"} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">{experience.company}</h3>
              <p className="text-zinc-400 text-sm">{experience.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Calendar size={14} />
            <span>{experience.dates}</span>
          </div>
        </div>

        <ul className="space-y-3">
          {experience.bulletPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
              <ChevronRight size={16} className="text-emerald-500/50 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-[10px] uppercase tracking-wider font-semibold rounded border border-zinc-700/50 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { selectedCategories, searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const experiences: ExperienceItem[] = [
    {
      company: "Credit One Bank",
      role: "Software Engineer",
      dates: "July 2025 — Present",
      technologies: ["Airflow", "HUE", "Python", "SQL", "Trino", "Snowflake"],
      bulletPoints: [
        "Distributed Data Infrastructure: Engineered automated ETL pipelines in Apache Airflow, implementing idempotent logic and retry strategies for availability to ensure 99.9% OLA for reliability in our enterprise data operations.",
        "Metadata & Lineage: Developed OpenMetadata lineage integrations, ensuring consistent data discovery and state tracking across a distributed Snowflake/Trino ecosystem.",
        "Engineering Standards: Developed a SQL Static Analysis (Linting) framework adopted by 80+ engineers, enforcing strict schema and performance standards to prevent production regressions in Snowflake and Trino."
      ],
      categories: ["data"] as Category[],
    },
    {
      company: "Koshee AI",
      role: "Embedded Systems & Robotics Intern",
      dates: "Jan 2024 – July 2025",
      technologies: ["CMake/CTest", "Lidar", "Networking", "Embedded/Multithreaded C++", "CI/CD", "GitHub Actions"],
      bulletPoints: [
        "Real-Time Safety: Architected a \"dead man's switch\" using UDP heartbeats, ensuring a <2 second hard real-time shutdown latency during network partitions.",
        "Performance Engineering: Created a scalable LiDAR perception pipeline (C++/PCL) to process 100k+ points/frame within strict timing and unified memory constraints.",
        "Build Systems: Engineered a CMake and GitHub Actions build system with distributed caching, slashing build times by 73% (15m to 4m) to accelerate deployment cycles and developer iteration."
      ],
      categories: ["systems", "robotics"] as Category[],
    },
    {
      company: "Code Central",
      role: "Lead Instructor & Full Stack Web Developer",
      dates: "May 2023 – Jan 2024",
      technologies: ["PHP", "MySQL", "HTML/CSS/JS", "Backend", "API Development", "Secure Programming"],
      bulletPoints: [
        "Security: Enhanced data protection for a Learning Management System (LMS) by designing security measures using PHP and MySQL, including patching over 100 SQL injection vulnerabilities.",
        "SSO Implementation: Implemented Single Sign-on solution allowing 200+ students to access material using school accounts on Clever, enabling expansion with Nevada schools."
      ],
      categories: ["security", "data"] as Category[],
    }
  ];

  // Index experience for global fuzzy search
  useEffect(() => {
    const items: SearchableItem[] = experiences.map(exp => ({
      id: exp.company,
      title: exp.company,
      subtitle: exp.role,
      description: exp.bulletPoints.join(" "),
      technologies: exp.technologies,
      type: "experience",
      categories: exp.categories
    }));
    
    setSearchableItems(prev => {
      const otherTypes = prev.filter(item => item.type !== "experience");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredExperiences = experiences.filter((exp) => {
    const isAllSelected = selectedCategories.includes("all");
    const matchesCategory = 
      isAllSelected || 
      selectedCategories.some(cat => exp.categories.includes(cat));
    
    if (!searchQuery) return matchesCategory;

    // Use fuzzy results for "likeness" matching
    const isFuzzyMatch = fuzzyResults.some(result => 
      result.item.type === "experience" && result.item.id === exp.company
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact = 
      exp.company.toLowerCase().includes(searchLower) ||
      exp.role.toLowerCase().includes(searchLower) ||
      exp.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
      exp.bulletPoints.some(point => point.toLowerCase().includes(searchLower));

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
                Experience
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                My professional journey in software engineering and systems development.
              </p>
            </div>
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className="bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm animate-in fade-in zoom-in duration-300">
                <span className="text-emerald-400 font-medium">{filteredExperiences.length}</span> matches found
              </div>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((experience, index) => {
            const isVisible = filteredExperiences.some(e => e.company === experience.company);
            const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === experience.company && fuzzyResults[currentMatchIndex]?.item.type === "experience";

            return (
              <ExperienceCard 
                key={experience.company} 
                experience={experience} 
                index={index} 
                isHighlighted={isVisible}
                isFocused={!!isFocused}
              />
            );
          })}
        </div>

        {filteredExperiences.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center border border-dashed border-zinc-800 rounded-2xl"
          >
            <p className="text-zinc-500">No experience items match your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Experience;
