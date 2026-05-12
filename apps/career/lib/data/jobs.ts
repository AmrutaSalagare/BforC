import { fetchSupabaseRows } from "@/lib/data/supabase";
import { seedJobs } from "@/lib/data/seed";
import type { Job, JobQuery, JobType } from "@/lib/data/types";

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
};

function mapJobRow(row: SupabaseJobRow): Job {
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
  };
}

function filterSeedJobs(jobs: Job[], query: JobQuery) {
  const search = query.q?.trim().toLowerCase();
  const location = query.location?.trim().toLowerCase();
  const type = query.type?.trim();

  return jobs.filter((job) => {
    if (search) {
      const haystack = [job.title, job.company, job.location, ...job.tags]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(search)) return false;
    }

    if (location) {
      const locationHaystack = `${job.location} ${job.isRemote ? "remote" : ""}`.toLowerCase();
      if (!locationHaystack.includes(location)) return false;
    }

    if (query.remoteOnly && !job.isRemote) return false;
    if (type && job.type !== type) return false;

    return true;
  });
}

export async function getJobs(query: JobQuery = {}) {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "created_at.desc");
  params.set("limit", String(query.limit ?? 50));

  if (query.remoteOnly) params.set("is_remote", "eq.true");
  if (query.type) params.set("job_type", `eq.${query.type}`);
  if (query.location) params.set("location", `ilike.*${query.location}*`);
  if (query.q) params.set("or", `(title.ilike.*${query.q}*,company_name.ilike.*${query.q}*)`);

  const result = await fetchSupabaseRows<SupabaseJobRow>("jobs", params);
  const jobs = result.ok ? result.data.map(mapJobRow) : filterSeedJobs(seedJobs, query);

  return {
    jobs: query.limit ? jobs.slice(0, query.limit) : jobs,
    source: result.ok ? ("supabase" as const) : ("seed" as const),
  };
}

export async function getFeaturedJobs(limit = 6) {
  return getJobs({ limit });
}
