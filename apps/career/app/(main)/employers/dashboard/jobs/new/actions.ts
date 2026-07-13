"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getEmployerProfile, getEmployerDashboard } from "@/lib/data/employer";
import { sendJobPostedConfirmationEmail } from "@/lib/email/triggers/job-posted-confirmation";
import { getSubscription, computeEmployerQuota, ensureSubscriptionExists } from "@/lib/subscriptions/data";
import { parseJobForm } from "@/lib/validation";

export type JobActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function createJobAction(
  _state: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") redirect("/login");

  const parsed = parseJobForm(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const job = parsed.value;

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const employerProfile = await getEmployerProfile(session.userId, session.accessToken);
  if (!employerProfile?.id) {
    return { status: "error", message: "Complete your company profile before posting a job." };
  }

  if (!employerProfile.is_verified) {
    return {
      status: "error",
      message: "Your company profile is pending verification. You can post jobs once your account is verified by our team.",
    };
  }

  if (job.status === "active") {
    await ensureSubscriptionExists(session.userId, "employer");
    const subscription = await getSubscription(session.userId, session.accessToken);
    if (subscription) {
      const dashboard = await getEmployerDashboard(employerProfile.id, session.accessToken);
      const quota = computeEmployerQuota(subscription, dashboard.activeJobs);
      if (quota.isAtLimit) {
        const tierName = subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1);
        return {
          status: "error",
          message: `You've reached your limit of ${quota.limit} active job postings on the ${tierName} plan. Upgrade on the Pricing page to post more jobs.`,
        };
      }
    }
  }

  const body: Record<string, unknown> = {
    employer_id: employerProfile.id,
    company_name: employerProfile.company_name,
    title: job.title,
    location: job.location,
    job_type: job.jobType,
    status: job.status,
    salary_min: job.salaryMin,
    salary_max: job.salaryMax,
    is_remote: job.location.toLowerCase().includes("remote"),
    women_friendly: job.womenFriendly,
    description: job.description,
  };

  if (job.tags.length > 0) body.tags = job.tags;

  const res = await fetch(`${config.url}/rest/v1/jobs`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { status: "error", message: "We encountered a temporary connection issue while creating your job posting. Please try again in a few moments." };
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  revalidatePath("/employers/dashboard");
  revalidatePath("/employers/dashboard/jobs");

  if (job.status === "active") {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      const config2 = getSupabaseConfig();
      if (config2.ok) {
        fetch(`${config2.url}/auth/v1/admin/users/${session.userId}`, {
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        })
          .then((r) => r.json())
          .then((userData: { email?: string; user_metadata?: { full_name?: string } }) => {
            if (userData.email) {
              sendJobPostedConfirmationEmail({
                to: userData.email,
                employerName: userData.user_metadata?.full_name ?? "there",
                jobTitle: job.title,
                location: job.location,
                jobType: job.jobType,
              }).catch(() => {});
            }
          })
          .catch(() => {});
      }
    }
  }

  redirect("/employers/dashboard/jobs");
}
