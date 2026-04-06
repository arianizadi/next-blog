"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Code2, FileText } from "lucide-react";
import { siteConfig } from "@/app/config/site";
import { defaultViewport, revealMotionProps, staggerVariants } from "@/lib/motion";

const ContactCTA = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: linkStagger, item: linkItem } = staggerVariants(reduceMotion);
  const tapHover = reduceMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <section className="relative w-full overflow-hidden bg-background py-40">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-12 md:p-20">
            <div className="relative z-10 flex flex-col items-start justify-between gap-12 lg:flex-row">
              <motion.div className="flex-1 space-y-6" {...headerMotion}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">07 / Contact</p>

                <h2 className="font-display text-5xl leading-snug tracking-tight text-foreground md:text-7xl">
                  Let&apos;s build <br />
                  <span className="inline-block origin-left pb-[0.08em] pl-[0.04em] pr-[0.12em] italic">
                    something cool
                  </span>{" "}
                  together.
                </h2>

                <p className="max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
                  I&apos;m seeking opportunities in systems engineering, robotics perception, and high performance development. If you need someone who speaks low level, reach out.
                </p>
              </motion.div>

              <motion.div
                className="grid min-w-[280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:w-auto lg:flex-col"
                variants={linkStagger}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                <motion.a
                  variants={linkItem}
                  href="mailto:izadi2000@gmail.com"
                  className="group relative flex items-center justify-between overflow-hidden rounded-xl bg-foreground p-4 font-semibold text-background transition-all duration-300 hover:bg-foreground/90"
                  {...tapHover}
                >
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>Send Message</span>
                  </div>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  variants={linkItem}
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border p-4 text-foreground/50 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
                  {...tapHover}
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight size={18} className="text-foreground/20 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  variants={linkItem}
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border p-4 text-foreground/50 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
                  {...tapHover}
                >
                  <div className="flex items-center gap-3">
                    <Github size={18} />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight size={18} className="text-foreground/20 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  variants={linkItem}
                  href={siteConfig.links.gitroll}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border p-4 text-foreground/50 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
                  {...tapHover}
                >
                  <div className="flex items-center gap-3">
                    <Code2 size={18} />
                    <span>GitRoll</span>
                  </div>
                  <ArrowUpRight size={18} className="text-foreground/20 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  variants={linkItem}
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border p-4 text-foreground/50 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
                  {...tapHover}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Resume</span>
                  </div>
                  <ArrowUpRight size={18} className="text-foreground/20 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              </motion.div>
            </div>

            {/* Clean Footer */}
            <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Las Vegas, NV
              </div>
              <div className="text-xs text-muted-foreground/60">
                &copy; 2026 Arian Izadi. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
