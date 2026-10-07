import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudy } from "@/components/work/CaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph, projectSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Everything is known at build time; unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const clip = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = clip(p.detailOverview ?? p.description);
  const title = p.seoTitle ?? p.name.replace(/\s+[–-]\s+.*/, "");
  return {
    title,
    description,
    openGraph: { type: "article", title, description },
    twitter: { title, description },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${project.slug}` },
          ]),
          projectSchema(project),
        )}
      />
      <CaseStudy project={project} />
    </>
  );
}
