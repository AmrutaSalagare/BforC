import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Briefcase, Clock3, FileText, Trash2, UserCheck } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/session";
import { getSeekerApplications, getSeekerProfile, computeProfileStrength } from "@/lib/data/profile";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getSubscription, computeSeekerQuota } from "@/lib/subscriptions/data";
import { LiveRefresh } from "@/components/live-refresh";
import { StaggerReveal, StaggerItem, Reveal } from "@/components/motion";

function statusBadge(status: string) {
  if (status === "shortlisted") return "bg-emerald-100 text-emerald-700";
  if (status === "reviewing") return "bg-blue-100 text-blue-700";
  if (status === "rejected") return "bg-rose-100 text-rose-700";
  if (status === "withdrawn") return "bg-gray-100 text-gray-700";
  return "bg-amber-100 text-amber-700";
}

export const metadata = {
  title: "My Dashboard",
};

export default async function SeekerDashboardPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  if (session.role === "employer") redirect("/employers/dashboard");

  async function deleteApplicationAction(formData: FormData): Promise<void> {
    "use server";

    const currentSession = await getCurrentSession();
    if (!currentSession?.userId || currentSession.role === "employer") return;

    const applicationId = formData.get("application_id");
    if (typeof applicationId !== "string" || !applicationId) return;

    const config = getSupabaseConfig();
    if (!config.ok) return;

    const params = new URLSearchParams({ id: `eq.${applicationId}` });
    await fetch(`${config.url}/rest/v1/applications?${params}`, {
      method: "DELETE",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${currentSession.accessToken}`,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/employers/dashboard");
    revalidatePath("/employers/dashboard/applicants");
  }

  const profile = await getSeekerProfile(session.userId!, session.accessToken);
  const strength = profile ? computeProfileStrength(profile) : 0;
  
  if (strength < 50) {
    redirect("/profile?incomplete=true");
  }

  const applications = await getSeekerApplications(session.userId!, session.accessToken);
  const subscription = await getSubscription(session.userId!, session.accessToken);
  const quota = subscription ? computeSeekerQuota(subscription) : null;

  const metrics = [
    {
      label: "Applications",
      value: applications.length,
      icon: FileText,
      chip: "bg-[var(--blush)]",
      iconClass: "text-[var(--accent-color)]",
    },
    {
      label: "Under Review",
      value: applications.filter((item) => item.status === "reviewing").length,
      icon: Clock3,
      chip: "bg-blue-50",
      iconClass: "text-blue-600",
    },
    {
      label: "Shortlisted",
      value: applications.filter((item) => item.status === "shortlisted").length,
      icon: UserCheck,
      chip: "bg-emerald-50",
      iconClass: "text-emerald-600",
    },
    {
      label: "Active Roles",
      value: applications.filter((item) => item.job.status === "active").length,
      icon: Briefcase,
      chip: "bg-purple-50",
      iconClass: "text-purple-600",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <LiveRefresh intervalMs={8000} />
      <Reveal className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-1.5">My Account</p>
          <h1 className="font-display text-3xl font-medium text-[var(--foreground)]">Job Seeker Dashboard</h1>
          <p className="text-[var(--muted-fg)] text-sm mt-1">Track your applications and monitor progress.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-5 py-2.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5"
          >
            Find More Roles
          </Link>
        </div>
      </Reveal>

      {quota && (
        <Reveal delay={0.05} className="mb-8 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-medium text-[var(--foreground)] mb-1">
              Application Quota ({quota.subscription.tier.charAt(0).toUpperCase() + quota.subscription.tier.slice(1)} Plan)
            </h3>
            <p className="text-sm text-[var(--muted-fg)]">
              You have used {quota.used} out of {quota.limit} applications for this year.
            </p>
            <div className="mt-3 h-2 w-full max-w-md bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${quota.isAtLimit ? 'bg-red-500' : 'bg-[var(--accent-color)]'}`} 
                style={{ width: `${quota.percentUsed}%` }}
              />
            </div>
          </div>
          <div className="shrink-0">
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--accent-color)] bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 rounded-[4px] transition-colors"
            >
              Upgrade Plan
            </Link>
          </div>
        </Reveal>
      )}

      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" stagger={0.07}>
        {metrics.map((metric) => (
          <StaggerItem key={metric.label} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-warm-md transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--muted-fg)] mb-1">{metric.label}</p>
                <p className="font-display text-3xl font-medium text-[var(--foreground)]">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${metric.chip}`}>
                <metric.icon size={20} className={metric.iconClass} />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Applied Applications</h2>
          <Link
            href="/profile"
            className="text-sm text-[var(--accent-color)] font-medium hover:underline"
          >
            Update Profile
          </Link>
        </div>

        {applications.length > 0 ? (
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Role</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Company</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Type</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Applied On</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/jobs/${application.job.id}`}
                          className="font-medium text-[var(--foreground)] hover:text-[var(--accent-color)] transition-colors"
                        >
                          {application.job.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted-fg)]">{application.job.company_name}</td>
                      <td className="px-6 py-4 text-[var(--muted-fg)]">{application.job.job_type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted-fg)]">
                        {application.applied_at ? new Date(application.applied_at).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={deleteApplicationAction}>
                          <input type="hidden" name="application_id" value={application.id} />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-10 text-center">
            <p className="text-[var(--muted-fg)] text-sm">You haven&apos;t applied to any roles yet.</p>
            <Link href="/jobs" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-color)] hover:underline">
              Browse available jobs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
