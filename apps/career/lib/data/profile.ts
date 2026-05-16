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

function authHeaders(anonKey: string, accessToken: string) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
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

  const res = await fetch(`${config.url}/rest/v1/seeker_profiles`, {
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
    const err = await res.json().catch(() => ({})) as { message?: string };
    return { ok: false, message: err.message ?? `Save failed (${res.status})` };
  }

  return { ok: true };
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
