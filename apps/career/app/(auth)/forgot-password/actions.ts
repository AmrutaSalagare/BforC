"use server";

import { getSupabaseConfig } from "@/lib/data/supabase";

export type ForgotPasswordState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendPasswordResetAction(
  _state: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const res = await fetch(`${config.url}/auth/v1/recover`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({} as Record<string, unknown>)) as { msg?: string };
    return { status: "error", message: String(err.msg ?? "Failed to send reset email.") };
  }

  return { status: "success", message: "Check your email for a password reset link." };
}
