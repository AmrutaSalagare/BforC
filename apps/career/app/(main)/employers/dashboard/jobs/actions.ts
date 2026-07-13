"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerDashboard, getEmployerProfile } from "@/lib/data/employer";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { computeEmployerQuota, ensureSubscriptionExists, getSubscription } from "@/lib/subscriptions/data";
import { isUuid, parseJobStatus } from "@/lib/validation";

export type JobActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function revalidateJobLists() {
  revalidatePath("/employers/dashboard/jobs");
  revalidatePath("/employers/dashboard");
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}

export async function deleteJobAction(formData: FormData): Promise<void> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") return;

  const jobId = formData.get("job_id") as string;
  if (!jobId || !isUuid(jobId)) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const employerProfile = await getEmployerProfile(session.userId, session.accessToken);
  if (!employerProfile?.id) return;

  const params = new URLSearchParams({ id: `eq.${jobId}`, employer_id: `eq.${employerProfile.id}` });
  await fetch(`${config.url}/rest/v1/jobs?${params}`, {
    method: "DELETE",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  revalidateJobLists();
}

export async function updateJobStatusAction(formData: FormData): Promise<void> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") return;

  const jobId = formData.get("job_id") as string;
  const status = parseJobStatus(formData.get("status") as string);
  if (!jobId || !isUuid(jobId) || !status) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const employerProfile = await getEmployerProfile(session.userId, session.accessToken);
  if (!employerProfile?.id) return;

  const currentParams = new URLSearchParams({
    id: `eq.${jobId}`,
    employer_id: `eq.${employerProfile.id}`,
    select: "id,status",
    limit: "1",
  });
  const currentRes = await fetch(`${config.url}/rest/v1/jobs?${currentParams}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });
  if (!currentRes.ok) return;

  const rows = await currentRes.json() as Array<{ id: string; status: string }>;
  const currentJob = rows[0];
  if (!currentJob) return;

  if (status === "active" && currentJob.status !== "active") {
    if (!employerProfile.is_verified) return;

    await ensureSubscriptionExists(session.userId, "employer");
    const subscription = await getSubscription(session.userId, session.accessToken);
    if (subscription) {
      const dashboard = await getEmployerDashboard(employerProfile.id, session.accessToken);
      const quota = computeEmployerQuota(subscription, dashboard.activeJobs);
      if (quota.isAtLimit) return;
    }
  }

  const params = new URLSearchParams({ id: `eq.${jobId}`, employer_id: `eq.${employerProfile.id}` });
  await fetch(`${config.url}/rest/v1/jobs?${params}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      updated_at: new Date().toISOString(),
    }),
  });

  revalidateJobLists();
}
