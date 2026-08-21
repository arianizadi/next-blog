"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";

const EMAIL = "izadi2000@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "X", href: siteConfig.links.x },
  { label: "GitRoll", href: siteConfig.links.gitroll },
];

const Contact = () => {
  return (
    <footer id="contact" className="relative scroll-mt-16 border-t-2 border-border bg-background overflow-hidden">
      <div className="absolute inset-0 bg-signal-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-mono text-xs text-background bg-foreground px-2 py-1 tracking-[0.2em] font-bold">
            SEQ 06
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
            Terminate Session
          </span>
          <div className="flex-1 h-px bg-border max-w-sm ml-4" />
        </motion.div>

        <h2 className="max-w-5xl border-l border-phosphor pl-6 font-display text-[clamp(2.4rem,7vw,6rem)] font-black uppercase leading-[0.95] tracking-tight text-foreground">
          Establish Link
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="mt-12 bg-card border border-border p-6 md:p-10 inline-block"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 mb-4 border-b border-border/50 pb-2">
            Primary Endpoint
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-baseline gap-4"
          >
            <span className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase leading-none tracking-tight text-foreground wrap-anywhere transition-colors duration-300 group-hover:text-phosphor">
              {EMAIL}
            </span>
            <span className="font-mono text-xl text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">
              ↗
            </span>
          </a>
        </motion.div>

        <div className="mt-24 grid gap-px bg-border border-2 border-border md:grid-cols-3">
          <div className="bg-background p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 border-b border-border/50 pb-2 mb-4">
              Coordinates
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/80">
              Las Vegas, NV
            </p>
          </div>

          <div className="bg-background p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 border-b border-border/50 pb-2 mb-4">
              Network
            </p>
            <ul className="space-y-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:text-phosphor flex items-center justify-between"
                  >
                    <span>{social.label}</span>
                    <span className="text-phosphor/50">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 border-b border-border/50 pb-2 mb-4">
              Export
            </p>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:text-phosphor flex items-center justify-between"
            >
              <span>Resume (PDF)</span>
              <span className="text-phosphor/50">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>Sys.Auth: 2026 Arian Izadi</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-phosphor animate-signal-pulse" />
            Active
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
