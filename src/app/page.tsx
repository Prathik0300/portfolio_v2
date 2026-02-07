"use client";

import { useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/About/AboutSection";
import SkillsSection from "@/components/Skills/SkillsSection";
import ExperienceSection from "@/components/Experience/ExperienceSection";
import ServicesSection from "@/components/Services/ServicesSection";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import Footer from "@/components/Footer/Footer";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Analytics } from "@/components/Analytics/Analytics";

export default function HomePage() {
  useActiveSection();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const legacyNav = (window.performance as { navigation?: { type?: number } }).navigation;
    const isRefresh = navigation?.type === "reload" || legacyNav?.type === 1;

    const hash = window.location.hash?.replace("#", "");

    if (hash) {
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (isRefresh) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}