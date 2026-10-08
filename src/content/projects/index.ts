import type { Project } from "../types";
import { websiteRebuildPipeline } from "./website-rebuild-pipeline";
import { crlitePlus } from "./crlite-plus";
import { ensogrow } from "./ensogrow";
import { emotionMirror } from "./emotion-mirror";
import { programRepair } from "./program-repair";

/** Newest first, like `ls -t`. */
export const projects: Project[] = [websiteRebuildPipeline, crlitePlus, ensogrow, emotionMirror, programRepair].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
