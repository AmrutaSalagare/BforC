"use client";


import { MapPin, IndianRupee, Zap, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Job } from "@/lib/data/types";
import { SaveJobButton } from "@/components/save-job-button";
import { HoverTiltCard } from "@/components/motion";
import { VerifiedBadge } from "@/components/verified-badge";

export type { Job };

function formatSalary(min: number, max: number) {
  if (!min && !max) return "Salary not listed";
  const fmt = (n: number) =>
    n >= 100000 ? `${(n / 100000).toFixed(0)}L` : `${(n / 1000).toFixed(0)}K`;
  return `Rs. ${fmt(min)}-${fmt(max)} / yr`;
}

function timeAgo(days: number) {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export function JobCard({ job, onViewDetails }: { job: Job; onViewDetails?: (job: Job) => void }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent triggering if clicking an interactive child element
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    if (onViewDetails) {
      onViewDetails(job);
    } else {
      router.push(`/jobs/${job.id}`);
    }
  };

  return (
    <HoverTiltCard className="h-full block group">
      <article 
        onClick={handleCardClick}
        className="h-full relative bg-[var(--background)]/80 backdrop-blur-sm rounded-2xl p-6 pb-24 border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 cursor-pointer shadow-sm hover:shadow-[8px_8px_0px_var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-colors duration-300">
            <Building2 size={20} className="text-[var(--foreground)] group-hover:text-[var(--background)] transition-colors duration-300" />
          </div>

          <div className="flex-1 min-w-0 mt-1">
            <p className="font-sans text-sm font-medium text-[var(--foreground)]/70 flex items-center gap-1.5 truncate">
              {job.company}
              {job.isVerified && <VerifiedBadge />}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-sans text-xs text-[var(--foreground)]/50">
              {timeAgo(job.postedDaysAgo)}
            </span>
            <div className="relative z-20">
              <SaveJobButton jobId={job.id} />
            </div>
          </div>
        </div>

        <Link 
          href={`/jobs/${job.id}`}
          onClick={(e) => {
            if (onViewDetails) {
              e.preventDefault();
              onViewDetails(job);
            }
          }}
        >
          <h3 className="relative z-10 font-display text-2xl sm:text-3xl font-semibold text-[var(--foreground)] leading-tight mb-4 group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2">
            {job.title}
          </h3>
        </Link>

        <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
          <span className="flex items-center gap-1.5 font-sans text-sm text-[var(--foreground)]/80">
            <MapPin size={14} className="text-[var(--primary)]" />
            {job.location}
            {job.isRemote && " | Remote"}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-sm text-[var(--foreground)]/80">
            <IndianRupee size={14} className="text-[var(--primary)]" />
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          <span className="font-sans text-xs px-3 py-1.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium">
            {job.type}
          </span>
          {job.womenFriendly && (
            <span className="font-sans text-xs px-3 py-1.5 rounded-xl bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10 font-medium">
              Women-Friendly
            </span>
          )}
          {job.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-sans text-xs px-3 py-1.5 rounded-xl bg-[var(--primary)]/5 text-[var(--foreground)]/70 border border-[var(--primary)]/10 hover:bg-[var(--primary)]/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/jobs/${job.id}`}
            onClick={(e) => {
              if (onViewDetails) {
                e.preventDefault();
                onViewDetails(job);
              }
            }}
            className="flex items-center gap-1.5 bg-[var(--primary)] text-[var(--background)] font-sans text-xs font-medium px-4 py-2 rounded-xl hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors border border-transparent"
          >
            <Zap size={12} />
            Quick Apply
          </Link>
        </div>
      </article>
    </HoverTiltCard>
  );
}
