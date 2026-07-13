import { redirect } from "next/navigation";
import { getVerifiedAdminSession } from "@/lib/auth/admin";
import Link from "next/link";
import { LayoutDashboard, Building2, Briefcase, LogOut } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getVerifiedAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row relative">
      {/* Subtle Dot/Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.3]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, #94A3B8 1px, transparent 1px)',
             backgroundSize: '24px 24px' 
           }}>
        {/* Fade out edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9FAFB] opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9FAFB] via-transparent to-[#F9FAFB] opacity-60"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#F9FAFB]/80 backdrop-blur-xl border-r border-slate-200/50 flex flex-col md:sticky top-0 md:h-screen shrink-0 z-10 relative shadow-[1px_0_0_0_rgba(0,0,0,0.02)]">
        <div className="p-6">
          <Link href="/admin" className="font-display text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-inner flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            BforC <span className="font-medium text-slate-400">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link 
            href="/admin" 
            className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-white hover:text-emerald-700 hover:shadow-sm transition-all border border-transparent hover:border-slate-200/60"
          >
            <LayoutDashboard size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            Dashboard
          </Link>
          <Link 
            href="/admin/employers" 
            className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-white hover:text-emerald-700 hover:shadow-sm transition-all border border-transparent hover:border-slate-200/60"
          >
            <Building2 size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            Employers
          </Link>
          <Link 
            href="/admin/jobs" 
            className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-white hover:text-emerald-700 hover:shadow-sm transition-all border border-transparent hover:border-slate-200/60"
          >
            <Briefcase size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            Jobs
          </Link>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-200/50 bg-slate-50/50">
          <form action={logoutAction}>
            <button
              type="submit"
              className="group flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-6 md:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
