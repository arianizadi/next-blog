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
    <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.22em]">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-phosphor hover:decoration-phosphor"
        >
          Code ↗
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-phosphor hover:decoration-phosphor"
        >
          Live ↗
        </a>
      )}
      {!hasExternalLink && (
        <span className="text-foreground/50">Professional experience</span>
      )}
    </div>
  );
};

const TechnicalFrame = ({ project }: { project: Project }) => (
  <div className="absolute inset-0 overflow-hidden bg-background">
    <div className="absolute inset-0 bg-signal-grid opacity-20 pointer-events-none" />
    <div className="absolute inset-0 border-[4px] border-border" />
    <div className="absolute top-1/2 left-0 w-full h-px bg-border border-dashed" />
    <div className="absolute left-1/2 top-0 h-full w-px bg-border border-dashed" />
    <div className="absolute inset-4 border border-phosphor/20 flex items-center justify-center">
      <div className="w-16 h-16 border-t-2 border-l-2 border-phosphor/50 absolute top-0 left-0" />
      <div className="w-16 h-16 border-b-2 border-r-2 border-phosphor/50 absolute bottom-0 right-0" />
    </div>

    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
      {project.technologies.slice(0, 4).map((technology) => (
        <span
          key={technology}
          className="bg-card px-2 py-1 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 border border-border"
        >
          {technology}
        </span>
      ))}
    </div>
    <p className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60 bg-card px-2 py-1 border border-border">
      Sys: {project.id}
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
  <article className="work-pin-card group relative flex h-full w-[86vw] shrink-0 flex-col border-2 border-border bg-card md:w-[56vw] lg:w-[44vw] xl:w-[40vw]">
    {/* Captured frame */}
    <div className="relative aspect-video w-full overflow-hidden border-b-2 border-border bg-muted">
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 86vw, (max-width: 1024px) 56vw, (max-width: 1280px) 44vw, 40vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover opacity-60 mix-blend-luminosity grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-100"
        />
      ) : (
        <TechnicalFrame project={project} />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-signal-grid opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-4 left-4 bg-background/90 px-3 py-1.5 border border-border font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-sm">
        {project.eyebrow}
      </div>
    </div>

    {/* Analysis */}
    <div className="flex flex-1 flex-col p-6 md:p-8 relative">
      <div className="absolute top-0 right-8 w-px h-full bg-border opacity-50" />

      <div className="pr-12">
        <h3 className="font-display text-2xl font-black uppercase leading-[1.1] tracking-tight text-foreground wrap-anywhere md:text-3xl mb-6 border-b border-border pb-4">
          {project.title}
        </h3>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-xs leading-relaxed text-foreground/70">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 pt-1">
            Prob
          </span>
          <p>{project.problem}</p>

          <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 pt-1">
            Impl
          </span>
          <p>{project.contribution}</p>
        </div>

        <div className="mt-6 bg-phosphor/5 border border-phosphor/20 p-4 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-phosphor" />
          <p className="font-mono text-xs leading-relaxed text-phosphor/90 uppercase tracking-[0.1em]">
            <span className="opacity-50 mr-2">Result:</span> {project.impact}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-border/50">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
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
          <div className="relative h-px w-full bg-border">
            <div className="work-pin-progress-fill absolute inset-0 origin-left bg-phosphor" />
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
    <li className="group border-b border-border transition-all hover:bg-muted/50 hover:pl-2">
      <div className="flex items-center gap-5 py-5 md:gap-8 pr-4">
        <span className="font-mono text-xs tracking-[0.3em] text-foreground/60 w-8">
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
              <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight text-foreground transition-colors wrap-anywhere group-hover:text-phosphor md:truncate md:text-xl">
                {project.title}
              </span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 md:hidden">
                {project.eyebrow}
              </span>
            </a>
          ) : (
            <>
              <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight text-foreground wrap-anywhere md:truncate md:text-xl">
                {project.title}
              </span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 md:hidden">
                {project.eyebrow}
              </span>
            </>
          )}
        </div>

        <span className="hidden w-48 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 md:block border-l border-border pl-4">
          {project.eyebrow}
        </span>
        <span className="hidden w-64 shrink-0 text-right font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-foreground/60 lg:block">
          {project.technologies.join(" · ")}
        </span>

        <span className="flex shrink-0 gap-4 font-mono text-xs uppercase tracking-[0.2em] w-24 justify-end">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 transition-colors hover:text-phosphor"
            >
              SRC ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 transition-colors hover:text-phosphor"
            >
              RUN ↗
            </a>
          )}
        </span>
      </div>
    </li>
  );
};

const ArchiveTable = () => (
  <div className="px-6 pb-8 md:px-12">
    <div className="mb-6 flex items-end justify-between border-b-2 border-border pb-4">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
        System Archive Log
      </p>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor transition-colors hover:text-foreground"
      >
        github.com/arianizadi ↗
      </a>
    </div>

    <ul className="border-t border-border mt-[-2px]">
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
    <div className="px-6 md:px-12">
      <SectionHeader
        index="02"
        label="Engineering Portfolio"
        title="Selected Work"
        description="Projects organized around the problem, the system built, and the constraints that shaped it."
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
    <div className="px-6 md:px-12">
      <SectionHeader
        index="04"
        label="Across Computer Science"
        title="More Things I've Built"
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
