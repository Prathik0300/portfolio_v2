'use client';

import { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/About/AboutSection";
import SkillsSection from "@/components/Skills/SkillsSection";
import ExperienceSection from "@/components/Experience/ExperienceSection";
import ServicesSection from "@/components/Services/ServicesSection";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import Footer from "@/components/Footer/Footer";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function HomePage() {
  useActiveSection();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if this is a page refresh (not a navigation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const legacyNav = (window.performance as { navigation?: { type?: number } }).navigation;
    const isRefresh = navigation?.type === 'reload' || legacyNav?.type === 1; // Fallback for older browsers
    
    const hash = window.location.hash?.replace("#", "");
    
    if (hash) {
      // Let layout paint before scrolling to hash
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (isRefresh) {
      // Only scroll to top on actual page refresh (not navigation)
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if ('scrollRestoration' in window.history) {
      // Enable scroll restoration for navigation (maintains scroll position)
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return (
    <>
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
