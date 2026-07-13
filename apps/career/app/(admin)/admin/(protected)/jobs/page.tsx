import { getSupabaseConfig } from "@/lib/data/supabase";
import { changeJobStatusAction } from "./actions";
import { AdminSearch } from "../AdminSearch";

export const metadata = {
  title: "Manage Jobs | Admin Dashboard",
};

type AdminJobRow = {
  id: string;
  title: string;
  company_name: string;
  status: string;
  created_at: string;
};

async function getJobs(query?: string) {
  const config = getSupabaseConfig();
  if (!config.ok) return [];

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return [];

  let paramsString = "select=id,title,company_name,location,status,created_at&order=created_at.desc";
  if (query) {
    paramsString += `&title=ilike.*${encodeURIComponent(query)}*`;
  }

  const res = await fetch(`${config.url}/rest/v1/jobs?${paramsString}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json() as Promise<AdminJobRow[]>;
}

export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q;
  const jobs = await getJobs(q);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-[var(--foreground)] mb-2">Jobs</h1>
      <p className="text-[var(--muted-fg)] mb-6">Moderate job postings across the platform.</p>

      <AdminSearch placeholder="Search jobs by title..." />

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Job Title</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Company</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Posted</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--foreground)]">{job.title}</td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">{job.company_name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      job.status === "active" ? "bg-emerald-100 text-emerald-700" :
                      job.status === "closed" ? "bg-gray-100 text-gray-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">
                    {new Date(job.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {job.status !== "active" && (
                      <form action={changeJobStatusAction} className="inline-block">
                        <input type="hidden" name="job_id" value={job.id} />
                        <input type="hidden" name="status" value="active" />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          Set Active
                        </button>
                      </form>
                    )}
                    {job.status !== "closed" && (
                      <form action={changeJobStatusAction} className="inline-block">
                        <input type="hidden" name="job_id" value={job.id} />
                        <input type="hidden" name="status" value="closed" />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors"
                        >
                          Close
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted-fg)]">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
