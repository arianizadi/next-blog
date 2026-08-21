"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { contributions, type Contribution } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const STATUS_STYLE: Record<Contribution["status"], string> = {
  merged: "text-signal border-signal/40 bg-signal/10",
  open: "text-foreground border-foreground/30 bg-foreground/5",
  pending: "text-muted-foreground border-border bg-transparent",
  forked: "text-foreground/70 border-foreground/20 bg-foreground/[0.03]",
};

const ContributionList = () => (
  <div className="border border-border">
    {contributions.map((c, index) => (
      <motion.article
        key={c.id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.55,
          delay: index * 0.07,
          ease: easeOutExpo,
        }}
        className="group relative border-b border-border p-5 last:border-b-0 hover:bg-foreground/[0.03] md:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] text-muted-foreground">
              {c.project}
            </p>
            <h3 className="mt-2.5 font-display text-xl font-bold leading-tight tracking-tight text-foreground wrap-anywhere transition-colors group-hover:text-signal md:text-2xl">
              {c.feature}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {c.description}
            </p>
            {c.technologies && (
              <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-muted-foreground/80">
                {c.technologies.join(" · ")}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span
              className={`border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${STATUS_STYLE[c.status]}`}
            >
              {c.status}
            </span>
            <div className="flex gap-4 text-[12px] tracking-tight">
              {c.prUrl && (
                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-signal"
                >
                  PR ↗
                </a>
              )}
              <a
                href={c.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-signal"
              >
                Repo ↗
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    ))}

    <div className="flex items-center justify-between border-t border-border p-5 text-[12px] tracking-tight md:p-7">
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-signal transition-colors hover:text-foreground"
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
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          <span className="text-signal">04.2</span>
          <span className="mx-2 text-muted-foreground/60">/</span>
          Open source
        </p>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Upstream contributions
        </h3>
        <p className="mb-8 mt-3 max-w-2xl font-serif text-base italic leading-7 text-muted-foreground md:text-lg">
          Code that had to fit existing systems: point-cloud mapping, mobile
          networking, and segmentation research.
        </p>
        <ContributionList />
      </div>
    );
  }

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="lab-container">
        <SectionHeader
          index="04"
          label="Open source"
          title="Upstream contributions"
          description="Code that had to fit existing systems: a point-cloud mapping library, a DNS-tunnel proxy stack, and a segmentation research framework."
        />
        <ContributionList />
      </div>
    </section>
  );
};

export default MergeLog;
