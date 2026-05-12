"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { EASE, CountUp } from "@/components/motion";
import Form from "next/form";

const categories = [
  "Remote",
  "Return to Work",
  "Flexible Hours",
  "Leadership",
  "NGO / Social",
  "Research",
  "Education",
];

const stats = [
  { value: 2400, suffix: "+", label: "Women Placed" },
  { value: 340,  suffix: "+", label: "Active Roles" },
  { value: 18,   suffix: "",  label: "Countries" },
];

export function HeroSection() {
  const [query, setQuery]       = useState("");
  const [location, setLocation] = useState("");
  const ref = useRef<HTMLElement>(null);

  // Parallax: background ellipse moves at 0.35x scroll speed
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92svh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      aria-label="Hero - Find Your Impact Role"
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

      {/* Eyebrow */}
      <motion.p
        className="eyebrow mb-4 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        Where Compassion Meets Career
      </motion.p>

      {/* Headline - word-by-word stagger */}
      <motion.h1
        className="font-display text-center text-[clamp(2.8rem,8vw,5.5rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] max-w-3xl mb-5 flex flex-wrap justify-center"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
        style={{ columnGap: "0.28em", rowGap: "0.02em" }}
      >
        {["Find", "Work", "That"].map((w) => (
          <motion.span key={w} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
            {w}
          </motion.span>
        ))}
        {/* Accent word */}
        <motion.em
          className="font-display not-italic text-[var(--primary)]"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
        >
          Moves
        </motion.em>
        {["the", "World"].map((w) => (
          <motion.span key={w} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
            {w}
          </motion.span>
        ))}
      </motion.h1>

      {/* Sub */}
      <motion.p
        className="text-[var(--muted-foreground)] text-center max-w-lg text-base leading-relaxed mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
      >
        Curated roles in social impact, NGOs and purpose-driven organisations.
        Women-friendly workplaces. Real opportunities.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        whileHover={{ scale: 1.01 }}
      >
        <Form
          action="/jobs"
          className="flex flex-col sm:flex-row bg-white/60 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/70 overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_50px_rgb(0,0,0,0.12)]"
        >
          {/* Role search */}
          <label htmlFor="q" className="sr-only">Search role, skill, or organisation</label>
          <div className="flex items-center gap-3 flex-1 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
            <Search size={18} className="text-[var(--faint-fg)] shrink-0" />
            <input
              id="q"
              name="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Role, skill, or organisation..."
              className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] outline-none"
            />
          </div>

          {/* Location */}
          <label htmlFor="location" className="sr-only">Location</label>
          <div className="flex items-center gap-3 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[var(--border)] sm:w-44">
            <MapPin size={18} className="text-[var(--faint-fg)] shrink-0" />
            <input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or Remote"
              className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3.5 text-sm font-medium hover:bg-[var(--accent-dark)] transition-colors duration-200 shrink-0"
          >
            Search
          </button>
        </Form>
      </motion.div>

      {/* Category chips */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center mt-5 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <span className="text-xs text-[var(--faint-fg)] mr-1 self-center">Popular:</span>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/jobs?category=${encodeURIComponent(cat)}`}
            className="text-xs px-3 py-1.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-fg)] hover:bg-[var(--blush)] hover:text-[var(--foreground)] transition-all duration-200 border border-[var(--border)]"
          >
            {cat}
          </a>
        ))}
      </motion.div>

      {/* Stats strip */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10 sm:mt-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="text-center">
            <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[var(--accent-color)] leading-none">
              <CountUp target={value} suffix={suffix} />
            </p>
            <p className="eyebrow mt-1">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--faint-fg)]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <div className="w-[1px] h-8 bg-[var(--faint-fg)]" />
      </motion.div>
    </section>
  );
}
