"use client";

import Link from "next/link";
import { ArrowRight, Building2, Users2, CheckCircle } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem, MagneticButton } from "@/components/motion";
import { motion } from "framer-motion";

const perks = [
  "Access to 10,000+ purpose-driven candidates",
  "Women-friendly employer badge & verification",
  "Applicant tracking & shortlisting tools",
];

export function EmployerCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6" aria-labelledby="employer-cta-heading">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[var(--foreground)] text-[var(--background)] px-6 sm:px-12 py-14 sm:py-16">
            {/* Decorative gradient blobs inside the dark card */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-[80px] pointer-events-none"
              style={{ background: "var(--accent-color)" }}
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15 blur-[80px] pointer-events-none"
              style={{ background: "var(--primary)" }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Left copy */}
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Building2 size={18} className="text-white/80" />
                  </div>
                  <p className="text-xs font-mono-dm tracking-[0.12em] uppercase text-white/60">
                    For Organisations
                  </p>
                </div>
                <h2
                  id="employer-cta-heading"
                  className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-tight mb-4"
                  style={{ color: "var(--background)" }}
                >
                  Find talent that{" "}
                  <em className="font-display not-italic" style={{ color: "oklch(from var(--accent-color) calc(l + 0.25) c h)" }}>
                    truly cares
                  </em>
                </h2>
                <p className="text-sm leading-relaxed mb-6 text-white/70">
                  Join our curated network of NGOs and social enterprises. Post roles,
                  discover purpose-aligned candidates, and build teams that drive real impact.
                </p>

                <StaggerReveal className="space-y-2.5" stagger={0.08}>
                  {perks.map((perk) => (
                    <StaggerItem key={perk} className="flex items-start gap-2.5 text-sm text-white/80">
                      <CheckCircle size={15} className="shrink-0 mt-0.5 text-white/50" />
                      {perk}
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>

              {/* Right CTA card */}
              <div className="lg:shrink-0 w-full lg:w-auto">
                <motion.div
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 flex flex-col items-center text-center gap-5 min-w-[240px]"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="p-4 rounded-xl bg-white/10">
                    <Users2 size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="font-display text-3xl font-light mb-1" style={{ color: "var(--background)" }}>Free</p>
                    <p className="text-xs text-white/60">to post your first job</p>
                  </div>
                  <MagneticButton>
                    <Link
                      href="/employers"
                      className="w-full flex items-center justify-center gap-2 bg-white text-[var(--foreground)] px-6 py-3 rounded-[4px] text-sm font-semibold hover:bg-white/90 transition duration-200 shadow-sm"
                    >
                      Get Started <ArrowRight size={15} />
                    </Link>
                  </MagneticButton>
                  <p className="text-xs text-white/50">No credit card required</p>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
