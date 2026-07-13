import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerProfile, getEmployerDashboard } from "@/lib/data/employer";
import { Search, Users } from "lucide-react";
import Form from "next/form";
import { KanbanPipeline } from "@/components/kanban-pipeline";

export default async function EmployerReviewApplicants() {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") redirect("/login");

  const profile = await getEmployerProfile(session.userId!, session.accessToken);
  const dashboard = profile?.id ? await getEmployerDashboard(profile.id, session.accessToken) : null;
  const applicants = dashboard?.applications ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Review Applicants
          {applicants.length > 0 && (
            <span className="ml-2 text-sm font-normal text-[var(--muted-foreground)]">
              ({applicants.length} total)
            </span>
          )}
        </h2>
        <Form action="/employers/dashboard/applicants" className="relative w-full sm:w-64">
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
      </div>

      {applicants.length > 0 ? (
        <KanbanPipeline applicants={applicants} />
      ) : (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden p-10 text-center">
          <Users size={32} className="mx-auto text-[var(--faint-fg)] mb-3" />
          <p className="text-[var(--muted-fg)] text-sm">No applications received yet.</p>
          <p className="text-[var(--faint-fg)] text-xs mt-1">
            {dashboard?.applicationsError
              ? dashboard.applicationsError
              : "Applications will appear here once candidates start applying."}
          </p>
        </div>
      )}
    </div>
  );
}
