import type { Metadata } from "next";
import { Shell, Prompt } from "@/components/shell/Shell";
import { WorkList } from "@/components/rows/WorkList";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Things I've built: a prompt-to-website pipeline on GKE, a Chrome extension for certificate revocation, an LLM that repairs crashes, and a few smaller projects.",
};

export default function WorkPage() {
  return (
    <Shell current="work">
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]))} />
      <Prompt typed cmd="ls -lt work/" path="~" />
      <div className="md">
        <h1>Work</h1>
      </div>
      <div style={{ marginTop: 18 }}>
        <WorkList detailed />
      </div>
    </Shell>
  );
}
