'use client';

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
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:16',message:'HomePage render entry',data:{isSSR:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
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

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:45',message:'before Analytics render',data:{isSSR:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
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
