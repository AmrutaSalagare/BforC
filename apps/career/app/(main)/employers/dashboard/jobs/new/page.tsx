import { redirect } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerProfile, computeEmployerCompletion } from "@/lib/data/employer";
import { PostNewJobForm } from "./PostNewJobForm";

export default async function PostNewJobPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") redirect("/login");

  const profile = await getEmployerProfile(session.userId!, session.accessToken);
  const { complete, missing } = computeEmployerCompletion(profile);

  if (!complete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-amber-200/60 shadow-sm p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">
                Complete your company profile first
              </h2>
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                Job seekers need to know who they&apos;re applying to. Fill in the missing details
                before posting your first role.
              </p>
            </div>
          </div>

          <div className="mb-8 space-y-2.5">
            <p className="text-xs font-medium text-[var(--faint-fg)] uppercase tracking-wider mb-3">
              Missing fields
            </p>
            {missing.map((field) => (
              <div key={field} className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
                <div className="w-4 h-4 rounded-full border-2 border-amber-300 flex-shrink-0" />
                {field}
              </div>
            ))}
            {["Organisation name", "Sector", "Location", "Description"]
              .filter((f) => !missing.includes(f))
              .map((field) => (
                <div key={field} className="flex items-center gap-2.5 text-sm text-[var(--muted-fg)]">
                  <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  {field}
                </div>
              ))}
          </div>

          <Link
            href="/employers/dashboard/profile"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-6 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200"
          >
            Complete profile <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  if (!profile || !profile.is_verified) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-red-200/60 shadow-sm p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">
                Verification Required
              </h2>
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                You cannot post a job until your organisation has been verified by our team. 
                Please ensure you have submitted a verification request from your dashboard.
              </p>
            </div>
          </div>
          <Link
            href="/employers/dashboard"
            className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-[4px] text-sm font-medium hover:bg-black/80 transition duration-200"
          >
            Go to Dashboard <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return <PostNewJobForm />;
}
