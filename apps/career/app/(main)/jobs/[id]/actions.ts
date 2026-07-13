"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getSeekerProfile, computeProfileStrength } from "@/lib/data/profile";
import { sendApplicationConfirmationEmail } from "@/lib/email/triggers/application-confirmation";
import { sendNewApplicationReceivedEmail } from "@/lib/email/triggers/new-application-received";
import { getSubscription, computeSeekerQuota, incrementApplicationsUsed, ensureSubscriptionExists } from "@/lib/subscriptions/data";
import { isUuid, readFormString } from "@/lib/validation";

export type ApplyActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function applyForJobAction(
  _state: ApplyActionState,
  formData: FormData
): Promise<ApplyActionState> {
  const session = await getCurrentSession();
  if (!session?.userId) redirect("/login");
  if (session.role === "employer") {
    return { status: "error", message: "Employers cannot apply for jobs. Use the employer dashboard instead." };
  }

  const jobId = formData.get("job_id") as string;
  if (!jobId || !isUuid(jobId)) return { status: "error", message: "Invalid job ID." };

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const authHeaders = (token: string) => ({
    apikey: config.anonKey,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const jobCheckParams = new URLSearchParams({
    id: `eq.${jobId}`,
    status: "eq.active",
    select: "id",
    limit: "1",
  });
  const jobCheckRes = await fetch(`${config.url}/rest/v1/jobs?${jobCheckParams}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });
  if (!jobCheckRes.ok) {
    return { status: "error", message: "We could not verify this job before applying. Please try again." };
  }
  const jobRows = await jobCheckRes.json() as Array<{ id: string }>;
  if (!jobRows[0]) {
    return { status: "error", message: "This job is no longer accepting applications." };
  }

  // Fetch full profile to enforce 70% completion requirement
  const seekerProfile = await getSeekerProfile(session.userId, session.accessToken);
  if (!seekerProfile) {
    return { status: "error", message: "Complete your profile before applying." };
  }

  const strength = computeProfileStrength(seekerProfile);
  if (strength < 70) {
    return {
      status: "error",
      message: `Your profile is ${strength}% complete. You need at least 70% to apply. Visit your profile page to complete it.`,
    };
  }

  // ── Subscription quota check ──────────────────────────────────────────────
  await ensureSubscriptionExists(session.userId, "seeker");
  const subscription = await getSubscription(session.userId, session.accessToken);
  if (subscription) {
    const quota = computeSeekerQuota(subscription);
    if (quota.isAtLimit) {
      const tierName = subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1);
      return {
        status: "error",
        message: `You've used all ${quota.limit} applications included in your ${tierName} plan for this year. Upgrade your plan on the Pricing page to apply to more roles.`,
      };
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  const seekerId = seekerProfile.id;
  const coverNote = readFormString(formData, "cover_note").slice(0, 1500).trim() || null;

  const res = await fetch(`${config.url}/rest/v1/applications`, {
    method: "POST",
    headers: {
      ...authHeaders(session.accessToken),
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      job_id: jobId,
      seeker_id: seekerId,
      cover_note: coverNote,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({} as Record<string, unknown>)) as { message?: string; code?: string };
    if (err.code === "23505" || (err.message ?? "").includes("duplicate") || (err.message ?? "").includes("already applied")) {
      return { status: "error", message: "You have already applied for this job." };
    }
    return { status: "error", message: "We encountered a temporary connection issue while submitting your application. Please try again in a few moments." };
  }

  if (subscription) {
    await incrementApplicationsUsed(subscription.id);
  }

  revalidatePath("/dashboard");
  revalidatePath("/employers/dashboard");
  revalidatePath("/employers/dashboard/applicants");
  revalidatePath("/employers/dashboard/jobs");

  // Fire transactional emails — non-blocking, never throw
  const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  // Decode email from JWT payload (base64 middle segment)
  let seekerEmail: string | undefined;
  try {
    const payload = JSON.parse(Buffer.from(session.accessToken.split(".")[1], "base64").toString());
    seekerEmail = typeof payload.email === "string" ? payload.email : undefined;
  } catch {
    // Non-critical — email simply won't send
  }

  // Fetch job details + employer info for notification
  fetch(`${config.url}/rest/v1/jobs?${new URLSearchParams({
    select: "title,company_name,employer_profiles(user_id)",
    id: `eq.${jobId}`,
    limit: "1",
  })}`, {
    headers: { apikey: config.anonKey, Authorization: `Bearer ${session.accessToken}` },
    cache: "no-store",
  })
    .then((r) => r.json())
    .then(async (rows: Array<{ title: string; company_name: string; employer_profiles?: { user_id: string } }>) => {
      const job = rows[0];
      if (!job) return;

      // Email #1: Application confirmation to seeker
      if (seekerEmail) {
        sendApplicationConfirmationEmail({
          to: seekerEmail,
          seekerName: seekerProfile.full_name,
          jobTitle: job.title,
          companyName: job.company_name,
          appliedAt: now,
        }).catch(() => {});
      }

      // Email #2: New application alert to employer (requires employer email via service role)
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const employerUserId = job.employer_profiles?.user_id;
      if (serviceKey && employerUserId) {
        const userRes = await fetch(`${config.url}/auth/v1/admin/users/${employerUserId}`, {
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        }).catch(() => null);

        if (userRes?.ok) {
          const userData = await userRes.json() as { email?: string; user_metadata?: { full_name?: string } };
          if (userData.email) {
            sendNewApplicationReceivedEmail({
              to: userData.email,
              employerName: userData.user_metadata?.full_name ?? "there",
              seekerName: seekerProfile.full_name,
              jobTitle: job.title,
              appliedAt: now,
            }).catch(() => {});
          }
        }
      }
    })
    .catch(() => {});

  return { status: "success", message: "Application submitted successfully!" };
}
