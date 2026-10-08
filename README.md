# prathikpugazhenthi.dev

Personal portfolio. Next.js 16 (App Router) + React 19, fully static, deployed on Vercel.
Canonical host is **www.prathikpugazhenthi.dev** (Vercel redirects the apex to www).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Architecture

| Area | Decision |
|---|---|
| Rendering | Every route is static (SSG). Server Components by default; `/projects/[slug]` uses `generateStaticParams` + `dynamicParams = false`. |
| Client JS | Small islands only: `analytics/Analytics`, `fx/PaletteHost` (Ctrl/Cmd+K, also copies the address on mailto clicks; the palette itself is code-split), `shell/NavLinks` (active tab), and on project pages `SectionSpy` (contents highlight) and `Lightbox` (the zoom overlay loads on first click). Everything else is a server component. |
| Look | A terminal session: IBM Plex Mono only, Gruvbox colors used semantically (links blue, dates dim, git lanes by employer). No cards, gradients or shadows. Each page is a command: `/` is `cat README.md`, `/projects` is `ls -lt projects/`, `/experience` is `git log --graph`. |
| Motion | CSS first: the typed prompt (`steps()`), menu-style hovers, scroll-driven git lanes and meter, smooth `<details>`. All of it sits behind `prefers-reduced-motion` and `@supports`, and the finished state works without it. |
| Content | Plain-language copy lives in typed modules under `src/content/` (`profile`, `experience`, `projects/*`). Add a project by adding a file and listing it in `projects/index.ts`; it shows up in `/projects` (with a media line counted from its figures), the sitemap and the palette. Project pages are built from blocks (paragraphs, steps, figures, galleries, facts) plus an at-a-glance block; see `content/types.ts`. |
| SEO | `src/lib/site.ts` is the single origin. Server-rendered JSON-LD (`lib/seo.ts`), `app/robots.ts`, `app/sitemap.ts`, build-time OG images (`opengraph-image.tsx`), per-page canonicals. |
| Analytics | GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`, loaded `lazyOnload`. Clicks are tracked by one delegated listener reading `data-track="category|label"`. |
| Assets | Project diagrams are SVG drawn by `scripts/diagrams.mjs` (`npm run diagrams` writes `public/img/diagrams/`); screenshots are WebP, with 800w variants for wide ones. No AI-generated images. `/work` and `/work/:slug` 308-redirect to `/projects/...` in `next.config.ts`. |

## Budgets and checks

```bash
npm run build
npm run budget                       # first-load JS per route vs framework floor (+15 KB app code max)
npm start -- -p 3100 &
npm run lh -- http://localhost:3100  # mobile Lighthouse over the main routes (needs Chrome: CHROME_PATH)
```

Content changes: bump `CONTENT_UPDATED` in `src/lib/site.ts` so the sitemap `lastModified` moves.
