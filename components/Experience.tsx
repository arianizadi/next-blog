"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { experiences, type ExperienceItem } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const currentExperience = experiences[0];
const previousExperiences = experiences.slice(1);

const isPrimaryTechnology = (technology: string) =>
  technology === "C/C++" || technology === "C++";

const TechnologyList = ({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) => (
  <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Technologies">
    {technologies.map((technology) => (
      <li
        key={technology}
        className={cn(
          "border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60",
          isPrimaryTechnology(technology) &&
            "border-phosphor/50 bg-phosphor/8 font-semibold text-phosphor"
        )}
      >
        {technology}
      </li>
    ))}
  </ul>
);

const ExperienceBullets = ({ points }: { points: string[] }) => (
  <ul className="space-y-2.5">
    {points.map((point) => (
      <li
        key={point}
        className="flex gap-3 text-sm leading-6 text-foreground/70"
      >
        <span aria-hidden className="shrink-0 font-mono text-phosphor">
          +
        </span>
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const PreviousExperienceCard = ({
  job,
  index,
}: {
  job: ExperienceItem;
  index: number;
}) => {
  const systemsRole = job.technologies.some(isPrimaryTechnology);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: easeOutExpo,
      }}
      className={cn(
        "group flex h-full flex-col border-b border-border bg-card p-6 transition-all hover:bg-background md:p-8 md:border-r md:border-b-0",
        systemsRole && "border-t border-phosphor/20"
      )}
    >
      <div className="flex flex-col gap-1 mb-6 border-b border-border/50 pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
          {job.dates}
        </p>
        <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-foreground mt-2">
          {job.company}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor/80 mt-1">
          {job.role}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {job.summary}
      </p>
      <div className="mt-5">
        <ExperienceBullets points={job.bulletPoints} />
      </div>
      <TechnologyList technologies={job.technologies} className="mt-auto pt-8" />
    </motion.article>
  );
};

const Experience = () => (
  <section
    id="experience"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="px-6 md:px-12">
      <SectionHeader
        index="01"
        label="Current Role"
        title="Experience"
        description="Production embedded C/C++ at Konami, preceded by robotics systems and event-driven backend engineering."
      />

      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="relative overflow-hidden border-2 border-border bg-card"
      >
        <div className="relative grid p-6 md:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-0 lg:p-0">
          <div className="lg:border-r-2 lg:border-border lg:p-10 relative">
            <div className="absolute top-0 right-0 p-2 opacity-20 bg-signal-grid w-full h-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-phosphor px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor bg-phosphor/10">
                  <span aria-hidden className="h-1.5 w-1.5 bg-phosphor animate-signal-pulse" />
                  Active Node
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                  {currentExperience.dates}
                </span>
              </div>

              <h3 className="mt-8 font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
                {currentExperience.company}
              </h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-phosphor md:text-sm">
                {currentExperience.role}
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70 border-l border-border pl-4">
                {currentExperience.summary}
              </p>
              <TechnologyList
                technologies={currentExperience.technologies}
                className="mt-8"
              />
            </div>
          </div>

          <div className="border-t-2 border-border pt-7 lg:border-t-0 lg:p-10 bg-background/50">
            <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                System Scope & Parameters
              </p>
              <span className="font-mono text-[10px] text-phosphor">v2.0</span>
            </div>
            <ExperienceBullets points={currentExperience.bulletPoints} />
          </div>
        </div>
      </motion.article>

      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            Historical System Logs
          </p>
          <div className="h-px bg-border flex-1 ml-4" />
        </div>
        <div className="grid border-2 border-border bg-border gap-px lg:grid-cols-3">
          {previousExperiences.map((job, index) => (
            <PreviousExperienceCard
              key={job.company}
              job={job}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
