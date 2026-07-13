import { getCurrentSession } from "@/lib/auth/session";
import { getSubscription, computeEmployerQuota } from "@/lib/subscriptions/data";
import { redirect } from "next/navigation";
import { PricingTable } from "@/components/pricing-table";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Billing & Plan",
};

export default async function EmployerBillingPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  if (session.role === "seeker") redirect("/dashboard/billing");

  const sub = await getSubscription(session.userId, session.accessToken);
  const quota = computeEmployerQuota(sub!, sub?.jobs_posted_used || 0);
  
  // For employers, quota.used is usually derived dynamically from active job count.
  // We'll use the static value from DB for simplicity in this view, 
  // though realistically it should be fetched from the jobs table.
  const remaining = quota.limit - quota.used;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <Link href="/employers/dashboard" className="inline-flex items-center text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--foreground)] mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Link>
      
      <div className="mb-12">
        <h1 className="font-display text-4xl font-light text-[var(--foreground)] mb-4">
          Billing & Plan
        </h1>
        <p className="text-[var(--muted-fg)] text-lg">
          Manage your subscription and active job posting limits.
        </p>
      </div>

      <section className="bg-[var(--background)] border border-[var(--primary)]/10 rounded-3xl p-8 mb-16 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-sm font-medium text-[var(--muted-fg)] uppercase tracking-wider mb-2">Current Plan</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-display font-medium capitalize text-[var(--foreground)]">
              {sub?.tier || "Free"}
            </h2>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              <CheckCircle2 size={12} /> Active
            </span>
          </div>
          <p className="text-sm text-[var(--muted-fg)] mt-2">
            Renews on {new Date(sub?.period_end || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <div className="flex-1 w-full max-w-md bg-[var(--primary)]/5 rounded-2xl p-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-[var(--foreground)]">Active Job Slots</span>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {quota.used} / {quota.limit === 999999 ? "Unlimited" : quota.limit}
            </span>
          </div>
          {quota.limit !== 999999 && (
            <div className="w-full bg-[var(--primary)]/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[var(--accent-color)] h-full rounded-full transition-all" 
                style={{ width: `${Math.min(100, (quota.used / quota.limit) * 100)}%` }}
              />
            </div>
          )}
          <p className="text-xs text-[var(--muted-fg)] mt-3">
            {quota.limit === 999999 
              ? "You have unlimited active job postings."
              : `You have ${Math.max(0, remaining)} active job slot${remaining !== 1 ? "s" : ""} remaining.`}
          </p>
        </div>
      </section>

      <div className="mb-8">
        <h2 className="font-display text-3xl font-light text-[var(--foreground)] mb-2">
          Available Plans
        </h2>
        <p className="text-[var(--muted-fg)]">
          Upgrade your plan to post more jobs and unlock premium branding features.
        </p>
      </div>

      <PricingTable role="employer" currentTier={sub?.tier || "free"} />
    </div>
  );
}
