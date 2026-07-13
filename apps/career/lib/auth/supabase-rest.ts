import type { UserRole } from "@/lib/auth/types";

type SupabaseUser = {
  id: string;
  email?: string;
  confirmed_at?: string | null;
  identities?: Array<{ id?: string; provider?: string }> | null;
  user_metadata?: {
    full_name?: string;
    role?: UserRole;
  };
};

type SupabaseAuthSuccess = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: SupabaseUser;
};

type SupabaseAuthResult =
  | { ok: true; data: SupabaseAuthSuccess }
  | { ok: false; message: string };

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return {
      ok: false as const,
      message:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    };
  }

  return {
    ok: true as const,
    url: url.replace(/\/$/, ""),
    anonKey,
  };
}

function authHeaders(anonKey: string) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    "Content-Type": "application/json",
  };
}

async function parseSupabaseResponse(response: Response): Promise<SupabaseAuthResult> {
  const text = await response.text().catch(() => "");
  let payload: (SupabaseAuthSuccess & { message?: string; error_description?: string; error?: string }) | null = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    // non-JSON response (e.g. HTML error page, paused project)
  }

  if (!response.ok) {
    const message =
      payload?.error_description ??
      payload?.message ??
      payload?.error ??
      (text ? `Server error (${response.status}): ${text.slice(0, 120)}` : `Request failed with status ${response.status}`);

    return { ok: false, message };
  }

  return { ok: true, data: payload ?? {} };
}

export async function signInWithPassword(email: string, password: string) {
  const config = getSupabaseConfig();

  if (!config.ok) {
    return config;
  }

  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: authHeaders(config.anonKey),
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  return parseSupabaseResponse(response);
}

export async function signUpWithPassword(input: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const config = getSupabaseConfig();

  if (!config.ok) {
    return config;
  }

  const response = await fetch(`${config.url}/auth/v1/signup`, {
    method: "POST",
    headers: authHeaders(config.anonKey),
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      data: {
        full_name: input.fullName,
        role: input.role,
      },
    }),
    cache: "no-store",
  });

  return parseSupabaseResponse(response);
}
