import { MetadataRoute } from "next";
import { projectItems } from "@/lib/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prathikpugazhenthi.dev";
  const now = new Date();

  const projectUrls = projectItems.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const routes = ["/work", "/experience", "/about"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...routes,
    ...projectUrls,
  ];
}
