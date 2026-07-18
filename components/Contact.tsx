"use client";

import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import ScrambleText from "@/components/ScrambleText";
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
      <Marquee
        items={[
          "Open to work",
          "Systems engineering",
          "Backend platforms",
          "Robotics perception",
          "Security-minded design",
        ]}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50"
      />

      <div className="px-6 py-24 md:px-12 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-phosphor/80"
        >
          <span className="inline-block h-1.5 w-1.5 bg-phosphor" />
          05 // Transmission
        </motion.p>

        <h2 className="max-w-5xl font-display text-[clamp(2.4rem,7vw,6rem)] font-black uppercase leading-[0.95] tracking-tight text-foreground">
          <ScrambleText text="Open a channel." />
        </h2>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          href={`mailto:${EMAIL}`}
          className="group mt-10 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2"
        >
          <span className="font-display text-[clamp(1.15rem,4.5vw,3.75rem)] font-black uppercase leading-none tracking-tight text-foreground/50 [overflow-wrap:anywhere] transition-colors duration-300 group-hover:text-phosphor">
            {EMAIL}
          </span>
          <span className="font-mono text-sm text-phosphor transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </motion.a>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">
              Coordinates
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              Las Vegas, NV
              <br />
              36.1699° N, 115.1398° W
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">
              Signals
            </p>
            <ul className="mt-3 space-y-1.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-phosphor"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">
              Documents
            </p>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-foreground/70 transition-colors hover:text-phosphor"
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 md:flex-row md:items-center">
          <span>© 2026 Arian Izadi</span>
          <span>Rendered by the perception stack — Next.js</span>
          <span className="text-phosphor/60">END OF TRANSMISSION</span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
