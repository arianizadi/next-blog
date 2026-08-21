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
          "border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/60",
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
        "flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/25 md:p-7",
        systemsRole && "border-phosphor/25"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-foreground">
            {job.company}
          </h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-phosphor/85">
            {job.role}
          </p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55">
          {job.dates}
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        {job.summary}
      </p>
      <div className="mt-5">
        <ExperienceBullets points={job.bulletPoints} />
      </div>
      <TechnologyList technologies={job.technologies} className="mt-auto pt-6" />
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
        className="relative overflow-hidden border border-phosphor/35 bg-card"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--phosphor)/0.08),transparent_45%)]"
        />
        <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-phosphor/40 bg-phosphor/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-phosphor">
                <span aria-hidden className="h-1.5 w-1.5 bg-phosphor" />
                Current
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/55">
                {currentExperience.dates}
              </span>
            </div>

            <h3 className="mt-7 font-display text-[clamp(2.25rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
              {currentExperience.company}
            </h3>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-phosphor md:text-sm">
              {currentExperience.role}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
              {currentExperience.summary}
            </p>
            <TechnologyList
              technologies={currentExperience.technologies}
              className="mt-7"
            />
          </div>

          <div className="border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/55">
              Engineering scope
            </p>
            <ExperienceBullets points={currentExperience.bulletPoints} />
          </div>
        </div>
      </motion.article>

      <div className="mt-16">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-phosphor/80">
          {"//"} Previous experience
        </p>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
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
