import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectItems } from "@/lib/portfolioData";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ScrollProgress } from "@/components/ui";
import { CaseStudy } from "@/components/work/CaseStudy";
import { ProjectStructuredData } from "@/components/SEO/ProjectStructuredData";

type Props = { params: Promise<{ slug: string }> };

const norm = (v: string) =>
  v.toLowerCase().trim().replace(/%20/g, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function find(slug: string) {
  return (
    projectItems.find(
      (p) => p.slug === slug || norm(p.slug) === norm(slug) || norm(p.name) === norm(slug),
    ) ?? null
  );
}

export function generateStaticParams() {
  return projectItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return { title: "Not found" };
  const url = `https://prathikpugazhenthi.dev/work/${p.slug}`;
  const img =
    p.tileMedia.kind === "image"
      ? `https://prathikpugazhenthi.dev${p.tileMedia.src}`
      : "https://prathikpugazhenthi.dev/prathik-hero.png";
  return {
    title: p.name,
    description: p.detailOverview ?? p.description,
    keywords: [...p.techStack, p.name, "Prathik Pugazhenthi", "case study"],
    alternates: { canonical: url },
    openGraph: {
      title: `${p.name} | Prathik Pugazhenthi`,
      description: p.detailOverview ?? p.description,
      url,
      type: "article",
      images: [{ url: img, width: 1200, height: 630, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title: p.name, description: p.description, images: [img] },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = find(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectStructuredData project={project} />
      <SiteNav />
      <ScrollProgress />
      <main>
        <CaseStudy project={project} />
      </main>
      <SiteFooter />
    </>
  );
}
