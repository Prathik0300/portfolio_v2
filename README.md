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
| Client JS | Two islands: `analytics/Analytics` and `fx/PaletteHost` (Ctrl/Cmd+K). The palette itself is code-split and loads on first use. The nav is a server component, so it has no JS at all. |
| Look | A terminal session: IBM Plex Mono only, Gruvbox colors used semantically (links blue, dates dim, git lanes by employer). No cards, gradients or shadows. Each page is a command: `/` is `cat README.md`, `/projects` is `ls -lt projects/`, `/experience` is `git log --graph`. |
| Motion | Only the typed prompt line (CSS `steps()`) and the caret, both off under `prefers-reduced-motion`. |
| Content | Plain-language copy lives in typed modules under `src/content/` (`profile`, `experience`, `projects/*`). Add a project by adding a file and listing it in `projects/index.ts`; it shows up in `/projects`, the sitemap and the palette. |
| SEO | `src/lib/site.ts` is the single origin. Server-rendered JSON-LD (`lib/seo.ts`), `app/robots.ts`, `app/sitemap.ts`, build-time OG images (`opengraph-image.tsx`), per-page canonicals. |
| Analytics | GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`, loaded `lazyOnload`. Clicks are tracked by one delegated listener reading `data-track="category|label"`. |
| Assets | WebP only, with 800w variants for wide diagrams. `/work` and `/work/:slug` 308-redirect to `/projects/...` in `next.config.ts`. |

## Budgets and checks

```bash
npm run build
npm run budget                       # first-load JS per route vs framework floor (+15 KB app code max)
npm start -- -p 3100 &
npm run lh -- http://localhost:3100  # mobile Lighthouse over the main routes (needs Chrome: CHROME_PATH)
```

Content changes: bump `CONTENT_UPDATED` in `src/lib/site.ts` so the sitemap `lastModified` moves.
