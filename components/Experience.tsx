"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { experiences, type ExperienceItem } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
          "border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
          isPrimaryTechnology(technology) &&
            "border-accent bg-accent font-semibold text-inverse-foreground"
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
        className="flex gap-3 text-sm leading-6 text-foreground/75"
      >
        <span aria-hidden className="shrink-0 pt-0.5 font-mono text-xs leading-5 text-accent-ink">
          +
        </span>
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const PreviousRole = ({
  job,
  index,
}: {
  job: ExperienceItem;
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{
      duration: 0.65,
      delay: index * 0.08,
      ease: easeOutExpo,
    }}
    className="group relative border-b border-border py-8 first:border-t transition-colors hover:bg-card md:py-10"
  >
    <div className="grid gap-6 lg:grid-cols-[minmax(11rem,15rem)_1fr] lg:gap-12">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums text-muted-foreground">
          {String(index + 2).padStart(2, "0")} · {job.dates}
        </p>
        <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground md:text-2xl">
          {job.company}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {job.role}
          {job.location ? ` · ${job.location}` : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm leading-6 text-muted-foreground">{job.summary}</p>
          <TechnologyList technologies={job.technologies} className="mt-5" />
        </div>
        <ExperienceBullets points={job.bulletPoints} />
      </div>
    </div>
  </motion.article>
);

const Experience = () => {
  const currentExperience = experiences[0];
  const previousExperiences = experiences.slice(1);

  return (
    <section
      id="experience"
      className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
    >
      <div className="px-5 md:px-8 lg:px-12">
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
          className="relative overflow-hidden border border-foreground bg-inverse text-inverse-foreground"
        >
          <div className="grid gap-10 p-6 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-inverse-foreground">
                  <span aria-hidden className="h-1.5 w-1.5 bg-inverse-foreground" />
                  Current
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums text-inverse-muted">
                  {currentExperience.dates}
                </span>
              </div>

              <h3 className="mt-8 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight">
                {currentExperience.company}
              </h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-accent md:text-sm">
                {currentExperience.role}
                <span className="text-inverse-muted"> · {currentExperience.location}</span>
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-inverse-muted">
                {currentExperience.summary}
              </p>
            </div>

            <div className="border-t border-inverse-border pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-inverse-muted">
                Engineering scope
              </p>
              <ul className="space-y-2.5">
                {currentExperience.bulletPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6">
                    <span aria-hidden className="shrink-0 pt-0.5 font-mono text-xs leading-5 text-accent">
                      +
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                {currentExperience.technologies.map((technology) => (
                  <li
                    key={technology}
                    className={cn(
                      "border border-inverse-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-inverse-muted",
                      isPrimaryTechnology(technology) && "border-accent font-semibold text-accent"
                    )}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        <div className="mt-20">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-ink">
            Previous roles
          </p>
          <div>
            {previousExperiences.map((job, index) => (
              <PreviousRole key={job.company} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
