import Image from "next/image";
import MergeLog from "@/components/MergeLog";
import SectionHeader from "@/components/SectionHeader";
import { projects, type Project } from "@/lib/portfolio";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);
const PINNED_GALLERY_HEIGHT_VH = 30 + featured.length * 70;

const ProjectLinks = ({ project }: { project: Project }) => {
  const hasExternalLink = project.githubUrl || project.liveUrl;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em]">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-panel-muted underline decoration-panel-border underline-offset-4 transition-colors hover:text-panel-accent hover:decoration-panel-accent"
        >
          Code ↗
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-panel-muted underline decoration-panel-border underline-offset-4 transition-colors hover:text-panel-accent hover:decoration-panel-accent"
        >
          Live ↗
        </a>
      )}
      {!hasExternalLink && (
        <span className="text-panel-muted">Professional experience</span>
      )}
    </div>
  );
};

const TechnicalFrame = ({ project }: { project: Project }) => (
  <div className="panel-grid absolute inset-0 overflow-hidden bg-panel">
    <div className="absolute inset-5 border border-panel-accent/20" />
    <div className="absolute inset-y-5 left-1/3 w-px bg-panel-accent/12" />
    <div className="absolute inset-y-5 right-1/3 w-px bg-panel-accent/12" />
    <div className="absolute inset-x-5 top-1/2 h-px bg-panel-accent/12" />
    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
      {project.technologies.slice(0, 4).map((technology) => (
        <span
          key={technology}
          className="border border-panel-border bg-panel/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-panel-muted"
        >
          {technology}
        </span>
      ))}
    </div>
    <p className="absolute right-5 top-5 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-panel-accent/70 sm:block">
      Schematic
    </p>
  </div>
);

const FrameCard = ({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) => (
  <article className="work-pin-card group relative flex h-full w-[86vw] shrink-0 flex-col border border-panel-border bg-panel-raised transition-colors duration-500 hover:border-panel-accent/40 md:w-[56vw] lg:w-[44vw] xl:w-[40vw]">
    {/* Captured frame */}
    <div className="relative aspect-video w-full overflow-hidden border-b border-panel-border">
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 86vw, (max-width: 1024px) 56vw, (max-width: 1280px) 44vw, 40vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      ) : (
        <TechnicalFrame project={project} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(228_14%_8%/0.35),transparent_40%,hsl(228_14%_8%/0.6))]" />
      <p className="absolute left-4 top-4 border border-panel-border bg-panel/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-muted backdrop-blur-sm">
        {project.eyebrow}
      </p>
      <p className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-foreground/70">
        F.{String(featured.indexOf(project) + 1).padStart(2, "0")}
      </p>
    </div>

    {/* Analysis */}
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <h3 className="font-display text-3xl leading-none text-balance text-panel-foreground md:text-4xl">
        {project.title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-panel-foreground/70">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-panel-muted">
          Problem:
        </span>
        {project.problem}
      </p>
      <p className="mt-3 max-w-lg text-sm leading-6 text-panel-muted">
        {project.contribution}
      </p>
      <p className="mt-3 border-l-2 border-panel-accent/60 pl-3 font-mono text-[11px] leading-5 text-panel-accent">
        → {project.impact}
      </p>

      <div className="mt-auto pt-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-panel-muted">
          {project.technologies.join(" · ")}
        </p>
        <ProjectLinks project={project} />
      </div>
    </div>
  </article>
);

const HorizontalGallery = () => {
  /*
   * The track and progress rail use a named CSS ViewTimeline in globals.css,
   * keeping the entire gallery off the JavaScript scroll path. Reduced-motion,
   * short-view, and unsupported-browser fallbacks are CSS-only too.
   */
  return (
    <section
      className="work-pin-section relative"
      style={{ height: `${PINNED_GALLERY_HEIGHT_VH}vh` }}
    >
      <div className="work-pin-sticky sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="work-pin-track flex w-max items-stretch gap-6 pl-6 pr-[12vw] md:pl-12">
          {featured.map((project, index) => (
            <FrameCard
              key={project.id}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Progress rail */}
        <div className="work-pin-progress absolute inset-x-6 bottom-8 md:inset-x-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-panel-muted">
            Track A — {featured.length} featured systems
          </p>
          <div className="relative h-px w-full bg-panel-border">
            <div className="work-pin-progress-fill absolute inset-0 origin-left bg-panel-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ArchiveRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const primaryHref = project.liveUrl ?? project.githubUrl;

  return (
    <li className="group border-b border-border transition-colors hover:bg-foreground/3">
      <div className="flex flex-col gap-3 py-6 md:flex-row md:items-baseline md:gap-6">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent">
          P.{String(featured.length + index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <span className="block font-display text-xl leading-tight text-foreground transition-colors wrap-anywhere group-hover:text-accent md:text-2xl">
                {project.title}
              </span>
            </a>
          ) : (
            <span className="block font-display text-xl leading-tight text-foreground wrap-anywhere md:text-2xl">
              {project.title}
            </span>
          )}
          <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {project.eyebrow}
            <span className="mx-2 text-accent/60" aria-hidden>
              ·
            </span>
            {project.technologies.slice(0, 3).join(" / ")}
          </span>
        </div>

        <span
          aria-hidden
          className="mx-2 hidden min-w-8 flex-1 self-end border-b border-dotted border-foreground/25 md:block"
        />

        <span className="flex shrink-0 gap-4 font-mono text-[10px] uppercase tracking-[0.18em] self-start md:self-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 transition-colors hover:text-accent"
            >
              Code ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 transition-colors hover:text-accent"
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
  <div className="px-6 pb-8 md:px-12">
    <div className="mb-8 flex items-end justify-between border-t border-border pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        § Full index
      </p>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-accent"
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
    className="relative scroll-mt-16 bg-panel text-panel-foreground"
  >
    {/* Legacy anchor alias: old /#projects links still land here */}
    <span id="projects" aria-hidden className="absolute -top-24" />
    <div className="px-6 pt-24 md:px-12 md:pt-32">
      <SectionHeader
        index="02"
        label="Featured Systems"
        title="Selected work"
        tone="panel"
        description="Projects organized around the problem, the system built, and the constraints that shaped it."
      />
    </div>
    <HorizontalGallery />
    <div className="border-t border-panel-border px-6 py-5 font-mono text-[10px] uppercase tracking-[0.26em] text-panel-muted md:px-12">
      End of track A — appendix index follows
    </div>
  </section>
);

export const AdditionalWork = () => (
  <section
    id="additional-work"
    className="relative scroll-mt-16 border-t border-panel-border py-24 md:py-32"
  >
    <div className="px-6 md:px-12">
      <SectionHeader
        index="04"
        label="Appendix"
        title="More things I've built"
        description="Computer vision tools, security work, web applications, and practical utilities from across my GitHub."
      />
    </div>
    <ArchiveTable />
    <div className="px-6 md:px-12">
      <MergeLog embedded />
    </div>
  </section>
);

export default Work;
