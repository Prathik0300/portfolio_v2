export interface ExperienceItem {
  id: string;
  company: string;
  companyId: "radiofx" | "bfhl" | "ubs";
  role: string;
  /** ISO "YYYY-MM" */
  start: string;
  /** ISO "YYYY-MM" or "present" */
  end: string;
  location?: string;
  /** `lead` is the headline of the point; `detail` is the supporting line. */
  points: Array<{ lead: string; detail?: string }>;
}

export interface EducationItem {
  school: string;
  degree: string;
  start: string;
  end: string;
  note?: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "figure"; src: string; alt: string; width: number; height: number; caption: string };

export interface Section {
  title: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  /** short filename shown in the prompt: `cat <file>.md` */
  file: string;
  name: string;
  /** <title> when the name alone is too terse */
  seoTitle?: string;
  /** one line, used in lists */
  blurb: string;
  /** meta description, 140-160 chars */
  description: string;
  /** last month worked on, "YYYY-MM"; used for ordering */
  date: string;
  dateLabel: string;
  where: string;
  stack: string[];
  links: Array<{ label: string; url: string }>;
  sections: Section[];
}
