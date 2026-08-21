"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const SPEC_CHIPS = ["C/C++", "Linux", "Real-Time Systems", "Robotics", "Networking"];

const PROFILE_ROWS: [string, string][] = [
  ["Role", "Embedded Software Eng. II"],
  ["Org", "Konami Gaming — R&D"],
  ["Base", "Las Vegas, NV"],
  ["Languages", "C · C++ · Rust · Python"],
  ["Domain", "Embedded · Real-time · Robotics"],
  ["Research", "Segmentation · Timing analysis"],
];

const REGISTRATION_MARKS = [
  "left-3 top-3",
  "right-3 top-3",
  "bottom-3 left-3",
  "bottom-3 right-3",
];

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.25]);

  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-background">
      {/* Graph-paper field, fading toward the edges */}
      <div
        aria-hidden
        className="paper-grid absolute inset-0 [-webkit-mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black,transparent)] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black,transparent)]"
      />
      {/* Registration marks */}
      {REGISTRATION_MARKS.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`absolute ${position} select-none font-mono text-xs leading-none text-foreground/25`}
        >
          +
        </span>
      ))}

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-6 pt-28 motion-reduce:[transform:none!important] motion-reduce:[opacity:1!important] sm:px-8 md:px-10 md:pt-32 lg:px-12"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            {/* Console prompt */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: easeOutExpo }}
              className="font-mono text-xs text-muted-foreground"
            >
              <span className="text-accent">arian@lab</span>:~${" "}
              <ScrambleText text="whoami --verbose" speed={34} />{" "}
              <span
                aria-hidden
                className="animate-caret inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent"
              />
            </motion.p>

            {/* Positioning entry */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: easeOutExpo }}
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent md:text-[11px]"
            >
              [ Nº 001 ] Systems Engineer · Researcher
            </motion.p>

            {/* The name, annotated in red ink */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.85, ease: easeOutExpo }}
              className="mt-3 font-display text-display-hero text-balance text-foreground"
            >
              Arian{" "}
              <span className="relative inline-block italic">
                Izadi
                <svg
                  aria-hidden
                  viewBox="0 0 600 16"
                  preserveAspectRatio="none"
                  fill="none"
                  className="animate-ink-draw absolute -bottom-1 left-0 h-3 w-full origin-left text-accent md:h-4"
                >
                  <path
                    d="M4 11 C 110 4, 240 14, 380 8 S 540 3, 596 10"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.75, ease: easeOutExpo }}
              className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 md:text-[11px] md:tracking-[0.26em]"
            >
              Embedded Software Engineer II
              <span className="mx-2 text-accent">—</span>
              Konami Gaming, Inc. R&amp;D
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.75, ease: easeOutExpo }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]"
            >
              {SPEC_CHIPS.map((chip, index) => (
                <span key={chip}>
                  {index > 0 && (
                    <span className="mx-2 text-accent/70" aria-hidden>
                      ·
                    </span>
                  )}
                  {chip}
                </span>
              ))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.75, ease: easeOutExpo }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 md:text-[10px]"
            >
              M.S. Computer Science, UNLV
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: easeOutExpo }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#experience"
                className="border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Experience
              </a>
              <a
                href="#work"
                className="border border-foreground/25 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/75 transition-colors hover:border-accent hover:text-accent"
              >
                Selected Work
              </a>
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60 underline decoration-foreground/25 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
              >
                Resume ↗
              </a>
            </motion.div>
          </div>

          {/* Instrument panel */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: easeOutExpo }}
            aria-label="System profile"
            className="relative hidden border border-panel-border bg-panel lg:block"
          >
            {["-top-2.5 -left-2.5", "-top-2.5 -right-2.5", "-bottom-2.5 -left-2.5", "-bottom-2.5 -right-2.5"].map(
              (position) => (
                <span
                  key={position}
                  aria-hidden
                  className={`absolute ${position} select-none font-mono text-xs leading-none text-foreground/30`}
                >
                  +
                </span>
              )
            )}
            <div className="flex items-center justify-between border-b border-panel-border px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-panel-foreground">
                System profile
              </p>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-accent">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 bg-panel-accent motion-safe:animate-pulse"
                />
                Active
              </span>
            </div>
            <dl className="px-5 py-2">
              {PROFILE_ROWS.map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-baseline gap-3 border-b border-panel-border/60 py-3 last:border-b-0"
                >
                  <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-muted">
                    {key}
                  </dt>
                  <span
                    aria-hidden
                    className="mb-1 flex-1 border-b border-dotted border-panel-border"
                  />
                  <dd className="shrink-0 text-right font-mono text-[11px] leading-5 text-panel-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-panel-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-panel-muted">
              Doc ref — AI / 26 · LV, NV
            </div>
          </motion.aside>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-14 flex items-center justify-between gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 transition-colors hover:text-accent"
          >
            Scroll — §01 Experience
            <span className="h-6 w-px overflow-hidden bg-foreground/15">
              <span className="animate-slide-down block h-2 w-px bg-accent" />
            </span>
          </a>
          <span className="hidden md:block">
            Las Vegas, NV — 36.17° N / 115.14° W
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
