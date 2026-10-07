import type { Metadata } from "next";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ScrollProgress } from "@/components/ui";
import { ExperienceMonitor } from "@/components/Experience/ExperienceMonitor";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Six roles across RadioFX, Bajaj Finserv Health and UBS, shown as a process monitor: tenure, focus, stack mix and outcomes — every number derived from the role data.",
  alternates: { canonical: "https://prathikpugazhenthi.dev/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <ExperienceMonitor />
      </main>
      <SiteFooter />
    </>
  );
}
