import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { PaletteHost } from "@/components/fx/PaletteHost";
import { SiteFooter, SiteHeader } from "@/components/shell/Shell";
import type { PaletteCommand } from "@/components/fx/CommandPalette";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/content/projects";
import { siteLinks } from "@/content/profile";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { graph, personSchema, websiteSchema } from "@/lib/seo";

// One family, two weights, Latin subset: about 30 KB of font in total.
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "600"], display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1d2021" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", locale: "en_US", siteName: SITE_NAME, title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

const clean = (n: string) => n.replace(/\s+[–-]\s+.*/, "");
const paletteCommands: PaletteCommand[] = [
  { id: "home", group: "Go to", label: "~ (home)", href: "/" },
  { id: "projects", group: "Go to", label: "projects/", href: "/projects" },
  { id: "experience", group: "Go to", label: "experience (git log)", href: "/experience" },
  { id: "about", group: "Go to", label: "about", href: "/about" },
  ...projects.map((p) => ({ id: p.slug, group: "Projects" as const, label: clean(p.name), href: `/projects/${p.slug}` })),
  { id: "email", group: "Actions", label: "copy email address", action: "copy-email", value: siteLinks.email },
  { id: "resume", group: "Actions", label: "open résumé (pdf)", href: siteLinks.resume },
  { id: "github", group: "Actions", label: "github", href: siteLinks.github },
  { id: "linkedin", group: "Actions", label: "linkedin", href: siteLinks.linkedin },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <a href="#main" className="skipLink">Skip to content</a>
        <SiteHeader />
        <main id="main" className="page">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={graph(personSchema, websiteSchema)} />
        <Analytics />
        <PaletteHost commands={paletteCommands} />
      </body>
    </html>
  );
}
