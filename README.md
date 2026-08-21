# ariandev.com: SYSTEMS LAB

Personal site of Arian Izadi, embedded and systems software engineer. The
design reads like a precision instrument: graphite surfaces, warm ivory
typography, a single calibration-amber accent, ruler tick-rules, figure
numbering, and an italic serif annotation voice. The hero's signature is a
drafting-style dimension line measuring the name.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Tailwind CSS 4** with a graphite/ivory/amber design token set (`--signal`)
- **framer-motion 12** + `MotionConfig reducedMotion="user"`
- **Lenis**: smooth scrolling
- **Prisma + MongoDB**: blog storage, MDX rendered via `next-mdx-remote`
- **Archivo** (variable, expanded width axis) + **JetBrains Mono** (data only)
  + **Newsreader italic** (annotations)

## Map

```
app/
  page.tsx            Home: Hero → Experience → Selected Work → Capabilities → Wider Bench → Education → Contact
  journey/            Running-log timeline
  blog/               Notebook index + MDX articles
  projects/           308 redirect → /#work
  template.tsx        Route transition (quiet CSS rise)
components/
  Hero.tsx            Name + dimension line + spec plate (no paragraph)
  Experience.tsx      Current post panel + prior roles as ruled entries
  Work.tsx            Featured specimen-sheet rail + project index
  About.tsx           Education + certification
  MergeLog.tsx        Upstream open-source contributions
  CapabilityMatrix.tsx  Capabilities grid
  Contact.tsx         Footer with large email + colophon
  NavBar.tsx          Hairline bar + fullscreen mobile menu
  SmoothScroll.tsx    Lenis provider (hash/focus-aware anchors)
  MotionProvider.tsx  Global reduced-motion handling
  SectionHeader.tsx   Section chrome (index / label, title, annotation, tick-rule)
  Timeline.tsx        Journey page entries on a measurement spine
  Blog*.tsx           Notebook index header, entry rows, article header
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
syncs the schema. Versioned upsert scripts seed the Segmentary and VpnDad posts.

## Accessibility & motion

Reduced-motion users get a fully static experience via `MotionConfig` and
CSS `motion-reduce` fallbacks (the pinned gallery becomes a plain grid, and
short viewports get the same treatment). Server and client markup are
identical, with no hydration divergence.
