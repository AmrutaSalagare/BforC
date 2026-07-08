"use client";

import { Globe, MapPin } from "lucide-react";
import { Reveal, CountUp } from "@/components/motion";

const countriesList = [
  { name: "India", role: "Operational Headquarters (Jodhpur, Rajasthan)", x: 670, y: 260 },
  { name: "Kazakhstan", role: "Global Advisor Cohort & Research Partner", x: 650, y: 170 },
  { name: "Germany", role: "Advisory Council & Strategic Consulting", x: 505, y: 145 },
  { name: "Syria", role: "Global Advisor & Community Dialogue", x: 560, y: 195 },
  { name: "Eritrea", role: "Advisory Member & Field Research Support", x: 575, y: 260 },
  { name: "South Africa", role: "Global Advisor & Leadership Development", x: 550, y: 395 },
  { name: "United States", role: "Advisory Cohort & International Funding", x: 260, y: 170 }
];

export default function Reach() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* HEADER */}
      <section className="bg-[var(--muted)]/40 py-24 px-6 border-b border-[var(--border)]/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--primary)]/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              Global Presence
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              Our Reach
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              With representation from 18+ countries, we bring international best practices under one roof to deliver customized local solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto">
          
          <Reveal className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-2xl p-6 md:p-10 shadow-warm-lg overflow-hidden relative">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
              <Globe className="text-[var(--primary)] animate-pulse" size={16} />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                Interactive Global Map
              </span>
            </div>

            {/* SVG Map Container */}
            <div className="relative w-full aspect-[2/1] min-h-[280px] bg-[#fbf8fa] rounded-xl border border-[var(--border)]/15 overflow-auto hide-scrollbar">
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full min-w-[700px] text-[#eee5ec]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.75"
              >
                {/* Continent outlines simplified for elegant magazine layout */}
                {/* North America */}
                <path d="M120 100 L 220 80 L 320 130 L 290 220 L 250 250 L 190 280 L 160 210 Z" fill="#faf6f9" />
                {/* South America */}
                <path d="M260 290 L 300 310 L 340 370 L 320 450 L 290 470 L 270 410 L 250 330 Z" fill="#faf6f9" />
                {/* Africa */}
                <path d="M460 220 L 520 200 L 580 250 L 590 290 L 550 410 L 520 400 L 500 320 L 440 280 Z" fill="#faf6f9" />
                {/* Europe */}
                <path d="M450 150 L 520 110 L 560 140 L 530 200 L 460 190 Z" fill="#faf6f9" />
                {/* Asia */}
                <path d="M570 120 L 780 100 L 850 150 L 890 250 L 810 320 L 740 310 L 680 290 L 620 220 Z" fill="#faf6f9" />
                {/* Australia */}
                <path d="M800 360 L 860 360 L 880 410 L 820 420 Z" fill="#faf6f9" />

                {/* Country Ripple Points */}
                {countriesList.map((country, idx) => (
                  <g key={idx} className="cursor-pointer group">
                    {/* Ripple animation */}
                    <circle 
                      cx={country.x} 
                      cy={country.y} 
                      r="12" 
                      className="fill-[var(--primary)]/10 stroke-[var(--primary)]/30 animate-ping"
                      style={{ transformOrigin: `${country.x}px ${country.y}px` }}
                    />
                    {/* Core dot */}
                    <circle 
                      cx={country.x} 
                      cy={country.y} 
                      r="5" 
                      className="fill-[var(--primary)] hover:fill-[#8c365c] transition-colors" 
                    />
                    {/* Country label label text */}
                    <text 
                      x={country.x + 8} 
                      y={country.y + 4} 
                      className="font-mono-dm text-[9px] fill-[var(--foreground)] opacity-70 group-hover:opacity-100 font-semibold select-none transition-opacity"
                    >
                      {country.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>

        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="py-16 px-6 bg-[var(--muted)]/15 border-y border-[var(--border)]/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <Reveal>
            <span className="font-display text-4xl sm:text-5xl font-light text-[var(--foreground)] block mb-2">
              <CountUp target={18} suffix="+" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
              Countries Represented
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="font-display text-4xl sm:text-5xl font-light text-[var(--foreground)] block mb-2">
              <CountUp target={11} suffix="" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
              Active NGO Partnerships
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="font-display text-4xl sm:text-5xl font-light text-[var(--foreground)] block mb-2">
              <CountUp target={7} suffix="" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
              Service Modules
            </span>
          </Reveal>
        </div>
      </section>

      {/* LIST OF ADVISORY COUNTRIES */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-center">
                Advisory Nodes
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countriesList.map((country, idx) => (
              <Reveal 
                key={idx} 
                delay={idx * 0.05}
                className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-xl p-6 flex gap-4 items-start shadow-warm-sm"
              >
                <MapPin className="text-[var(--primary)] shrink-0 mt-0.5" size={16} />
                <div>
                  <h3 className="text-sm font-semibold">{country.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 font-light leading-relaxed">
                    {country.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
