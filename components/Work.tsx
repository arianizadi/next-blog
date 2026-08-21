import Link from "next/link";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import MergeLog from "@/components/MergeLog";
import SectionHeader from "@/components/SectionHeader";
import { projects, type Project } from "@/lib/portfolio";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

const ArchiveRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const primaryHref = project.liveUrl ?? project.githubUrl;
  const rowNumber = String(featured.length + index + 1).padStart(2, "0");

  const title = (
    <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent-ink wrap-anywhere md:truncate md:text-2xl">
      {project.title}
    </span>
  );

  return (
    <li className="group border-b border-border transition-colors hover:bg-card">
      <div className="relative flex items-center gap-5 py-5 pl-0 md:gap-8 md:pl-6">
        <span
          aria-hidden
          className="absolute left-0 top-1/2 hidden h-0 w-px -translate-y-1/2 bg-accent transition-all duration-300 group-hover:h-8 md:block"
        />
        <span className="w-8 shrink-0 font-mono text-[10px] tabular-nums tracking-[0.16em] text-muted-foreground">
          {rowNumber}
        </span>

        <div className="min-w-0 flex-1">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {title}
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                {project.eyebrow}
              </span>
            </a>
          ) : (
            <>
              {title}
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                {project.eyebrow}
              </span>
            </>
          )}
        </div>

        <span className="hidden w-44 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:block">
          {project.eyebrow}
        </span>
        <span className="hidden w-64 shrink-0 text-right font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-muted-foreground/80 lg:block">
          {project.technologies.join(" · ")}
        </span>

        <span className="flex shrink-0 gap-4 font-mono text-[10px] uppercase tracking-[0.16em]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-accent-ink"
            >
              Code ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-accent-ink"
            >
              Live ↗
            </a>
          )}
        </span>
      </div>
    </li>
  );
};

const ArchiveTable = () => (
  <div className="px-5 pb-4 md:px-8 lg:px-12">
    <div className="mb-6 flex items-end justify-between border-t border-border pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-ink">
        Full archive
      </p>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent-ink"
      >
        github.com/arianizadi ↗
      </a>
    </div>

    <ul className="border-t border-border">
      {archive.map((project, index) => (
        <ArchiveRow key={project.id} project={project} index={index} />
      ))}
    </ul>
  </div>
);

const Work = () => (
  <section
    id="work"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    {/* Legacy anchor alias: old /#projects links still land here */}
    <span id="projects" aria-hidden className="absolute -top-24" />
    <div className="px-5 pb-14 md:px-8 lg:px-12">
      <SectionHeader
        index="02"
        label="Engineering Portfolio"
        title="Selected Work"
        description="Featured builds, organized around the problem, the system, and the constraints that shaped it."
      />
    </div>
    <FeaturedCarousel projects={featured} />
    <div className="mt-16 px-5 md:px-8 lg:px-12">
      <Link
        href="#additional-work"
        className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent-ink"
      >
        <span
          aria-hidden
          className="h-px w-8 bg-muted-foreground transition-all duration-300 group-hover:w-12 group-hover:bg-accent-ink"
        />
        Full archive below
      </Link>
    </div>
  </section>
);

export const AdditionalWork = () => (
  <section
    id="additional-work"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="px-5 md:px-8 lg:px-12">
      <SectionHeader
        index="04"
        label="Across Computer Science"
        title="More Things I've Built"
        description="Computer vision tools, security work, web applications, and practical utilities from across my GitHub."
      />
    </div>
    <ArchiveTable />
    <div className="px-5 md:px-8 lg:px-12">
      <MergeLog embedded />
    </div>
  </section>
);

export default Work;
