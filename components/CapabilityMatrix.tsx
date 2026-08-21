"use client";

import { Fragment } from "react";
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
      <div className="px-5 md:px-8 lg:px-12">
        <SectionHeader
          index="03"
          label="Engineering Toolkit"
          title="Capabilities"
          description="Embedded and low-level capabilities first, followed by the languages, tooling, and adjacent systems used in production and research."
        />

        <div className="border-t border-border">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: easeOutExpo,
              }}
              className={cn(
                "group grid gap-4 border-b border-border py-8 transition-colors hover:bg-card md:py-10 lg:grid-cols-[minmax(11rem,16rem)_1fr] lg:gap-12",
                group.id === "systems" && "bg-card"
              )}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
              </div>

              <ul
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-[0.06em] text-foreground/85"
                aria-label={`${group.title} skills`}
              >
                {group.skills.map((skill, skillIndex) => {
                  const primary = PRIMARY_SYSTEM_LANGUAGES.has(skill);

                  return (
                    <Fragment key={skill}>
                      {skillIndex > 0 && (
                        <li aria-hidden className="text-border">
                          /
                        </li>
                      )}
                      <li
                        className={cn(
                          "leading-6",
                          primary && "font-semibold text-accent-ink"
                        )}
                      >
                        {skill}
                      </li>
                    </Fragment>
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
