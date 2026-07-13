"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Laptop2, RefreshCw, Clock3, TrendingUp, Globe2, Users } from "lucide-react";
import { Reveal } from "@/components/motion";

const infoSections = [
  {
    id: "remote",
    num: "01",
    tag: "[ FLEXTIME ]",
    label: "Remote Flexibility",
    icon: Laptop2,
    description: "Unrestricted workspace configurations. Work from anywhere with no daily commute.",
    metric: "84% of social roles support hybrid",
    insight: "Maximises productivity while ensuring full integration with distributed field teams.",
  },
  {
    id: "return",
    num: "02",
    tag: "[ RE-ENTRY ]",
    label: "Return to Work",
    icon: RefreshCw,
    description: "Supportive transition programs tailored for women re-entering the active workforce.",
    metric: "Structured mentorship & peer cohorts",
    insight: "Designed to rebuild technical skills, career confidence, and flexible onboarding.",
  },
  {
    id: "flexible",
    num: "03",
    tag: "[ CORE HOURS ]",
    label: "Adaptable Schedules",
    icon: Clock3,
    description: "Part-time or flexible arrangements that balance professional impact with life commitments.",
    metric: "90% control over daily schedule",
    insight: "Empowers caregivers and leaders to direct their energy without arbitrary desk times.",
  },
  {
    id: "leadership",
    num: "04",
    tag: "[ EXECUTIVE ]",
    label: "Path to Leadership",
    icon: TrendingUp,
    description: "Strategic board and management pathways steering high-impact social enterprises.",
    metric: "70% female representation in leadership",
    insight: "Structured pathways designed to overcome systemic hurdles in executive transition.",
  },
  {
    id: "community",
    num: "05",
    tag: "[ GRASSROOTS ]",
    label: "Community Impact",
    icon: Users,
    description: "Direct-action roles engaging directly with the communities and causes you serve.",
    metric: "100% direct-action engagement",
    insight: "For professionals who want to measure success in lives touched rather than reports filed.",
  },
  {
    id: "intl",
    num: "06",
    tag: "[ CROSS-BORDER ]",
    label: "Global Reach",
    icon: Globe2,
    description: "Cross-border collaborations and international roles driving systemic cultural exchange.",
    metric: "Visa & relocation assistance available",
    insight: "Expands local impact models to global NGO partners, building institutional bridges.",
  },
];

export function CategoriesSection() {
  const shouldReduce = useReducedMotion();

  // Triple-buffer the array so the horizontal scroll loop is seamless and smooth
  const tripledSections = [...infoSections, ...infoSections, ...infoSections];

  return (
    <section
      className="pt-28 md:pt-36 pb-10 md:pb-12 px-0 relative z-10 bg-[var(--background)] border-b border-[var(--border)]/40 overflow-x-hidden overflow-y-visible"
      aria-labelledby="info-heading"
    >
      <div className="container mx-auto max-w-6xl px-6 mb-20 md:mb-24">
        <Reveal className="text-left max-w-4xl">
          <p className="eyebrow mb-4">Explore by Need</p>
          <h2
            id="info-heading"
            className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-light text-[var(--foreground)] leading-[1.1] mb-6"
          >
            Roles meticulously structured <br className="hidden sm:inline" />
            around the rhythm of your life.
          </h2>
          <p className="text-[var(--muted-foreground)] text-base md:text-lg font-light max-w-2xl leading-relaxed">
            We partner with organisations that move beyond standard expectations, 
            co-designing career frameworks that value equity, flexibility, and tangible systemic impact.
          </p>
        </Reveal>
      </div>

      {/* Horizontal Cinematic Infinite Stream Container */}
      <div className="relative w-full overflow-x-hidden overflow-y-visible py-12 md:py-16">
        
        {/* Soft edge masking spotlights */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent z-20" />

        {/* Continuous drift track */}
        <div className="flex w-full overflow-x-auto hide-scrollbar touch-pan-y">
          <motion.div
            animate={shouldReduce ? {} : { x: ["0%", "-33.3333%"] }}
            transition={
              shouldReduce
                ? {}
                : {
                    ease: "linear",
                    duration: 38,
                    repeat: Infinity,
                  }
            }
            className="flex items-start gap-8 px-4 md:px-12 w-max will-change-transform"
          >
            {tripledSections.map((info, idx) => {
              const Icon = info.icon;
              
              // Undulating architectural staggered heights
              const isEven = idx % 2 === 0;
              const heightClass = isEven ? "min-h-[260px]" : "min-h-[240px] mt-6";
              const borderHighlight = "border-[var(--primary)]/10";

              return (
                <div
                  key={`${info.id}-${idx}`}
                  style={{ contentVisibility: "auto" }}
                  className={`w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 flex flex-col justify-between p-6 bg-[var(--background)]/80 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 border ${heightClass} ${borderHighlight}`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between w-full border-b border-[var(--primary)]/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                      <span className="font-sans text-[10px] text-[var(--muted-foreground)] tracking-widest font-semibold uppercase">
                        {info.tag}
                      </span>
                    </div>
                    <span className="font-display text-3xl text-[var(--primary)]/60 font-light select-none tracking-tighter">
                      {info.num}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col mt-5 mb-6 flex-grow">
                    <h3 className="font-display text-2xl font-light text-[var(--foreground)] mb-2.5 tracking-wide">
                      {info.label}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] font-light leading-relaxed mb-4 line-clamp-3">
                      {info.description}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]/70 italic font-light leading-relaxed mt-auto pt-2 pl-3 border-l border-[var(--primary)]/10 line-clamp-2">
                      &ldquo;{info.insight}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer Metric */}
                  <div className="border-t border-[var(--primary)]/10 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                      <span className="font-sans text-[10px] text-[var(--primary)] uppercase tracking-wider font-semibold">
                        {info.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
