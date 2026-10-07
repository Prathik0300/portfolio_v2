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
| Rendering | Every route is static (SSG). Server Components by default; `/work/[slug]` uses `generateStaticParams` + `dynamicParams = false`. |
| Client JS | Three islands only: `chrome/SiteNav` (active link + mobile menu), `analytics/Analytics`, `fx/Effects` (text scramble, count-up, ⌘K palette). The palette itself is code-split and loads on first use. |
| Motion | CSS first: hero typing (`steps()`), scroll reveals and the progress bar via `animation-timeline`, all behind `prefers-reduced-motion`. Content is always visible without them. |
| Content | Typed modules in `src/content/` (`profile`, `experience`, `projects/*`). Add a project by adding a file and listing it in `projects/index.ts`. |
| SEO | `src/lib/site.ts` is the single origin. Server-rendered JSON-LD (`lib/seo.ts`), `app/robots.ts`, `app/sitemap.ts`, build-time OG images (`opengraph-image.tsx`), per-page canonicals. |
| Analytics | GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`, loaded `lazyOnload`. Clicks are tracked by one delegated listener reading `data-track="category|label"`. |
| Assets | WebP only, with 800w variants for wide diagrams. `/projects/:slug` 308-redirects to `/work/:slug` in `next.config.ts`. |

## Budgets and checks

```bash
npm run build
npm run budget                       # first-load JS per route vs framework floor (+15 KB app code max)
npm start -- -p 3100 &
npm run lh -- http://localhost:3100  # mobile Lighthouse over the main routes (needs Chrome: CHROME_PATH)
```

Content changes: bump `CONTENT_UPDATED` in `src/lib/site.ts` so the sitemap `lastModified` moves.
