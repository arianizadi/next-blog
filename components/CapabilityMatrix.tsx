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
          title="Technical Parameters"
          description="Embedded and low-level capabilities first, followed by the languages, tooling, and adjacent systems used in production and research."
        />

        <div className="grid border-2 border-border bg-border gap-px lg:grid-cols-2">
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
                "group relative bg-card p-6 md:p-10 transition-colors hover:bg-background overflow-hidden",
                group.id === "systems" && "lg:col-span-2 relative",
                group.id === "low-level" && "bg-background",
              )}
            >
              {group.id === "systems" && (
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none w-full h-full bg-signal-grid mix-blend-overlay" />
              )}

              <div className="flex items-center justify-between mb-8 border-b border-border pb-4 relative z-10">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                  {group.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                  {group.id.substring(0, 3)} {"//"} {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <p className="text-sm leading-relaxed text-muted-foreground font-mono tracking-tight">
                  {group.description}
                </p>

                <ul className="flex flex-wrap gap-2 content-start" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => {
                    const primary = PRIMARY_SYSTEM_LANGUAGES.has(skill);

                    return (
                      <li
                        key={skill}
                        className={cn(
                          "border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70",
                          primary &&
                            "border-phosphor bg-phosphor/10 font-bold text-phosphor tracking-[0.2em] px-4"
                        )}
                      >
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityMatrix;
