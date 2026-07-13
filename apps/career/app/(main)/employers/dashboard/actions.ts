"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getEmployerProfile, computeEmployerCompletion } from "@/lib/data/employer";

export async function requestVerificationAction(formData?: FormData): Promise<void> {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const profile = await getEmployerProfile(session.userId, session.accessToken);
  if (!profile || !profile.id) {
    return;
  }

  const completion = computeEmployerCompletion(profile);
  if (!completion.complete) {
    return;
  }

  const res = await fetch(`${config.url}/rest/v1/employer_profiles?id=eq.${profile.id}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ verification_requested_at: new Date().toISOString() }),
  });

  if (!res.ok) {
    return;
  }

  revalidatePath("/employers/dashboard");
  revalidatePath("/admin/employers");
}
