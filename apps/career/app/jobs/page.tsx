"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Filter, SlidersHorizontal, Briefcase, IndianRupee, Sparkles } from "lucide-react";
import { JobCard, type Job } from "@/components/job-card";
import { StaggerReveal, StaggerItem, Reveal } from "@/components/motion";
import { CheckBox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

// Placeholder data
const JOBS: Job[] = [
  { id: "1", title: "Programme Manager – Education", company: "Akshaya Patra Foundation", location: "Bengaluru", isRemote: false, salaryMin: 600000, salaryMax: 900000, tags: ["Social Impact", "Education"], womenFriendly: true, postedDaysAgo: 1, type: "Full-time" },
  { id: "2", title: "Research Analyst – Gender & Inclusion", company: "Global AID", location: "Delhi", isRemote: true, salaryMin: 480000, salaryMax: 720000, tags: ["Research", "Flexible"], womenFriendly: true, postedDaysAgo: 3, type: "Full-time" },
  { id: "3", title: "Content Writer – Social Stories", company: "Sahaj Sansthan", location: "Jaipur", isRemote: true, salaryMin: 360000, salaryMax: 540000, tags: ["Content", "Remote"], womenFriendly: true, postedDaysAgo: 0, type: "Contract" },
  { id: "4", title: "Community Outreach Coordinator", company: "Women Serve", location: "Mumbai", isRemote: false, salaryMin: 420000, salaryMax: 600000, tags: ["Community"], womenFriendly: true, postedDaysAgo: 2, type: "Full-time" },
  { id: "5", title: "M&E Specialist", company: "Project Baala", location: "Hyderabad", isRemote: false, salaryMin: 700000, salaryMax: 1000000, tags: ["M&E", "Data"], womenFriendly: false, postedDaysAgo: 5, type: "Full-time" },
  { id: "6", title: "Fundraising Lead", company: "Jagriti Samiti", location: "Lucknow", isRemote: false, salaryMin: 550000, salaryMax: 800000, tags: ["Fundraising"], womenFriendly: true, postedDaysAgo: 7, type: "Full-time" },
  { id: "7", title: "Climate Policy Advocate", company: "Green Earth", location: "Pune", isRemote: true, salaryMin: 600000, salaryMax: 850000, tags: ["Climate", "Policy"], womenFriendly: true, postedDaysAgo: 2, type: "Full-time" },
  { id: "8", title: "Mental Health Counselor", company: "Mindful India", location: "Chennai", isRemote: false, salaryMin: 400000, salaryMax: 550000, tags: ["Healthcare"], womenFriendly: true, postedDaysAgo: 1, type: "Part-time" },
];

const QUICK_FILTERS = ["Remote Only", "Women-Friendly", "Entry Level", "Part-time", "Social Impact"];

export default function JobsSearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const [jobTypes, setJobTypes] = useState<Record<string, boolean>>({
    "Full-time": true,
    "Part-time": false,
    "Contract": false,
    "Volunteer": false,
  });

  const [salaryRange, setSalaryRange] = useState<number[]>([300000]);

  const toggleJobType = (type: string) => {
    setJobTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: Sticky Interactive Filter Panel */}
      <aside className="w-full lg:w-[320px] shrink-0">
        <div className="sticky top-28 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6 shadow-[0_8px_40px_rgb(0,0,0,0.04)] hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <SlidersHorizontal size={20} className="text-[var(--primary)]" />
            <h2 className="font-display text-2xl text-[var(--foreground)]">Filters</h2>
          </div>

          <div className="space-y-8">
            {/* AI Recommendation Toggle */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--blush)] to-transparent border border-[var(--primary)]/10 flex items-start gap-3">
              <Sparkles className="text-[var(--primary)] shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">AI Matchmaking</h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Show jobs matching your resume profile first.</p>
                <button className="mt-3 text-xs font-medium bg-[var(--primary)] text-white px-3 py-1.5 rounded-full hover:bg-[var(--accent-dark)] transition-colors">
                  Enable AI Match
                </button>
              </div>
            </div>

            {/* Role Type */}
            <div>
              <h3 className="text-sm font-medium text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Briefcase size={16} className="text-[var(--faint-fg)]" /> Job Type
              </h3>
              <div className="space-y-2">
                {Object.keys(jobTypes).map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <CheckBox 
                      checked={jobTypes[type]} 
                      onClick={() => toggleJobType(type)} 
                      size={20}
                      color="var(--primary)"
                    />
                    <span className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div>
              <h3 className="text-sm font-medium text-[var(--foreground)] mb-3 flex items-center gap-2">
                <IndianRupee size={16} className="text-[var(--faint-fg)]" /> Salary Range
              </h3>
              <Slider 
                defaultValue={[300000]} 
                max={2000000} 
                step={100000}
                value={salaryRange}
                onValueChange={setSalaryRange}
                showTooltip
                tooltipContent={(val) => `₹${(val / 100000).toFixed(1)}L`}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-[var(--faint-fg)]">
                <span>₹0</span>
                <span>₹20L+</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: Search & Results */}
      <div className="flex-1 min-w-0">
        
        {/* Search Header */}
        <Reveal className="mb-8 relative z-20">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground)] mb-6 tracking-tight leading-none">
            Find your <span className="text-[var(--primary)] italic">purpose.</span>
          </h1>
          
          <div className="bg-white/60 backdrop-blur-xl p-2 rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl border border-white/50">
              <Search size={18} className="text-[var(--faint-fg)]" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or NGO" 
                className="w-full bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--faint-fg)]"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl border border-white/50">
              <MapPin size={18} className="text-[var(--faint-fg)]" />
              <input 
                type="text" 
                placeholder="City or Remote" 
                className="w-full bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--faint-fg)]"
              />
            </div>
            <button className="bg-[var(--accent-color)] text-white px-8 py-3 rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors">
              Search
            </button>
          </div>

          {/* Quick Filters - Horizontal Scroll */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              className="lg:hidden shrink-0 flex items-center gap-2 bg-white/50 border border-[var(--border)] px-4 py-2 rounded-full text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={14} /> Filters
            </button>
            {QUICK_FILTERS.map(filter => (
              <button 
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilters.includes(filter) 
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                    : "bg-white/40 text-[var(--muted-foreground)] border-white/60 hover:border-[var(--primary)]/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Results Info */}
        <Reveal delay={0.1} className="flex justify-between items-center mb-6">
          <p className="text-sm text-[var(--muted-foreground)] font-medium">Showing 142 opportunities</p>
          <select className="bg-transparent border-none outline-none text-sm font-medium text-[var(--foreground)] cursor-pointer">
            <option>Most Relevant</option>
            <option>Newest First</option>
            <option>Salary: High to Low</option>
          </select>
        </Reveal>

        {/* Masonry Job Grid */}
        <StaggerReveal className="columns-1 md:columns-2 gap-6 space-y-6 md:space-y-0" stagger={0.05}>
          {JOBS.map((job) => (
            <StaggerItem key={job.id} className="break-inside-avoid md:mb-6 w-full inline-block">
              <JobCard job={job} />
            </StaggerItem>
          ))}
        </StaggerReveal>

      </div>
    </main>
  );
}
