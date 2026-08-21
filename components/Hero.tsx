"use client";

import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const HERO_VIDEO_SRC =
  "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full border-b border-border bg-background flex flex-col lg:grid lg:grid-cols-12 pt-16 md:pt-20">

      {/* LEFT PANEL: Identity & Core Positioning */}
      <div className="lg:col-span-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border p-6 md:p-12 lg:p-16">

        {/* Top meta data row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 bg-phosphor animate-signal-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 md:text-[11px]">
              System Status: <span className="text-phosphor">Active</span>
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 border border-border px-3 py-1"
          >
            Las Vegas, NV
          </motion.p>
        </div>

        {/* Massive Typography section */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="mb-6 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-phosphor flex items-center gap-4"
          >
            <span>[Konami Gaming R&D]</span>
            <span className="h-px bg-border flex-1 max-w-[100px]" />
            <span className="text-foreground/60">Embedded Software Engineer II</span>
          </motion.div>

          <h1 className="font-display text-[clamp(4rem,10vw,12rem)] font-black uppercase leading-[0.85] tracking-tighter text-foreground mb-6">
            <ScrambleText text="Arian" speed={40} />
            <br />
            <ScrambleText text="Izadi" speed={40} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
            className="max-w-3xl font-mono text-[11px] md:text-[13px] uppercase leading-relaxed tracking-[0.18em] text-foreground/80"
          >
            Systems Engineer & Researcher specializing in <span className="text-phosphor">C/C++</span>, <span className="text-phosphor">Linux</span>, <span className="text-phosphor">Real-Time Systems</span>, <span className="text-phosphor">Robotics</span>, and <span className="text-phosphor">Hardware/Software Integration</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeOutExpo }}
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50"
          >
            M.S. Computer Science, UNLV
          </motion.p>
        </div>
      </div>

      {/* RIGHT PANEL: Kinetic Visuals & Actions */}
      <div className="lg:col-span-4 flex flex-col h-[50vh] lg:h-auto">

        {/* Top Right: Video / Visuals Box */}
        <div className="relative flex-1 border-b border-border overflow-hidden bg-muted group">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 motion-reduce:hidden"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/webm" />
          </video>

          <div className="absolute inset-0 bg-signal-grid opacity-30 pointer-events-none" />

          {/* Signal brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-phosphor/80" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-phosphor/80" />

          <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor bg-background/80 px-2 py-1 border border-phosphor/30 backdrop-blur-sm">
            Visual Data Stream
          </div>
        </div>

        {/* Bottom Right: Navigation & Action */}
        <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-end gap-6 bg-card relative">
          <div className="absolute inset-0 bg-signal-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60 mb-2 border-b border-border/50 pb-2">
              Command Execution
            </p>

            <a
              href="#experience"
              className="flex items-center justify-between border border-border bg-background px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-phosphor hover:text-phosphor group"
            >
              <span>Initialize Experience</span>
              <span className="text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>

            <a
              href="#work"
              className="flex items-center justify-between border border-border bg-background px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-phosphor hover:text-phosphor group"
            >
              <span>Access Portfolio</span>
              <span className="text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>

            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-border bg-background px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-phosphor hover:text-phosphor group"
            >
              <span>Download Resume</span>
              <span className="text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
