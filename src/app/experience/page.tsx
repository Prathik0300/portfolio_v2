import type { Metadata } from "next";
import { Prompt } from "@/components/shell/Shell";
import { GitLog } from "@/components/experience/GitLog";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where I've worked: RadioFX (GitOps on GKE, a Kafka API platform, an AI site-rebuild pipeline), Bajaj Finserv Health (80,000-doctor annotation platform, web performance) and UBS. Shown as a git log.",
};

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }]))} />
      <Prompt typed cmd="git log --graph --all" path="~/career" />
      <h1 className="srOnly">Experience</h1>
      <GitLog />
    </>
  );
}
