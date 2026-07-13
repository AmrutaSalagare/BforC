import { getSupabaseConfig } from "@/lib/data/supabase";

function authHeaders(anonKey: string, accessToken: string) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export type EmployerProfile = {
  id?: string;
  user_id: string;
  company_name: string;
  slug: string;
  sector: string;
  location: string;
  description: string | null;
  website_url: string | null;
  logo_url: string | null;
  women_friendly_rating: number;
  women_friendly: boolean;
  open_roles: number;
  is_verified: boolean;
  verification_requested_at: string | null;
};

export type DashboardJobRow = {
  id: string;
  title: string;
  location: string;
  job_type: string;
  status: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
  company_name: string;
  is_remote: boolean;
};

export type DashboardApplicantRow = {
  id: string;
  job_id: string;
  seeker_id: string;
  status: "submitted" | "reviewing" | "shortlisted" | "rejected" | "withdrawn";
  cover_note: string | null;
  applied_at: string;
  job_title: string;
  seeker_name: string;
  seeker_title: string | null;
};

export type EmployerDashboardData = {
  activeJobs: number;
  totalJobs: number;
  totalApplicants: number;
  recentJobs: DashboardJobRow[];
  applications: DashboardApplicantRow[];
  applicationsError?: string;
};

export function computeEmployerCompletion(p: EmployerProfile | null): {
  complete: boolean;
  missing: string[];
} {
  if (!p) return { complete: false, missing: ["Organisation name", "Sector", "Location", "Description"] };
  const missing: string[] = [];
  if (!p.company_name?.trim()) missing.push("Organisation name");
  if (!p.sector?.trim())       missing.push("Sector");
  if (!p.location?.trim())     missing.push("Location");
  if (!p.description?.trim())  missing.push("Description");
  return { complete: missing.length === 0, missing };
}

export async function getEmployerProfile(userId: string, accessToken: string): Promise<EmployerProfile | null> {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const params = new URLSearchParams({ user_id: `eq.${userId}`, select: "*", limit: "1" });
  const res = await fetch(`${config.url}/rest/v1/employer_profiles?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const rows = (await res.json()) as EmployerProfile[];
  return rows[0] ?? null;
}

export async function getEmployerJobs(employerId: string, accessToken: string): Promise<DashboardJobRow[]> {
  const config = getSupabaseConfig();
  if (!config.ok) return [];

  const params = new URLSearchParams({
    employer_id: `eq.${employerId}`,
    select: "*",
    order: "created_at.desc",
  });
  const res = await fetch(`${config.url}/rest/v1/jobs?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return [];
  return (await res.json()) as DashboardJobRow[];
}

export async function getEmployerJobIds(employerId: string, accessToken: string): Promise<string[]> {
  const jobs = await getEmployerJobs(employerId, accessToken);
  return jobs.map((j) => j.id);
}

export async function getApplicationsForJobs(
  jobIds: string[],
  accessToken: string
): Promise<{ applications: DashboardApplicantRow[]; error?: string }> {
  if (jobIds.length === 0) return { applications: [] };
  const config = getSupabaseConfig();
  if (!config.ok) return { applications: [], error: config.reason };

  const ids = jobIds.join(",");
  // Join seeker_profiles via the FK applications.seeker_id → seeker_profiles.id
  const params = new URLSearchParams({
    select: "id,job_id,seeker_id,application_status:status,cover_note,applied_at,jobs(title),seeker_profiles(full_name,title)",
    job_id: `in.(${ids})`,
    order: "applied_at.desc",
  });
  const res = await fetch(`${config.url}/rest/v1/applications?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      applications: [],
      error: "We encountered a temporary connection issue while loading applications. Please try again in a few moments.",
    };
  }
  const rows = (await res.json()) as Record<string, unknown>[];
  return { applications: rows.map(mapApplicationRow) };
}

function mapApplicationRow(row: Record<string, unknown>): DashboardApplicantRow {
  const jobData = (row.jobs as Record<string, unknown> | undefined) ?? {};
  const seekerData = (row.seeker_profiles as Record<string, unknown> | undefined) ?? {};
  const statusValue = row.application_status ?? "submitted";
  return {
    id: String(row.id ?? ""),
    job_id: String(row.job_id ?? ""),
    seeker_id: String(row.seeker_id ?? ""),
    status: String(statusValue) as DashboardApplicantRow["status"],
    cover_note: row.cover_note ? String(row.cover_note) : null,
    applied_at: String(row.applied_at ?? ""),
    job_title: String(jobData.title ?? ""),
    seeker_name: String(seekerData.full_name ?? ""),
    seeker_title: seekerData.title ? String(seekerData.title) : null,
  };
}

export async function getEmployerDashboard(
  employerId: string,
  accessToken: string
): Promise<EmployerDashboardData> {
  const jobs = await getEmployerJobs(employerId, accessToken);
  const activeJobs = jobs.filter((j) => j.status === "active");
  const jobIds = jobs.map((j) => j.id);
  const { applications, error } = await getApplicationsForJobs(jobIds, accessToken);

  return {
    activeJobs: activeJobs.length,
    totalJobs: jobs.length,
    totalApplicants: applications.length,
    recentJobs: jobs.slice(0, 5),
    applications,
    applicationsError: error,
  };
}
