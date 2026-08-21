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
    <footer id="contact" className="relative scroll-mt-16 border-t border-border">
      <div className="paper-grid px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex items-center gap-3"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-accent" />
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">
            § 06 / Correspondence
          </p>
        </motion.div>

        <h2 className="mt-5 font-display text-display-lg font-normal text-balance text-foreground">
          Open a channel.
        </h2>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          href={`mailto:${EMAIL}`}
          className="group mt-10 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2"
        >
          <span className="font-display text-[clamp(1.3rem,4.5vw,3.5rem)] leading-none text-foreground/60 underline decoration-accent/40 decoration-2 underline-offset-8 transition-colors duration-300 wrap-anywhere group-hover:text-accent group-hover:decoration-accent">
            {EMAIL}
          </span>
          <span
            aria-hidden
            className="font-mono text-sm text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </motion.a>

        <div className="mt-20 grid gap-10 border-t border-border bg-background/60 pt-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Coordinates
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              Las Vegas, NV
              <span className="block font-mono text-xs text-foreground/50">
                36.1699° N / 115.1398° W
              </span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Signals
            </p>
            <ul className="mt-3 space-y-1.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-accent"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Documents
            </p>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-foreground/70 transition-colors hover:text-accent"
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
          <span>© 2026 Arian Izadi</span>
          <span className="hidden sm:block">Research Console — Rev. 2026.08</span>
          <span>Las Vegas, NV</span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
