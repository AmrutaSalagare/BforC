"use client";

import { motion } from "framer-motion";
import { Search, Star, Building2, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerReveal, StaggerItem, FadeIn } from "@/components/motion";

const COMPANIES = [
  { name: "Akshaya Patra", rating: 4.8, openRoles: 6, womenFriendly: true, location: "Bengaluru", category: "Education" },
  { name: "Global AID", rating: 4.6, openRoles: 4, womenFriendly: true, location: "Delhi", category: "Research" },
  { name: "Sahaj Sansthan", rating: 4.5, openRoles: 2, womenFriendly: true, location: "Jaipur", category: "Community" },
  { name: "Women Serve", rating: 4.9, openRoles: 8, womenFriendly: true, location: "Mumbai", category: "Empowerment" },
  { name: "Project Baala", rating: 4.4, openRoles: 3, womenFriendly: false, location: "Hyderabad", category: "Healthcare" },
  { name: "Jagriti Mahila", rating: 4.7, openRoles: 5, womenFriendly: true, location: "Lucknow", category: "Livelihood" },
  { name: "Jyoti Foundation", rating: 4.5, openRoles: 2, womenFriendly: true, location: "Pune", category: "Education" },
  { name: "RLHP", rating: 4.3, openRoles: 1, womenFriendly: false, location: "Mysore", category: "Child Rights" },
  { name: "Green Earth", rating: 4.8, openRoles: 3, womenFriendly: true, location: "Remote", category: "Environment" },
  { name: "Mindful India", rating: 4.6, openRoles: 2, womenFriendly: true, location: "Chennai", category: "Healthcare" },
];

function CompanyInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function CompaniesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <p className="eyebrow mb-4">— IMPACT ORGANISATIONS —</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground)] mb-6 tracking-tight leading-tight">
            Work with teams that <span className="text-[var(--primary)] italic">care.</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto mb-10">
            Discover NGOs, social enterprises, and impact-driven corporations vetted for their commitment to social change and inclusive workplaces.
          </p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1} className="w-full max-w-xl relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-[var(--faint-fg)]" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, sector, or city..." 
            className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] outline-none text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus:border-[var(--primary)]/50 transition-colors"
          />
        </Reveal>
      </div>

      {/* Directory Grid */}
      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch" stagger={0.06}>
        {COMPANIES.map((company) => (
          <StaggerItem key={company.name} className="h-full flex flex-col">
            <Link 
              href={`/companies/${company.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col flex-1 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:border-[var(--accent-color)]/30 cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Background gradient blob on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--blush)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between gap-3 flex-wrap mb-5 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[var(--blush)] to-white/50 border border-white flex items-center justify-center font-display text-xl font-medium text-[var(--primary)] shadow-sm">
                  {CompanyInitials(company.name)}
                </div>
                {company.womenFriendly && (
                  <span className="badge-women-friendly text-[10px] shrink-0">Women-Friendly ✦</span>
                )}
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-lg font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--accent-color)] transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{company.category}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                  <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <Star size={13} className="fill-[var(--accent-color)] text-[var(--accent-color)]" />
                    {company.rating}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <MapPin size={13} />
                    {company.location}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between relative z-10">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {company.openRoles} <span className="text-[var(--faint-fg)] font-normal">open roles</span>
                </span>
                <span className="text-[var(--primary)] bg-[var(--blush)] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ExternalLink size={14} />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerReveal>

      {/* CTA Section */}
      <FadeIn delay={0.3} className="mt-20 text-center bg-gradient-to-r from-transparent via-[var(--blush)]/30 to-transparent py-16 rounded-3xl border border-white/20">
        <h2 className="font-display text-3xl text-[var(--foreground)] mb-4">Are you an impact organisation?</h2>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-8">
          Join our curated network of NGOs and social enterprises to find passionate, purpose-driven talent.
        </p>
        <Link href="/signup?role=employer" className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors">
          <Building2 size={18} />
          Create Employer Profile
        </Link>
      </FadeIn>

    </main>
  );
}
