"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewSeekerProfileDialog } from "@/components/view-seeker-profile-dialog";
import { updateApplicationStatusAction } from "@/app/(main)/employers/dashboard/applicants/actions";
import type { DashboardApplicantRow } from "@/lib/data/employer";

type KanbanStatus = "submitted" | "reviewing" | "shortlisted" | "rejected";

const COLUMNS: { id: KanbanStatus; label: string; color: string; bg: string }[] = [
  { id: "submitted",   label: "Applied",      color: "text-[var(--foreground)]",    bg: "bg-[var(--background)] border-[var(--primary)]/10" },
  { id: "reviewing",   label: "Reviewing",    color: "text-amber-600",              bg: "bg-[var(--background)] border-[var(--primary)]/10" },
  { id: "shortlisted", label: "Shortlisted",  color: "text-emerald-600",            bg: "bg-[var(--background)] border-[var(--primary)]/10" },
  { id: "rejected",    label: "Rejected",     color: "text-red-500",                bg: "bg-[var(--background)] border-[var(--primary)]/10" },
];

function ApplicantCard({ applicant }: { applicant: DashboardApplicantRow }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-[var(--background)] backdrop-blur-sm rounded-2xl border border-[var(--primary)]/10 p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)] font-light text-base flex items-center justify-center shrink-0">
          {(applicant.seeker_name || applicant.seeker_id).charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[14px] text-[var(--foreground)] truncate">
            {applicant.seeker_name || `Applicant ${applicant.seeker_id.slice(0, 6)}`}
          </p>
          {applicant.seeker_title && (
            <p className="text-[12px] font-light text-[var(--foreground)]/70 truncate">{applicant.seeker_title}</p>
          )}
        </div>
      </div>
      <p className="text-[12px] font-light text-[var(--foreground)]/80 mb-4 truncate">{applicant.job_title}</p>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-light text-[var(--foreground)]/50">
          {new Date(applicant.applied_at).toLocaleDateString()}
        </p>
        <ViewSeekerProfileDialog seekerId={applicant.seeker_id}>
          <button className="text-[11px] font-light tracking-wide text-[var(--primary)] hover:underline">View Profile</button>
        </ViewSeekerProfileDialog>
      </div>
    </motion.div>
  );
}

export function KanbanPipeline({ applicants: initial }: { applicants: DashboardApplicantRow[] }) {
  const [applicants, setApplicants] = useState(initial);

  const moveCard = async (applicantId: string, newStatus: KanbanStatus) => {
    // Optimistic update first
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a))
    );
    // Build a real FormData for the server action
    const fd = new FormData();
    fd.append("application_id", applicantId);
    fd.append("status", newStatus);
    await updateApplicationStatusAction(fd);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const cards = applicants.filter((a) => a.status === col.id);
        return (
          <div key={col.id} className="flex flex-col gap-4">
            <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border border-[var(--primary)]/10 text-[13px] font-light tracking-wide ${col.bg} ${col.color}`}>
              <span>{col.label}</span>
              <span className="bg-[var(--primary)]/5 px-2.5 py-1 rounded-xl text-xs">{cards.length}</span>
            </div>
            <div className="flex flex-col gap-4 min-h-[100px]">
              <AnimatePresence>
                {cards.map((applicant) => (
                  <div key={applicant.id} className="flex flex-col gap-2">
                    <ApplicantCard applicant={applicant} />
                    {/* Move controls */}
                    <div className="flex flex-wrap gap-1.5 justify-end px-1">
                      {COLUMNS.filter((c) => c.id !== col.id).map((target) => (
                        <button
                          key={target.id}
                          onClick={() => moveCard(applicant.id, target.id)}
                          className={`text-[11px] font-light tracking-wide px-2 py-1 rounded-xl border border-[var(--primary)]/10 text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--primary)]/5 transition-colors`}
                        >
                          → {target.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </AnimatePresence>
              {cards.length === 0 && (
                <p className="text-[12px] font-light text-[var(--foreground)]/40 text-center py-8 border border-dashed border-[var(--primary)]/10 rounded-2xl">
                  No applicants
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
