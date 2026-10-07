import { redirect, permanentRedirect } from "next/navigation";
import { projectItems } from "@/lib/portfolioData";

type Props = { params: Promise<{ slug: string[] }> };

const norm = (v: string) =>
  v.toLowerCase().trim().replace(/%20/g, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default async function LegacyProjectRedirect({ params }: Props) {
  const { slug } = await params;
  const active = Array.isArray(slug) ? slug[0] : slug;
  const p = projectItems.find(
    (x) => x.slug === active || norm(x.slug) === norm(active) || norm(x.name) === norm(active),
  );
  if (p) permanentRedirect(`/work/${p.slug}`);
  redirect("/work");
}
