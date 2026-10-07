import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Analytics } from "@/components/analytics/Analytics";
import { Effects } from "@/components/fx/Effects";
import type { PaletteCommand } from "@/components/fx/CommandPalette";
import { projects } from "@/content/projects";
import { siteLinks } from "@/content/profile";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { graph, personSchema, websiteSchema } from "@/lib/seo";

// Variable fonts: one file per family, Latin subset, swap with metric-adjusted fallbacks.
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d0e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

const paletteCommands: PaletteCommand[] = [
  { id: "home", group: "Go to", label: "Home", href: "/" },
  { id: "work", group: "Go to", label: "Work", href: "/work" },
  { id: "experience", group: "Go to", label: "Experience", href: "/experience" },
  { id: "about", group: "Go to", label: "About", href: "/about" },
  ...projects.map((p) => ({
    id: p.slug,
    group: "Case studies" as const,
    label: p.name.replace(/\s+[–-]\s+.*/, ""),
    href: `/work/${p.slug}`,
  })),
  { id: "email", group: "Actions", label: "Copy email address", action: "copy-email", value: siteLinks.email },
  { id: "resume", group: "Actions", label: "Open résumé (PDF)", href: siteLinks.resume },
  { id: "github", group: "Actions", label: "GitHub", href: siteLinks.github },
  { id: "linkedin", group: "Actions", label: "LinkedIn", href: siteLinks.linkedin },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <SiteNav />
        <div className="scrollProgress" aria-hidden />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={graph(personSchema, websiteSchema)} />
        <Analytics />
        <Effects commands={paletteCommands} />
      </body>
    </html>
  );
}
