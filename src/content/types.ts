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
  id: string;
  school: string;
  /** short form for lists, e.g. "MS, Computer Science" */
  degree: string;
  /** full name used as the commit title on /experience */
  title: string;
  location: string;
  start: string;
  end: string;
  /** one short line for the about page, e.g. the GPA */
  note?: string;
  points: Array<{ lead: string; detail?: string }>;
}

/** A picture on the page. `diagram` and `screenshot` are counted separately for the media line on /projects. */
export interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  kind: "diagram" | "screenshot";
}

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | ({ type: "figure" } & Figure)
  | { type: "gallery"; items: Figure[] }
  | { type: "video"; src: string; poster: string; width: number; height: number; caption: string }
  /** a short row of real result numbers */
  | { type: "facts"; items: Array<{ value: string; label: string }> }
  /** a one-line takeaway under a section */
  | { type: "callout"; text: string };

interface Section {
  title: string;
  /** a dim line under the heading */
  subtitle?: string;
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
  role: string;
  /** the 20-second version: what was wrong, what I built, what came out of it */
  glance: { problem: string; built: string; result: string };
  stack: string[];
  links: Array<{ label: string; url: string }>;
  sections: Section[];
}
