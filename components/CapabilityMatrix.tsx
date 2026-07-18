"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { techGroups } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const CapabilityMatrix = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="px-6 md:px-12">
        <SectionHeader
          index="04"
          label="Capability Matrix"
          title="Stack"
          description="The instruments on the panel — grouped by the problems they solve, not by resume keyword density."
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: easeOutExpo,
              }}
              className="group relative bg-card p-6 transition-colors hover:bg-background md:p-8"
            >
              <div className="mb-8 flex items-start justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-phosphor/80">
                  MOD_{String(index + 1).padStart(2, "0")}
                </p>
                <span className="h-1.5 w-1.5 bg-foreground/20 transition-colors group-hover:bg-phosphor" />
              </div>
              <h3 className="font-display text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>
              <p className="mt-6 font-mono text-[11px] leading-6 tracking-[0.08em] text-foreground/55">
                {group.skills.join("  ·  ")}
              </p>
            </motion.div>
          ))}

          {/* Filler cell: status readout */}
          <div className="hidden items-end justify-between bg-card p-8 xl:flex">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">
                SYS.STATUS
              </p>
              <p className="mt-3 font-display text-2xl font-black uppercase text-foreground">
                All modules
                <br />
                <span className="text-phosphor">operational</span>
              </p>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping bg-phosphor/50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-3 w-3 bg-phosphor" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilityMatrix;
