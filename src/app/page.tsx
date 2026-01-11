'use client';

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
