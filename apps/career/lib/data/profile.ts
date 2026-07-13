import { getSupabaseConfig } from "@/lib/data/supabase";

export type SeekerProfile = {
  id?: string;
  user_id: string;
  full_name: string;
  title: string | null;
  location: string | null;
  phone: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  skills: string[];
  experience_summary: string | null;
  education_summary: string | null;
  resume_url: string | null;
  profile_strength: number;
};

export type SeekerApplicationRow = {
  id: string;
  status: "submitted" | "reviewing" | "shortlisted" | "rejected" | "withdrawn";
  applied_at: string;
  cover_note: string | null;
  job: {
    id: string;
    title: string;
    company_name: string;
    location: string;
    job_type: string;
    status: string;
  };
};

function authHeaders(anonKey: string, accessToken: string) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export async function getSeekerProfileById(
  id: string,
  accessToken: string
): Promise<SeekerProfile | null> {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const params = new URLSearchParams({ id: `eq.${id}`, select: "*", limit: "1" });
  const res = await fetch(`${config.url}/rest/v1/seeker_profiles?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const rows = (await res.json()) as SeekerProfile[];
  return rows[0] ?? null;
}

export async function getAllSeekerProfiles(
  accessToken: string
): Promise<SeekerProfile[]> {
  const config = getSupabaseConfig();
  if (!config.ok) return [];

  // Fetch profiles that have a title (completed profiles)
  const params = new URLSearchParams({
    select: "*",
  });
  const res = await fetch(`${config.url}/rest/v1/seeker_profiles?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data as SeekerProfile[];
}

export async function getSeekerProfile(
  userId: string,
  accessToken: string
): Promise<SeekerProfile | null> {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const params = new URLSearchParams({ user_id: `eq.${userId}`, select: "*", limit: "1" });
  const res = await fetch(`${config.url}/rest/v1/seeker_profiles?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const rows = (await res.json()) as SeekerProfile[];
  return rows[0] ?? null;
}

export async function upsertSeekerProfile(
  profile: Omit<SeekerProfile, "id">,
  accessToken: string
): Promise<{ ok: boolean; message?: string }> {
  const config = getSupabaseConfig();
  if (!config.ok) return { ok: false, message: config.reason };

  const res = await fetch(`${config.url}/rest/v1/seeker_profiles?on_conflict=user_id`, {
    method: "POST",
    headers: {
      ...authHeaders(config.anonKey, accessToken),
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      ...profile,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Supabase upsert error:", errorText);
    return { ok: false, message: `Database error: ${errorText}` };
  }

  return { ok: true };
}

export async function getSeekerApplications(
  userId: string,
  accessToken: string
): Promise<SeekerApplicationRow[]> {
  const config = getSupabaseConfig();
  if (!config.ok) return [];

  const seeker = await getSeekerProfile(userId, accessToken);
  if (!seeker?.id) return [];

  const params = new URLSearchParams({
    seeker_id: `eq.${seeker.id}`,
    select: "id,status,cover_note,applied_at,jobs(id,title,company_name,location,job_type,status)",
    order: "applied_at.desc",
  });

  const res = await fetch(`${config.url}/rest/v1/applications?${params}`, {
    headers: authHeaders(config.anonKey, accessToken),
    cache: "no-store",
  });

  if (!res.ok) return [];

  const rows = (await res.json()) as Array<{
    id?: string;
    status?: SeekerApplicationRow["status"];
    cover_note?: string | null;
    applied_at?: string;
    jobs?: {
      id?: string;
      title?: string;
      company_name?: string;
      location?: string;
      job_type?: string;
      status?: string;
    };
  }>;

  return rows.map((row) => ({
    id: row.id ?? "",
    status: row.status ?? "submitted",
    cover_note: row.cover_note ?? null,
    applied_at: row.applied_at ?? "",
    job: {
      id: row.jobs?.id ?? "",
      title: row.jobs?.title ?? "Untitled role",
      company_name: row.jobs?.company_name ?? "BforC Partner",
      location: row.jobs?.location ?? "Remote",
      job_type: row.jobs?.job_type ?? "Full-time",
      status: row.jobs?.status ?? "active",
    },
  }));
}

export function computeProfileStrength(p: Partial<SeekerProfile>): number {
  let score = 0;
  if (p.full_name?.trim())          score += 20;
  if (p.title?.trim())              score += 15;
  if (p.experience_summary?.trim()) score += 20;
  if (p.education_summary?.trim())  score += 10;
  if ((p.skills ?? []).length > 0)  score += 15;
  if (p.linkedin_url?.trim())       score += 10;
  if (p.location?.trim())           score += 5;
  if (p.phone?.trim())              score += 5;
  return score;
}
