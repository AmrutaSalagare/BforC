import { getCurrentSession, type CurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";

type SupabaseUserResponse = {
  id?: string;
};

export async function getVerifiedAdminSession(): Promise<CurrentSession | null> {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return null;

  const config = getSupabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!config.ok || !serviceKey) return null;

  const userRes = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  }).catch(() => null);

  if (!userRes?.ok) return null;
  const user = await userRes.json() as SupabaseUserResponse;
  if (!user.id || user.id !== session.userId) return null;

  const adminParams = new URLSearchParams({ id: `eq.${user.id}`, select: "id", limit: "1" });
  const adminRes = await fetch(`${config.url}/rest/v1/super_admins?${adminParams}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  }).catch(() => null);

  if (!adminRes?.ok) return null;
  const rows = await adminRes.json() as Array<{ id: string }>;
  return rows[0]?.id === user.id ? session : null;
}
