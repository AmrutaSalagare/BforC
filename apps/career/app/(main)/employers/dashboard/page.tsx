import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerProfile, getEmployerDashboard, computeEmployerCompletion } from "@/lib/data/employer";
import { getSubscription, computeEmployerQuota } from "@/lib/subscriptions/data";
import { requestVerificationAction } from "./actions";
import { Eye, Briefcase, Users, UserCheck, Inbox } from "lucide-react";
import { StaggerReveal, StaggerItem, Reveal } from "@/components/motion";
import Link from "next/link";

export default async function EmployerDashboardOverview() {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") redirect("/login");

  const profile = await getEmployerProfile(session.userId!, session.accessToken);
  if (!profile?.id) {
    redirect("/employers/dashboard/profile?incomplete=true");
  }

  const completion = computeEmployerCompletion(profile);
  if (!completion.complete) {
    redirect("/employers/dashboard/profile?incomplete=true");
  }

  const dashboard = await getEmployerDashboard(profile.id, session.accessToken);
  const subscription = await getSubscription(session.userId!, session.accessToken);
  const quota = subscription ? computeEmployerQuota(subscription, dashboard.activeJobs) : null;

  const metrics = [
    { label: "Active Jobs", value: dashboard.activeJobs, icon: Briefcase, color: "text-[var(--accent-color)]", bg: "bg-[var(--blush)]" },
    { label: "Total Applicants", value: dashboard.totalApplicants, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Total Postings", value: dashboard.totalJobs, icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Hired Candidates", value: 0, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-12">
      <section>
        {!profile.is_verified && (
          <Reveal className="mb-8">
            {profile.verification_requested_at ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 flex items-start gap-3">
                <div className="mt-0.5">⏳</div>
                <div>
                  <h3 className="text-sm font-medium">Verification Pending</h3>
                  <p className="text-sm mt-1 opacity-90">Your profile is currently under review by our team. We will notify you once you are verified and can begin posting jobs.</p>
                </div>
              </div>
            ) : completion.complete ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium">Request Verification</h3>
                  <p className="text-sm mt-1 opacity-90">Your profile is complete! Request verification to unlock job posting.</p>
                </div>
                <form action={requestVerificationAction}>
                  <button type="submit" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
                    Request Review
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg p-4 flex items-start gap-3">
                <div className="mt-0.5">ℹ️</div>
                <div>
                  <h3 className="text-sm font-medium">Verification Required</h3>
                  <p className="text-sm mt-1 opacity-90">You must complete your company profile before you can request verification to post jobs. Missing: {completion.missing.join(", ")}.</p>
                </div>
              </div>
            )}
          </Reveal>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-3">
            Metrics Overview
            {profile.is_verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                <Eye size={12} /> Verified
              </span>
            )}
          </h2>
        </div>

        {quota && (
          <Reveal className="mb-8 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--foreground)] mb-1">
                Active Job Quota ({quota.subscription.tier.charAt(0).toUpperCase() + quota.subscription.tier.slice(1)} Plan)
              </h3>
              <p className="text-sm text-[var(--muted-fg)]">
                You have {quota.used} out of {quota.limit === Infinity ? "Unlimited" : quota.limit} active job postings.
              </p>
              {quota.limit !== Infinity && (
                <div className="mt-3 h-2 w-full max-w-md bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${quota.isAtLimit ? 'bg-red-500' : 'bg-[var(--accent-color)]'}`} 
                    style={{ width: `${quota.percentUsed}%` }}
                  />
                </div>
              )}
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

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.05}>
          {metrics.map((m) => (
            <StaggerItem key={m.label} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-fg)] mb-1">{m.label}</p>
                  <p className="font-display text-3xl font-medium text-[var(--foreground)]">{m.value.toLocaleString()}</p>
                </div>
                <div className={`p-3 rounded-xl ${m.bg}`}>
                  <m.icon size={20} className={m.color} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Postings</h2>
          <Link href="/employers/dashboard/jobs" className="text-sm text-[var(--accent-color)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-sm">
            View All
          </Link>
        </div>

        {dashboard.recentJobs.length > 0 ? (
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Job Title</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Applicants</th>
                    <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Posted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {dashboard.recentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{job.title}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          job.status === "active" ? "bg-emerald-100 text-emerald-700" :
                          job.status === "closed" ? "bg-gray-100 text-gray-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted-fg)]">
                        {dashboard.applications.filter((a) => a.job_id === job.id).length}
                      </td>
                      <td className="px-6 py-4 text-[var(--muted-fg)]">
                        {new Date(job.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden p-16 text-center flex flex-col items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-5 relative z-10">
              <Inbox size={32} className="text-[var(--primary)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-1 relative z-10">No job postings yet</h3>
            <p className="text-[var(--muted-fg)] text-sm mb-6 max-w-sm relative z-10">Get started by creating your first job posting to reach our community of talented professionals.</p>
            <Link href="/employers/dashboard/jobs/new" className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:bg-[var(--foreground)] transition-colors shadow-sm">
              Post your first job
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
