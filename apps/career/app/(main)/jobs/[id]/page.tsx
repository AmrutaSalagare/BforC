import { getCurrentSession } from "@/lib/auth/session";
import { getSeekerProfile, computeProfileStrength } from "@/lib/data/profile";
import { JobDetailClient } from "./JobDetailClient";
import { fetchSupabaseRows } from "@/lib/data/supabase";
import { seedJobs } from "@/lib/data/seed";

type Props = { params: Promise<{ id: string }> };

async function getJobById(id: string): Promise<{ title: string; company_name?: string } | null> {
  const params = new URLSearchParams({ id: `eq.${id}`, select: "title,company_name", limit: "1" });
  const result = await fetchSupabaseRows<{ title: string; company_name?: string }>("jobs", params);
  if (!result.ok || result.data.length === 0) {
    const job = seedJobs.find(j => j.id === id);
    if (!job) return null;
    return { title: job.title, company_name: job.company };
  }
  return result.data[0];
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const job = await getJobById(id);
  return {
    title: job ? `${job.title} at ${job.company_name ?? "BforC Partner"}` : "Job Details",
    description: job ? `Apply for the ${job.title} position at ${job.company_name ?? "BforC Partner"} on BforC Careers.` : "View job details and apply on BforC Careers.",
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await getCurrentSession();

  let profileStrength = 0;
  if (session?.role === "seeker" && session.userId) {
    const profile = await getSeekerProfile(session.userId, session.accessToken);
    profileStrength = profile ? computeProfileStrength(profile) : 0;
  }

  return (
    <JobDetailClient
      jobId={id}
      isAuthenticated={!!session}
      isSeeker={session?.role === "seeker"}
      profileStrength={profileStrength}
    />
  );
}
