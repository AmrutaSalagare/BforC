import { Skeleton } from "@/components/ui/skeleton";

export default function JobsLoading() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
      {/* Sidebar skeleton */}
      <aside className="w-full lg:w-[320px] shrink-0 hidden lg:block">
        <div className="sticky top-28 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6 space-y-6">
          <Skeleton className="h-7 w-28" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Heading + search */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-64" />
          <div className="bg-white/60 backdrop-blur-xl p-2 rounded-2xl border border-white/80 flex flex-col sm:flex-row gap-2">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="w-24 h-12 rounded-xl" />
          </div>
          <div className="flex gap-2 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="shrink-0 h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Results count */}
        <Skeleton className="h-4 w-36 mb-6" />

        {/* Job card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-md rounded-xl p-6 border border-white/60 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
