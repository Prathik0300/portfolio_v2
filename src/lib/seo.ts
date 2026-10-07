import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { siteLinks, stackItems } from "@/content/profile";
import type { ProjectItem } from "@/content/types";

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: SITE_NAME,
  jobTitle: "AI Platform & Infrastructure Engineer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: `mailto:${siteLinks.email}`,
  image: absoluteUrl("/prathik.webp"),
  sameAs: [siteLinks.github, siteLinks.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chicago",
    addressRegion: "IL",
    addressCountry: "US",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Illinois Chicago" },
    { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
  ],
  worksFor: { "@type": "Organization", name: "RadioFX, Inc." },
  knowsAbout: stackItems,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: { "@id": personId },
};

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const breadcrumb = (items: Array<{ name: string; path: string }>) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const projectSchema = (p: ProjectItem) => ({
  "@type": "TechArticle",
  headline: p.name,
  description: p.detailOverview ?? p.description,
  url: absoluteUrl(`/work/${p.slug}`),
  mainEntityOfPage: absoluteUrl(`/work/${p.slug}`),
  image: absoluteUrl(`/work/${p.slug}/opengraph-image`),
  author: { "@id": personId },
  keywords: p.techStack.join(", "),
  inLanguage: "en-US",
});
