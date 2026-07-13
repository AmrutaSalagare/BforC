"use client";

import Form from "next/form";

import { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Briefcase,
  IndianRupee,
  MapPin,
  Search,
  SlidersHorizontal,
  Globe,
  Heart,
  Award,
  Clock,
  Sparkles,
  SearchX,
} from "lucide-react";
import { JobCard } from "@/components/job-card";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import { CheckBox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job } from "@/lib/data/types";
import { AnimatePresence, motion } from "framer-motion";
import { JobDetailDialog } from "@/components/job-detail-dialog";

const QUICK_FILTERS = [
  "Remote Only",
  "Women-Friendly",
  "Entry Level",
  "Part-time",
  "Social Impact",
];

const QUICK_FILTER_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "Remote Only": Globe,
  "Women-Friendly": Heart,
  "Entry Level": Award,
  "Part-time": Clock,
  "Social Impact": Sparkles,
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Volunteer"] as const;
const SALARY_MAX_LIMIT = 2000000;

type JobsSearchPageProps = {
  jobs: Job[];
  query?: string;
  location?: string;
};

export function JobsSearchPageContent({
  jobs,
  query = "",
  location = "",
}: JobsSearchPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const activeFilters = searchParams.getAll("filter");
  const selectedTypes = searchParams.getAll("type");
  const remoteOnly = searchParams.get("remote") === "true";
  const womenFriendlyOnly = searchParams.get("womenFriendly") === "true";
  const salaryParam = Number(searchParams.get("maxSalary"));
  const parsedSalary =
    Number.isFinite(salaryParam) && salaryParam > 0
      ? salaryParam
      : SALARY_MAX_LIMIT;
  const initialSalaryCap = Math.min(parsedSalary, SALARY_MAX_LIMIT);
  const [salaryRange, setSalaryRange] = useState<number[]>([initialSalaryCap]);

  const updateSearchParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const toggleJobType = (type: string) => {
    updateSearchParams((params) => {
      const current = params.getAll("type");
      params.delete("type");
      const next = current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type];
      next.forEach((value) => params.append("type", value));
    });
  };

  const toggleFilter = (filter: string) => {
    if (filter === "Remote Only") {
      updateSearchParams((params) => {
        if (params.get("remote") === "true") {
          params.delete("remote");
        } else {
          params.set("remote", "true");
        }
      });
      return;
    }

    if (filter === "Women-Friendly") {
      updateSearchParams((params) => {
        if (params.get("womenFriendly") === "true") {
          params.delete("womenFriendly");
        } else {
          params.set("womenFriendly", "true");
        }
      });
      return;
    }

    if (filter === "Part-time") {
      toggleJobType("Part-time");
      return;
    }

    updateSearchParams((params) => {
      const current = params.getAll("filter");
      params.delete("filter");
      const next = current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter];
      next.forEach((value) => params.append("filter", value));
    });
  };

  const isQuickFilterActive = (filter: string) => {
    if (filter === "Remote Only") return remoteOnly;
    if (filter === "Women-Friendly") return womenFriendlyOnly;
    if (filter === "Part-time") return selectedTypes.includes("Part-time");
    return activeFilters.includes(filter);
  };

  const qFromUrl = (searchParams.get("q") ?? query).trim().toLowerCase();
  const locationFromUrl = (searchParams.get("location") ?? location)
    .trim()
    .toLowerCase();

  const hasTypeFilter = selectedTypes.length > 0;
  const hasSalaryCap = salaryRange[0] < SALARY_MAX_LIMIT;
  const visibleJobs = jobs.filter((job) => {
    if (qFromUrl) {
      const haystack =
        `${job.title} ${job.company} ${job.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(qFromUrl)) return false;
    }

    if (locationFromUrl) {
      const locationHaystack =
        `${job.location} ${job.isRemote ? "remote" : ""}`.toLowerCase();
      if (!locationHaystack.includes(locationFromUrl)) return false;
    }

    if (remoteOnly && !job.isRemote) return false;
    if (womenFriendlyOnly && !job.womenFriendly) return false;

    if (hasTypeFilter && !selectedTypes.includes(job.type)) return false;

    if (hasSalaryCap) {
      const offeredSalary = Math.max(job.salaryMax ?? 0, job.salaryMin ?? 0);
      if (offeredSalary > 0 && offeredSalary > salaryRange[0]) return false;
    }

    for (const filter of activeFilters) {
      if (filter === "Entry Level") {
        const text = `${job.title} ${job.tags.join(" ")}`.toLowerCase();
        if (!/(entry|junior|associate|fresher|intern)/.test(text)) return false;
      } else if (filter === "Social Impact") {
        const text =
          `${job.title} ${job.company} ${job.tags.join(" ")}`.toLowerCase();
        if (
          !/(social impact|ngo|non-profit|nonprofit|community|sustainability|csr)/.test(
            text,
          )
        )
          return false;
      }
    }

    return true;
  });

  return (
    <main className="min-h-screen pt-32 pb-40 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-[1800px] mx-auto">
        <Reveal className="mb-16 relative z-20 text-center max-w-4xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--foreground)] mb-8 tracking-tight leading-none uppercase">
            Find your <span className="text-[var(--primary)]">purpose.</span>
          </h1>
          <p>
            Browse through multiple open roles at purpose-driven organizations
            and institutions to find the perfect fit for you. Find opportunities
            in social impact and work to bring about positive change.
          </p>

          <Form
            action="/jobs"
            className="mt-8 bg-[var(--background)]/80 backdrop-blur-xl p-1.5 rounded-3xl sm:rounded-full border border-[var(--primary)]/10 shadow-sm flex flex-col sm:flex-row items-center gap-0 relative z-30 max-w-4xl mx-auto"
          >
            {activeFilters.map((filter) => (
              <input key={filter} type="hidden" name="filter" value={filter} />
            ))}
            {selectedTypes.map((type) => (
              <input key={type} type="hidden" name="type" value={type} />
            ))}
            {remoteOnly && <input type="hidden" name="remote" value="true" />}
            {womenFriendlyOnly && (
              <input type="hidden" name="womenFriendly" value="true" />
            )}
            {salaryRange[0] < SALARY_MAX_LIMIT && (
              <input
                type="hidden"
                name="maxSalary"
                value={String(salaryRange[0])}
              />
            )}
            <div className="flex-1 flex items-center gap-3 px-5 py-3 w-full sm:w-auto transition-colors rounded-3xl sm:rounded-full focus-within:bg-[var(--primary)]/5">
              <Search size={18} className="text-[var(--primary)] shrink-0" />
              <input
                name="q"
                type="text"
                defaultValue={searchParams.get("q") ?? query}
                placeholder="Job title, keywords, or NGO"
                className="w-full bg-transparent outline-none font-sans text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40"
              />
            </div>

            <div className="hidden sm:block w-px h-8 bg-[var(--primary)]/10" />

            <div className="flex-1 flex items-center gap-3 px-5 py-3 w-full sm:w-auto transition-colors rounded-3xl sm:rounded-full focus-within:bg-[var(--primary)]/5">
              <MapPin size={18} className="text-[var(--primary)] shrink-0" />
              <input
                name="location"
                type="text"
                defaultValue={searchParams.get("location") ?? location}
                placeholder="City or Remote"
                className="w-full bg-transparent outline-none font-sans text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40"
              />
            </div>
            <button className="bg-[var(--primary)] text-[var(--background)] font-sans text-sm font-medium px-8 py-3.5 rounded-3xl sm:rounded-full hover:bg-[var(--foreground)] transition-colors w-full sm:w-auto mt-1 sm:mt-0 shadow-sm flex-shrink-0">
              Search
            </button>
          </Form>
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-[var(--primary)]/10 pb-4"
        >
          <p className="font-sans text-sm font-medium text-[var(--foreground)]/60">
            Showing {visibleJobs.length} opportunit
            {visibleJobs.length === 1 ? "y" : "ies"}
          </p>
          <select className="bg-transparent border-none outline-none font-sans text-sm font-medium text-[var(--foreground)] cursor-pointer mt-4 sm:mt-0">
            <option>Most Relevant</option>
            <option>Newest First</option>
            <option>Salary: High to Low</option>
          </select>
        </Reveal>

        {visibleJobs.length === 0 ? (
          <div className="rounded-2xl border border-[var(--primary)]/10 bg-[var(--background)] p-12 sm:p-16 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <motion.div 
              className="w-20 h-20 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SearchX size={36} className="text-[var(--primary)]" />
            </motion.div>
            <h3 className="font-display text-2xl font-medium text-[var(--foreground)] mb-2 relative z-10">No matches found</h3>
            <p className="font-sans text-base text-[var(--muted-fg)] max-w-md relative z-10">
              We couldn't find any opportunities matching your current filters. Try adjusting your search criteria or clearing filters to see more roles.
            </p>
            <button 
              onClick={() => router.push(pathname)}
              className="mt-6 px-6 py-2.5 bg-white border border-[var(--primary)]/20 rounded-xl text-sm font-medium text-[var(--foreground)] shadow-sm hover:bg-[var(--primary)]/5 transition-colors relative z-10"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            stagger={0.05}
          >
            {visibleJobs.map((job) => (
              <StaggerItem key={job.id}>
                <JobCard
                  job={job}
                  onViewDetails={(j) => setSelectedJobId(j.id)}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>
        )}
      </div>

      {/* FLOATING ACTION DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 max-w-[95%] pointer-events-none">
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-[90vw] max-w-2xl bg-[var(--background)]/90 backdrop-blur-xl border border-[var(--primary)]/10 shadow-2xl rounded-3xl p-6 pointer-events-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-sans text-sm font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Briefcase size={14} className="text-[var(--primary)]" />{" "}
                    Job Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {JOB_TYPES.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <CheckBox
                          checked={selectedTypes.includes(type)}
                          onClick={() => toggleJobType(type)}
                          size={18}
                          color="var(--primary)"
                        />
                        <span className="font-sans text-sm text-[var(--foreground)]/70 group-hover:text-[var(--primary)] transition-colors mt-0.5">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans text-sm font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <IndianRupee size={14} className="text-[var(--primary)]" />{" "}
                    Salary Range
                  </h3>
                  <Slider
                    value={salaryRange}
                    max={SALARY_MAX_LIMIT}
                    step={100000}
                    onValueChange={setSalaryRange}
                    onValueCommit={(values) => {
                      updateSearchParams((params) => {
                        if (
                          (values[0] ?? SALARY_MAX_LIMIT) >= SALARY_MAX_LIMIT
                        ) {
                          params.delete("maxSalary");
                        } else {
                          params.set("maxSalary", String(values[0]));
                        }
                      });
                    }}
                    showTooltip
                    tooltipContent={(val) =>
                      `Rs. ${(val / 100000).toFixed(1)}L`
                    }
                    className="my-4"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[var(--background)]/85 backdrop-blur-xl border border-[var(--primary)]/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-full p-2 flex items-center gap-2 pointer-events-auto">
          <button
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${
              isFilterOpen
                ? "bg-[var(--primary)] text-[var(--background)] shadow-sm"
                : "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--primary)] shadow-sm"
            }`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={14} /> {isFilterOpen ? "Close" : "Filters"}
          </button>
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto hide-scrollbar px-2">
            {QUICK_FILTERS.map((filter) => {
              const Icon = QUICK_FILTER_ICONS[filter] || Sparkles;
              const isActive = isQuickFilterActive(filter);
              return (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-sans text-xs font-medium transition duration-200 border ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--background)] border-[var(--primary)] shadow-sm"
                      : "bg-transparent text-[var(--foreground)]/75 border-[var(--primary)]/10 hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/20"
                  }`}
                >
                  <Icon
                    size={12}
                    className={
                      isActive
                        ? "text-[var(--background)]"
                        : "text-[var(--primary)]"
                    }
                  />
                  <span>{filter}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Premium Job Detail Dialog Overlay Interceptor */}
      <JobDetailDialog
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />
    </main>
  );
}

function JobsSearchSkeleton() {
  return (
    <main className="min-h-screen pt-32 pb-40 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 relative z-20 text-center max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <div className="flex gap-2 h-16">
            <Skeleton className="flex-1 rounded-xl" />
            <Skeleton className="flex-1 rounded-xl" />
            <Skeleton className="w-32 rounded-xl" />
          </div>
        </div>
        <div className="flex justify-between items-center mb-8 border-b border-[var(--foreground)]/10 pb-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--background)] rounded-2xl p-6 pb-16 border border-[var(--primary)]/10 space-y-4"
            >
              <div className="flex gap-4 mb-6">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2 mt-1">
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-8 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-xl" />
                <Skeleton className="h-6 w-16 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function JobsSearchPage(props: JobsSearchPageProps) {
  return (
    <Suspense fallback={<JobsSearchSkeleton />}>
      <JobsSearchPageContent {...props} />
    </Suspense>
  );
}
