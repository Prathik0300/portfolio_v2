import { Hero } from "@/components/home/Hero";
import { ShippedAt } from "@/components/home/ShippedAt";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ShippedAt />
      <SelectedWork />
      <ExperienceSnapshot />
      <Stack />
      <Contact />
    </>
  );
}
