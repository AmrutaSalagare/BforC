"use client";

import { useState, useEffect, useCallback, useActionState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, IndianRupee, Clock, Calendar, Send, Loader2, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { applyForJobAction } from "@/app/(main)/jobs/[id]/actions";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  jobId: string | null;
  onClose: () => void;
};

export function JobDetailDialog({ jobId, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showApply, setShowApply] = useState(false);

  const [state, formAction, pending] = useActionState(applyForJobAction, { status: "idle" });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const fetchJob = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    setJob(null);
    setShowApply(false);
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        throw new Error(`Failed to load job details (${res.status})`);
      }
      const data = await res.json();
      setJob(data);
    } catch {
      setError("We encountered an issue loading these job details. Please try again or check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchJob(jobId);
    }
  }, [jobId, fetchJob]);

  /* ESC key to dismiss */
  useEffect(() => {
    if (!jobId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jobId, onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    if (jobId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [jobId]);

  const formatSalary = (min: number, max: number) => {
    if (!min && !max) return "Not listed";
    const fmt = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(0)}L` : `${(n / 1000).toFixed(0)}K`;
    return `₹ ${fmt(min)} - ${fmt(max)} / yr`;
  };

  if (!jobId) return null;

  const modal = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Job details"
      >
        {/* Scrim */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[6px]" />

        {/* Card */}
        <motion.div
          className="relative bg-[var(--background)] backdrop-blur-xl rounded-3xl shadow-2xl border border-[var(--primary)]/10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto"
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Action Bar */}
          <div className="px-6 sm:px-8 py-4 flex items-center justify-between border-b border-[var(--primary)]/5 bg-[var(--foreground)]/[0.02] flex-shrink-0">
            <span className="font-sans text-xs font-medium text-[var(--foreground)]/60">
              Job Opportunity Details
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 hide-scrollbar">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-[var(--foreground)]/60 gap-3">
                <Loader2 size={32} className="animate-spin text-[var(--primary)]" />
                <p className="font-sans text-sm">Fetching latest job details...</p>
              </div>
            )}

            {error && !loading && (
              <div className="py-16 text-center space-y-4">
                <AlertCircle size={32} className="mx-auto text-[var(--destructive)]" />
                <p className="font-sans text-sm text-[var(--destructive)]">{error}</p>
                <button
                  onClick={() => jobId && fetchJob(jobId)}
                  className="font-sans text-xs bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded-full hover:bg-[var(--foreground)] transition-colors"
                >
                  Retry Loading
                </button>
              </div>
            )}

            {job && !loading && (
              <div className="space-y-6">
                {/* Brand + Title info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h2 className="text-xl sm:text-2xl font-display font-medium text-[var(--foreground)] leading-snug mb-1 tracking-tight">
                      {job.title}
                    </h2>
                    <p className="text-[var(--foreground)]/70 text-sm sm:text-base font-sans">{job.company_name}</p>
                  </div>
                </div>

                {/* Badges and chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="font-sans text-xs px-3 py-1 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium">
                    {job.job_type}
                  </span>
                  {job.women_friendly && (
                    <span className="badge-women-friendly font-sans">
                      Women-Friendly
                    </span>
                  )}
                  {job.is_remote && (
                    <span className="font-sans text-xs px-3 py-1 rounded-xl bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10 font-medium">
                      Remote
                    </span>
                  )}
                </div>

                {/* Meta details list */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[var(--primary)]/[0.02] border border-[var(--primary)]/5 text-xs text-[var(--foreground)]/80">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--primary)]" /> {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <IndianRupee size={14} className="text-[var(--primary)]" /> {formatSalary(job.salary_min, job.salary_max)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[var(--primary)]" /> {job.job_type}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-[var(--primary)]" /> Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* About role */}
                {job.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5 font-sans">
                      <span className="w-1 h-4 rounded-full bg-[var(--primary)]"></span> About This Role
                    </h3>
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed whitespace-pre-wrap font-sans">
                      {job.description}
                    </p>
                  </div>
                )}

                {/* Requirements / Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5 font-sans">
                      <span className="w-1 h-4 rounded-full bg-[var(--primary)]"></span> Requirements & Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-xl bg-[var(--background)] text-[var(--foreground)]/80 border border-[var(--primary)]/10 shadow-sm font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Apply form */}
                <div className="pt-6 border-t border-[var(--primary)]/10 flex-shrink-0">
                  {state.status === "success" ? (
                    <div className="rounded-2xl border border-green-600/20 bg-green-50/50 p-6 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <p className="text-sm font-semibold text-green-700">{state.message}</p>
                      <button
                        onClick={onClose}
                        className="font-sans text-xs text-[var(--primary)] hover:underline mt-2 inline-block font-medium"
                      >
                        Keep browsing roles
                      </button>
                    </div>
                  ) : showApply ? (
                    <form action={formAction} className="space-y-4">
                      <input type="hidden" name="job_id" value={job.id} />
                      {state.message && (
                        <div className="flex items-center gap-2 rounded-xl border border-[var(--destructive)]/20 bg-[var(--destructive)]/5 text-[var(--destructive)] px-4 py-3 text-xs font-semibold">
                          <AlertCircle size={14} />
                          <span>{state.message}</span>
                        </div>
                      )}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[var(--foreground)] font-sans">
                          Cover Note (optional)
                        </label>
                        <textarea
                          name="cover_note"
                          rows={3}
                          placeholder="Tell the employer why you're interested in this role..."
                          className="w-full bg-[var(--background)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 transition-all resize-none shadow-sm font-sans"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={pending}
                          className="bg-[var(--primary)] text-[var(--background)] px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--foreground)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50 inline-flex items-center gap-1.5 shadow-md font-sans"
                        >
                          {pending ? "Submitting..." : "Submit Application"}
                          <Send size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowApply(false)}
                          className="px-4 py-2.5 rounded-full text-xs font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors font-sans"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowApply(true)}
                      className="w-full sm:w-auto bg-[var(--primary)] text-[var(--background)] px-8 py-3.5 rounded-full text-xs font-medium hover:bg-[var(--foreground)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] shadow-md font-sans"
                    >
                      Apply for this Job
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return mounted ? createPortal(modal, document.body) : null;
}
