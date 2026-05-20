"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";

export function EmployerCTASection() {
  return (
    <section className="py-16 px-6" aria-labelledby="employer-cta-heading">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-[var(--accent-color)]/8 border border-[var(--accent-color)]/20 rounded-2xl px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">For Organisations</p>
              <h2
                id="employer-cta-heading"
                className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-light leading-tight text-[var(--foreground)] mb-4"
              >
                Are you an organisation that works for impact?
              </h2>
              <p className="text-[var(--muted-fg)] text-base leading-relaxed">
                Join our curated network of NGOs and social enterprises to find
                passionate, purpose-driven talent.
              </p>
            </div>
            <Link
              href="/employers"
              className="shrink-0 inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Create Employer Profile <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
