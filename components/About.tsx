"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { certifications, education } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DegreeBlock = ({
  degree,
  index,
}: {
  degree: (typeof education)[number];
  index: number;
}) => (
  <motion.article
    key={degree.degree}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{
      duration: 0.65,
      delay: index * 0.1,
      ease: easeOutExpo,
    }}
    className={cn(
      "relative flex flex-col border border-border bg-card p-6 md:p-9",
      index === 0 && "border-foreground"
    )}
  >
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-ink">
        {index === 0 ? "Graduate study" : "Undergraduate study"}
      </p>
      {degree.date && (
        <p className="font-mono text-xs uppercase tracking-[0.16em] tabular-nums text-muted-foreground">
          {degree.date}
        </p>
      )}
    </div>

    <h3 className="mt-7 font-display text-3xl font-black uppercase leading-none tracking-tight text-foreground md:text-4xl">
      {degree.degree}
    </h3>
    <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {degree.university}
    </p>
    {degree.gpa && (
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
        {degree.gpa}
      </p>
    )}

    <ul className="mt-8 space-y-2.5 border-t border-border pt-6">
      {degree.highlights.map((highlight) => (
        <li
          key={highlight}
          className="flex gap-3 text-sm leading-6 text-foreground/75"
        >
          <span aria-hidden className="shrink-0 pt-0.5 font-mono text-xs leading-5 text-accent-ink">
            +
          </span>
          {highlight}
        </li>
      ))}
    </ul>
  </motion.article>
);

const About = () => (
  <section
    id="education"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="px-5 md:px-8 lg:px-12">
      <SectionHeader
        index="05"
        label="Systems Foundation"
        title="Education"
        description="Graduate coursework in real-time and embedded systems and advanced operating systems, with railway track segmentation research."
      />

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {education.map((degree, index) => (
          <DegreeBlock key={degree.degree} degree={degree} index={index} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Certification
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-foreground/85">
            {certifications.join(" · ")}
          </p>
        </div>
        <Link
          href="/journey"
          className="group inline-flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent-ink"
        >
          <span
            aria-hidden
            className="h-px w-8 bg-accent-ink transition-all duration-300 group-hover:w-12"
          />
          View engineering journey
        </Link>
      </div>
    </div>
  </section>
);

export default About;
