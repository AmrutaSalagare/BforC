"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition, useRef } from "react";

export function AdminSearch({ placeholder = "Search..." }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = searchParams.get("q") ?? "";

  const handleSearch = (term: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set("q", term.trim());
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300);
  };

  return (
    <div className="relative w-full max-w-sm mb-6">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[var(--muted-fg)] pointer-events-none" size={16} />
        <input
          type="search"
          placeholder={placeholder}
          defaultValue={q}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white/50 border border-[var(--border)] rounded-full pl-10 pr-10 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
        />
        {isPending && (
          <div className="absolute right-3 w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin pointer-events-none" />
        )}
      </div>
    </div>
  );
}
