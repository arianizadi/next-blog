"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  education,
  experiences,
  certifications,
} from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: easeOutExpo },
});

const About = () => {
  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="px-6 md:px-12">
        <SectionHeader
          index="02"
          label="Operator Profile"
          title="About"
          description="Backend engineer at a regulated bank by day; robotics perception researcher and low-level tinkerer by training. The common thread: systems that have to work, under constraints that don't negotiate."
        />

        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* Bio + education */}
          <motion.div {...fadeUp()}>
            <p className="max-w-xl text-base leading-8 text-foreground/70 md:text-lg">
              I&apos;m Arian — a software engineer in Las Vegas working on
              event-driven banking systems at Credit One Bank while finishing
              my M.S. in Computer Science at UNLV with a 4.0. Before banking,
              I built LiDAR perception pipelines and safety-critical shutdown
              systems for robots at Koshee AI, and represented the US at an
              international autonomous-vehicle competition in Romania.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-foreground/70 md:text-lg">
              My happy place is the layer where software meets physics:
              point clouds, packet tunnels, kernels, and the occasional CTF
              binary that refuses to cooperate.
            </p>

            <Link
              href="/journey"
              className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-phosphor"
            >
              <span className="h-px w-8 bg-phosphor transition-all group-hover:w-12" />
              View full boot log
            </Link>

            {/* Education block */}
            <div className="mt-14 space-y-px border border-border bg-border">
              {education.map((degree) => (
                <article key={degree.degree} className="bg-card p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                      {degree.degree}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                      {degree.date}
                      {degree.gpa && (
                        <span className="ml-3 text-phosphor">{degree.gpa}</span>
                      )}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                    {degree.university}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {degree.highlights.join(" · ")}
                  </p>
                </article>
              ))}
              <div className="bg-card p-5 md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/60">
                  Certifications
                </p>
                <p className="mt-2 text-sm text-foreground/75">
                  {certifications.join(" · ")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Employment log */}
          <motion.div id="experience" className="scroll-mt-24" {...fadeUp(0.12)}>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-phosphor/80">
              {"//"} Employment log
            </p>
            <div className="space-y-10 border-l border-border pl-6">
              {experiences.map((job) => (
                <article key={job.company} className="relative">
                  <span
                    aria-hidden
                    className="absolute left-[-27px] top-1.5 h-2.5 w-2.5 border border-phosphor bg-background"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60">
                    {job.dates}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                    {job.company}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor/80">
                    {job.role}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {job.summary}
                  </p>
                  <ul className="mt-3 max-w-md space-y-1.5">
                    {job.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-[13px] leading-6 text-foreground/65"
                      >
                        <span aria-hidden className="shrink-0 text-phosphor">
                          +
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
                    {job.technologies.join(" · ")}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
