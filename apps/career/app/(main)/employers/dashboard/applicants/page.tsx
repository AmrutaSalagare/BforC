import { MOCK_APPLICANTS } from "@/lib/data/mock-dashboard";
import { Search, Sparkles } from "lucide-react";
import Form from "next/form";

export default function EmployerReviewApplicants() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Review Applicants</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Form action="/employers/dashboard/applicants" className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-[var(--faint-fg)]" />
            </div>
            <input
              type="text"
              name="q"
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 backdrop-blur-sm border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
            />
          </Form>
          <select className="bg-white/50 border border-[var(--border)] text-sm rounded-lg px-3 py-2 text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
            <option>All Jobs</option>
            <option>Program Manager</option>
            <option>Senior Grant Writer</option>
          </select>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Candidate</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Applied Role</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">AI Match</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Date Applied</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {MOCK_APPLICANTS.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--blush)] text-[var(--primary)] font-medium flex items-center justify-center">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{applicant.name}</p>
                        <p className="text-xs text-[var(--muted-fg)] mt-0.5">{applicant.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground)] font-medium">{applicant.jobTitle}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-[var(--blush)] text-[var(--primary)] px-2.5 py-1 rounded-full w-max">
                      <Sparkles size={12} /> {applicant.score}% Match
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      applicant.status === "New" ? "bg-blue-100 text-blue-700" :
                      applicant.status === "Interviewing" ? "bg-emerald-100 text-emerald-700" :
                      applicant.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">
                    {new Date(applicant.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-[var(--accent-color)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
