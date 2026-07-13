"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminSession } from "@/lib/auth/admin";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { sendAccountApprovedEmail } from "@/lib/email/triggers/account-approved";
import { isUuid } from "@/lib/validation";

type UpdatedEmployerProfile = {
  user_id?: string;
  company_name?: string;
};

export async function verifyEmployerAction(formData: FormData): Promise<void> {
  const session = await getVerifiedAdminSession();
  if (!session) return;

  const employerId = formData.get("employer_id") as string;
  if (!employerId || !isUuid(employerId)) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;

  // Update verified status and clear requested_at
  const res = await fetch(`${config.url}/rest/v1/employer_profiles?id=eq.${employerId}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ is_verified: true, verification_requested_at: null }),
  });

  if (!res.ok) {
    return;
  }

  const updatedRows = await res.json() as UpdatedEmployerProfile[];
  const profile = updatedRows[0];

  // Send verification email
  if (profile && profile.user_id) {
    const userRes = await fetch(`${config.url}/auth/v1/admin/users/${profile.user_id}`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      if (userData.email) {
        sendAccountApprovedEmail({
          to: userData.email,
          employerName: userData.user_metadata?.full_name ?? "there",
          companyName: profile.company_name ?? "your organization",
        }).catch(() => {}); // Fire and forget
      }
    }
  }

  revalidatePath("/admin/employers");
}

export async function rejectEmployerAction(formData: FormData): Promise<void> {
  const session = await getVerifiedAdminSession();
  if (!session) return;

  const employerId = formData.get("employer_id") as string;
  if (!employerId || !isUuid(employerId)) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;

  // For rejection, we simply ensure is_verified is false and clear requested_at
  const res = await fetch(`${config.url}/rest/v1/employer_profiles?id=eq.${employerId}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_verified: false, verification_requested_at: null }),
  });

  if (!res.ok) {
    return;
  }

  revalidatePath("/admin/employers");
}
