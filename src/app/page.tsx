import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ScrollProgress } from "@/components/ui";
import { Hero } from "@/components/home/Hero";
import { ShippedAt } from "@/components/home/ShippedAt";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";
import { Analytics } from "@/components/Analytics/Analytics";

export const metadata: Metadata = {
  alternates: { canonical: "https://prathikpugazhenthi.dev/" },
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <SiteNav />
      <ScrollProgress />
      <main>
        <Hero />
        <ShippedAt />
        <SelectedWork />
        <ExperienceSnapshot />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
