# ariandev.com: RESEARCH CONSOLE

Personal site of Arian Izadi, embedded and systems software engineer. The design
is a research notebook meets systems control surface: a warm paper document with
hairline rules, mono annotations, and vermilion red-ink accents, punctuated by
dark instrument panels — the hero's system profile, the featured-work bay, and
code blocks read like hardware embedded in the page.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Tailwind CSS 4** (CSS-first config) with a paper/ink/vermilion token set
  plus dark `panel` tokens for instrument surfaces
- **framer-motion 12** + `MotionConfig reducedMotion="user"`
- **Lenis**: smooth scrolling
- **Prisma + MongoDB**: blog storage, MDX rendered via `next-mdx-remote`
- **Instrument Serif** (display) + **JetBrains Mono** (console) + **Archivo** (body)

## Visual system

- Paper background with faint graph-grid fields and registration marks
- `§ NN / LABEL` mono eyebrows, serif display titles, figure numbering (`F.NN`,
  `P.NN`, `E.NN`), dot leaders, and a red "CURRENT" stamp on the active role
- One accent color (annotation vermilion) used for ink strokes, traces, and
  links; dark `panel-*` tokens are reserved for control-surface moments
- The featured-work gallery remains a CSS View Timeline pinned horizontal track
  with static fallbacks for reduced motion, short viewports, and old browsers

## Map

```
app/
  page.tsx            Home: Hero → index strip → Experience → Selected Work →
                      Skills → Appendix (archive + merge log) → Education → Contact
  journey/            Lab-notebook timeline ending in a terminal [NOW] panel
  blog/               Field-notes index + MDX articles (dark code blocks)
  projects/           308 redirect → /#work
  template.tsx        Route transition (quiet CSS rise)
components/
  Hero.tsx            Console `whoami` prompt, serif name with animated red
                      ink stroke, dark system-profile instrument panel
  Experience.tsx      Current role field record + previous-roles ledger
  Work.tsx            Dark instrument-bay gallery + appendix index with leaders
  About.tsx           Education + certification
  MergeLog.tsx        Open-source contributions (upstream patches)
  CapabilityMatrix.tsx  Spec-sheet skill rows
  Contact.tsx         Correspondence footer with giant email
  NavBar.tsx          Slim paper bar + fullscreen mobile menu
  SmoothScroll.tsx    Lenis provider (hash/focus-aware anchors)
  MotionProvider.tsx  Global reduced-motion handling
  ScrambleText.tsx    Decode-in text (hero console prompt)
  SectionHeader.tsx   Section chrome (§ index + serif title, paper/panel tones)
  Timeline.tsx        Journey page entries
  Blog*.tsx           Blog index rows, article header
  ReadingProgress.tsx Article progress rail
lib/
  portfolio.ts        All content data (projects, experience, OSS, stack, education)
  motion.ts           Shared easing
```

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run check      # lint + typecheck + production build (needs DATABASE_URL)
```

Blog posts live in MongoDB (see `prisma/schema.prisma`); `bun run db:push`
syncs the schema. Versioned upsert scripts seed the Segmentary and VpnDad posts.

## Accessibility & motion

Reduced-motion users get a fully static experience via `MotionConfig` and
CSS `motion-reduce` fallbacks (the pinned gallery becomes a plain grid, and
short viewports get the same treatment). The layout includes a skip-to-content
link, and the mobile menu traps focus, closes on Escape, and restores focus.
Server and client markup are identical, with no hydration divergence.
