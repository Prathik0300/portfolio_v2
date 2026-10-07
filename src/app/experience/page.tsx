import type { Metadata } from "next";
import { Shell, Prompt } from "@/components/shell/Shell";
import { GitLog } from "@/components/experience/GitLog";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where I've worked: RadioFX (GKE, CI/CD, a prompt-to-website pipeline), Bajaj Finserv Health (web performance and SEO at scale), and UBS. Shown as a git log.",
};

export default function ExperiencePage() {
  return (
    <Shell current="experience">
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }]))} />
      <Prompt typed cmd="git log --graph --all" path="~/career" />
      <h1 className="srOnly">Experience</h1>
      <GitLog />
    </Shell>
  );
}
