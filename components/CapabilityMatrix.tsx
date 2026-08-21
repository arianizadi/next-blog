"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { techGroups } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRIMARY_SYSTEM_LANGUAGES = new Set(["C/C++", "C", "C++"]);

const CapabilityMatrix = () => {
  return (
    <section
      id="skills"
      className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
    >
      <div className="px-6 md:px-12">
        <SectionHeader
          index="03"
          label="Engineering Toolkit"
          title="Technical Skills"
          description="Embedded and low-level capabilities first, followed by the languages, tooling, and adjacent systems used in production and research."
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: easeOutExpo,
              }}
              className={cn(
                "group relative bg-card p-6 transition-colors hover:bg-background md:p-8",
                group.id === "systems" &&
                  "ring-1 ring-inset ring-terracotta/25 md:col-span-2 xl:col-span-2"
              )}
            >
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => {
                  const primary = PRIMARY_SYSTEM_LANGUAGES.has(skill);

                  return (
                    <li
                      key={skill}
                      className={cn(
                        "border border-border px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70",
                        primary &&
                          "border-terracotta/50 bg-terracotta/8 px-3 text-xs font-semibold text-terracotta"
                      )}
                    >
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityMatrix;
