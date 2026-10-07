import {
  experienceItems,
  educationItems,
  type ExperienceItem,
  type EducationItem,
} from "@/lib/portfolioData";

/* ---------- date helpers (month precision) ---------- */

const MONTH_MS = 1; // we work in integer "month index" units

/** "YYYY-MM" | "present" -> month index since year 0 */
function monthIndex(v: string): number {
  if (v === "present") {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
  }
  const [y, m] = v.split("-").map(Number);
  return y * 12 + (m - 1);
}

export function monthsBetween(start: string, end: string): number {
  // inclusive of the start month, exclusive of the end month boundary
  return Math.max(0, monthIndex(end) - monthIndex(start) + 1);
}

export function formatDuration(totalMonths: number): string {
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y && m) return `${y}y ${m}m`;
  if (y) return `${y}y`;
  return `${m}m`;
}

/* ---------- career-level counters (all derived) ---------- */

export interface CareerStats {
  totalMonths: number;
  totalLabel: string;
  roleCount: number;
  companyCount: number;
  countryCount: number;
  /** companies where more than one role was held (i.e. moved past entry role) */
  progressionCompanies: number;
  /** total in-company title advances: sum of (roles per company - 1) */
  titleAdvances: number;
}

function countryOf(loc?: string): string {
  if (!loc) return "?";
  if (/india/i.test(loc)) return "India";
  return "USA";
}

export function getCareerStats(items: ExperienceItem[] = experienceItems): CareerStats {
  const totalMonths = items.reduce(
    (sum, it) => sum + monthsBetween(it.start, it.end),
    0,
  );
  const companies = new Set(items.map((it) => it.companyId));
  const countries = new Set(items.map((it) => countryOf(it.location)));
  const perCompany = new Map<string, number>();
  items.forEach((it) =>
    perCompany.set(it.companyId, (perCompany.get(it.companyId) ?? 0) + 1),
  );
  const progressionCompanies = [...perCompany.values()].filter((n) => n > 1).length;
  const titleAdvances = [...perCompany.values()].reduce((a, n) => a + Math.max(0, n - 1), 0);

  return {
    totalMonths,
    totalLabel: formatDuration(totalMonths),
    roleCount: items.length,
    companyCount: companies.size,
    countryCount: countries.size,
    progressionCompanies,
    titleAdvances,
  };
}

/* ---------- activity timeline (gantt) ---------- */

export interface TimelineBar {
  key: string;
  companyId: string;
  label: string;
  leftPct: number;
  widthPct: number;
  lane: number;
}

export interface TimelineModel {
  startYear: number;
  endYear: number;
  years: number[];
  roleBars: TimelineBar[];
  eduBars: TimelineBar[];
}

export function getTimeline(
  items: ExperienceItem[] = experienceItems,
  edu: EducationItem[] = educationItems,
): TimelineModel {
  const startYear = 2021;
  const now = new Date();
  const endYear = now.getFullYear();
  const axisStart = startYear * 12;
  const axisEnd = (endYear + 1) * 12; // pad to end of current year
  const span = axisEnd - axisStart;

  const pct = (v: string) => ((monthIndex(v) - axisStart) / span) * 100;

  // lanes per company so overlapping runs don't collide
  const laneFor: Record<string, number> = { ubs: 0, bfhl: 1, radiofx: 2 };

  const roleBars: TimelineBar[] = items.map((it) => {
    const left = pct(it.start);
    const right = pct(it.end);
    return {
      key: `${it.companyId}-${it.start}`,
      companyId: it.companyId,
      label: `${it.company} — ${it.role}`,
      leftPct: Math.max(0, left),
      widthPct: Math.max(1.2, right - left),
      lane: laneFor[it.companyId] ?? 1,
    };
  });

  // only education that overlaps the visible window and started within/after it
  const eduBars: TimelineBar[] = edu
    .filter((e) => {
      const endIdx = monthIndex(e.end === "present" ? "present" : e.end);
      return endIdx >= axisStart && monthIndex(e.start) >= axisStart - 6;
    })
    .map((e) => {
      const left = pct(e.start);
      const right = pct(e.end === "present" ? "present" : e.end);
      return {
        key: `edu-${e.school}`,
        companyId: "edu",
        label: `${e.degree} · ${e.school}`,
        leftPct: Math.max(0, left),
        widthPct: Math.max(2, right - left),
        lane: 3,
      };
    });

  return {
    startYear,
    endYear,
    years: Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
    roleBars,
    eduBars,
  };
}

/* ---------- stack mix per role ---------- */

export type StackBucket = "platform" | "ai" | "backend";

const BUCKETS: Record<StackBucket, RegExp> = {
  platform: /(k8s|kubernetes|gke|helm|nginx|ingress|cloud build|github actions|docker|gcp|aws|terraform)/i,
  ai: /(gemini|gpt|openai|llm|vercel v0|tensorflow|vision|agent)/i,
  backend: /(nestjs|node|fastify|cassandra|mongo|postgres|redis|typescript|react|amp|elk|sonar|sql|python|alteryx|aris|seo|webpack)/i,
};

export interface StackMix {
  total: number;
  buckets: Array<{ bucket: StackBucket; count: number; items: string[] }>;
}

export function getStackMix(stack: string[] = []): StackMix {
  const result: Record<StackBucket, string[]> = { platform: [], ai: [], backend: [] };
  const order: StackBucket[] = ["platform", "ai", "backend"];
  for (const item of stack) {
    let placed: StackBucket = "backend";
    for (const b of order) {
      if (BUCKETS[b].test(item)) {
        placed = b;
        break;
      }
    }
    result[placed].push(item);
  }
  return {
    total: stack.length,
    buckets: (["platform", "ai", "backend"] as StackBucket[]).map((bucket) => ({
      bucket,
      count: result[bucket].length,
      items: result[bucket],
    })),
  };
}

/* ---------- grouped by company (for the htop rows) ---------- */

export interface CompanyGroup {
  companyId: string;
  company: string;
  location?: string;
  logoSrc?: string;
  roles: ExperienceItem[];
  start: string;
  end: string;
  months: number;
}

export function getCompanyGroups(
  items: ExperienceItem[] = experienceItems,
): CompanyGroup[] {
  const order: string[] = [];
  const map = new Map<string, ExperienceItem[]>();
  items.forEach((it) => {
    if (!map.has(it.companyId)) {
      map.set(it.companyId, []);
      order.push(it.companyId);
    }
    map.get(it.companyId)!.push(it);
  });
  return order.map((id) => {
    const roles = map.get(id)!;
    const starts = roles.map((r) => r.start).sort();
    const ends = roles.map((r) => r.end);
    const end = ends.includes("present")
      ? "present"
      : ends.sort()[ends.length - 1];
    const start = starts[0];
    return {
      companyId: id,
      company: roles[0].company,
      location: roles[0].location,
      logoSrc: roles[0].logoSrc,
      roles,
      start,
      end,
      months: monthsBetween(start, end),
    };
  });
}
