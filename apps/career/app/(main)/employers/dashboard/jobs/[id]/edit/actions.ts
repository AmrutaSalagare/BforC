"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getEmployerDashboard, getEmployerProfile } from "@/lib/data/employer";
import { computeEmployerQuota, ensureSubscriptionExists, getSubscription } from "@/lib/subscriptions/data";
import { isUuid, parseJobForm } from "@/lib/validation";

export type EditJobActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function updateJobAction(
  _state: EditJobActionState,
  formData: FormData
): Promise<EditJobActionState> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") redirect("/login");

  const jobId = formData.get("job_id") as string;
  if (!jobId || !isUuid(jobId)) return { status: "error", message: "Invalid job ID." };

  const parsed = parseJobForm(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const job = parsed.value;

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const employerProfile = await getEmployerProfile(session.userId, session.accessToken);
  if (!employerProfile?.id) {
    return { status: "error", message: "Complete your company profile before editing jobs." };
  }

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

  if (!currentRes.ok) {
    return { status: "error", message: "Could not verify this job before updating. Please try again." };
  }

  const currentRows = await currentRes.json() as Array<{ id: string; status: string }>;
  const currentJob = currentRows[0];
  if (!currentJob) {
    return { status: "error", message: "Job not found or you do not have permission to edit it." };
  }

  if (job.status === "active" && currentJob.status !== "active") {
    if (!employerProfile.is_verified) {
      return { status: "error", message: "Your company must be verified before publishing jobs." };
    }

    await ensureSubscriptionExists(session.userId, "employer");
    const subscription = await getSubscription(session.userId, session.accessToken);
    if (subscription) {
      const dashboard = await getEmployerDashboard(employerProfile.id, session.accessToken);
      const quota = computeEmployerQuota(subscription, dashboard.activeJobs);
      if (quota.isAtLimit) {
        const tierName = subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1);
        return {
          status: "error",
          message: `You've reached your limit of ${quota.limit} active job postings on the ${tierName} plan. Pause or close another job, or upgrade your plan.`,
        };
      }
    }
  }

  const body: Record<string, unknown> = {
    title: job.title,
    location: job.location,
    job_type: job.jobType,
    status: job.status,
    salary_min: job.salaryMin,
    salary_max: job.salaryMax,
    is_remote: job.location.toLowerCase().includes("remote"),
    women_friendly: job.womenFriendly,
    description: job.description,
    updated_at: new Date().toISOString(),
  };

  if (job.tags.length > 0) body.tags = job.tags;

  const params = new URLSearchParams({ id: `eq.${jobId}`, employer_id: `eq.${employerProfile.id}` });
  const res = await fetch(`${config.url}/rest/v1/jobs?${params}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { status: "error", message: "We encountered a temporary connection issue while updating your job details. Please try again in a few moments." };
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  revalidatePath("/employers/dashboard");
  revalidatePath("/employers/dashboard/jobs");
  revalidatePath(`/jobs/${jobId}`);

  redirect("/employers/dashboard/jobs");
}
