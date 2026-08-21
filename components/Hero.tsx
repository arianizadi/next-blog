"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const SPECS = [
  {
    label: "Currently",
    value: "Embedded Software Engineer II, Konami Gaming R&D",
  },
  {
    label: "Focus",
    value: "C/C++ · Linux · real-time systems · robotics",
  },
  {
    label: "Education",
    value: "M.S. Computer Science, UNLV",
  },
  {
    label: "Location",
    value: "Las Vegas, NV",
  },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.75, ease: easeOutExpo },
});

/**
 * Drafting-style dimension line under the name: end ticks, hairlines that
 * draw outward, and the measured quantity centered as the label.
 */
const DimensionLine = () => (
  <div className="mt-6 flex w-full items-center gap-3 md:mt-8 md:gap-4">
    <span aria-hidden className="h-3.5 w-px shrink-0 bg-foreground/40" />
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.55, duration: 0.9, ease: easeOutExpo }}
      className="h-px min-w-4 flex-1 origin-left bg-foreground/25"
    />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-signal md:text-[11px]"
    >
      systems engineer · researcher
    </motion.p>
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.55, duration: 0.9, ease: easeOutExpo }}
      className="h-px min-w-4 flex-1 origin-right bg-foreground/25"
    />
    <span aria-hidden className="h-3.5 w-px shrink-0 bg-foreground/40" />
  </div>
);

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.25]);

  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-background">
      {/* Bench surface: faint graph paper, fading toward the fold */}
      <div
        aria-hidden
        className="lab-grid absolute inset-0 [mask-image:radial-gradient(120%_90%_at_50%_0%,black_30%,transparent_78%)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="lab-container relative z-10 flex flex-1 flex-col justify-center pb-24 pt-32 motion-reduce:[transform:none!important] motion-reduce:[opacity:1!important]"
      >
        <motion.p
          {...rise(0.05)}
          className="mb-6 font-mono text-[10px] tracking-[0.16em] text-muted-foreground md:mb-8 md:text-[11px]"
        >
          Portfolio <span className="text-muted-foreground/50">·</span> rev.
          2026
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          className="font-display text-display-hero font-bold text-foreground"
        >
          Arian Izadi
        </motion.h1>

        <DimensionLine />

        <motion.p
          {...rise(0.3)}
          className="mt-8 max-w-xl font-serif text-lg italic leading-7 text-muted-foreground md:mt-10 md:text-xl md:leading-8"
        >
          Software close to the hardware — built carefully, measured honestly.
        </motion.p>

        <motion.div
          {...rise(0.42)}
          className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {SPECS.map((spec) => (
            <div key={spec.label} className="bg-card/85 p-4 backdrop-blur-sm md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {spec.label}
              </p>
              <p className="mt-2 text-[13px] leading-5 text-foreground/85">
                {spec.value}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...rise(0.54)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="border border-signal bg-signal px-6 py-3 text-[13px] font-medium tracking-tight text-background transition-colors hover:bg-transparent hover:text-signal"
          >
            Selected work
          </a>
          <a
            href="#experience"
            className="border border-border px-6 py-3 text-[13px] tracking-tight text-foreground/75 transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            Experience
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-6 py-3 text-[13px] tracking-tight text-foreground/75 transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            Resume ↗
          </a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          href="#experience"
          className="group mt-14 hidden items-center gap-3 self-start font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-signal md:flex"
        >
          Scroll
          <span className="h-8 w-px overflow-hidden bg-foreground/20">
            <span className="block h-3 w-px animate-slide-down bg-signal" />
          </span>
        </motion.a>
      </motion.div>

      {/* Fold ruler */}
      <div aria-hidden className="lab-container relative z-10 pb-5">
        <div className="tick-rule" />
      </div>
    </section>
  );
};

export default Hero;
