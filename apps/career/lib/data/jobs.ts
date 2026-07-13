import { fetchSupabaseRows } from "@/lib/data/supabase";
import type { Job, JobQuery, JobType } from "@/lib/data/types";
import { seedJobs } from "./seed";

type SupabaseJobRow = {
  id: string;
  title: string;
  company_name?: string;
  location?: string;
  is_remote?: boolean;
  salary_min?: number;
  salary_max?: number;
  tags?: string[];
  women_friendly?: boolean;
  posted_days_ago?: number;
  job_type?: JobType;
  type?: JobType;
  employer_profiles?: { is_verified?: boolean } | { is_verified?: boolean }[];
};

function mapJobRow(row: SupabaseJobRow): Job {
  let isVerified = false;
  if (Array.isArray(row.employer_profiles)) {
    isVerified = Boolean(row.employer_profiles[0]?.is_verified);
  } else if (row.employer_profiles) {
    isVerified = Boolean(row.employer_profiles.is_verified);
  }

  return {
    id: row.id,
    title: row.title,
    company: row.company_name ?? "BforC Partner",
    location: row.location ?? "Remote",
    isRemote: Boolean(row.is_remote),
    salaryMin: row.salary_min ?? 0,
    salaryMax: row.salary_max ?? 0,
    tags: Array.isArray(row.tags) ? row.tags : [],
    womenFriendly: Boolean(row.women_friendly),
    postedDaysAgo: row.posted_days_ago ?? 0,
    type: row.job_type ?? row.type ?? "Full-time",
    isVerified,
  };
}

function cleanFilterTerm(value: string) {
  return value.replace(/[^\p{L}\p{N}\s.-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

export async function getJobs(query: JobQuery = {}) {
  const params = new URLSearchParams();
  params.set("select", "*,employer_profiles(is_verified)");
  params.set("order", "created_at.desc");
  params.set("limit", String(query.limit ?? 50));

  if (query.remoteOnly) params.set("is_remote", "eq.true");
  if (query.type) params.set("job_type", `eq.${query.type}`);
  const location = query.location ? cleanFilterTerm(query.location) : "";
  const q = query.q ? cleanFilterTerm(query.q) : "";
  if (location) params.set("location", `ilike.*${location}*`);
  if (q) params.set("or", `(title.ilike.*${q}*,company_name.ilike.*${q}*)`);

  const result = await fetchSupabaseRows<SupabaseJobRow>("jobs", params);

  if (!result.ok) {
    let filteredJobs = [...seedJobs];
    if (query.remoteOnly) {
      filteredJobs = filteredJobs.filter(j => j.isRemote);
    }
    if (query.type) {
      filteredJobs = filteredJobs.filter(j => j.type === query.type);
    }
    if (query.location) {
      const loc = cleanFilterTerm(query.location).toLowerCase();
      filteredJobs = filteredJobs.filter(j => j.location.toLowerCase().includes(loc));
    }
    if (query.q) {
      const term = cleanFilterTerm(query.q).toLowerCase();
      filteredJobs = filteredJobs.filter(j => j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term));
    }
    return {
      jobs: query.limit ? filteredJobs.slice(0, query.limit) : filteredJobs,
      source: "seed" as const,
    };
  }

  return {
    jobs: query.limit ? result.data.slice(0, query.limit).map(mapJobRow) : result.data.map(mapJobRow),
    source: "supabase" as const,
  };
}

export async function getFeaturedJobs(limit = 6) {
  return getJobs({ limit });
}
