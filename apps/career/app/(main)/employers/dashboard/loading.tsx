import { Skeleton } from "@/components/ui/skeleton";

export default function EmployerDashboardLoading() {
  return (
    <div className="space-y-12">
      {/* Metrics */}
      <section>
        <Skeleton className="h-5 w-40 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-10" />
                </div>
                <Skeleton className="w-12 h-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent postings table */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden">
          <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-6 py-4 flex gap-8">
            {["w-32","w-16","w-20","w-20"].map((w, i) => (
              <Skeleton key={i} className={`h-3 ${w}`} />
            ))}
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 px-6 py-4 border-b border-[var(--border)] last:border-0">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
