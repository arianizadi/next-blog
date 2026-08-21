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
  <ul
    className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}
    aria-label="Technologies"
  >
    {technologies.map((technology) => (
      <li
        key={technology}
        className={cn(
          "font-mono text-[10px] tracking-[0.08em] text-muted-foreground",
          isPrimaryTechnology(technology) && "text-signal"
        )}
      >
        {technology}
      </li>
    ))}
  </ul>
);

const ExperienceBullets = ({ points }: { points: string[] }) => (
  <ul className="space-y-3">
    {points.map((point) => (
      <li key={point} className="flex gap-3 text-sm leading-6 text-foreground/75">
        <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-signal/70" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const PreviousExperienceRow = ({
  job,
  index,
}: {
  job: ExperienceItem;
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: easeOutExpo }}
    className="grid gap-4 border-t border-border py-9 md:grid-cols-[11rem_1fr] md:gap-10 md:py-11"
  >
    <div>
      <p className="font-mono text-[11px] leading-5 text-muted-foreground">
        {job.dates}
      </p>
      {job.location && (
        <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
          {job.location}
        </p>
      )}
    </div>

    <div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {job.company}
      </h3>
      <p className="mt-1.5 text-sm font-medium text-signal">{job.role}</p>
      <p className="mt-4 max-w-2xl font-serif text-base italic leading-7 text-muted-foreground">
        {job.summary}
      </p>
      <div className="mt-5 max-w-2xl">
        <ExperienceBullets points={job.bulletPoints} />
      </div>
      <TechnologyList technologies={job.technologies} className="mt-6" />
    </div>
  </motion.article>
);

const Experience = () => (
  <section
    id="experience"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="lab-container">
      <SectionHeader
        index="01"
        label="Employment record"
        title="Experience"
        description="Production embedded C/C++ at Konami, preceded by robotics systems and event-driven backend engineering."
      />

      <motion.article
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="relative border border-border bg-card"
      >
        {/* Calibration edge */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-signal" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 md:px-10">
          <p className="font-mono text-[10px] tracking-[0.18em] text-signal">
            Current post
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            {currentExperience.dates}
            {currentExperience.location && (
              <span className="text-muted-foreground/60">
                {" "}
                · {currentExperience.location}
              </span>
            )}
          </p>
        </div>

        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h3 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.02] tracking-tight text-foreground">
              {currentExperience.company}
            </h3>
            <p className="mt-3 text-base font-medium text-signal">
              {currentExperience.role}
            </p>
            <p className="mt-5 max-w-xl font-serif text-lg italic leading-8 text-muted-foreground">
              {currentExperience.summary}
            </p>
            <TechnologyList
              technologies={currentExperience.technologies}
              className="mt-7"
            />
          </div>

          <div className="border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-1">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Scope
            </p>
            <ExperienceBullets points={currentExperience.bulletPoints} />
          </div>
        </div>
      </motion.article>

      <div className="mt-16 md:mt-20">
        <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          <span className="text-signal">01.1</span>
          <span className="mx-2 text-muted-foreground/60">/</span>
          Prior roles
        </p>
        <div>
          {previousExperiences.map((job, index) => (
            <PreviousExperienceRow key={job.company} job={job} index={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
