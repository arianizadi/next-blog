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
          "border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60",
          isPrimaryTechnology(technology) &&
            "border-accent/50 bg-accent/8 font-semibold text-accent"
        )}
      >
        {technology}
      </li>
    ))}
  </ul>
);

const ExperienceBullets = ({ points }: { points: string[] }) => (
  <ol className="space-y-3">
    {points.map((point, index) => (
      <li key={point} className="flex gap-4">
        <span
          aria-hidden
          className="shrink-0 pt-px font-mono text-xs text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-sm leading-6 text-foreground/70">{point}</span>
      </li>
    ))}
  </ol>
);

const PreviousRoleRow = ({
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
        "grid gap-6 border-t border-border py-9 md:grid-cols-[150px_1fr] md:gap-10 lg:grid-cols-[170px_1fr_3rem]",
        index === previousExperiences.length - 1 && "border-b"
      )}
    >
      <p className="pt-1.5 font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-muted-foreground">
        {job.dates}
      </p>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
            {job.company}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {job.role}
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {job.summary}
        </p>
        <div className="mt-5">
          <ExperienceBullets points={job.bulletPoints} />
        </div>
        <TechnologyList technologies={job.technologies} className="mt-6" />
      </div>

      <p
        aria-hidden
        className={cn(
          "hidden pt-1.5 text-right font-mono text-[10px] tracking-[0.2em] text-foreground/35 lg:block",
          systemsRole && "text-accent/60"
        )}
      >
        0{index + 2}
      </p>
    </motion.article>
  );
};

const Experience = () => (
  <section
    id="experience"
    className="relative scroll-mt-16 py-24 md:py-32"
  >
    <div className="px-6 md:px-12">
      <SectionHeader
        index="01"
        label="Field Record"
        title="Experience"
        description="Production embedded C/C++ at Konami, preceded by robotics systems and event-driven backend engineering."
      />

      {/* Current engagement */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="relative overflow-hidden border border-border bg-card"
      >
        <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
        <div className="relative grid gap-10 p-6 pl-7 md:p-10 md:pl-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex -rotate-2 items-center border-2 border-accent/70 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                Current
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {currentExperience.dates}
              </span>
            </div>

            <h3 className="mt-7 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] text-foreground text-balance">
              {currentExperience.company}
            </h3>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-accent md:text-sm">
              {currentExperience.role}
              {currentExperience.location && (
                <span className="text-muted-foreground">
                  {" "}
                  — {currentExperience.location}
                </span>
              )}
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
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Engineering scope
            </p>
            <ExperienceBullets points={currentExperience.bulletPoints} />
          </div>
        </div>
      </motion.article>

      {/* Previous record */}
      <div className="mt-20">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
          § Previous record
        </p>
        <div className="mt-8">
          {previousExperiences.map((job, index) => (
            <PreviousRoleRow key={job.company} job={job} index={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
