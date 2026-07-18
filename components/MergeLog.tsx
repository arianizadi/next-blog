"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { contributions, type Contribution } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const STATUS_STYLE: Record<Contribution["status"], string> = {
  merged: "text-phosphor border-phosphor/40 bg-phosphor/10",
  open: "text-foreground border-foreground/30 bg-foreground/5",
  pending: "text-foreground/50 border-border bg-transparent",
  forked: "text-foreground/70 border-foreground/20 bg-foreground/[0.03]",
};

const MergeLog = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="px-6 md:px-12">
        <SectionHeader
          index="03"
          label="Upstream Patches"
          title="Merge Log"
          description="Code that had to fit someone else's system: a point-cloud mapping library, a DNS-tunnel proxy stack, a segmentation research framework."
        />

        <div className="border border-border">
          {contributions.map((c, index) => (
            <motion.article
              key={c.id}
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: easeOutExpo,
              }}
              className="group relative border-b border-border p-5 last:border-b-0 hover:bg-foreground/[0.03] md:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-foreground/60">
                    <span className="mr-2 text-phosphor">*</span>
                    patch/{String(index + 1).padStart(3, "0")} →{" "}
                    <span className="text-foreground/80">{c.project}</span>
                  </p>
                  <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-phosphor md:text-2xl">
                    + {c.feature}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {c.description}
                  </p>
                  {c.technologies && (
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/55">
                      {c.technologies.join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span
                    className={`border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] ${STATUS_STYLE[c.status]}`}
                  >
                    {c.status}
                  </span>
                  <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                    {c.prUrl && (
                      <a
                        href={c.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/55 transition-colors hover:text-phosphor"
                      >
                        PR ↗
                      </a>
                    )}
                    <a
                      href={c.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/55 transition-colors hover:text-phosphor"
                    >
                      Repo ↗
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          <div className="flex items-center justify-between p-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 md:p-7">
            <span>End of log — more on GitHub</span>
            <a
              href="https://github.com/arianizadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-phosphor transition-colors hover:text-foreground"
            >
              git log --all ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MergeLog;
