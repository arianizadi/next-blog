"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const HERO_VIDEO_SRC =
  "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm";

const Hero = () => {
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

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 motion-reduce:[transform:none!important] motion-reduce:[opacity:1!important] sm:px-8 md:px-12 lg:px-16"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60 md:text-[11px]">
          Systems · Robotics Perception · Backend
        </p>

        {/* Lock-on headline — the one signature moment */}
        <div className="relative mt-7 inline-block self-start md:mt-9">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-3 md:-inset-x-8 md:-inset-y-5"
            initial={{ opacity: 0, scale: 1.5, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 0.55, ease: easeOutExpo }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: easeOutExpo }}
          className="mt-6 max-w-xl text-base leading-7 text-foreground/70 md:text-lg md:leading-8"
        >
          I build reliable software where production backend systems meet
          low-level constraints, robotics data, and security-minded design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: easeOutExpo }}
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

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          href="#work"
          className="group mt-16 hidden items-center gap-3 self-start font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55 transition-colors hover:text-phosphor md:flex"
        >
          Scroll
          <span className="h-8 w-px overflow-hidden bg-foreground/20">
            <span className="block h-3 w-px animate-slide-down bg-phosphor" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
