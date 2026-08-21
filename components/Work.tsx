import Image from "next/image";
import MergeLog from "@/components/MergeLog";
import SectionHeader from "@/components/SectionHeader";
import { projects, type Project } from "@/lib/portfolio";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);
const PINNED_GALLERY_HEIGHT_VH = 30 + featured.length * 70;

const figNumber = (index: number) => `Fig. ${String(index + 1).padStart(2, "0")}`;

const ProjectLinks = ({ project }: { project: Project }) => {
  const hasExternalLink = project.githubUrl || project.liveUrl;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] tracking-tight">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          Code ↗
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          Live ↗
        </a>
      )}
      {!hasExternalLink && (
        <span className="text-muted-foreground">Professional experience</span>
      )}
    </div>
  );
};

/* Placeholder plate for projects without imagery: graph paper + readouts */
const SchematicFrame = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => (
  <div className="lab-grid absolute inset-0 overflow-hidden bg-card">
    <span className="absolute left-5 top-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
      No imagery on file
    </span>
    <span
      aria-hidden
      className="absolute -bottom-7 right-3 font-display text-[7rem] font-bold leading-none text-foreground/[0.07]"
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <div className="absolute bottom-4 left-5 right-5 flex flex-wrap gap-x-4 gap-y-1.5">
      {project.technologies.slice(0, 4).map((technology) => (
        <span
          key={technology}
          className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground"
        >
          {technology}
        </span>
      ))}
    </div>
  </div>
);

const FrameCard = ({
  project,
  index,
  priority,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) => (
  <article className="work-pin-card group relative flex h-full w-[86vw] shrink-0 flex-col border border-border bg-card md:w-[56vw] lg:w-[44vw] xl:w-[40vw]">
    {/* Plate */}
    <div className="relative aspect-video w-full overflow-hidden border-b border-border">
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 86vw, (max-width: 1024px) 56vw, (max-width: 1280px) 44vw, 40vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover opacity-85 saturate-[0.85] transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:saturate-100"
        />
      ) : (
        <SchematicFrame project={project} index={index} />
      )}
    </div>

    {/* Figure caption */}
    <div className="flex items-baseline gap-3 border-b border-border px-6 py-3 md:px-8">
      <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-signal">
        {figNumber(index)}
      </span>
      <span className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
        {project.eyebrow}
      </span>
    </div>

    {/* Sheet */}
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground wrap-anywhere md:text-3xl">
        {project.title}
      </h3>

      <dl className="mt-5 space-y-0">
        <div className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border/70 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] leading-5 text-muted-foreground">
            Problem
          </dt>
          <dd className="text-sm leading-6 text-foreground/70">
            {project.problem}
          </dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border/70 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] leading-5 text-muted-foreground">
            Built
          </dt>
          <dd className="text-sm leading-6 text-foreground/70">
            {project.contribution}
          </dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border/70 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] leading-5 text-signal">
            Result
          </dt>
          <dd className="text-sm leading-6 text-foreground/85">
            {project.impact}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-border pt-5">
        <p className="min-w-0 font-mono text-[10px] leading-5 tracking-[0.06em] text-muted-foreground">
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
      <div className="work-pin-sticky sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-14">
        <div className="work-pin-track flex w-max items-stretch gap-6 pl-5 pr-[12vw] md:pl-8">
          {featured.map((project, index) => (
            <FrameCard
              key={project.id}
              project={project}
              index={index}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Progress ruler */}
        <div className="work-pin-progress absolute inset-x-5 bottom-8 md:inset-x-8">
          <div className="tick-rule relative w-full">
            <div className="work-pin-progress-fill absolute inset-x-0 bottom-0 h-px origin-left bg-signal" />
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
    <li className="group border-b border-border transition-colors hover:bg-foreground/[0.03]">
      <div className="flex items-center gap-5 py-5 md:gap-8">
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
          {String(featured.length + index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <span className="block font-display text-lg font-bold leading-tight tracking-tight text-foreground transition-colors wrap-anywhere group-hover:text-signal md:truncate md:text-2xl">
                {project.title}
              </span>
              <span className="mt-1 block font-serif text-[13px] italic text-muted-foreground md:hidden">
                {project.eyebrow}
              </span>
            </a>
          ) : (
            <>
              <span className="block font-display text-lg font-bold leading-tight tracking-tight text-foreground wrap-anywhere md:truncate md:text-2xl">
                {project.title}
              </span>
              <span className="mt-1 block font-serif text-[13px] italic text-muted-foreground md:hidden">
                {project.eyebrow}
              </span>
            </>
          )}
        </div>

        <span className="hidden w-44 shrink-0 font-serif text-[13px] italic leading-5 text-muted-foreground md:block">
          {project.eyebrow}
        </span>
        <span className="hidden w-64 shrink-0 text-right font-mono text-[10px] leading-5 tracking-[0.04em] text-muted-foreground/80 lg:block">
          {project.technologies.join(" · ")}
        </span>

        <span className="flex shrink-0 gap-4 text-[12px] tracking-tight">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-signal"
            >
              Code ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-signal"
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
  <div className="lab-container pb-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-10">
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
        <span className="text-signal">04.1</span>
        <span className="mx-2 text-muted-foreground/60">/</span>
        Project index
      </p>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-signal"
      >
        github.com/arianizadi ↗
      </a>
    </div>

    <ul>
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
    <div className="lab-container">
      <SectionHeader
        index="02"
        label="Selected work"
        title="Built under constraints"
        description="Each project documented the same way: the problem, the system built, and the result it had to hold."
      />
    </div>
    <HorizontalGallery />
  </section>
);

export const AdditionalWork = () => (
  <section
    id="additional-work"
    className="relative scroll-mt-16 border-t border-border py-24 md:py-32"
  >
    <div className="lab-container">
      <SectionHeader
        index="04"
        label="Across computer science"
        title="The wider bench"
        description="Computer vision tools, security work, web applications, and practical utilities from across my GitHub."
      />
    </div>
    <ArchiveTable />
    <div className="lab-container">
      <MergeLog embedded />
    </div>
  </section>
);

export default Work;
