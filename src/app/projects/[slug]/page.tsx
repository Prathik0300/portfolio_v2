import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Prompt } from "@/components/shell/Shell";
import { Article } from "@/components/projects/Article";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph, projectSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Everything is known at build time; unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = p.seoTitle ?? p.name;
  return {
    title,
    description: p.description,
    openGraph: { type: "article", title, description: p.description },
    twitter: { title, description: p.description },
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
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
          projectSchema(project),
        )}
      />
      <Prompt typed cmd={`cat ${project.file}.md`} path="~/projects" />
      <Article project={project} />
    </>
  );
}
