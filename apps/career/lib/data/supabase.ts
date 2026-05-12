type SupabaseConfig =
  | { ok: true; url: string; anonKey: string }
  | { ok: false; reason: string };

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return {
      ok: false,
      reason:
        "Supabase is not configured. Rendering from local seed data instead.",
    };
  }

  return {
    ok: true,
    url: url.replace(/\/$/, ""),
    anonKey,
  };
}

export async function fetchSupabaseRows<T>(
  table: string,
  params: URLSearchParams
) {
  const config = getSupabaseConfig();

  if (!config.ok) {
    return { ok: false as const, reason: config.reason };
  }

  const response = await fetch(`${config.url}/rest/v1/${table}?${params}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false as const,
      reason: `Supabase ${table} query failed with ${response.status}. Rendering from seed data.`,
    };
  }

  return {
    ok: true as const,
    data: (await response.json()) as T[],
  };
}
