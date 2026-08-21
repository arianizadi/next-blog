"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { techGroups } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRIMARY_SYSTEM_LANGUAGES = new Set(["C/C++", "C", "C++"]);

const GROUP_TAGS: Record<string, string> = {
  systems: "SYS",
  "low-level": "HW",
  languages: "LNG",
  tooling: "TOOL",
  additional: "ADJ",
};

const CapabilityMatrix = () => {
  return (
    <section
      id="skills"
      className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
    >
      <div className="px-6 md:px-12">
        <SectionHeader
          index="03"
          label="Capability Index"
          title="Skills & systems"
          description="Embedded and low-level capabilities first, followed by the languages, tooling, and adjacent systems used in production and research."
        />

        <div className="border-t border-border">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: easeOutExpo,
              }}
              className={cn(
                "grid gap-5 border-b border-border py-8 lg:grid-cols-[300px_1fr] lg:gap-16 lg:py-9",
                group.id === "systems" &&
                  "border-l-2 border-l-accent pl-5 lg:pl-6"
              )}
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    {GROUP_TAGS[group.id] ?? group.id.toUpperCase()}
                  </span>
                  <h3 className="font-display text-2xl leading-tight text-foreground">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
                {group.id === "systems" && (
                  <p className="mt-3 inline-block border border-accent/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    Primary domain
                  </p>
                )}
              </div>

              <ul
                className="flex flex-wrap gap-x-5 gap-y-2.5 self-center"
                aria-label={`${group.title} skills`}
              >
                {group.skills.map((skill) => {
                  const primary = PRIMARY_SYSTEM_LANGUAGES.has(skill);

                  return (
                    <li
                      key={skill}
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.14em] after:ml-5 after:text-accent/40 after:content-['·'] last:after:content-none md:text-xs",
                        primary
                          ? "font-semibold text-accent after:text-accent/50"
                          : "text-foreground/60"
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
