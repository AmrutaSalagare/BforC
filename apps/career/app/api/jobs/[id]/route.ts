import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getCurrentSession } from "@/lib/auth/session";
import { isUuid } from "@/lib/validation";
import { seedJobs } from "@/lib/data/seed";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const config = getSupabaseConfig();
  if (!config.ok) {
    const job = seedJobs.find(j => j.id === id);
    if (!job) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      id: job.id,
      title: job.title,
      company_name: job.company,
      description: `This is a sample description for the ${job.title} position at ${job.company}. We are seeking a highly motivated professional to join our team. Requirements: 2+ years of experience in related fields, strong communication skills, and a commitment to women's empowerment.`,
      location: job.location,
      is_remote: job.isRemote,
      salary_min: job.salaryMin,
      salary_max: job.salaryMax,
      job_type: job.type,
      tags: job.tags,
      women_friendly: job.womenFriendly,
      status: "active",
      created_at: new Date(Date.now() - job.postedDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (!id || !isUuid(id)) {
    return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
  }

  const session = await getCurrentSession();
  const token = session?.accessToken ?? config.anonKey;

  const params_q = new URLSearchParams({ id: `eq.${id}`, select: "*", limit: "1" });
  const res = await fetch(`${config.url}/rest/v1/jobs?${params_q}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
