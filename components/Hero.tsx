"use client";

import React from "react";
import { ArrowDown, FileText, FolderGit2, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import { siteConfig } from "@/app/config/site";
import { impactMetrics } from "@/lib/portfolio";
import { staggerVariants } from "@/lib/motion";

const HERO_VIDEO_SRC =
  "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm";

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080a0d]">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 hidden bg-[#080a0d] motion-reduce:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.42)_0%,rgba(8,10,13,0.66)_45%,#080a0d_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.p
            variants={staggerItem}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/70"
          >
            Systems, robotics perception, and backend engineering
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="max-w-4xl pb-5 font-display text-6xl font-extrabold leading-[0.96] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Arian Izadi
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="max-w-2xl pb-8 text-lg leading-8 text-foreground/76 md:text-xl"
          >
            I build reliable software where production backend systems meet
            low-level constraints, robotics data, and security-minded design.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
              whileHover={{ scale: reduceMotion ? 1 : 1.03 }}
              whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </motion.a>
            <motion.a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background/30 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur transition-colors hover:border-foreground/45 hover:text-foreground"
              whileHover={{ scale: reduceMotion ? 1 : 1.03 }}
              whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Projects</span>
            </motion.a>
            <motion.a
              href="mailto:izadi2000@gmail.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background/30 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur transition-colors hover:border-foreground/45 hover:text-foreground"
              whileHover={{ scale: reduceMotion ? 1 : 1.03 }}
              whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="bg-[#080a0d]/72 p-4 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/45">
                  {metric.label}
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-foreground/62">
                  {metric.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <a
          href="#projects"
          className="absolute bottom-7 right-6 hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground/45 transition-colors hover:text-foreground md:flex"
        >
          <span>View work</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
