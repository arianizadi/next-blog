"use client";

import React, { useRef, useEffect } from "react";
import { Building2, Calendar, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCategory, SearchableItem } from "@/contexts/CategoryContext";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  technologies: string[];
  bulletPoints: string[];
}

const ExperienceCard = ({ experience, index, isHighlighted, isFocused }: { experience: ExperienceItem; index: number; isHighlighted: boolean; isFocused: boolean }) => {
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
      className={`card-surface group relative rounded-xl p-8 transition-all duration-500 ${opacityClass} ${highlightRing}`}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-foreground/5 rounded-lg border border-border group-hover:bg-foreground/10 transition-colors duration-300">
              <Building2 size={18} className="text-foreground/60" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground font-display">{experience.company}</h3>
              <p className="text-muted-foreground text-sm">{experience.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar size={14} />
            <span>{experience.dates}</span>
          </div>
        </div>

        <ul className="space-y-3">
          {experience.bulletPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <ChevronRight size={16} className="text-foreground/20 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-card text-muted-foreground text-[10px] uppercase tracking-wider font-semibold rounded border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);
  const { searchQuery, fuzzyResults, setSearchableItems, currentMatchIndex } = useCategory();

  const experiences: ExperienceItem[] = [
    {
      company: "Credit One Bank",
      role: "Software Engineer",
      dates: "July 2025 to Present",
      technologies: ["Airflow", "HUE", "Python", "SQL", "Trino", "Snowflake"],
      bulletPoints: [
        "Distributed Data Infrastructure: Engineered automated ETL pipelines in Apache Airflow, implementing idempotent logic and retry strategies for availability to ensure 99.9% OLA for reliability in our enterprise data operations.",
        "Metadata & Lineage: Developed OpenMetadata lineage integrations, ensuring consistent data discovery and state tracking across a distributed Snowflake/Trino ecosystem.",
        "Engineering Standards: Developed a SQL Static Analysis (Linting) framework adopted by 80+ engineers, enforcing strict schema and performance standards to prevent production regressions in Snowflake and Trino."
      ],
    },
    {
      company: "Koshee AI",
      role: "Embedded Systems & Robotics Intern",
      dates: "Jan 2024 to July 2025",
      technologies: ["CMake/CTest", "Lidar", "Networking", "Embedded C++", "CI/CD", "GitHub Actions"],
      bulletPoints: [
        "Real Time Safety: Architected a \"dead man's switch\" using UDP heartbeats, ensuring a <2 second hard real time shutdown latency during network partitions.",
        "Performance Engineering: Created a scalable LiDAR perception pipeline (C++/PCL) to process 100k+ points per frame within strict timing and unified memory constraints.",
        "Build Systems: Engineered a CMake and GitHub Actions build system with distributed caching, slashing build times by 73% (15m to 4m) to accelerate deployment cycles and developer iteration."
      ],
    },
    {
      company: "Code Central",
      role: "Lead Instructor & Full Stack Web Developer",
      dates: "May 2023 to Jan 2024",
      technologies: ["PHP", "MySQL", "HTML/CSS/JS", "Backend", "API Development", "Secure Programming"],
      bulletPoints: [
        "Security: Enhanced data protection for a Learning Management System (LMS) by designing security measures using PHP and MySQL, including patching over 100 SQL injection vulnerabilities.",
        "SSO Implementation: Implemented Single Sign On solution allowing 200+ students to access material using school accounts on Clever, enabling expansion with Nevada schools."
      ],
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
    }));

    setSearchableItems(prev => {
      const otherTypes = prev.filter(item => item.type !== "experience");
      return [...otherTypes, ...items];
    });
  }, [setSearchableItems]);

  const filteredExperiences = experiences.filter((exp) => {
    if (!searchQuery) return true;

    const isFuzzyMatch = fuzzyResults.some(
      (result) => result.item.type === "experience" && result.item.id === exp.company
    );

    const searchLower = searchQuery.toLowerCase();
    const matchesExact =
      exp.company.toLowerCase().includes(searchLower) ||
      exp.role.toLowerCase().includes(searchLower) ||
      exp.technologies.some((tech) => tech.toLowerCase().includes(searchLower)) ||
      exp.bulletPoints.some((point) => point.toLowerCase().includes(searchLower));

    return isFuzzyMatch || matchesExact;
  });

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12" {...headerMotion}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">03 / Experience</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Experience
          </h2>
        </motion.div>

        <motion.div
          className="relative space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Timeline connector line */}
          <div className="hidden md:block absolute left-3 top-6 bottom-6 w-px bg-border" />

          {experiences.map((experience, index) => {
            const isVisible = filteredExperiences.some(e => e.company === experience.company);
            const isFocused = searchQuery && fuzzyResults[currentMatchIndex]?.item.id === experience.company && fuzzyResults[currentMatchIndex]?.item.type === "experience";

            return (
              <motion.div
                key={experience.company}
                variants={staggerItem}
                className="relative md:pl-10"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1.5 top-8 w-3 h-3 rounded-full bg-foreground border-4 border-background" />
                <ExperienceCard
                  experience={experience}
                  index={index}
                  isHighlighted={isVisible}
                  isFocused={!!isFocused}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredExperiences.length === 0 && (
          <div className="py-12 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">No experience items match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
