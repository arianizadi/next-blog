import { techGroups } from "@/lib/portfolio";
import { Rise, SpreadLabel } from "@/components/monograph/motion";

const PRIMARY_LANGUAGES = new Set(["C/C++", "C", "C++", "Rust"]);

/**
 * Materials page: the toolkit as a typography-led specification spread,
 * dominated by C/C++ — no chips, no tables.
 */
export function MaterialsSpread() {
  return (
    <section
      id="materials"
      className="relative scroll-mt-24 border-t border-border px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <SpreadLabel number="05" title="Materials" />

        <Rise delay={0.05}>
          <h2 className="mt-14 max-w-5xl text-statement font-light text-foreground md:mt-20">
            What the work is made of<span className="text-accent">.</span>
          </h2>
        </Rise>

        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {techGroups.map((group, gi) => (
            <Rise key={group.id} delay={gi * 0.04}>
              <h3 className="font-serif text-lg italic text-muted-foreground">
                {group.title}
              </h3>
              <p className="mt-4 max-w-4xl text-[clamp(1.25rem,2.3vw,1.9rem)] font-light leading-snug tracking-tight text-muted-foreground">
                {group.skills.map((skill, i) => (
                  <span key={skill}>
                    <span
                      className={
                        PRIMARY_LANGUAGES.has(skill) ? "text-foreground" : undefined
                      }
                    >
                      {skill}
                    </span>
                    {i < group.skills.length - 1 && (
                      <span aria-hidden className="mx-3 text-border">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground/80">
                {group.description}
              </p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
