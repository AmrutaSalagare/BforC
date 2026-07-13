import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerProfile, getEmployerJobs } from "@/lib/data/employer";
import { Search, Plus, FileEdit, Trash2, PauseCircle, Play } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { deleteJobAction, updateJobStatusAction } from "./actions";

export default async function EmployerManageJobs() {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") redirect("/login");

  const profile = await getEmployerProfile(session.userId!, session.accessToken);
  const jobs = profile?.id ? await getEmployerJobs(profile.id, session.accessToken) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">All Postings</h2>
        <Form action="/employers/dashboard/jobs" className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[var(--faint-fg)]" />
          </div>
          <input
            type="text"
            name="q"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 backdrop-blur-sm border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
          />
        </Form>
      </div>

      {jobs.length > 0 ? (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Job Title</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Location</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Type</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Posted</th>
                  <th className="px-6 py-4 font-medium text-[var(--muted-fg)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[var(--foreground)]">{job.title}</p>
                      <p className="text-xs text-[var(--muted-fg)] mt-1">{job.company_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === "active" ? "bg-emerald-100 text-emerald-700" :
                        job.status === "closed" ? "bg-gray-100 text-gray-700" :
                        job.status === "draft" ? "bg-yellow-100 text-yellow-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">{job.location}</td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">{job.job_type}</td>
                    <td className="px-6 py-4 text-[var(--muted-fg)]">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/employers/dashboard/jobs/${job.id}/edit`}
                          className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                          aria-label="Edit"
                        >
                          <FileEdit size={16} />
                        </Link>

                        <form action={updateJobStatusAction} className="inline">
                          <input type="hidden" name="job_id" value={job.id} />
                          <input type="hidden" name="status" value={job.status === "paused" ? "active" : "paused"} />
                          <button
                            type="submit"
                            className={`p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 ${
                              job.status === "paused"
                                ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                : "text-[var(--muted-fg)] hover:text-yellow-600 hover:bg-yellow-50"
                            }`}
                            aria-label={job.status === "paused" ? "Activate" : "Pause"}
                          >
                            {job.status === "paused" ? <Play size={16} /> : <PauseCircle size={16} />}
                          </button>
                        </form>

                        <form action={deleteJobAction} className="inline">
                          <input type="hidden" name="job_id" value={job.id} />
                          <button
                            type="submit"
                            className="p-1.5 text-[var(--muted-fg)] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden p-10 text-center">
          <p className="text-[var(--muted-fg)] text-sm">You haven&apos;t posted any jobs yet.</p>
          <Link href="/employers/dashboard/jobs/new" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-color)] hover:underline">
            <Plus size={15} /> Post your first job
          </Link>
        </div>
      )}
    </div>
  );
}
