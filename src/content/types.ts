export interface ExperienceItem {
  /** stable id, used for anchors and keys */
  id: string;
  company: string;
  companyId: string;
  role: string;
  /** ISO "YYYY-MM" */
  start: string;
  /** ISO "YYYY-MM" or "present" */
  end: string;
  location?: string;
  points: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  /** ISO "YYYY-MM" */
  start: string;
  /** ISO "YYYY-MM" or "present" */
  end: string;
  note?: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  subtitle: string;
  images?: Array<{ src: string; alt: string; width: number; height: number }>;
  paragraphs?: string[];
  bullets: string[];
  summary: string;
}

export interface ProjectItem {
  name: string;
  slug: string;
  /** <title> for the case-study page when the card name is too terse */
  seoTitle?: string;
  /** one-liner used on cards */
  blurb?: string;
  /** longer summary used in meta descriptions */
  description: string;
  techStack: string[];
  featured?: boolean;
  flagship?: boolean;
  badge?: string;
  badgeTone?: "amber" | "green" | "faint";
  /** real, measured results only */
  outcomes?: Array<{ value: string; label: string }>;
  detailSubtitle?: string;
  detailDateRange?: string;
  detailOrganization?: { name: string };
  detailAssociation?: string;
  detailProjectType?: string;
  detailTechStack?: string;
  detailOverview?: string;
  detailProblem?: string;
  detailMotivation?: string;
  detailSolution?: string;
  detailSolutionPoints?: string[];
  detailHighlights?: string[];
  detailReflectionOutcomes?: string;
  detailReflectionMoreTime?: string;
  detailDesignProcessSteps?: ProjectStep[];
  detailLinks?: Array<{ label: string; url: string; icon: "paper" | "github" | "chrome" | "website" }>;
}
