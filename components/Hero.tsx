"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.25]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Quiet editorial background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--paper))_0%,hsl(var(--background))_60%,hsl(var(--paper))_100%)]" />
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-border/40"
      />
      <div
        aria-hidden
        className="absolute right-[8vw] top-0 hidden h-full w-px bg-border/40 lg:block"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 motion-reduce:[transform:none!important] motion-reduce:[opacity:1!important] sm:px-8 md:px-12 lg:px-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: easeOutExpo }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.26em] text-terracotta md:text-[11px]"
        >
          Systems Engineer &amp; Researcher · Embedded Software Engineer II at
          Konami Gaming
        </motion.p>

        {/* Lock-on headline with scramble */}
        <div className="relative mt-2 inline-block self-start">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -inset-y-2 md:-inset-x-5 md:-inset-y-3"
            initial={{ opacity: 0, scale: 1.3, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.55, ease: easeOutExpo }}
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-terracotta/40" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-terracotta/40" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-terracotta/40" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-terracotta/40" />
            <span className="absolute -top-2.5 left-0 whitespace-nowrap bg-terracotta px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-background md:text-[10px] md:tracking-[0.2em]">
              Subject: Arian Izadi / 0.99
            </span>
          </motion.div>

          <h1 className="font-display text-display-hero font-black uppercase text-foreground">
            <ScrambleText text="Arian" speed={40} />
            <br />
            <ScrambleText text="Izadi" speed={40} />
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: easeOutExpo }}
          className="mt-8 max-w-2xl"
        >
          <p className="font-mono text-[10px] font-medium uppercase leading-6 tracking-[0.2em] text-foreground/70 md:text-[11px] md:tracking-[0.22em]">
            C/C++ · Linux · Real-Time Systems · Robotics · Low-Level Software
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: easeOutExpo }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#experience"
            className="border border-terracotta bg-terracotta px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-terracotta"
          >
            Experience
          </a>
          <a
            href="#work"
            className="border border-foreground/20 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-terracotta hover:text-terracotta"
          >
            Selected Work
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
          >
            Resume ↗
          </a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          href="#experience"
          className="group mt-20 hidden items-center gap-3 self-start font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/70 transition-colors hover:text-terracotta md:flex"
        >
          Scroll
          <span className="h-8 w-px overflow-hidden bg-foreground/15">
            <span className="block h-3 w-px animate-slide-down bg-terracotta" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
