"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerReveal, StaggerItem, Reveal } from "@/components/motion";
import { JobCard, type Job } from "@/components/job-card";

export function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  return (
    <section
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="featured-jobs-heading"
    >
      <Reveal className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">Featured Roles</p>
          <h2
            id="featured-jobs-heading"
            className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-tight text-[var(--foreground)]"
          >
            Roles built for purpose
          </h2>
        </div>
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-sm text-[var(--accent-color)] hover:gap-3 transition-all duration-200 font-medium shrink-0"
        >
          Browse all jobs <ArrowRight size={16} />
        </Link>
      </Reveal>

      <StaggerReveal
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 sm:space-y-0"
        stagger={0.08}
      >
        {jobs.map((job) => (
          <StaggerItem
            key={job.id}
            className="break-inside-avoid sm:mb-5 w-full inline-block"
          >
            <JobCard job={job} />
          </StaggerItem>
        ))}
      </StaggerReveal>

      <Reveal delay={0.2} className="text-center mt-10">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm border border-[var(--accent-color)] text-[var(--accent-color)] px-6 py-3 rounded-[4px] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)] transition-all duration-300"
        >
          View all opportunities <ArrowRight size={15} />
        </Link>
      </Reveal>
    </section>
  );
}
