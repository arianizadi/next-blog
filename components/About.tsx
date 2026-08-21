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
    <div className="lab-container">
      <SectionHeader
        index="05"
        label="Foundation"
        title="Education"
        description="Completing an M.S. in Computer Science at UNLV with graduate coursework in real-time and embedded systems and advanced operating systems."
      />

      <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
        {education.map((degree, index) => (
          <motion.article
            key={degree.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: easeOutExpo,
            }}
            className={cn(
              "bg-card p-6 md:p-9",
              index === 0 && "relative overflow-hidden"
            )}
          >
            {index === 0 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-signal"
              />
            )}
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-xs tracking-[0.16em] text-signal">
                {index === 0 ? "Graduate study" : "Undergraduate study"}
              </p>
              {degree.date && (
                <p className="font-mono text-xs text-muted-foreground">
                  {degree.date}
                </p>
              )}
            </div>

            <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {degree.degree}
            </h3>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              {degree.university}
            </p>
            {degree.gpa && (
              <p className="mt-4 font-mono text-xs tracking-[0.1em] text-signal">
                {degree.gpa}
              </p>
            )}

            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {degree.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-6 text-foreground/75"
                >
                  <span
                    aria-hidden
                    className="mt-[11px] h-px w-4 shrink-0 bg-signal/70"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground">
            Certification
          </p>
          <p className="mt-2 text-sm text-foreground/80">
            {certifications.join(" · ")}
          </p>
        </div>
        <Link
          href="/journey"
          className="group inline-flex items-center gap-3 text-[13px] tracking-tight text-signal"
        >
          <span
            aria-hidden
            className="h-px w-8 bg-signal transition-all group-hover:w-12"
          />
          Read the full journey
        </Link>
      </div>
    </div>
  </section>
);

export default About;
