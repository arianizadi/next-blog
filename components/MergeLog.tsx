"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { contributions, type Contribution } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<Contribution["status"], string> = {
  merged: "border-accent bg-accent text-inverse-foreground font-semibold",
  open: "border-foreground text-foreground",
  pending: "border-border text-muted-foreground",
  forked: "border-foreground/40 text-foreground/80",
};

const ContributionList = () => (
  <div className="border-t border-border">
    {contributions.map((c, index) => (
      <motion.article
        key={c.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: easeOutExpo,
        }}
        className="group relative border-b border-border py-6 transition-colors hover:bg-card md:py-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} · {c.project}
            </p>
            <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground wrap-anywhere transition-colors group-hover:text-accent-ink md:text-2xl">
              {c.feature}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {c.description}
            </p>
            {c.technologies && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                {c.technologies.join(" · ")}
              </p>
            )}
          </div>

          <div className={cn("flex shrink-0 items-center gap-4 md:flex-col md:items-end")}>
            <span
              className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_STYLE[c.status]}`}
            >
              {c.status}
            </span>
            <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
              {c.prUrl && (
                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
                >
                  PR ↗
                </a>
              )}
              <a
                href={c.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
              >
                Repo ↗
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    ))}

    <div className="py-5 font-mono text-[10px] uppercase tracking-[0.22em] md:py-6">
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-ink transition-colors hover:text-foreground"
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
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent-ink">
          Open-source contributions
        </p>
        <h3 className="mt-4 font-display text-3xl font-black uppercase leading-none tracking-tight text-foreground md:text-5xl">
          Merge Log
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
      <div className="px-5 md:px-8 lg:px-12">
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
