import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { projects, type Project } from "@/lib/portfolio";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em]">
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
  </div>
);

const FrameCard = ({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) => (
  <article className="work-pin-card group relative flex h-full w-[86vw] shrink-0 flex-col border border-border bg-card md:w-[56vw] lg:w-[44vw] xl:w-[40vw]">
    {/* Captured frame */}
    <div className="relative aspect-video w-full overflow-hidden border-b border-border">
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 86vw, (max-width: 1024px) 56vw, (max-width: 1280px) 44vw, 40vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,10,0.25),transparent_40%,rgba(4,7,10,0.55))]" />
      <p className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/70">
        {project.eyebrow}
      </p>
    </div>

    {/* Analysis */}
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-foreground wrap-anywhere md:text-4xl">
        {project.title}
      </h3>
      <p className="mt-4 hidden text-sm leading-6 text-foreground/60 sm:block">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
          Problem —
        </span>
        {project.problem}
      </p>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
        {project.contribution}
      </p>
      <p className="mt-3 border-l border-phosphor/50 pl-3 font-mono text-[11px] leading-5 text-phosphor/80">
        → {project.impact}
      </p>

      <div className="mt-auto pt-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
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
    <section className="work-pin-section relative h-[380vh]">
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
        <div className="work-pin-progress absolute inset-x-6 bottom-8 flex items-center gap-6 md:inset-x-12">
          <p className="font-mono text-[10px] tracking-[0.26em] text-foreground/50">
            01 —{" "}
            {String(featured.length).padStart(2, "0")}
          </p>
          <div className="relative h-px flex-1 bg-border">
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
    <li className="group border-b border-border transition-colors hover:bg-foreground/3">
      <div className="flex items-center gap-5 py-5 md:gap-8">
        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/50">
          P.{String(featured.length + index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight text-foreground transition-colors wrap-anywhere group-hover:text-phosphor md:truncate md:text-2xl">
                {project.title}
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55 md:hidden">
                {project.eyebrow}
              </span>
            </a>
          ) : (
            <>
              <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight text-foreground wrap-anywhere md:truncate md:text-2xl">
                {project.title}
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55 md:hidden">
                {project.eyebrow}
              </span>
            </>
          )}
        </div>

        <span className="hidden w-40 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55 md:block">
          {project.eyebrow}
        </span>
        <span className="hidden w-56 shrink-0 truncate text-right font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50 lg:block">
          {project.technologies.slice(0, 3).join(" · ")}
        </span>

        <span className="flex shrink-0 gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/55 transition-colors hover:text-phosphor"
            >
              Code ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/55 transition-colors hover:text-phosphor"
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
    <div className="mb-6 flex items-end justify-between border-t border-border pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-phosphor/80">
        {"//"} Full archive
      </p>
      <a
        href="https://github.com/arianizadi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50 transition-colors hover:text-phosphor"
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
  <section id="work" className="relative scroll-mt-16 py-24 md:py-32">
    {/* Legacy anchor alias: old /#projects links still land here */}
    <span id="projects" aria-hidden className="absolute -top-24" />
    <div className="px-6 md:px-12">
      <SectionHeader
        index="01"
        label="Captured Frames"
        title="Selected Work"
        description="Frames pulled from the stream: packet tunnels, segmentation research, bare-metal kernels. Each one is a problem that got captured, processed, and shipped."
      />
    </div>
    <HorizontalGallery />
    <ArchiveTable />
  </section>
);

export default Work;
