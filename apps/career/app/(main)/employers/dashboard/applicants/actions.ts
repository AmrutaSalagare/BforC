"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { sendApplicationStatusUpdateEmail } from "@/lib/email/triggers/application-status-update";
import { APPLICATION_STATUSES, isUuid } from "@/lib/validation";

const VALID_STATUSES = APPLICATION_STATUSES;
type ApplicationStatus = typeof VALID_STATUSES[number];

const EMAIL_STATUSES: ApplicationStatus[] = ["reviewing", "shortlisted", "rejected", "withdrawn"];

export async function updateApplicationStatusAction(formData: FormData): Promise<void> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") return;

  const applicationId = formData.get("application_id") as string;
  const status = formData.get("status") as string;

  if (!applicationId || !isUuid(applicationId) || !VALID_STATUSES.includes(status as ApplicationStatus)) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const params = new URLSearchParams({ id: `eq.${applicationId}` });
  const res = await fetch(`${config.url}/rest/v1/applications?${params}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
      // Return the updated row so we can send email with context
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status }),
  });

  revalidatePath("/employers/dashboard/applicants");
  revalidatePath("/employers/dashboard");
  revalidatePath("/dashboard");

  // Fire status update email to seeker — non-blocking
  if (res.ok && EMAIL_STATUSES.includes(status as ApplicationStatus)) {
    const rows = await res.json().catch(() => []) as Array<{
      job_id: string;
      seeker_id: string;
    }>;
    const application = rows[0];
    if (!application) return;

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return;

    const serviceHeaders = {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    };

    // Fetch seeker user_id from seeker_profiles
    const seekerRes = await fetch(
      `${config.url}/rest/v1/seeker_profiles?${new URLSearchParams({
        select: "user_id,full_name",
        id: `eq.${application.seeker_id}`,
        limit: "1",
      })}`,
      { headers: serviceHeaders, cache: "no-store" }
    ).catch(() => null);

    if (!seekerRes?.ok) return;
    const seekerRows = await seekerRes.json() as Array<{ user_id: string; full_name: string }>;
    const seeker = seekerRows[0];
    if (!seeker) return;

    // Fetch job details
    const jobRes = await fetch(
      `${config.url}/rest/v1/jobs?${new URLSearchParams({
        select: "title,company_name",
        id: `eq.${application.job_id}`,
        limit: "1",
      })}`,
      { headers: { ...serviceHeaders, Authorization: `Bearer ${session.accessToken}` }, cache: "no-store" }
    ).catch(() => null);

    if (!jobRes?.ok) return;
    const jobRows = await jobRes.json() as Array<{ title: string; company_name: string }>;
    const job = jobRows[0];
    if (!job) return;

    // Get seeker email via admin API
    const userRes = await fetch(`${config.url}/auth/v1/admin/users/${seeker.user_id}`, {
      headers: serviceHeaders,
    }).catch(() => null);

    if (!userRes?.ok) return;
    const userData = await userRes.json() as { email?: string };
    if (!userData.email) return;

    sendApplicationStatusUpdateEmail({
      to: userData.email,
      seekerName: seeker.full_name,
      jobTitle: job.title,
      companyName: job.company_name,
      newStatus: status as "reviewing" | "shortlisted" | "rejected" | "withdrawn",
    }).catch(() => {});
  }
}
