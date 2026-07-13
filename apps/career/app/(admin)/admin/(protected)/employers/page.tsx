import { getSupabaseConfig } from "@/lib/data/supabase";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyEmployerAction, rejectEmployerAction } from "./actions";
import { AdminSearch } from "../AdminSearch";

export const metadata = {
  title: "Manage Employers | Admin Dashboard",
};

type AdminEmployerRow = {
  id: string;
  company_name: string;
  sector: string;
  is_verified: boolean;
  verification_requested_at: string | null;
};

async function getEmployers(query?: string) {
  const config = getSupabaseConfig();
  if (!config.ok) return [];

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return [];

  let paramsString = "select=id,user_id,company_name,sector,is_verified,verification_requested_at&order=verification_requested_at.desc.nullslast,company_name.asc";
  if (query) {
    paramsString += `&company_name=ilike.*${encodeURIComponent(query)}*`;
  }

  const res = await fetch(`${config.url}/rest/v1/employer_profiles?${paramsString}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json() as Promise<AdminEmployerRow[]>;
}

export default async function AdminEmployersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q;
  const employers = await getEmployers(q);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-[var(--foreground)] mb-2">Employers</h1>
      <p className="text-[var(--muted-fg)] mb-6">Manage and verify employer accounts.</p>

      <AdminSearch placeholder="Search employers by company name..." />

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Company Name</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Sector</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Status</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)]">Request Date</th>
                <th className="px-6 py-4 font-medium text-[var(--muted-fg)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {employers.map((emp) => (
                <tr key={emp.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--foreground)]">{emp.company_name}</td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">{emp.sector}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      emp.is_verified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {emp.is_verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted-fg)] text-sm">
                    {emp.verification_requested_at ? new Date(emp.verification_requested_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {!emp.is_verified && (
                      <form action={verifyEmployerAction} className="inline-block">
                        <input type="hidden" name="employer_id" value={emp.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <CheckCircle2 size={14} /> Verify
                        </button>
                      </form>
                    )}
                    {emp.is_verified && (
                      <form action={rejectEmployerAction} className="inline-block">
                        <input type="hidden" name="employer_id" value={emp.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                        >
                          <XCircle size={14} /> Revoke
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {employers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted-fg)]">
                    No employers found.
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
