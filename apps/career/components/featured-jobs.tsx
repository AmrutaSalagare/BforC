"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerReveal, StaggerItem, Reveal } from "@/components/motion";
import { JobCard, type Job } from "@/components/job-card";

// ── Placeholder data (replace with Supabase fetch later) ──────────
const FEATURED_JOBS: Job[] = [
  {
    id: "1",
    title: "Programme Manager – Education & Livelihood",
    company: "Akshaya Patra Foundation",
    location: "Bengaluru",
    isRemote: false,
    salaryMin: 600000,
    salaryMax: 900000,
    tags: ["Social Impact", "Programme Management"],
    womenFriendly: true,
    postedDaysAgo: 1,
    type: "Full-time",
  },
  {
    id: "2",
    title: "Research Analyst – Gender & Inclusion",
    company: "Global AID",
    location: "Delhi",
    isRemote: true,
    salaryMin: 480000,
    salaryMax: 720000,
    tags: ["Research", "Flexible Hours"],
    womenFriendly: true,
    postedDaysAgo: 3,
    type: "Full-time",
  },
  {
    id: "3",
    title: "Content Writer – Social Impact Stories",
    company: "Sahaj Sansthan",
    location: "Jaipur",
    isRemote: true,
    salaryMin: 360000,
    salaryMax: 540000,
    tags: ["Content", "Remote"],
    womenFriendly: true,
    postedDaysAgo: 0,
    type: "Contract",
  },
  {
    id: "4",
    title: "Community Outreach Coordinator",
    company: "Women Serve",
    location: "Mumbai",
    isRemote: false,
    salaryMin: 420000,
    salaryMax: 600000,
    tags: ["Community", "Leadership"],
    womenFriendly: true,
    postedDaysAgo: 2,
    type: "Full-time",
  },
  {
    id: "5",
    title: "Monitoring & Evaluation Specialist",
    company: "Project Baala",
    location: "Hyderabad",
    isRemote: false,
    salaryMin: 700000,
    salaryMax: 1000000,
    tags: ["M&E", "Data"],
    womenFriendly: false,
    postedDaysAgo: 5,
    type: "Full-time",
  },
  {
    id: "6",
    title: "Fundraising & Donor Relations Lead",
    company: "Jagriti Mahila Samiti",
    location: "Lucknow",
    isRemote: false,
    salaryMin: 550000,
    salaryMax: 800000,
    tags: ["Fundraising", "NGO"],
    womenFriendly: true,
    postedDaysAgo: 7,
    type: "Full-time",
  },
];

export function FeaturedJobs() {
  return (
    <section
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="featured-jobs-heading"
    >
      {/* Section header */}
      <Reveal className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">— FEATURED ROLES —</p>
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

      {/* Job grid */}
      <StaggerReveal
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        stagger={0.08}
      >
        {FEATURED_JOBS.map((job) => (
          <StaggerItem key={job.id}>
            <JobCard job={job} />
          </StaggerItem>
        ))}
      </StaggerReveal>

      {/* View more CTA */}
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
