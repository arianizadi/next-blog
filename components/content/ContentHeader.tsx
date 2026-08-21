import Link from "next/link";
import { siteConfig } from "@/app/config/site";

export function ContentHeader({ label }: { label?: string }) {
  return (
    <header className="border-b border-border/80 bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 text-foreground"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 translate-y-[-1px] bg-accent"
          />
          <span className="font-display text-lg leading-none">
            Arian Izadi
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            ← Stage
          </span>
        </Link>
        <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label ? (
            <span aria-hidden className="hidden text-foreground/40 sm:inline">
              {label}
            </span>
          ) : null}
          <Link
            href="/blog"
            className="border-b border-transparent pb-0.5 transition-colors hover:border-accent/60 hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/journey"
            className="border-b border-transparent pb-0.5 transition-colors hover:border-accent/60 hover:text-foreground"
          >
            Journey
          </Link>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border-b border-transparent pb-0.5 transition-colors hover:border-accent/60 hover:text-foreground sm:inline"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </header>
  );
}
