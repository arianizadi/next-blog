import Link from "next/link";
import { contributions, education, certifications } from "@/lib/portfolio";
import { Rise, SpreadLabel } from "@/components/monograph/motion";

/**
 * Colophon page: education and open-source contributions as short credits,
 * the way a book lists its typefaces and papers.
 */
export function Colophon() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 border-t border-border px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <SpreadLabel number="06" title="Colophon" />

        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-2 lg:gap-x-24">
          {/* Education */}
          <div>
            <Rise>
              <h3 className="font-serif text-lg italic text-muted-foreground">
                Study
              </h3>
              <ul className="mt-4 border-t border-border">
                {education.map((degree) => (
                  <li key={degree.degree} className="border-b border-border py-6">
                    <h4 className="text-xl font-normal text-foreground md:text-2xl wrap-anywhere">
                      {degree.degree}
                    </h4>
                    <p className="mt-1 font-serif text-base italic text-muted-foreground md:text-lg">
                      {degree.university}
                      {degree.date ? ` — ${degree.date}` : ""}
                      {degree.gpa ? ` — ${degree.gpa}` : ""}
                    </p>
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground md:text-base">
                      {degree.highlights.join(" · ")}
                    </p>
                  </li>
                ))}
                <li className="border-b border-border py-6">
                  <h4 className="text-base font-normal text-foreground md:text-lg">
                    {certifications[0]}
                  </h4>
                  <p className="mt-1 font-serif text-base italic text-muted-foreground">
                    Certification
                  </p>
                </li>
              </ul>
            </Rise>

            <Rise delay={0.08}>
              <Link
                href="/journey"
                className="group mt-10 inline-flex items-baseline gap-4"
              >
                <span className="font-serif text-xl italic text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:text-accent motion-reduce:transition-none">
                  The longer journey
                </span>
                <span
                  aria-hidden
                  className="font-serif text-xl text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </Link>
            </Rise>
          </div>

          {/* Open source */}
          <div>
            <Rise delay={0.05}>
              <h3 className="font-serif text-lg italic text-muted-foreground">
                Upstream work
              </h3>
              <ul className="mt-4 border-t border-border">
                {contributions.map((entry) => (
                  <li
                    key={entry.id}
                    className="border-b border-border py-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-xl font-normal text-foreground md:text-2xl">
                        {entry.project}
                      </h4>
                      <span className="text-xs uppercase tracking-[0.18em] text-accent">
                        {entry.status}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-base italic text-muted-foreground md:text-lg">
                      {entry.feature}
                    </p>
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground md:text-base">
                      {entry.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                      {entry.prUrl && (
                        <a
                          href={entry.prUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
                        >
                          Pull request ↗
                        </a>
                      )}
                      <a
                        href={entry.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent motion-reduce:transition-none"
                      >
                        Repository ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
