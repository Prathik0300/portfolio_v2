import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ogCard, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Project write-up by Prathik Pugazhenthi";
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return ogCard({ command: `cat work/${p.file}.md`, title: p.name, lines: [p.dateLabel, p.stack.slice(0, 3).join(", ")] });
}
