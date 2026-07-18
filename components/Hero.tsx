"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { impactMetrics } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";

const HERO_VIDEO_SRC =
  "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm";

/** Live telemetry ticker: drifting coordinates + velocity readouts. */
const Telemetry = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 480);
    return () => window.clearInterval(id);
  }, []);

  const wave = (seed: number, amp: number, base: number) =>
    (base + Math.sin(tick / 3 + seed) * amp).toFixed(4);

  return (
    <div className="space-y-1 font-mono text-[9px] leading-[1.7] tracking-[0.16em] text-foreground/60 md:text-[10px]">
      <p>
        LAT <span className="text-phosphor/80">36.1699° N</span> — LON{" "}
        <span className="text-phosphor/80">115.1398° W</span>
      </p>
      <p>
        VEL {wave(1, 0.9, 12.4)} M/S · YAW {wave(2, 2.4, 91.0)}° · FPS{" "}
        {23 + (tick % 2)}
      </p>
      <p className="text-foreground/45">FEED: CAM_01 // BOSCH AV TRIAL — ROMANIA</p>
    </div>
  );
};

/** Small scanning box that sweeps the frame once before lock-on. */
const SweepBox = ({ reduceMotion }: { reduceMotion: boolean | null }) => {
  if (reduceMotion) return null;
  return (
    <motion.div
      aria-hidden
      className="absolute top-1/4 h-40 w-56 border border-phosphor/50"
      initial={{ x: "110vw", opacity: 0 }}
      animate={{ x: "-60vw", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.1, delay: 0.7, ease: "linear" }}
    >
      <span className="absolute -top-5 left-0 font-mono text-[9px] tracking-[0.2em] text-phosphor/70">
        SCANNING…
      </span>
    </motion.div>
  );
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.2]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Feed */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60 motion-reduce:hidden"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/webm" />
      </video>
      <div className="absolute inset-0 hidden bg-background motion-reduce:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,10,0.5)_0%,rgba(4,7,10,0.35)_40%,#04070a_96%)]" />

      {/* Scanline sweep */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="h-24 w-full animate-[scanline-sweep_7s_linear_infinite] bg-[linear-gradient(180deg,transparent,hsl(var(--phosphor)/0.06),transparent)]" />
        </div>
      )}

      {/* HUD chrome */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        {/* Frame corner brackets */}
        <span className="absolute left-4 top-20 h-6 w-6 border-l border-t border-foreground/30 md:left-8" />
        <span className="absolute right-4 top-20 h-6 w-6 border-r border-t border-foreground/30 md:right-8" />
        <span className="absolute bottom-6 left-4 h-6 w-6 border-b border-l border-foreground/30 md:left-8" />
        <span className="absolute bottom-6 right-4 h-6 w-6 border-b border-r border-foreground/30 md:right-8" />

        {/* Top-left readout */}
        <div className="absolute left-8 top-[5.5rem] hidden items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-foreground/50 md:flex lg:left-12">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
          REC · CAM_01 — LIVE
        </div>

        <SweepBox reduceMotion={reduceMotion} />
      </div>

      {/* Content */}
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-32 sm:px-8 md:px-12 lg:px-16"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-phosphor/80 md:text-[11px]">
          Systems · Robotics Perception · Backend
        </p>

        {/* Lock-on headline */}
        <div className="relative mt-7 inline-block self-start md:mt-9">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-3 md:-inset-x-8 md:-inset-y-5"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 1.5, filter: "blur(2px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 0.55, ease: easeOutExpo }}
          >
            <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-phosphor" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-phosphor" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-phosphor" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-phosphor" />
            <span className="absolute -top-3 left-0 whitespace-nowrap bg-phosphor px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-background md:text-[9px] md:tracking-[0.2em]">
              Subject: Arian Izadi — 0.99
            </span>
          </motion.div>

          <h1 className="font-display text-display-hero font-black uppercase text-foreground">
            <ScrambleText text="Arian" speed={40} />
            <br />
            <ScrambleText text="Izadi" speed={40} />
          </h1>
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.5, duration: 0.8, ease: easeOutExpo }}
          className="mt-6 max-w-xl text-base leading-7 text-foreground/70 md:text-lg md:leading-8"
        >
          I build reliable software where production backend systems meet
          low-level constraints, robotics data, and security-minded design.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.8, ease: easeOutExpo }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="border border-phosphor bg-phosphor px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background transition-colors hover:bg-transparent hover:text-phosphor"
          >
            View Work
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/25 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
          >
            Resume ↗
          </a>
          <a
            href="mailto:izadi2000@gmail.com"
            className="border border-foreground/25 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
          >
            Email
          </a>
        </motion.div>

        {/* Sensor readout strip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.85, duration: 0.9 }}
          className="mt-12 grid gap-px border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactMetrics.map((metric, index) => (
            <div key={metric.label} className="bg-background/85 p-4 backdrop-blur-sm">
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-phosphor/70">
                CH_{String(index + 1).padStart(2, "0")} · {metric.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {metric.value}
              </p>
              <p className="mt-1 text-xs leading-5 text-foreground/65">
                {metric.detail}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 flex items-end justify-between gap-8">
          <Telemetry />
          <a
            href="#work"
            className="group hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55 transition-colors hover:text-phosphor md:flex"
          >
            Scroll to scan
            <span className="h-8 w-px overflow-hidden bg-foreground/20">
              <span className="block h-3 w-px animate-slide-down bg-phosphor" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
