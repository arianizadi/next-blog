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
      <div className="lab-container">
        <SectionHeader
          index="03"
          label="Instrumentation"
          title="Capabilities"
          description="Embedded and low-level work first, then the languages, tooling, and adjacent systems used in production and research."
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: easeOutExpo,
              }}
              className={cn(
                "group relative bg-card p-6 transition-colors hover:bg-background md:p-8",
                group.id === "systems" && "md:col-span-2 xl:col-span-2"
              )}
            >
              {group.id === "systems" && (
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-signal"
                />
              )}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {group.title}
                </h3>
              </div>
              <p className="mt-2.5 font-serif text-[15px] italic leading-6 text-muted-foreground">
                {group.description}
              </p>
              <ul
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5"
                aria-label={`${group.title} skills`}
              >
                {group.skills.map((skill) => {
                  const primary = PRIMARY_SYSTEM_LANGUAGES.has(skill);

                  return (
                    <li
                      key={skill}
                      className={cn(
                        "font-mono text-[11px] tracking-[0.06em] text-foreground/70",
                        primary &&
                          "border border-signal/50 bg-signal/8 px-2.5 py-0.5 font-semibold text-signal"
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
