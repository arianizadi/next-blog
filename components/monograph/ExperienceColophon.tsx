import { experiences } from "@/lib/portfolio";
import { Rise, SpreadLabel } from "@/components/monograph/motion";

const current = experiences[0];
const previous = experiences.slice(1);

/**
 * Editorial credits page: the current role set large, earlier roles as
 * restrained colophon lines.
 */
export function ExperienceColophon() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-border px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <SpreadLabel number="04" title="Experience" />

        <Rise delay={0.05} className="mt-14 md:mt-20">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {current.dates} · {current.location}
          </p>
          <h3 className="mt-5 max-w-5xl text-statement font-light text-foreground wrap-anywhere">
            {current.company}
            <span className="text-accent">.</span>
          </h3>
          <p className="mt-4 font-serif text-xl italic text-foreground/85 md:text-2xl">
            {current.role}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {current.summary}
          </p>
        </Rise>

        <Rise delay={0.1} className="mt-12 max-w-3xl md:mt-16">
          <ul className="border-t border-border">
            {current.bulletPoints.map((point) => (
              <li
                key={point}
                className="flex gap-5 border-b border-border py-4 text-[15px] leading-7 text-foreground/85 md:text-base"
              >
                <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {current.technologies.join(" · ")}
          </p>
        </Rise>

        <div className="mt-16 md:mt-24">
          <Rise>
            <h4 className="font-serif text-lg italic text-muted-foreground">
              Previously
            </h4>
          </Rise>
          <ul className="mt-4 border-t border-border">
            {previous.map((job) => (
              <li key={job.company} className="border-b border-border py-7 md:py-9">
                <Rise className="grid gap-3 md:grid-cols-[220px_1fr] md:gap-x-10">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {job.dates}
                  </p>
                  <div className="max-w-3xl">
                    <h5 className="text-xl font-normal text-foreground md:text-2xl">
                      {job.company}
                    </h5>
                    <p className="mt-1 font-serif text-lg italic text-foreground/75">
                      {job.role}
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-muted-foreground md:text-base">
                      {job.summary}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground/80">
                      {job.technologies.join(" · ")}
                    </p>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
