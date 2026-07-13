"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { EASE, CountUp, MagneticButton } from "@/components/motion";

type HeroUser = {
  role: "seeker" | "employer";
} | null;

const stats = [
  { value: 2400, suffix: "+", label: "Women Placed" },
  { value: 340,  suffix: "+", label: "Active Roles" },
  { value: 18,   suffix: "",  label: "Countries" },
];

export function HeroSection({ user }: { user: HeroUser }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ctaHref = !user ? "/signup" : user.role === "employer" ? "/employers/dashboard" : "/dashboard";
  const ctaLabel = !user ? "Sign up free" : "Go to Dashboard";

  return (
    <section
      ref={ref}
      className="relative min-h-[85svh] w-full flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6"
      aria-labelledby="hero-heading"
    >
      {/* Minimal Geometric Background Element */}
      <motion.div 
        className="absolute top-0 right-0 w-[40vw] h-[100vh] border-l border-[var(--foreground)] opacity-10 pointer-events-none -z-10"
        style={{ y }}
      />

      <div className="container mx-auto max-w-4xl flex flex-col items-center text-center z-10 relative">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)]/5 text-[var(--primary)] text-sm font-medium mb-8 shadow-warm-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Sparkles size={14} />
          <span>Empowering Women in the Social Sector</span>
        </motion.div>

        <motion.p
          className="text-[var(--foreground)] text-sm md:text-base font-sans font-normal opacity-80 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          Where Compassion Meets Careers.
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-[var(--foreground)] text-balance mb-8"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          >
            Rebuild your <em className="not-italic text-[var(--primary)]">career</em>.
          </motion.span>
          <br className="hidden sm:block" />
          <motion.span
            className="inline-block ml-3 sm:ml-0"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          >
            Fuel your <em className="not-italic text-[var(--primary)]">dreams</em>.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-[var(--foreground)] text-lg md:text-xl font-sans opacity-90 leading-relaxed max-w-2xl mb-12 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          Find roles in NGOs and purpose-driven organisations, and become part of a global community supporting women.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
        >
          <MagneticButton>
            <Link
              href="/jobs"
              className="group relative inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-warm-md"
            >
              Explore Roles 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-[var(--foreground)] px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-[var(--foreground)]/5 shadow-warm-md border border-[var(--primary)]/10"
            >
              {ctaLabel}
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Integrated Stats */}
        <motion.div
          className="w-full max-w-3xl pt-10 border-t border-[var(--primary)]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
        >
          <div className="grid grid-cols-3 gap-4 divide-x divide-[var(--primary)]/10">
            {stats.map(({ value, suffix, label }, index) => (
              <div key={label} className="text-center px-4">
                <p className="font-display text-4xl md:text-5xl font-medium text-[var(--foreground)] leading-none mb-2">
                  <CountUp target={value} suffix={suffix} delay={800 + index * 200} />
                </p>
                <p className="text-sm font-sans font-medium opacity-70 text-[var(--foreground)]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
