"use client";

import { motion } from "framer-motion";
import { MapPin, IndianRupee, Heart, Zap, Building2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  tags: string[];
  womenFriendly: boolean;
  postedDaysAgo: number;
  type: "Full-time" | "Part-time" | "Contract";
}

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(0)}L` : `${(n / 1000).toFixed(0)}K`);
  return `₹${fmt(min)}–${fmt(max)} / yr`;
}

function timeAgo(days: number) {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative bg-white/40 backdrop-blur-md rounded-xl p-6 pb-16 border border-white/60 hover:border-[var(--accent-color)]/30 cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      aria-label={`${job.title} at ${job.company}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Company icon placeholder */}
        <div className="w-10 h-10 rounded-lg bg-[var(--blush)]/50 flex items-center justify-center shrink-0">
          <Building2 size={18} className="text-[var(--accent-color)]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--faint-fg)] truncate">{job.company}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[var(--faint-fg)]">{timeAgo(job.postedDaysAgo)}</span>
          {/* Save button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
            aria-label={saved ? "Unsave job" : "Save job"}
            className="p-1.5 rounded-full hover:bg-[var(--blush)] transition-colors duration-200"
          >
            <motion.div
              animate={saved ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Heart
                size={16}
                className={saved ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-[var(--faint-fg)]"}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Job title */}
      <Link href={`/jobs/${job.id}`}>
        <h3 className="text-base font-semibold text-[var(--foreground)] leading-snug mb-2 group-hover:text-[var(--accent-color)] transition-colors duration-200 line-clamp-2">
          {job.title}
        </h3>
      </Link>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
        <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
          <MapPin size={13} />
          {job.location}{job.isRemote && " · Remote"}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
          <IndianRupee size={13} />
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="text-xs text-[var(--faint-fg)]">{job.type}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.womenFriendly && (
          <span className="badge-women-friendly">Women-Friendly ✦</span>
        )}
        {job.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface)] text-[var(--muted-fg)] border border-[var(--border)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Quick Apply — slides up on hover */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute bottom-4 right-4"
      >
        <Link
          href={`/jobs/${job.id}/apply`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 bg-[var(--accent-color)] text-[var(--on-accent)] text-xs font-medium px-4 py-2 rounded-[4px] hover:bg-[var(--accent-dark)] transition-colors"
        >
          <Zap size={13} />
          Quick Apply
        </Link>
      </motion.div>
    </motion.article>
  );
}
