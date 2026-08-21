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
    <footer
      id="contact"
      className="relative scroll-mt-16 border-t border-foreground bg-inverse text-inverse-foreground"
    >
      <div className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
        >
          <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
          06 / Contact
          <span aria-hidden className="h-px min-w-8 flex-1 bg-inverse-border" />
        </motion.p>

        <h2 className="max-w-5xl font-display text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.92] tracking-tight">
          Open a channel.
        </h2>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          href={`mailto:${EMAIL}`}
          className="group mt-12 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2"
        >
          <span className="font-display text-[clamp(1.2rem,4.5vw,3.75rem)] font-bold lowercase leading-none tracking-tight wrap-anywhere text-inverse-muted transition-colors duration-300 group-hover:text-accent">
            {EMAIL}
          </span>
          <span
            aria-hidden
            className="font-mono text-sm text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </motion.a>

        <div className="mt-20 grid gap-10 border-t border-inverse-border pt-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-inverse-muted">
              Coordinates
            </p>
            <p className="mt-3 text-sm leading-6">Las Vegas, NV</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-inverse-muted">
              Signals
            </p>
            <ul className="mt-3 space-y-1.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span
                      aria-hidden
                      className="text-inverse-muted transition-colors group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-inverse-muted">
              Documents
            </p>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
            >
              Resume (PDF)
              <span
                aria-hidden
                className="text-inverse-muted transition-colors group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-inverse-border pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-inverse-muted">
          <span>© 2026 Arian Izadi</span>
          <span aria-hidden className="tabular-nums">
            36.17°N / 115.14°W
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
