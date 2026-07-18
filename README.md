# arianizadi.com — PERCEPTION

Personal site of Arian Izadi, systems engineer. The whole experience is
art-directed as the output of a machine perception stack: live detection HUD
over autonomous-vehicle footage, captured-frame project gallery, git-style
merge log, and a boot-log journey page.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Tailwind CSS 3** with a custom phosphor-on-near-black design token set
- **framer-motion 12** — scroll-driven galleries, scan reveals, scramble text
- **Lenis** — smooth scrolling
- **Prisma + MongoDB** — blog storage, MDX rendered via `next-mdx-remote`
- **Archivo** (variable, expanded width axis) + **JetBrains Mono**

## Map

```
app/
  page.tsx            Home: Hero HUD → Work → About → Merge Log → Stack → Contact
  journey/            Boot-log timeline
  blog/               Field-log index + MDX articles
  template.tsx        Route transition (scanline sweep)
components/
  Hero.tsx            Video + live detection HUD (telemetry, lock-on, scanline)
  Work.tsx            Pinned horizontal gallery + project archive table
  About.tsx           Bio, education, employment log
  MergeLog.tsx        Open-source contributions as patch entries
  CapabilityMatrix.tsx  Stack modules
  Contact.tsx         Footer with marquee + giant email
  Preloader.tsx       Boot sequence (once per session, skippable)
  CustomCursor.tsx    Crosshair + coordinate readout (fine pointers only)
  SmoothScroll.tsx    Lenis provider
  ScrambleText.tsx    Decode-in text primitive
  SectionHeader.tsx   Section chrome (index // label + giant display title)
  Timeline.tsx        Journey page boot log
  Blog*.tsx           Blog index header, field-log rows, article header
  ReadingProgress.tsx Article progress rail
lib/
  portfolio.ts        All content data (projects, experience, OSS, stack, education)
  motion.ts           Shared easing
```

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run check      # lint + typecheck + production build
```

Blog posts live in MongoDB (see `prisma/schema.prisma`); `bun run db:push`
syncs the schema and `bun run post:vpndad` seeds a post.

## Accessibility & motion

Reduced-motion users get a fully static experience: no Lenis, no HUD
choreography, no scramble, no pinned gallery (falls back to a vertical grid).
The preloader is skippable (click / Enter / Escape) and runs once per session.
