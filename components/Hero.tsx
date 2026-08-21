"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const formatUtc = (date: Date) =>
  `${String(date.getUTCHours()).padStart(2, "0")}:${String(
    date.getUTCMinutes()
  ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;

const UtcClock = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const initial = requestAnimationFrame(() => setTime(formatUtc(new Date())));
    const id = window.setInterval(() => setTime(formatUtc(new Date())), 1000);
    return () => {
      cancelAnimationFrame(initial);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span className="tabular-nums">
      <span aria-hidden className="text-muted-foreground">
        UTC{" "}
      </span>
      <span className="sr-only">Coordinated Universal Time </span>
      {time ?? "--:--:--"}
    </span>
  );
};

const RegMark = ({ className }: { className?: string }) => (
  <span aria-hidden className={`pointer-events-none absolute h-4 w-4 ${className}`}>
    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
  </span>
);

const Hero = () => {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-background">
      <RegMark className="left-4 top-20 md:left-8 lg:left-12" />
      <RegMark className="right-4 top-20 md:right-8 lg:right-12" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="flex items-center justify-between px-5 pt-24 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:px-8 md:pt-28 lg:px-12"
      >
        <p>Systems Engineer &amp; Researcher</p>
        <p className="hidden sm:block">
          Las Vegas, NV — <UtcClock />
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col justify-center px-5 py-16 md:px-8 lg:px-12">
        <h1 className="font-display text-display-hero font-black uppercase text-foreground">
          <ScrambleText text="Arian" speed={34} />
          <br />
          <span className="inline-flex items-baseline">
            <ScrambleText text="Izadi" speed={34} />
            <span
              aria-hidden
              className="animate-caret ml-[0.08em] inline-block h-[0.62em] w-[0.09em] translate-y-[0.06em] bg-accent"
            />
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: easeOutExpo }}
          className="mt-8 h-px w-full origin-left bg-foreground/80 motion-reduce:[transform:none]"
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: easeOutExpo }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent-ink">
              Current
            </p>
            <p className="mt-3 font-display text-[clamp(1.35rem,3.4vw,2.6rem)] font-bold uppercase leading-tight tracking-tight text-foreground">
              Embedded Software Engineer II
              <span className="text-muted-foreground"> — Konami Gaming R&amp;D</span>
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-muted-foreground">
              C/C++ / Linux / Real-Time Systems / Robotics / Low-Level Software
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.75, ease: easeOutExpo }}
            className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-stretch"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-inverse-foreground active:translate-y-px"
            >
              Selected Work
            </a>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-border px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:border-foreground active:translate-y-px"
            >
              Resume ↗
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="relative flex items-center justify-between px-5 pb-6 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground md:px-8 lg:px-12"
      >
        <a
          href="#experience"
          className="group flex items-center gap-3 text-foreground/75 transition-colors hover:text-accent-ink"
        >
          Scroll
          <span aria-hidden className="block h-8 w-px overflow-hidden bg-border group-hover:bg-accent/40">
            <span className="animate-slide-down block h-3 w-px bg-accent-ink" />
          </span>
        </a>
        <p aria-hidden className="hidden md:block">
          Portfolio / 2026
        </p>
      </motion.div>

      <RegMark className="bottom-6 left-4 top-auto md:left-8 lg:left-12" />
      <RegMark className="bottom-6 right-4 top-auto md:right-8 lg:right-12" />
    </section>
  );
};

export default Hero;
