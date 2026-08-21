import { siteConfig } from "@/app/config/site";
import { MaskedLine, Rise } from "@/components/monograph/motion";

const EMAIL = "izadi2000@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "X", href: siteConfig.links.x },
  { label: "Résumé", href: siteConfig.links.resume, external: true },
];

/** Final spread: an enormous typographic send-off. */
export function ContactSpread() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 border-t border-border px-5 pb-10 pt-28 md:px-10 md:pt-44"
    >
      <div className="mx-auto max-w-[1500px]">
        <Rise>
          <p className="font-serif text-lg italic text-muted-foreground">
            07 — Contact
          </p>
        </Rise>

        <h2 className="mt-12 text-mega font-light text-foreground md:mt-16">
          <MaskedLine>Say hello</MaskedLine>
          <MaskedLine delay={0.1}>
            <span className="text-muted-foreground">any time</span>
            <span className="text-accent">.</span>
          </MaskedLine>
        </h2>

        <Rise delay={0.15} className="mt-12 md:mt-16">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex max-w-full flex-wrap items-baseline gap-x-4"
          >
            <span className="text-[clamp(1.35rem,4vw,3.25rem)] font-light leading-tight tracking-tight text-foreground underline decoration-border underline-offset-[10px] transition-colors wrap-anywhere group-hover:text-accent group-hover:decoration-accent/50 motion-reduce:transition-none">
              {EMAIL}
            </span>
          </a>
        </Rise>

        <Rise
          delay={0.2}
          className="mt-20 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-6 border-t border-border pt-8"
        >
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-baseline gap-3 text-sm text-muted-foreground">
            <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-accent" />
            Las Vegas, NV — © 2026 Arian Izadi
          </p>
        </Rise>
      </div>
    </footer>
  );
}
