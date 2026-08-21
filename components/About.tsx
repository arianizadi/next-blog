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
        description="Completing an M.S. in Computer Science at UNLV with graduate coursework in real-time and embedded systems and advanced operating systems."
      />

      <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
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
              "bg-card p-6 md:p-9",
              index === 0 && "relative overflow-hidden"
            )}
          >
            {index === 0 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-phosphor"
              />
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-phosphor/80">
                {index === 0 ? "Graduate study" : "Undergraduate study"}
              </p>
              {degree.date && (
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55">
                  {degree.date}
                </p>
              )}
            </div>

            <h3 className="mt-7 font-display text-3xl font-black uppercase leading-none tracking-tight text-foreground md:text-4xl">
              {degree.degree}
            </h3>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/55">
              {degree.university}
            </p>
            {degree.gpa && (
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-phosphor">
                {degree.gpa}
              </p>
            )}

            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {degree.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-6 text-foreground/70"
                >
                  <span aria-hidden className="font-mono text-phosphor">
                    +
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55">
            Certification
          </p>
          <p className="mt-2 text-sm text-foreground/75">
            {certifications.join(" · ")}
          </p>
        </div>
        <Link
          href="/journey"
          className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor"
        >
          <span className="h-px w-8 bg-phosphor transition-all group-hover:w-12" />
          View engineering journey
        </Link>
      </div>
    </div>
  </section>
);

export default About;
