import { getSupabaseConfig } from "@/lib/data/supabase";
import { getSeekerLimit, getEmployerJobLimit } from "@/lib/subscriptions/tiers";

export type Subscription = {
  id: string;
  user_id: string;
  role: "seeker" | "employer";
  tier: string;
  status: "active" | "cancelled" | "expired" | "past_due";
  applications_used: number;
  jobs_posted_used: number;
  period_start: string;
  period_end: string;
};

export type SubscriptionQuota = {
  subscription: Subscription;
  limit: number;
  used: number;
  remaining: number;
  isAtLimit: boolean;
  percentUsed: number;
};

/**
 * Fetch a user's active subscription using their JWT (RLS-protected).
 * Returns null if no subscription found (should not happen after DB trigger).
 */
export async function getSubscription(
  userId: string,
  accessToken: string
): Promise<Subscription | null> {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const params = new URLSearchParams({
    user_id: `eq.${userId}`,
    status: "eq.active",
    limit: "1",
  });

  const res = await fetch(`${config.url}/rest/v1/subscriptions?${params}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const rows = await res.json() as Subscription[];
  return rows[0] ?? null;
}

/**
 * Get subscription via service role key (for server actions that need to check
 * another user's quota, e.g. when employer posts a job).
 */
export async function getSubscriptionAdmin(userId: string): Promise<Subscription | null> {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;

  const params = new URLSearchParams({
    user_id: `eq.${userId}`,
    status: "eq.active",
    limit: "1",
  });

  const res = await fetch(`${config.url}/rest/v1/subscriptions?${params}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const rows = await res.json() as Subscription[];
  return rows[0] ?? null;
}

/**
 * Compute quota details for a seeker (application limits).
 */
export function computeSeekerQuota(subscription: Subscription): SubscriptionQuota {
  const limit = getSeekerLimit(subscription.tier);
  const used = subscription.applications_used;
  const remaining = Math.max(0, limit - used);
  return {
    subscription,
    limit,
    used,
    remaining,
    isAtLimit: used >= limit,
    percentUsed: limit === 0 ? 100 : Math.min(100, Math.round((used / limit) * 100)),
  };
}
/**
 * Compute quota details for an employer (active job limits).
 */
export function computeEmployerQuota(subscription: Subscription, activeJobsCount: number): SubscriptionQuota {
  const limit = getEmployerJobLimit(subscription.tier);
  const remaining = limit === Infinity ? Infinity : Math.max(0, limit - activeJobsCount);
  return {
    subscription,
    limit,
    used: activeJobsCount,
    remaining,
    isAtLimit: limit !== Infinity && activeJobsCount >= limit,
    percentUsed: limit === Infinity ? 0 : limit === 0 ? 100 : Math.min(100, Math.round((activeJobsCount / limit) * 100)),
  };
}
/**
 * Increment the applications_used counter after a successful application.
 * Uses service role so it always works regardless of RLS.
 */
export async function incrementApplicationsUsed(subscriptionId: string): Promise<void> {
  const config = getSupabaseConfig();
  if (!config.ok) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;

  const selectParams = new URLSearchParams({ id: `eq.${subscriptionId}`, select: "applications_used", limit: "1" });
  const currentRes = await fetch(`${config.url}/rest/v1/subscriptions?${selectParams}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });
  if (!currentRes.ok) return;

  const rows = await currentRes.json() as Array<{ applications_used: number }>;
  const nextCount = (rows[0]?.applications_used ?? 0) + 1;

  const params = new URLSearchParams({ id: `eq.${subscriptionId}` });
  await fetch(`${config.url}/rest/v1/subscriptions?${params}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ applications_used: nextCount }),
  });
}

/**
 * Upsert a free subscription for a user if one doesn't already exist.
 * Called as a fallback — the DB trigger should handle this normally.
 */
export async function ensureSubscriptionExists(
  userId: string,
  role: "seeker" | "employer"
): Promise<void> {
  const config = getSupabaseConfig();
  if (!config.ok) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;

  await fetch(`${config.url}/rest/v1/subscriptions`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      user_id: userId,
      role,
      tier: "free",
      status: "active",
    }),
  });
}
