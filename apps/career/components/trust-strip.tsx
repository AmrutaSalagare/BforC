"use client";

import { motion } from "framer-motion";

const items = [
  { label: "500+ NGO Partners",          color: "var(--brand-green)",   text: "var(--brand-green-deep)" },
  { label: "1,200+ Active Roles",         color: "var(--brand-purple)",  text: "var(--brand-purple-deep)" },
  { label: "40+ Cities",                  color: "var(--brand-teal)",    text: "var(--brand-teal-deep)" },
  { label: "Women-Friendly Verified",     color: "var(--brand-green)",   text: "var(--brand-green-deep)" },
  { label: "Zero Fake Listings",          color: "var(--brand-purple)",  text: "var(--brand-purple-deep)" },
  { label: "2,400+ Women Placed",         color: "var(--brand-teal)",    text: "var(--brand-teal-deep)" },
  { label: "94% Placement Rate",          color: "var(--brand-green)",   text: "var(--brand-green-deep)" },
  { label: "Trusted by 18 Countries",     color: "var(--brand-purple)",  text: "var(--brand-purple-deep)" },
];

const doubled = [...items, ...items]; // infinite marquee illusion

export function TrustStrip() {
  return (
    <div className="relative py-5 overflow-hidden" aria-hidden>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {doubled.map(({ label, color, text }, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border"
            style={{
              backgroundColor: color,
              color: text,
              borderColor: `color-mix(in oklch, ${text} 20%, transparent)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: text, opacity: 0.6 }}
            />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
