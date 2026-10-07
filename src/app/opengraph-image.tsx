import { ogCard, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Prathik Pugazhenthi, AI Platform & Infrastructure Engineer";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "AI Platform & Infrastructure Engineer",
    title: "Prathik Pugazhenthi",
    footer: "Multi-agent pipelines · Kubernetes · CI/CD",
  });
}
