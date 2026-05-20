"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EASE, CountUp } from "@/components/motion";

const stats = [
  { value: 2400, suffix: "+", label: "Women Placed" },
  { value: 340,  suffix: "+", label: "Active Roles" },
  { value: 18,   suffix: "",  label: "Countries" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88svh] flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Parallax background ellipse */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklch, var(--accent) 55%, transparent) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        id="hero-heading"
        className="font-display text-center text-[clamp(2.8rem,8vw,5.5rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] max-w-3xl mb-5 flex flex-wrap justify-center text-balance"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
        style={{ columnGap: "0.28em", rowGap: "0.02em" }}
      >
        {["Where", "Compassion"].map((w) => (
          <motion.span
            key={w}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          >
            {w}
          </motion.span>
        ))}
        <motion.em
          className="font-display not-italic text-[var(--primary)]"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
        >
          Meets
        </motion.em>
        <motion.span
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
        >
          Careers
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.div
        className="text-center max-w-lg mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
      >
        <p className="text-[var(--foreground)] text-lg font-light mb-2">
          Rebuild your career. Fuel your dreams.
        </p>
        <p className="text-[var(--muted-fg)] text-base leading-relaxed">
          Find roles in social impact, NGOs, and purpose-driven organisations,
          and become a part of a community. Women-friendly workplaces. Real opportunities.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
      >
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Explore roles <ArrowRight size={15} />
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 border border-[var(--accent-color)] text-[var(--accent-color)] px-7 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)] transition duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Sign up free
        </Link>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        className="w-full max-w-xl border-y border-[var(--border)] py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
      >
        <div className="flex items-center justify-center divide-x divide-[var(--border)]">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center px-6 sm:px-10">
              <p className="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-light text-[var(--foreground)] leading-none">
                <CountUp target={value} suffix={suffix} />
              </p>
              <p className="eyebrow mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <div className="w-[1px] h-8 bg-[var(--faint-fg)]" />
      </motion.div>
    </section>
  );
}
