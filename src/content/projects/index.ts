import type { ProjectItem } from "../types";
import { multiAgentPipeline } from "./multi-agent-pipeline";
import { crlitePlus } from "./crlite-plus";
import { programRepair } from "./program-repair";
import { emotionMirror } from "./emotion-mirror";
import { ensogrow } from "./ensogrow";

/** Display order for /work. */
export const projects: ProjectItem[] = [
  multiAgentPipeline,
  crlitePlus,
  programRepair,
  emotionMirror,
  ensogrow,
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
