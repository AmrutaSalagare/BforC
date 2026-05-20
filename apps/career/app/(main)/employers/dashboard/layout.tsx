"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Building, Plus } from "lucide-react";
import { FadeIn } from "@/components/motion";

const navItems = [
  { name: "Overview", href: "/employers/dashboard", icon: LayoutDashboard },
  { name: "Manage Jobs", href: "/employers/dashboard/jobs", icon: Briefcase },
  { name: "Applicants", href: "/employers/dashboard/applicants", icon: Users },
  { name: "Company Profile", href: "/employers/dashboard/profile", icon: Building },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-[var(--foreground)] text-balance">Employer Dashboard</h1>
          <p className="text-[var(--muted-fg)] text-sm mt-1">Manage your postings and review talent.</p>
        </div>
        <Link 
          href="/employers/dashboard/jobs/new"
          className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-5 py-2.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5"
        >
          <Plus size={16} /> Post a Job
        </Link>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-8 border-b border-[var(--border)] scrollbar-hide">
        {navItems.map((item) => {
          // Exact match for Overview, Profile, Applicants. For Jobs, match sub-routes but don't strictly match "new"
          const isActive = pathname === item.href || (item.name === "Manage Jobs" && pathname.startsWith(item.href) && pathname !== "/employers/dashboard/jobs/new");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition duration-200 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                isActive 
                  ? "text-[var(--accent-color)] border-[var(--accent-color)] bg-[var(--accent-color)]/5" 
                  : "text-[var(--muted-fg)] border-transparent hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]"
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <FadeIn className="w-full">
        {children}
      </FadeIn>
    </div>
  );
}
