"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { certifications, education, experiences, techGroups } from "@/lib/portfolio";
import { roster } from "@/lib/reel";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const EMAIL = "izadi2000@gmail.com";
const ROSTER_ACCENT = "#e2b45a";

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        aria-hidden
        className="font-mono text-xs tracking-[0.2em]"
        style={{ color: ROSTER_ACCENT }}
      >
        {index}
      </span>
      <h2 className="font-condensed text-3xl font-black uppercase tracking-[-0.01em] text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export function MenuOverlay({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
    const focusFirst = requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(focusFirst);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Index — full site roster"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeOutExpo }}
      className="absolute inset-0 z-50 overflow-y-auto overscroll-contain bg-[#0a0a0d] text-white"
    >
      <div className="mx-auto min-h-full w-full max-w-5xl px-5 pb-24 md:px-10">
        <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0a0d]/90 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            Arian Izadi — Index / Roster
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close index"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.06 }}
        >
          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-10"
            aria-labelledby="roster-projects"
          >
            <div id="roster-projects">
              <SectionHeading index="01" title="Projects — Contact Sheet" />
            </div>
            <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
              {roster.map((entry, entryIndex) => {
                const num = String(entryIndex + 1).padStart(2, "0");
                const onReel = entry.reelIndex !== null;
                const label = onReel
                  ? `${entry.title} — view on stage`
                  : entry.title;
                return (
                  <motion.li key={entry.id} variants={itemVariants} transition={{ duration: 0.35, ease: easeOutExpo }}>
                    {onReel ? (
                      <button
                        type="button"
                        onClick={() => onSelect(entry.reelIndex as number)}
                        aria-label={label}
                        className="group flex w-full items-baseline gap-4 border-b border-white/10 py-3.5 text-left transition-colors hover:border-white/30"
                      >
                        <span aria-hidden className="w-8 shrink-0 font-mono text-xs text-white/35">
                          {num}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-condensed text-lg font-bold uppercase tracking-[-0.01em] text-white/85 transition-colors group-hover:text-white">
                            {entry.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-xs uppercase tracking-[0.14em] text-white/40">
                            {entry.eyebrow}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 font-mono text-xs text-white/30 transition-colors group-hover:text-white/70"
                        >
                          ▶
                        </span>
                      </button>
                    ) : (
                      <a
                        href={entry.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-baseline gap-4 border-b border-white/10 py-3.5 transition-colors hover:border-white/30"
                      >
                        <span aria-hidden className="w-8 shrink-0 font-mono text-xs text-white/35">
                          {num}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-condensed text-lg font-bold uppercase tracking-[-0.01em] text-white/85 transition-colors group-hover:text-white">
                            {entry.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-xs uppercase tracking-[0.14em] text-white/40">
                            {entry.eyebrow}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="h-3.5 w-3.5 shrink-0 self-center text-white/30 transition-colors group-hover:text-white/70"
                        />
                      </a>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-16"
            aria-labelledby="roster-experience"
          >
            <div id="roster-experience">
              <SectionHeading index="02" title="Experience — Credits" />
            </div>
            <ol className="mt-6">
              {experiences.map((experience) => (
                <motion.li
                  key={`${experience.company}-${experience.role}`}
                  variants={itemVariants}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[1fr_minmax(0,340px)] md:gap-10"
                >
                  <div>
                    <h3 className="font-condensed text-2xl font-black uppercase tracking-[-0.01em] text-white">
                      {experience.role}
                    </h3>
                    <p
                      className="mt-1.5 font-mono text-xs uppercase tracking-[0.18em]"
                      style={{ color: ROSTER_ACCENT }}
                    >
                      {experience.company}
                      {experience.location ? ` · ${experience.location}` : ""} ·{" "}
                      {experience.dates}
                    </p>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
                      {experience.summary}
                    </p>
                  </div>
                  <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-white/45 md:pt-1.5 md:text-right">
                    {experience.technologies.join(" · ")}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-16"
            aria-labelledby="roster-capabilities"
          >
            <div id="roster-capabilities">
              <SectionHeading index="03" title="Capabilities" />
            </div>
            <div className="mt-6 grid gap-x-12 md:grid-cols-2">
              {techGroups.map((group) => (
                <motion.div
                  key={group.id}
                  variants={itemVariants}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="border-b border-white/10 py-5"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                    {group.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">
                    {group.description}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/85">
                    {group.skills.join(" · ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-16"
            aria-labelledby="roster-research"
          >
            <div id="roster-research">
              <SectionHeading index="04" title="Research / Education" />
            </div>
            <ol className="mt-6 grid gap-x-12 md:grid-cols-2">
              {education.map((degree) => (
                <motion.li
                  key={degree.degree}
                  variants={itemVariants}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="border-b border-white/10 py-6"
                >
                  <h3 className="font-condensed text-xl font-bold uppercase tracking-[-0.01em] text-white">
                    {degree.degree}
                  </h3>
                  <p
                    className="mt-1 font-mono text-xs uppercase tracking-[0.18em]"
                    style={{ color: ROSTER_ACCENT }}
                  >
                    {degree.university}
                    {degree.gpa ? ` · ${degree.gpa}` : ""}
                    {degree.date ? ` · ${degree.date}` : ""}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {degree.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-[15px] text-white/70"
                      >
                        <span aria-hidden style={{ color: ROSTER_ACCENT }}>
                          —
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              Certification — {certifications.join(", ")}
            </p>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-16"
            aria-labelledby="roster-writing"
          >
            <div id="roster-writing">
              <SectionHeading index="05" title="Journey / Writing" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/journey"
                className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-4 transition-colors hover:border-white/30"
              >
                <span>
                  <span className="block font-condensed text-2xl font-black uppercase tracking-[-0.01em] text-white/85 group-hover:text-white">
                    Journey
                  </span>
                  <span className="mt-1 block text-[15px] text-white/60">
                    Lab-notebook timeline — from first C# manual to embedded work
                  </span>
                </span>
                <span aria-hidden className="shrink-0 font-mono text-white/35">
                  →
                </span>
              </Link>
              <Link
                href="/blog"
                className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-4 transition-colors hover:border-white/30"
              >
                <span>
                  <span className="block font-condensed text-2xl font-black uppercase tracking-[-0.01em] text-white/85 group-hover:text-white">
                    Blog
                  </span>
                  <span className="mt-1 block text-[15px] text-white/60">
                    Field notes — engineering, security, research
                  </span>
                </span>
                <span aria-hidden className="shrink-0 font-mono text-white/35">
                  →
                </span>
              </Link>
            </div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="mt-16"
            aria-labelledby="roster-contact"
          >
            <div id="roster-contact">
              <SectionHeading index="06" title="Contact" />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
              <a
                href={`mailto:${EMAIL}`}
                className="wrap-anywhere font-condensed text-[clamp(1.6rem,4vw,2.6rem)] font-black uppercase tracking-[-0.01em] text-white underline decoration-white/25 underline-offset-8 transition-colors hover:decoration-white"
                style={{ textDecorationColor: `${ROSTER_ACCENT}88` }}
              >
                {EMAIL}
              </a>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:justify-end md:self-end">
                <li>
                  <a
                    href={siteConfig.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    Resume
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    GitHub
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    LinkedIn
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    X
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.gitroll}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    GitRoll
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
            <p className="mt-16 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              © 2026 Arian Izadi — Las Vegas, NV
            </p>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
}
