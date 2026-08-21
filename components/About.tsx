"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { certifications, education } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const About = () => (
  <section
    id="education"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="px-6 md:px-12">
      <SectionHeader
        index="05"
        label="Systems Foundation"
        title="Education"
        description="M.S. in Computer Science at UNLV with graduate coursework in real-time and embedded systems and advanced operating systems."
      />

      <div className="grid gap-0 border-2 border-border bg-background lg:grid-cols-2">
        {education.map((degree, index) => (
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
              "p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-border relative overflow-hidden",
              index === 1 && "lg:border-r-0"
            )}
          >
            <div className="absolute inset-0 bg-signal-grid opacity-[0.03] pointer-events-none" />

            {index === 0 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-phosphor"
              />
            )}

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                {index === 0 ? "Current Parameter: Grad" : "Archived: Undergrad"}
              </p>
              {degree.date && (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 bg-foreground/5 px-2 py-1">
                  {degree.date}
                </p>
              )}
            </div>

            <div className="relative z-10 pt-8 pb-6">
              <h3 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-foreground md:text-5xl">
                {degree.degree}
              </h3>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor bg-phosphor/10 inline-block px-2 py-1">
                {degree.university}
              </p>
              {degree.gpa && (
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70">
                  Metric: {degree.gpa}
                </p>
              )}
            </div>

            <ul className="relative z-10 mt-2 space-y-4 border-t border-border pt-6">
              {degree.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-4 text-sm leading-relaxed text-foreground/60"
                >
                  <span aria-hidden className="font-mono text-[10px] text-phosphor/50 mt-1">
                    [+]
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 border-2 border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8 relative">
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-phosphor/30 m-4" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 border-b border-border pb-2 inline-block">
            Verification Auth
          </p>
          <p className="mt-4 font-mono text-xs text-foreground/80 tracking-widest">
            {certifications.join(" · ")}
          </p>
        </div>
        <Link
          href="/journey"
          className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor bg-phosphor/5 px-4 py-2 border border-phosphor/20 hover:bg-phosphor/10 transition-colors"
        >
          <span className="h-px w-4 bg-phosphor transition-all group-hover:w-6" />
          View Journey Log
        </Link>
      </div>
    </div>
  </section>
);

export default About;
