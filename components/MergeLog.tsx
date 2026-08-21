"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { contributions, type Contribution } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const STATUS_STYLE: Record<Contribution["status"], string> = {
  merged: "text-phosphor border-phosphor/40 bg-phosphor/10",
  open: "text-foreground border-foreground/30 bg-foreground/5",
  pending: "text-foreground/50 border-border bg-transparent",
  forked: "text-foreground/70 border-foreground/20 bg-foreground/3",
};

const ContributionList = () => (
  <div className="border-2 border-border bg-background">
    {contributions.map((c, index) => (
      <motion.article
        key={c.id}
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: easeOutExpo,
        }}
        className="group relative border-b-2 border-border p-6 md:p-10 last:border-b-0 hover:bg-card transition-colors overflow-hidden"
      >
        <div className="absolute inset-0 bg-signal-grid opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 bg-foreground/5 px-2 py-1 inline-block border border-border/50">
              Target: {c.project}
            </p>
            <h3 className="mt-4 font-display text-2xl font-black uppercase leading-[1.1] tracking-tight text-foreground wrap-anywhere transition-colors group-hover:text-phosphor md:text-3xl">
              + {c.feature}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground font-mono tracking-tight">
              {c.description}
            </p>
            {c.technologies && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {c.technologies.join(" · ")}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
            <span
              className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_STYLE[c.status]}`}
            >
              STATE: {c.status}
            </span>
            <div className="flex gap-4 mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
              {c.prUrl && (
                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/50 transition-colors hover:text-phosphor"
                >
                  PR ↗
                </a>
              )}
              <a
                href={c.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 transition-colors hover:text-phosphor"
              >
                REPO ↗
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    ))}

    <div className="flex items-center justify-between p-6 md:p-10 bg-muted/50 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
      <span>END OF LOG</span>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-phosphor transition-colors hover:text-foreground"
      >
        FULL TRACE ↗
      </a>
    </div>
  </div>
);

const MergeLog = ({ embedded = false }: { embedded?: boolean }) => {
  if (embedded) {
    return (
      <div className="mt-24 border-t-2 border-border pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60 mb-6">
          Open-Source Trace
        </p>
        <h3 className="font-display text-4xl font-black uppercase leading-[1.1] tracking-tight text-foreground md:text-5xl mb-6">
          Merge Log
        </h3>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground font-mono tracking-tight border-l border-phosphor/30 pl-4">
          C++ point-cloud mapping, mobile networking, and segmentation research
          contributions made within existing codebases.
        </p>
        <ContributionList />
      </div>
    );
  }

  return (
    <section className="relative border-t-2 border-border py-24 md:py-32 bg-background">
      <div className="px-6 md:px-12">
        <SectionHeader
          index="04"
          label="Upstream Patches"
          title="Merge Log"
          description="Code that had to fit existing systems: a point-cloud mapping library, a DNS-tunnel proxy stack, and a segmentation research framework."
        />
        <ContributionList />
      </div>
    </section>
  );
};

export default MergeLog;
