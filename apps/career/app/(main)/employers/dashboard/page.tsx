import { Eye, Briefcase, Users, UserCheck } from "lucide-react";
import { MOCK_METRICS, MOCK_JOBS } from "@/lib/data/mock-dashboard";
import { StaggerReveal, StaggerItem } from "@/components/motion";
import Link from "next/link";

export default function EmployerDashboardOverview() {
  const metrics = [
    { label: "Total Views", value: MOCK_METRICS.totalViews, icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Jobs", value: MOCK_METRICS.activeJobs, icon: Briefcase, color: "text-[var(--accent-color)]", bg: "bg-[var(--blush)]" },
    { label: "Total Applicants", value: MOCK_METRICS.totalApplicants, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Hired Candidates", value: MOCK_METRICS.hiredCount, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  const recentJobs = MOCK_JOBS.slice(0, 3);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Metrics Overview</h2>
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
        
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Job Title</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Applicants</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Views</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Posted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--foreground)]">{job.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                        job.status === "Closed" ? "bg-gray-100 text-gray-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">{job.applicantsCount}</td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">{job.views}</td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">
                      {new Date(job.postedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
