import type { Metadata } from "next";
import { Prompt } from "@/components/shell/Shell";
import { ProjectList } from "@/components/rows/ProjectList";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I've built: a prompt-to-website pipeline on GKE, a Chrome extension for certificate revocation, an LLM that repairs crashes, and a few smaller projects.",
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]))} />
      <Prompt typed cmd="ls -lt projects/" path="~" />
      <div className="md">
        <h1>Projects</h1>
      </div>
      <div style={{ marginTop: 18 }}>
        <ProjectList detailed />
      </div>
    </>
  );
}
