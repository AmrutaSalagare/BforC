"use client";

import { ArrowRight, Sparkles, Shield, Globe2, Layers } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion";

export default function Action() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* HERO SECTION - LARGE TYPE */}
      <section className="py-28 px-6 bg-[var(--muted)]/40 relative overflow-hidden border-b border-[var(--border)]/20">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--primary)]/5 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              The Motivation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              “Finding the right place, right person at the right time.”
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <div className="w-12 h-px bg-[var(--primary)] mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM & NEED SECTION */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Column 1: The Initiative Idea */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] font-mono-dm uppercase tracking-wider">
                <Sparkles size={14} /> The Initiative Idea
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-light tracking-tight">
                An All-Women Advisory Cohort
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                The core idea behind this Consulting Firm is to CREATE an ALL Women Organisation with a strong focus on providing services to NGOs, Donors, Governments, Corporations and Institutions who are working towards a positive social change.
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mt-4">
                Due to lack of resources and technical expertise, their value and work are not acknowledged — and they remain in veil despite the fact that their work and commitment can give a new direction to development and humanity.
              </p>
            </Reveal>
          </div>

          {/* Column 2: The Need */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] font-mono-dm uppercase tracking-wider">
                <Layers size={14} /> The Real Need
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-light tracking-tight">
                Scaling Up with Lower Inputs
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                NGOs, Donors, Governments, Intergovernmental agencies, Corporations and Institutions need a consulting firm to scale up and reach out to larger populations to bring transformation to societies.
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mt-4">
                We bridge this resource challenge, enabling organizations to bring massive positive change with optimized inputs (whether financial or human resource), streamlining communication and implementation.
              </p>
            </Reveal>
          </div>

        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section className="py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                Why BforC
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Our Distinct Value Propositions
              </h2>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value Prop 1 */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm flex flex-col gap-5">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-semibold">All-Women Organisation</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                A unique, women-led advisory cohort delivering strategy and management with heightened empathy, collaborative foresight, and professional diligence.
              </p>
            </StaggerItem>

            {/* Value Prop 2 */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm flex flex-col gap-5">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-semibold">Diverse Global Backgrounds</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Our consultants and experts come from varied operational backgrounds, ensuring that every baseline study and audit is highly multi-dimensional.
              </p>
            </StaggerItem>

            {/* Value Prop 3 */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm flex flex-col gap-5">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                <Globe2 size={20} />
              </div>
              <h3 className="text-lg font-semibold">Representing 18+ Countries</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Our advisors carry direct field experiences across 18 countries, allowing us to combine global research benchmarks with deep local sensitivity.
              </p>
            </StaggerItem>

          </StaggerReveal>

        </div>
      </section>

      {/* FINAL CALLOUT */}
      <section className="py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20 text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm">
              Join Hands
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl font-light leading-tight">
              Ready to collaborate on sustainable change?
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[4px] text-sm font-medium hover:bg-[#8c365c] hover:scale-[1.02] transition-all duration-300"
            >
              Consult With Our Team <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
