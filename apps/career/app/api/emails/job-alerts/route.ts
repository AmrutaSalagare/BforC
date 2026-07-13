import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { sendJobAlertDigestEmail } from "@/lib/email/triggers/job-alert-digest";

/**
 * Weekly job alert digest cron endpoint.
 *
 * Schedule (vercel.json):
 *   { "path": "/api/emails/job-alerts", "schedule": "0 9 * * 1" }
 *   — Fires every Monday at 9:00 AM UTC
 *
 * Protected by CRON_SECRET to prevent public invocation.
 */
export async function GET(req: NextRequest) {
  // Verify cron secret
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = getSupabaseConfig();
  if (!config.ok) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "Service role key not configured" }, { status: 500 });
  }

  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  // Fetch active jobs posted in the last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const jobsParams = new URLSearchParams({
    select: "id,title,company_name,location,job_type",
    status: "eq.active",
    created_at: `gte.${sevenDaysAgo}`,
    order: "created_at.desc",
    limit: "10",
  });

  const jobsRes = await fetch(`${config.url}/rest/v1/jobs?${jobsParams}`, {
    headers,
    cache: "no-store",
  });

  if (!jobsRes.ok) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }

  const jobs = await jobsRes.json() as Array<{
    id: string;
    title: string;
    company_name: string;
    location: string;
    job_type: string;
  }>;

  if (jobs.length === 0) {
    return NextResponse.json({ message: "No new jobs this week, skipping digest." });
  }

  // Fetch all seeker profiles with emails (joined through auth.users via service role)
  const seekersParams = new URLSearchParams({
    select: "user_id,full_name",
  });

  const seekersRes = await fetch(`${config.url}/rest/v1/seeker_profiles?${seekersParams}`, {
    headers,
    cache: "no-store",
  });

  if (!seekersRes.ok) {
    return NextResponse.json({ error: "Failed to fetch seekers" }, { status: 500 });
  }

  const seekers = await seekersRes.json() as Array<{
    user_id: string;
    full_name: string;
  }>;

  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const formattedJobs = jobs.map((j) => ({
    title: j.title,
    companyName: j.company_name,
    location: j.location,
    jobType: j.job_type,
    url: `${baseUrl}/jobs/${j.id}`,
  }));

  let sent = 0;
  let failed = 0;

  for (const seeker of seekers) {
    // Fetch user email via admin API
    const userRes = await fetch(`${config.url}/auth/v1/admin/users/${seeker.user_id}`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (!userRes.ok) {
      failed++;
      continue;
    }

    const userData = await userRes.json() as { email?: string };
    if (!userData.email) {
      failed++;
      continue;
    }

    await sendJobAlertDigestEmail({
      to: userData.email,
      seekerName: seeker.full_name,
      jobs: formattedJobs,
    });

    sent++;
  }

  return NextResponse.json({
    message: `Job alert digest sent.`,
    stats: { sent, failed, jobCount: jobs.length, seekerCount: seekers.length },
  });
}
