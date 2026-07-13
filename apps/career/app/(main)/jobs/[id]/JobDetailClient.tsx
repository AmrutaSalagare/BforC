"use client";

import { useActionState, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPin, IndianRupee, Building2, Clock, Calendar, ArrowLeft, Send, Loader2, UserCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { applyForJobAction } from "./actions";

type JobDetail = {
  id: string;
  title: string;
  company_name: string;
  description: string | null;
  location: string;
  is_remote: boolean;
  salary_min: number;
  salary_max: number;
  job_type: string;
  tags: string[];
  women_friendly: boolean;
  status: string;
  created_at: string;
};

type Props = {
  jobId: string;
  isAuthenticated: boolean;
  isSeeker: boolean;
  profileStrength: number;
};

export function JobDetailClient({ jobId, isAuthenticated, isSeeker, profileStrength }: Props) {
  const [state, formAction, pending] = useActionState(applyForJobAction, { status: "idle" });
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then((r) => r.json())
      .then((data) => { setJob(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[var(--muted-fg)]" />
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center py-20">
          <p className="text-[var(--muted-fg)] text-lg">Job not found.</p>
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-color)] hover:underline mt-4">
            <ArrowLeft size={15} /> Browse all jobs
          </Link>
        </div>
      </main>
    );
  }

  const formatSalary = (min: number, max: number) => {
    if (!min && !max) return "Not listed";
    const fmt = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(0)}L` : `${(n / 1000).toFixed(0)}K`;
    return `₹ ${fmt(min)} - ${fmt(max)} / yr`;
  };

  const canApply = isAuthenticated && isSeeker && profileStrength >= 70;

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--primary)]/[0.03] rounded-full blur-3xl translate-y-1/2 -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[var(--background)]/90 backdrop-blur-3xl rounded-3xl border border-[var(--primary)]/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden relative">

          <div className="px-6 sm:px-12 py-5 flex items-center justify-between border-b border-[var(--primary)]/5 bg-[var(--foreground)]/[0.02]">
            <Link href="/jobs" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors">
              <ArrowLeft size={16} /> Back to Search
            </Link>
          </div>

          <div className="p-6 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h1 className="text-2xl sm:text-4xl font-display font-medium text-[var(--foreground)] leading-tight mb-2 tracking-tight">{job.title}</h1>
                  <p className="text-[var(--foreground)]/70 text-sm sm:text-base">{job.company_name}</p>
                </div>
              </div>
              {job.women_friendly && (
                <div className="self-start sm:self-auto shrink-0">
                  <span className="badge-women-friendly shadow-sm">Women-Friendly</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-12 p-6 rounded-2xl bg-[var(--primary)]/[0.02] border border-[var(--primary)]/5 text-sm text-[var(--foreground)]/80">
              <span className="flex items-center gap-2.5"><MapPin size={16} className="text-[var(--primary)]" /> {job.location}{job.is_remote ? " | Remote" : ""}</span>
              <span className="flex items-center gap-2.5"><IndianRupee size={16} className="text-[var(--primary)]" /> {formatSalary(job.salary_min, job.salary_max)}</span>
              <span className="flex items-center gap-2.5"><Clock size={16} className="text-[var(--primary)]" /> {job.job_type}</span>
              <span className="flex items-center gap-2.5"><Calendar size={16} className="text-[var(--primary)]" /> Posted {new Date(job.created_at).toLocaleDateString()}</span>
            </div>

            {job.description && (
              <div className="mb-10">
                <h2 className="text-lg font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-[var(--primary)]" /> About This Role
                </h2>
                <div className="text-[15px] text-[var(--foreground)]/80 leading-relaxed whitespace-pre-wrap">{job.description}</div>
              </div>
            )}

            {job.tags && job.tags.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-[var(--primary)]" /> Requirements & Skills
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-[13px] px-4 py-2 rounded-xl bg-[var(--background)] text-[var(--foreground)]/80 border border-[var(--primary)]/10 shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Application Section */}
            <div className="pt-8 border-t border-[var(--primary)]/10">
              {state.status === "success" ? (
                <div className="rounded-2xl border border-green-600/20 bg-green-50/50 p-8 text-center">
                  <p className="text-base font-medium text-green-700">{state.message}</p>
                  <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline mt-4">
                    <ArrowLeft size={16} /> Browse more jobs
                  </Link>
                </div>
              ) : !isAuthenticated ? (
                /* Not logged in */
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href={`/login`}
                    className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-[var(--foreground)] transition duration-200 shadow-md"
                  >
                    Sign in to Apply <ArrowRight size={16} />
                  </Link>
                  <p className="text-sm text-[var(--muted-fg)]">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-[var(--primary)] hover:underline font-medium">Sign up free</Link>
                  </p>
                </div>
              ) : !isSeeker ? null : !canApply ? (
                /* Profile incomplete — strength < 70 */
                <div className="rounded-2xl border border-[var(--primary)]/15 bg-[var(--primary)]/[0.03] p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      <UserCircle2 size={20} className="text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)] mb-1">
                        Your profile needs to be at least 70% complete to apply
                      </p>
                      <p className="text-sm text-[var(--muted-fg)]">
                        Currently at <span className="font-semibold text-[var(--foreground)]">{profileStrength}%</span> — you need{" "}
                        <span className="font-semibold text-[var(--foreground)]">{70 - profileStrength}% more</span> to unlock applications.
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-[var(--muted-fg)] mb-1.5">
                      <span>Profile strength</span>
                      <span>{profileStrength}% / 70% needed</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--primary)]/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                        style={{ width: `${profileStrength}%` }}
                      />
                    </div>
                    {/* 70% marker */}
                    <div className="relative h-0">
                      <div
                        className="absolute -top-3 w-px h-4 bg-[var(--foreground)]/30"
                        style={{ left: "70%" }}
                      />
                      <span
                        className="absolute -top-5 text-[10px] text-[var(--foreground)]/40 -translate-x-1/2"
                        style={{ left: "70%" }}
                      >
                        70%
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--foreground)] transition duration-200 shadow-sm mt-3"
                  >
                    Complete my profile <ArrowRight size={15} />
                  </Link>
                </div>
              ) : showApply ? (
                /* Apply form */
                <form action={formAction} className="space-y-6">
                  <input type="hidden" name="job_id" value={jobId} />
                  {state.message && (
                    <p className="rounded-xl border border-[var(--destructive)]/20 bg-[var(--destructive)]/5 text-[var(--destructive)] px-4 py-3 text-sm font-medium">
                      {state.message}
                    </p>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Cover Note (optional)</label>
                    <textarea
                      name="cover_note"
                      rows={4}
                      placeholder="Tell the employer why you're interested in this role..."
                      className="w-full bg-[var(--background)] border border-[var(--primary)]/20 rounded-xl px-5 py-4 text-[15px] text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 transition-all resize-none shadow-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={pending}
                      className="bg-[var(--primary)] text-[var(--background)] px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-[var(--foreground)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50 inline-flex items-center gap-2 shadow-md"
                    >
                      {pending ? "Submitting..." : "Submit Application"}
                      <Send size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApply(false)}
                      className="px-6 py-3.5 rounded-full text-[15px] font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* Apply button */
                <button
                  onClick={() => setShowApply(true)}
                  className="w-full sm:w-auto bg-[var(--primary)] text-[var(--background)] px-10 py-4 rounded-full text-[15px] font-medium hover:bg-[var(--foreground)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] shadow-md"
                >
                  Apply for this Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
