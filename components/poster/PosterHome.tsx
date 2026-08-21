"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { experiences, projects, techGroups } from "@/lib/portfolio";
import { siteConfig } from "@/app/config/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Sculpture from "@/components/poster/Sculpture";

/* ------------------------------------------------------------------ */
/* Deck data                                                           */
/* ------------------------------------------------------------------ */

const SCENES = [
  { id: "hero", index: "01", label: "Signal" },
  { id: "work", index: "02", label: "Work" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "systems", index: "04", label: "Systems" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

const CAROUSEL_IDS = [1, 13, 15, 8, 16, 2];
const carouselProjects = CAROUSEL_IDS.map((id) => {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Missing project ${id} in lib/portfolio.ts`);
  return project;
});

/* Orbital map: dominant core + two rings, all facts from lib/portfolio.ts */
const CORE_SKILLS = ["C/C++", "Linux", "Embedded Systems"];
const INNER_ORBIT = [
  "Real-Time Systems",
  "Multithreaded Systems",
  "Networking",
  "Rust",
  "RISC-V",
];
const OUTER_ORBIT = [
  "QEMU",
  "GDB",
  "CMake/CTest",
  "Google Test",
  "Assembly",
  "UART",
  "Hardware Integration",
  "LiDAR",
  "PCL",
  "Robotics",
];

const EMAIL = "izadi2000@gmail.com";
const CONTACT_LINKS = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Resume", href: siteConfig.links.resume },
  { label: "Blog", href: "/blog", internal: true },
  { label: "Journey", href: "/journey", internal: true },
  { label: "X", href: siteConfig.links.x },
];

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function EdgeLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "type-pixel pointer-events-none absolute z-20 hidden select-none text-[12px] text-poster-dim md:block",
        className
      )}
    >
      {children}
    </p>
  );
}

function SceneShell({
  id,
  hue,
  labelledBy,
  className,
  children,
}: {
  id: SceneId;
  hue: string;
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      style={{ "--scene-a": hue } as React.CSSProperties}
      className={cn(
        "poster-scene relative flex min-h-dvh flex-col overflow-hidden",
        className
      )}
    >
      <div className="poster-ambient" />
      <div className="poster-grid" />
      {children}
    </section>
  );
}

function SceneHeading({
  id,
  kicker,
  children,
  className,
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative z-10", className)}>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.4em] text-cyan">
        {kicker}
      </p>
      <h2
        id={id}
        className="font-display text-[clamp(2.6rem,7.5vw,6.5rem)] font-black uppercase leading-[0.9] tracking-tight text-poster-fg"
      >
        {children}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — Hero                                                           */
/* ------------------------------------------------------------------ */

function HeroScene() {
  return (
    <SceneShell id="hero" hue="var(--cyan)" labelledBy="hero-heading">
      {/* Giant identity type behind the sculpture */}
      <span
        aria-hidden="true"
        className="type-outline pointer-events-none absolute left-1/2 top-[25%] z-0 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(4.5rem,15.5vw,15rem)] font-black uppercase leading-none tracking-tight md:top-[9%]"
      >
        Arian
      </span>
      <span
        aria-hidden="true"
        className="type-outline-cyan pointer-events-none absolute bottom-[5%] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(2.6rem,9vw,8.5rem)] font-black uppercase leading-none tracking-tight"
      >
        Systems / Engineer
      </span>

      {/* The sculpture consumes the center of the viewport */}
      <Sculpture className="absolute left-1/2 top-[54%] z-[5] h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:h-[78vmin] md:w-[78vmin]" />

      {/* Front plane: solid crop of the name overlapping the object */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[25%] z-10 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(4.5rem,15.5vw,15rem)] font-black uppercase leading-none tracking-tight text-poster-fg [clip-path:inset(58%_0_0_0)] md:top-[9%]"
      >
        Arian
      </span>

      {/* Identity + role on opposing edges */}
      <div className="relative z-20 flex flex-1 flex-col justify-between p-5 pt-20 md:p-10 md:pt-24">
        <div className="flex items-start justify-between gap-6">
          <div className="poster-rise max-w-[16rem]">
            <h1 id="hero-heading" className="sr-only">
              Arian Izadi — Systems Engineer
            </h1>
            <p className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-poster-fg md:text-xl">
              Arian Izadi
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-poster-dim">
              Las Vegas, NV
            </p>
          </div>
          <div className="poster-rise max-w-[17rem] text-right [animation-delay:120ms]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
              Currently
            </p>
            <p className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-tight text-poster-fg md:text-xl">
              Embedded Software Engineer II
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.28em] text-poster-dim">
              Konami Gaming, Inc.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 pb-28 md:pb-2">
          <p className="poster-rise max-w-xs text-[15px] leading-6 text-poster-dim [animation-delay:200ms]">
            C/C++ · Linux · real-time systems · robotics. Low-level software
            that has to hold up on hardware.
          </p>
          <EdgeLabel className="bottom-6 right-2 hidden rotate-90 md:block" >
            SYS.PORTFOLIO ©2026
          </EdgeLabel>
          <p
            aria-hidden="true"
            className="poster-rise hidden font-mono text-xs uppercase tracking-[0.3em] text-poster-dim [animation-delay:260ms] md:block"
          >
            Scroll ↓ 02 Work
          </p>
        </div>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Work: spatial poster carousel                                  */
/* ------------------------------------------------------------------ */

function WorkScene() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const slideBaseId = useId();
  const count = carouselProjects.length;

  const go = useCallback(
    (next: number) => setActive(((next % count) + count) % count),
    [count]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(count - 1);
    }
  };

  return (
    <SceneShell id="work" hue="var(--teal)" labelledBy="work-heading">
      <EdgeLabel className="left-2 top-1/2 -rotate-90">
        02 / SPATIAL.DECK
      </EdgeLabel>

      <div className="relative z-10 flex flex-1 flex-col p-5 pt-20 md:p-10 md:pt-24">
        <SceneHeading id="work-heading" kicker="02 // Selected systems">
          Work
        </SceneHeading>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mt-6 flex flex-1 flex-col outline-offset-4 md:mt-2"
        >
          {/* Spatial deck */}
          <div className="relative min-h-[26rem] flex-1 md:min-h-0">
            {carouselProjects.map((project, i) => {
              const isActive = i === active;
              const isNext = i === (active + 1) % count;
              const isPrev = i === (active - 1) % count;
              const hidden = !isActive && !isNext && !isPrev;
              return (
                <motion.article
                  key={project.id}
                  id={`${slideBaseId}-slide-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${project.title}`}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={
                    isActive
                      ? { x: "0%", y: "0%", rotate: 0, scale: 1, opacity: 1 }
                      : isNext
                        ? { x: "16%", y: "7%", rotate: 5, scale: 0.9, opacity: 0.55 }
                        : isPrev
                          ? { x: "-18%", y: "-5%", rotate: -6, scale: 0.9, opacity: 0.4 }
                          : { x: "0%", y: "16%", rotate: 0, scale: 0.85, opacity: 0 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.6, ease: easeOutExpo }
                  }
                  style={{
                    zIndex: isActive ? 30 : isNext ? 20 : isPrev ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                    visibility: hidden ? "hidden" : "visible",
                  }}
                  className="absolute inset-0"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-poster-fg/12 bg-panel/85 shadow-[0_40px_120px_-30px_hsl(187_100%_50%/0.25)] backdrop-blur-md md:flex-row">
                    {/* Visual plane: project-specific iridescent geometry */}
                    <div
                      aria-hidden="true"
                      className="relative h-40 shrink-0 overflow-hidden md:h-auto md:w-[46%]"
                      style={{
                        background: `radial-gradient(120% 120% at ${18 + i * 13}% 20%, hsl(${(188 + i * 24) % 360} 100% 58% / 0.5), transparent 60%), radial-gradient(110% 110% at 85% 90%, hsl(${(268 + i * 18) % 360} 90% 60% / 0.45), transparent 62%), hsl(266 45% 7%)`,
                      }}
                    >
                      <span className="type-outline absolute left-4 top-3 select-none font-display text-[clamp(3rem,7vw,6rem)] font-black leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <svg
                        viewBox="0 0 200 200"
                        className="absolute bottom-4 right-4 h-24 w-24 opacity-80 md:h-32 md:w-32"
                        focusable="false"
                      >
                        <circle cx="100" cy="100" r="72" fill="none" stroke="hsl(0 0% 100% / 0.35)" strokeWidth="2" strokeDasharray="10 8" />
                        <circle cx="100" cy="100" r="42" fill="none" stroke="hsl(0 0% 100% / 0.5)" strokeWidth="2" />
                        <rect x="88" y="88" width="24" height="24" fill="hsl(0 0% 100% / 0.6)" transform={`rotate(${i * 15} 100 100)`} />
                      </svg>
                      <span className="type-pixel absolute bottom-4 left-4 select-none text-[12px] text-poster-fg/70">
                        {project.eyebrow}
                      </span>
                    </div>

                    {/* Details layer */}
                    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5 md:justify-center md:gap-4 md:p-8">
                      <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-black uppercase leading-[0.95] tracking-tight text-poster-fg">
                        {project.title}
                      </h3>
                      <p className="max-w-xl text-[15px] leading-6 text-poster-dim md:text-base md:leading-7">
                        {project.contribution}
                      </p>
                      <p className="max-w-xl text-[15px] leading-6 text-poster-fg/85">
                        {project.impact}
                      </p>
                      <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                        {project.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-cyan/40 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-cyan"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      {(project.githubUrl || project.liveUrl) && (
                        <div className="flex flex-wrap gap-4 pt-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isActive ? 0 : -1}
                              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-poster-fg underline decoration-cyan/60 underline-offset-4 transition-colors hover:text-cyan"
                            >
                              Source <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isActive ? 0 : -1}
                              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-poster-fg underline decoration-magenta/60 underline-offset-4 transition-colors hover:text-magenta"
                            >
                              Live <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Controls */}
          <div className="relative z-40 mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-poster-fg/25 text-poster-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-poster-fg/25 text-poster-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="ml-2 font-mono text-xs uppercase tracking-[0.3em] text-poster-dim">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
            <div role="tablist" aria-label="Select project" className="flex items-center gap-2">
              {carouselProjects.map((project, i) => (
                <button
                  key={project.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`${slideBaseId}-slide-${i}`}
                  aria-label={project.title}
                  onClick={() => go(i)}
                  className="group flex h-8 min-w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      i === active
                        ? "w-8 bg-cyan"
                        : "w-2.5 bg-poster-fg/25 group-hover:bg-poster-fg/50"
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="hidden font-mono text-xs uppercase tracking-[0.24em] text-poster-dim md:block">
              ← → to navigate
            </p>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Experience: typographic collage                                */
/* ------------------------------------------------------------------ */

function ExperienceScene() {
  const [konami, ...rest] = experiences;
  return (
    <SceneShell id="experience" hue="var(--magenta)" labelledBy="experience-heading">
      <EdgeLabel className="right-2 top-1/2 rotate-90">
        03 / CREDIT.ROLL
      </EdgeLabel>

      <div className="relative z-10 flex flex-1 flex-col p-5 pt-20 md:p-10 md:pt-24">
        <SceneHeading id="experience-heading" kicker="03 // Roles">
          Experience
        </SceneHeading>

        <div className="relative mt-8 flex flex-1 flex-col justify-center md:mt-0">
          {/* Supporting layers behind Konami */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none md:block">
            <span className="type-outline absolute right-[2%] top-[2%] font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none">
              Credit One
            </span>
            <span className="type-outline-cyan absolute left-[4%] top-[38%] font-display text-[clamp(2rem,4.5vw,4rem)] font-black uppercase leading-none">
              Koshee AI
            </span>
            <span className="type-outline absolute bottom-[6%] right-[12%] font-display text-[clamp(1.8rem,4vw,3.5rem)] font-black uppercase leading-none">
              Code Central
            </span>
          </div>

          {/* Dominant layer: Konami */}
          <div className="poster-rise relative max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.34em] text-magenta">
              {konami.dates} · {konami.location}
            </p>
            <h3 className="mt-3 font-display text-[clamp(2.4rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-tight text-poster-fg">
              Konami
            </h3>
            <p className="mt-2 font-display text-[clamp(1.2rem,3vw,2.2rem)] font-bold uppercase leading-tight tracking-tight text-cyan">
              {konami.role}
            </p>
            <ul className="mt-6 max-w-2xl space-y-2.5 border-l-2 border-cyan/50 pl-5">
              {konami.bulletPoints.map((point) => (
                <li key={point} className="text-[15px] leading-6 text-poster-fg/85 md:text-base">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting layers: readable panels */}
          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {rest.map((item, i) => (
              <div
                key={item.company}
                className={cn(
                  "poster-rise border border-poster-fg/12 bg-panel/70 p-5 backdrop-blur-sm",
                  i === 1 && "md:-translate-y-4",
                  i === 2 && "md:translate-y-3"
                )}
                style={{ animationDelay: `${140 + i * 90}ms` }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-poster-dim">
                  {item.dates}
                </p>
                <h4 className="mt-2 font-display text-xl font-black uppercase leading-tight tracking-tight text-poster-fg md:text-2xl">
                  {item.company}
                </h4>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  {item.role}
                </p>
                <p className="mt-3 text-[13px] leading-5 text-poster-dim">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Systems: radial / orbital skill map                            */
/* ------------------------------------------------------------------ */

function OrbitRing({
  items,
  radiusClass,
  duration,
  reverse,
  accent,
}: {
  items: string[];
  radiusClass: string;
  duration: number;
  reverse?: boolean;
  accent: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2",
        radiusClass
      )}
      style={{ containerType: "size" }}
    >
      <div
        className="poster-spin-slow relative h-full w-full motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((skill, i) => {
          const angle = (i / items.length) * 360;
          return (
            <span
              key={skill}
              className="absolute left-1/2 top-1/2 block"
              style={{
                transform: `rotate(${angle}deg) translateX(50cqw) rotate(${-angle}deg) translate(-50%, -50%)`,
                transformOrigin: "0 0",
              }}
            >
              <span
                className="block whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-poster-fg/90"
                style={{
                  borderColor: accent,
                  background: "hsl(266 42% 8% / 0.85)",
                }}
              >
                {skill}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SystemsScene() {
  const groups = techGroups.slice(0, 4);
  return (
    <SceneShell id="systems" hue="var(--violet)" labelledBy="systems-heading">
      <EdgeLabel className="left-2 top-1/2 -rotate-90">
        04 / ORBITAL.MAP
      </EdgeLabel>

      <div className="relative z-10 flex flex-1 flex-col p-5 pt-20 md:p-10 md:pt-24">
        <SceneHeading id="systems-heading" kicker="04 // Capability field">
          Systems
        </SceneHeading>

        <div className="relative mt-4 flex flex-1 flex-col items-center md:mt-0 md:flex-row md:items-center md:gap-10">
          {/* Orbital diagram */}
          <div
            role="img"
            aria-label="Skill map centered on C/C++, Linux, and embedded systems, orbited by real-time, networking, Rust, RISC-V, and supporting tooling."
            className="relative mt-8 h-[21rem] w-[21rem] shrink-0 sm:h-[24rem] sm:w-[24rem] md:mt-0 md:h-[30rem] md:w-[30rem]"
          >
            {/* ring guides */}
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/25" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet/30" />

            {/* dominant core */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan/60 bg-[radial-gradient(circle_at_38%_30%,hsl(187_100%_55%/0.35),hsl(266_48%_6%))] text-center shadow-[0_0_90px_-10px_hsl(187_100%_50%/0.5)]">
              {CORE_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="font-display text-[clamp(0.95rem,1.9vw,1.5rem)] font-black uppercase leading-tight tracking-tight text-poster-fg"
                >
                  {skill}
                </span>
              ))}
            </div>

            <OrbitRing items={INNER_ORBIT} radiusClass="w-[64%]" duration={38} accent="hsl(187 100% 55% / 0.45)" />
            <OrbitRing items={OUTER_ORBIT} radiusClass="w-[100%]" duration={64} reverse accent="hsl(262 78% 58% / 0.45)" />
          </div>

          {/* Factual group panels */}
          <div className="mt-10 grid w-full max-w-xl gap-3 md:mt-0">
            {groups.map((group, i) => (
              <div
                key={group.id}
                className="poster-rise flex items-baseline justify-between gap-4 border-b border-poster-fg/12 pb-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div>
                  <h3 className="font-display text-base font-black uppercase tracking-tight text-poster-fg md:text-lg">
                    {group.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-poster-dim">
                    {group.skills.join(" · ")}
                  </p>
                </div>
                <span aria-hidden="true" className="type-pixel select-none text-[12px] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Contact: neon closing poster                                   */
/* ------------------------------------------------------------------ */

function ContactScene() {
  return (
    <SceneShell id="contact" hue="var(--cyan)" labelledBy="contact-heading" className="!min-h-dvh">
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 pt-20 md:p-10 md:pt-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-teal">
          05 // Open a channel
        </p>

        <div className="py-10">
          <h2
            id="contact-heading"
            className="font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.86] tracking-tight"
          >
            <span className="block text-poster-fg">Say</span>
            <span className="block text-transparent [-webkit-text-stroke:2px_hsl(187_100%_55%)]">
              Hello
            </span>
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-8 inline-flex max-w-full min-h-11 items-baseline gap-3"
          >
            <span className="wrap-anywhere font-display text-[clamp(1.1rem,3.4vw,2.4rem)] font-bold uppercase leading-none tracking-tight text-poster-fg transition-colors group-hover:text-cyan">
              {EMAIL}
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-cyan transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>

        <nav aria-label="Contact links" className="border-t border-poster-fg/12 pt-6">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                {link.internal ? (
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-mono text-xs font-semibold uppercase tracking-[0.24em] text-poster-dim transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-poster-dim transition-colors hover:text-cyan"
                  >
                    {link.label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-poster-dim">
            Las Vegas, NV — Embedded Software Engineer II, Konami Gaming, Inc.
          </p>
        </nav>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* Poster rail + corner index menu                                     */
/* ------------------------------------------------------------------ */

function IndexMenu() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    window.__lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const menu = document.getElementById("poster-index");
      const items = Array.from(
        menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
      const controls = [toggleRef.current, ...items].filter(
        (c): c is HTMLElement => Boolean(c)
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const focusFirst = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(focusFirst);
      document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/* Compact corner glyph — not a conventional navbar */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="poster-index"
        aria-label={open ? "Close index" : "Open scene index"}
        className="fixed bottom-5 right-5 z-[120] flex h-12 w-12 items-center justify-center rounded-full border border-cyan/50 bg-void/80 text-cyan shadow-[0_0_30px_-6px_hsl(187_100%_50%/0.6)] backdrop-blur-md transition-transform hover:scale-105 md:bottom-8 md:right-8"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="8" height="8" rx="1" />
            <rect x="11" y="1" width="8" height="8" rx="1" opacity="0.55" />
            <rect x="1" y="11" width="8" height="8" rx="1" opacity="0.55" />
            <rect x="11" y="11" width="8" height="8" rx="4" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="poster-index"
            role="dialog"
            aria-modal="true"
            aria-label="Scene index"
            data-lenis-prevent
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) calc(100% - 3rem))" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 3rem) calc(100% - 3rem))" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) calc(100% - 3rem))" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: easeOutExpo }}
            className="fixed inset-0 z-[110] flex flex-col justify-center overflow-y-auto bg-void/97 px-6 py-20 backdrop-blur-xl md:px-16"
          >
            <nav aria-label="Scenes">
              <ul className="mx-auto w-full max-w-4xl">
                {SCENES.map((scene, i) => (
                  <motion.li
                    key={scene.id}
                    initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : 0.15 + i * 0.06,
                      ease: easeOutExpo,
                    }}
                  >
                    <a
                      href={`#${scene.id}`}
                      ref={i === 0 ? firstLinkRef : undefined}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-b border-poster-fg/12 py-4 md:py-5"
                    >
                      <span className="type-pixel shrink-0 text-[12px] text-cyan">
                        {scene.index}
                      </span>
                      <span className="font-display text-[clamp(2rem,7vw,4.5rem)] font-black uppercase leading-none tracking-tight text-poster-fg transition-colors group-hover:text-cyan">
                        {scene.label}
                      </span>
                    </a>
                  </motion.li>
              ))}
              </ul>
            </nav>
            <div className="mx-auto mt-10 flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.24em] text-poster-dim">
              <span>Arian Izadi — Systems Engineer</span>
              <div className="flex gap-5">
                <Link href="/blog" onClick={() => setOpen(false)} className="text-poster-dim transition-colors hover:text-cyan">
                  Blog
                </Link>
                <Link href="/journey" onClick={() => setOpen(false)} className="text-poster-dim transition-colors hover:text-cyan">
                  Journey
                </Link>
                <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer" className="text-cyan">
                  Resume ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */

export default function PosterHome() {
  return (
    <div className="poster-rail relative bg-void text-poster-fg">
      <IndexMenu />
      <HeroScene />
      <WorkScene />
      <ExperienceScene />
      <SystemsScene />
      <ContactScene />
    </div>
  );
}
