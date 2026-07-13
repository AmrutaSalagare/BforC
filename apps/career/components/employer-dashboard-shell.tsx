"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Building, Plus } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { LiveRefresh } from "@/components/live-refresh";

const navItems = [
  { name: "Overview", href: "/employers/dashboard", icon: LayoutDashboard },
  { name: "Manage Jobs", href: "/employers/dashboard/jobs", icon: Briefcase },
  { name: "Applicants", href: "/employers/dashboard/applicants", icon: Users },
  { name: "Company Profile", href: "/employers/dashboard/profile", icon: Building },
];

export function EmployerDashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <LiveRefresh intervalMs={8000} />

      {/* Floating Top Navigation Dock */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-fit px-4 pointer-events-none">
        <div className="bg-[var(--background)]/80 backdrop-blur-2xl border border-[var(--primary)]/10 p-1.5 flex items-center gap-1 rounded-2xl shadow-sm pointer-events-auto overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Manage Jobs" && pathname.startsWith(item.href) && pathname !== "/employers/dashboard/jobs/new");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 text-[13px] font-light tracking-wide transition duration-300 rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] ${
                  isActive
                    ? "text-[var(--primary)] bg-[var(--primary)]/5"
                    : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5"
                }`}
              >
                <item.icon size={16} strokeWidth={1.5} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-light text-[var(--foreground)] text-balance">Employer Dashboard</h1>
          <p className="text-[var(--muted-fg)] text-sm mt-2 font-light">Manage your postings and review talent fluidly.</p>
        </div>
        <Link
          href="/employers/dashboard/jobs/new"
          className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-2xl text-[13px] font-light tracking-wide hover:bg-[var(--foreground)] transition duration-300 shadow-sm"
        >
          <Plus size={18} strokeWidth={1.5} /> Post a Job
        </Link>
      </div>

      <FadeIn className="w-full">
        {children}
      </FadeIn>
    </div>
  );
}
