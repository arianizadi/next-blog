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
      <div className="lab-container py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="mb-6 font-mono text-[11px] tracking-[0.14em] text-signal"
        >
          06
          <span className="mx-2 text-muted-foreground/60">/</span>
          <span className="text-muted-foreground">Correspondence</span>
        </motion.p>

        <h2 className="max-w-4xl font-display text-[clamp(2.2rem,6.5vw,5.25rem)] font-bold leading-[1.02] tracking-tight text-foreground">
          Get in touch.
        </h2>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: easeOutExpo }}
          href={`mailto:${EMAIL}`}
          className="group mt-8 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2"
        >
          <span className="font-display text-[clamp(1.2rem,4vw,3rem)] font-bold leading-none tracking-tight text-foreground/60 wrap-anywhere transition-colors duration-300 group-hover:text-signal">
            {EMAIL}
          </span>
          <span
            aria-hidden
            className="font-mono text-sm text-signal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </motion.a>

        <div aria-hidden className="tick-rule mt-16" />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              Location
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/75">
              Las Vegas, NV
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-1.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/75 transition-colors hover:text-signal"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              Documents
            </p>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-foreground/75 transition-colors hover:text-signal"
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] tracking-[0.1em] text-muted-foreground/80">
          <span>© 2026 Arian Izadi</span>
          <span className="font-serif text-[12px] italic tracking-normal">
            Set in Archivo, JetBrains Mono &amp; Newsreader
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
