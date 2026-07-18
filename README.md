# arianizadi.com — PERCEPTION

Personal site of Arian Izadi, systems engineer. A minimalist dark experience
with a single machine-perception signature: a detection lock-on over
autonomous-vehicle footage in the hero. Everything else is typography,
whitespace, and quiet mono accents.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Tailwind CSS 3** with a custom phosphor-on-near-black design token set
- **framer-motion 12** + `MotionConfig reducedMotion="user"`
- **Lenis** — smooth scrolling
- **Prisma + MongoDB** — blog storage, MDX rendered via `next-mdx-remote`
- **Archivo** (variable, expanded width axis) + **JetBrains Mono**

## Map

```
app/
  page.tsx            Home: Hero → Work → About → Merge Log → Stack → Contact
  journey/            Boot-log timeline
  blog/               Field-log index + MDX articles
  projects/           308 redirect → /#work
  template.tsx        Route transition (quiet CSS rise)
components/
  Hero.tsx            Video + single detection lock-on on the name
  Work.tsx            Pinned horizontal gallery + project archive table
  About.tsx           Bio, education, employment log
  MergeLog.tsx        Open-source contributions
  CapabilityMatrix.tsx  Stack grid
  Contact.tsx         Footer with giant email
  NavBar.tsx          Slim mono bar + fullscreen mobile menu
  SmoothScroll.tsx    Lenis provider (hash/focus-aware anchors)
  MotionProvider.tsx  Global reduced-motion handling
  ScrambleText.tsx    Decode-in text (hero name only)
  SectionHeader.tsx   Section chrome (index // label + display title)
  Timeline.tsx        Journey page entries
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

Reduced-motion users get a fully static experience via `MotionConfig` and
CSS `motion-reduce` fallbacks (the pinned gallery becomes a plain grid, and
short viewports get the same treatment). Server and client markup are
identical — no hydration divergence.
