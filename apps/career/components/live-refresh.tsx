"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type LiveRefreshProps = {
  intervalMs?: number;
};

export function LiveRefresh({ intervalMs = 8000 }: LiveRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [router, intervalMs]);

  return null;
}
