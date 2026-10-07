# SEO notes

- **Origin:** `src/lib/site.ts` (`SITE_URL`). Must match the Vercel primary domain (`www`). Every canonical, sitemap URL, robots host, OG image and JSON-LD id derives from it.
- **Metadata:** root defaults in `src/app/layout.tsx` (`alternates.canonical: "./"` resolves per route); each page sets `title` + a 140–160 char `description`. Projects use `seoTitle` when the name is too terse.
- **Structured data:** `<JsonLd>` (server component). Layout emits `Person` + `WebSite`; `/about` adds `ProfilePage`; case studies add `BreadcrumbList` + `TechArticle`.
- **Crawl:** `app/robots.ts`, `app/sitemap.ts`. Unknown routes render `app/not-found.tsx` (noindex).
- **Social cards:** `app/opengraph-image.tsx` and `app/projects/[slug]/opengraph-image.tsx` (generated at build, in the site's terminal style, using the Plex Mono TTFs in `src/assets/fonts`).
- **After deploy:** submit `https://www.prathikpugazhenthi.dev/sitemap.xml` in Search Console, then test a page in the Rich Results Test.
