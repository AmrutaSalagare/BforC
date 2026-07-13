"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * LenisProvider - mounts Lenis smooth scroll globally.
 * - Syncs with Framer Motion's RAF via useEffect.
 * - Automatically disabled when user prefers-reduced-motion.
 * - Scrolls to top on every route change so whileInView animations
 *   re-trigger correctly when navigating back to a page.
 * - Zero re-renders; purely imperative side-effect.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Force reload if page is recovered from back-forward cache (bfcache)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    // 2. Force reload if navigation type is back/forward (e.g. returning from local port 3001)
    if (typeof window !== "undefined" && window.performance) {
      const navigationEntries = window.performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        const timing = navigationEntries[0] as PerformanceNavigationTiming;
        if (timing.type === "back_forward") {
          window.location.reload();
        }
      }
    }

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    // Respect accessibility preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1, // scroll travel time (seconds)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      touchMultiplier: 1.5, // natural feel on touch
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // RAF loop - does NOT conflict with framer-motion
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on every route change so whileInView animations
  // re-trigger correctly when the user navigates back to a page.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
