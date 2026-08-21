"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { contributions, type Contribution } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const STATUS_STYLE: Record<Contribution["status"], string> = {
  merged: "border-accent/60 bg-accent/10 text-accent",
  open: "border-foreground/30 bg-foreground/5 text-foreground/80",
  pending: "border-border bg-transparent text-muted-foreground",
  forked: "border-foreground/20 bg-transparent text-foreground/60",
};

const ContributionList = () => (
  <div className="border-t-2 border-foreground/80">
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
        className="group relative border-b border-border p-5 transition-colors last:border-b-0 hover:bg-foreground/3 md:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              {c.project}
            </p>
            <h3 className="mt-3 font-display text-xl leading-tight text-foreground wrap-anywhere transition-colors group-hover:text-accent md:text-2xl">
              + {c.feature}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {c.description}
            </p>
            {c.technologies && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                {c.technologies.join(" · ")}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span
              className={`border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${STATUS_STYLE[c.status]}`}
            >
              {c.status}
            </span>
            <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
              {c.prUrl && (
                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/55 transition-colors hover:text-accent"
                >
                  PR ↗
                </a>
              )}
              <a
                href={c.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/55 transition-colors hover:text-accent"
              >
                Repo ↗
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    ))}

    <div className="flex items-center justify-between p-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:p-7">
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent transition-colors hover:text-foreground"
      >
        Full history on GitHub ↗
      </a>
    </div>
  </div>
);

const MergeLog = ({ embedded = false }: { embedded?: boolean }) => {
  if (embedded) {
    return (
      <div className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
          § Upstream patches
        </p>
        <h3 className="mt-5 font-display text-3xl leading-none text-foreground md:text-5xl">
          Merge log
        </h3>
        <p className="mb-8 mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          C++ point-cloud mapping, mobile networking, and segmentation research
          contributions made within existing codebases.
        </p>
        <ContributionList />
      </div>
    );
  }

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="px-6 md:px-12">
        <SectionHeader
          index="04"
          label="Upstream Patches"
          title="Merge log"
          description="Code that had to fit existing systems: a point-cloud mapping library, a DNS-tunnel proxy stack, and a segmentation research framework."
        />
        <ContributionList />
      </div>
    </section>
  );
};

export default MergeLog;
