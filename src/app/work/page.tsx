import type { Metadata } from "next";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ScrollProgress } from "@/components/ui";
import { WorkIndex } from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: a multi-agent AI website pipeline on GKE, a shipped certificate-revocation extension, LLM program repair, and more — each with the constraint, the system, and the measured outcome.",
  alternates: { canonical: "https://prathikpugazhenthi.dev/work" },
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <WorkIndex />
      </main>
      <SiteFooter />
    </>
  );
}
