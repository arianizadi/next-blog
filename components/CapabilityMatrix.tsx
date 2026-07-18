"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { techGroups } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const CapabilityMatrix = () => {
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: easeOutExpo,
              }}
              className="group relative bg-card p-6 transition-colors hover:bg-background md:p-8"
            >
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
        </div>
      </div>
    </section>
  );
};

export default CapabilityMatrix;
