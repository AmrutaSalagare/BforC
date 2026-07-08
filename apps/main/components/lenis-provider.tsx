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
