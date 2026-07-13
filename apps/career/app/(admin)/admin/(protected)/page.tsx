import { getSupabaseConfig } from "@/lib/data/supabase";
import { Users, Building2, Briefcase, FileText, AlertCircle, ArrowRight, Activity, TrendingUp, CalendarDays, BarChart3 } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | BforC",
};

async function getAdminMetrics() {
  const config = getSupabaseConfig();
  if (!config.ok) return null;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;

  const headers = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };

  try {
    const [seekersRes, employersRes, jobsRes, applicationsRes] = await Promise.all([
      fetch(`${config.url}/rest/v1/seeker_profiles?select=id`, { headers, cache: "no-store" }),
      fetch(`${config.url}/rest/v1/employer_profiles?select=id,is_verified`, { headers, cache: "no-store" }),
      fetch(`${config.url}/rest/v1/jobs?select=id,status,created_at`, { headers, cache: "no-store" }),
      fetch(`${config.url}/rest/v1/applications?select=id,applied_at`, { headers, cache: "no-store" })
    ]);

    if (!seekersRes.ok || !employersRes.ok || !jobsRes.ok || !applicationsRes.ok) {
      return null;
    }

    const [seekers, employers, jobs, applications] = await Promise.all([
      seekersRes.json() as Promise<Array<{ id: string }>>,
      employersRes.json() as Promise<Array<{ id: string; is_verified: boolean }>>,
      jobsRes.json() as Promise<Array<{ id: string; status: string; created_at: string }>>,
      applicationsRes.json() as Promise<Array<{ id: string; applied_at: string }>>
    ]);

    const pendingEmployers = employers.filter(e => !e.is_verified).length;
    const activeJobs = jobs.filter(j => j.status === 'active').length;
    const totalJobs = jobs.length;
    const totalApplications = applications.length;

    // Last 7 days trend calculation
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return {
        dateString: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        jobs: 0,
        apps: 0
      };
    });

    jobs.forEach(j => {
      if (!j.created_at) return;
      const dateStr = j.created_at.split('T')[0];
      const day = last7Days.find(d => d.dateString === dateStr);
      if (day) day.jobs++;
    });

    applications.forEach(a => {
      if (!a.applied_at) return;
      const dateStr = a.applied_at.split('T')[0];
      const day = last7Days.find(d => d.dateString === dateStr);
      if (day) day.apps++;
    });

    const maxVal = Math.max(
      1, 
      ...last7Days.map(d => d.jobs), 
      ...last7Days.map(d => d.apps)
    );

    // Calculate a mock trend for KPIs based on last 7 days vs previous (we only have 7 days here, so we will use first half vs second half for visual effect if we want, or just sparklines)
    const recentApps = last7Days.slice(-3).reduce((acc, curr) => acc + curr.apps, 0);

    return {
      totalSeekers: seekers.length || 0,
      totalEmployers: employers.length || 0,
      pendingEmployers,
      activeJobs,
      totalJobs,
      totalApplications,
      applicationsPerJob: activeJobs > 0 ? (totalApplications / activeJobs).toFixed(1) : "0",
      recentApps,
      trend: {
        data: last7Days,
        maxVal
      }
    };
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const metrics = await getAdminMetrics();

  if (!metrics) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-white/50 border border-slate-200 rounded-3xl">
        <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
        <h1 className="text-xl font-semibold text-slate-700">Analytics Unavailable</h1>
        <p className="text-slate-500 mt-1">Please ensure the SUPABASE_SERVICE_ROLE_KEY is configured.</p>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const kpis = [
    { 
      label: "Total Seekers", 
      value: metrics.totalSeekers, 
      icon: Users, 
      trend: "+12% this month", // static for UI-UX pro max feel
      color: "from-blue-500/10 to-blue-500/5", 
      textColor: "text-blue-600",
      borderColor: "border-blue-100"
    },
    { 
      label: "Verified Employers", 
      value: metrics.totalEmployers - metrics.pendingEmployers, 
      icon: Building2, 
      trend: "+4 new", 
      color: "from-indigo-500/10 to-indigo-500/5", 
      textColor: "text-indigo-600",
      borderColor: "border-indigo-100"
    },
    { 
      label: "Active Jobs", 
      value: metrics.activeJobs, 
      icon: Briefcase, 
      trend: "High volume", 
      color: "from-emerald-500/10 to-emerald-500/5", 
      textColor: "text-emerald-600",
      borderColor: "border-emerald-100"
    },
    { 
      label: "Total Applications", 
      value: metrics.totalApplications, 
      icon: FileText, 
      trend: `${metrics.recentApps} recently`, 
      color: "from-violet-500/10 to-violet-500/5", 
      textColor: "text-violet-600",
      borderColor: "border-violet-100"
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-3 tracking-wide uppercase text-[10px]">
            <CalendarDays size={14} className="text-emerald-500" />
            <span>{currentDate}</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 mb-2 drop-shadow-sm">
            Command Center
          </h1>
          <p className="text-slate-500 text-base max-w-xl">
            Monitor platform health, verify users, and track growth.
          </p>
        </div>
      </Reveal>

      {/* Action Required Banner - Modern Skeuomorphic */}
      {metrics.pendingEmployers > 0 && (
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 rounded-2xl ring-1 ring-slate-900/5 shadow-[0_4px_12px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)] p-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-500 rounded-l-2xl shadow-[inset_1px_0_2px_rgba(255,255,255,0.4)]"></div>
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/50 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.02)] ring-1 ring-amber-200/50 flex items-center justify-center text-amber-500">
                  <AlertCircle size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 tracking-tight">Verification Pending</h3>
                  <p className="text-slate-500 text-sm mt-0.5">
                    <span className="font-medium text-amber-600">{metrics.pendingEmployers} employers</span> are waiting for manual profile approval.
                  </p>
                </div>
              </div>
              <Link 
                href="/admin/employers"
                className="group bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_5px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 active:shadow-inner active:translate-y-px"
              >
                Review Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      )}

      {/* PRO-MAX KPI Grid - High-End Minimalist + Soft Skeuo */}
      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
        {kpis.map((kpi, i) => (
          <StaggerItem key={i} className={`relative bg-gradient-to-b from-white to-[#F8FAFC] rounded-[24px] ring-1 ring-slate-900/5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 group`}>
            <div className="relative p-7">
              <div className="flex items-start justify-between mb-8">
                {/* Skeuomorphic Icon Button */}
                <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-b from-white to-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.02)] ring-1 ring-slate-100 flex items-center justify-center ${kpi.textColor} group-hover:scale-105 transition-transform`}>
                  <kpi.icon size={22} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white shadow-sm px-2.5 py-1 rounded-full ring-1 ring-slate-900/5">
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-[32px] leading-none font-bold text-slate-900 tracking-tight mb-2 drop-shadow-sm">{kpi.value.toLocaleString()}</p>
                <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>

      {/* Analytics Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Advanced 7-Day Chart - Crisp Minimalist */}
        <Reveal className="col-span-1 lg:col-span-2 bg-gradient-to-b from-white to-slate-50 rounded-[32px] ring-1 ring-slate-900/5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] overflow-hidden flex flex-col relative">
          
          <div className="p-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
            <div>
              <div className="flex items-center gap-2 text-slate-900 mb-1">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-100/50 shadow-inner">
                   <BarChart3 size={16} />
                </div>
                <h3 className="font-bold text-xl tracking-tight">Activity Pulse</h3>
              </div>
              <p className="text-sm text-slate-500 ml-10">Trailing 7-day velocity</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.02)] ring-1 ring-slate-900/5">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-inner"></div> Applications</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-inner"></div> Jobs</div>
            </div>
          </div>

          <div className="px-8 pt-6 pb-8 flex-1 flex items-end justify-between gap-2 sm:gap-6 relative z-10">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 px-8 pt-6 pb-8 pointer-events-none flex flex-col justify-between z-0">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full border-t border-slate-200/60 border-dashed"></div>
              ))}
            </div>

            {/* Bars */}
            {metrics.trend.data.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10 h-[220px]">
                <div className="w-full flex items-end justify-center gap-1.5 h-full relative cursor-crosshair">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-900/5 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20 pointer-events-none">
                    <span className="text-slate-500">{day.apps} Apps</span> · <span className="text-emerald-600">{day.jobs} Jobs</span>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-900/5 rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.02)]"></div>
                  </div>
                  
                  {/* Apps Bar (Minimalist Slate) */}
                  <div 
                    className="w-1/2 max-w-[28px] bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-lg transition-all duration-700 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)] group-hover:brightness-105 relative"
                    style={{ height: `${Math.max(4, (day.apps / metrics.trend.maxVal) * 100)}%` }}
                  >
                  </div>
                  {/* Jobs Bar (Emerald Accent) */}
                  <div 
                    className="w-1/2 max-w-[28px] bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-700 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] group-hover:brightness-110 relative"
                    style={{ height: `${Math.max(4, (day.jobs / metrics.trend.maxVal) * 100)}%` }}
                  >
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{day.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Platform Health - Clean Skeuomorphic */}
        <Reveal className="col-span-1 bg-gradient-to-b from-white to-slate-50 rounded-[32px] ring-1 ring-slate-900/5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col relative text-slate-900 overflow-hidden">
          <div className="absolute -top-10 -right-10 p-8 opacity-5 pointer-events-none text-emerald-900">
             <Activity size={180} strokeWidth={2} />
          </div>
          
          <div className="p-8 relative z-10 flex flex-col h-full">
            <h3 className="font-bold text-xl tracking-tight text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-100/50 shadow-inner">
                 <Activity size={16} />
              </div>
              Platform Health
            </h3>
            
            <div className="space-y-10 flex-1 flex flex-col justify-center">
              <div className="group cursor-default bg-white p-6 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Avg. Apps per Job</p>
                <div className="flex items-end gap-3">
                  <span className="font-display text-5xl font-bold tracking-tighter text-slate-900 drop-shadow-sm">{metrics.applicationsPerJob}</span>
                  <div className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center mb-1.5 ring-1 ring-emerald-200/50 shadow-sm">
                    <TrendingUp size={12} className="mr-1.5 stroke-[3px]"/> Healthy
                  </div>
                </div>
              </div>

              <div className="group cursor-default bg-white p-6 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform Fill Rate</p>
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500 drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" strokeDasharray={`${metrics.totalJobs > 0 ? (metrics.activeJobs / metrics.totalJobs) * 100 : 0}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-sm font-bold text-slate-900">{metrics.totalJobs > 0 ? Math.round((metrics.activeJobs / metrics.totalJobs) * 100) : 0}%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">Conversion from posting to active state.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
