"use client";

import React from "react";
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import { siteConfig } from "@/app/config/site";
import { staggerVariants } from "@/lib/motion";

const HERO_VIDEO_SRC =
  "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm";

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);

  return (
    <div className="relative h-screen min-h-[32rem] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background: video (motion OK) or static fallback */}
      {!reduceMotion ? (
        <>
          <video
            className="absolute left-0 top-0 min-h-full min-w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_0%_10%)_0%,#0a0a0a_70%)]" />
      )}

      {/* Content: bottom left editorial alignment */}
      <div className="relative z-10 flex h-full flex-col items-start justify-end px-8 pb-24 md:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display font-extrabold text-display-xl text-foreground pb-4 text-7xl md:text-[9rem] md:leading-[0.92] tracking-tight"
          >
            Arian Izadi
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="pb-8 font-sans text-sm uppercase tracking-[0.3em] text-foreground/40"
          >
            Systems Engineer &amp; Researcher
          </motion.p>

          <motion.div variants={staggerItem}>
            <motion.a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-3 font-sans text-sm tracking-wide text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </div>
  );
};

export default Hero;
