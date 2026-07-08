"use client";

import { Reveal } from "@/components/motion";
import { ShieldCheck } from "lucide-react";

export default function AntiHarassment() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="flex flex-col gap-4">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm block">
            Workplace Integrity
          </span>
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-[var(--primary)] shrink-0" />
            <h1 className="font-display text-4xl font-light">Anti-Harassment & POSH Policy</h1>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="prose prose-sm text-[var(--muted-foreground)] space-y-6 text-xs leading-relaxed font-light mt-10">
          <p><strong>Effective Date: July 8, 2026</strong></p>
          
          <p>
            As a women-led organization, BrainsForCompassion (BforC) champions the absolute right of every professional to work in an environment free from discrimination, intimidation, and sexual harassment.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">1. Scope and Application</h2>
          <p>
            This policy applies to all BforC consultants, advisors, and volunteers globally. Furthermore, we enforce these rigorous standards on all corporate hiring partners listed on our Career Portal.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">2. Prevention of Sexual Harassment (POSH) Commitment</h2>
          <p>
            In alignment with India&apos;s POSH Act (Sexual Harassment of Women at Workplace Prevention, Prohibition and Redressal Act, 2013), we demand that all collaborating corporations maintain:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>An active, legally compliant Internal Committee (IC) to address grievances immediately.</li>
            <li>Mandatory annual bias and safety training for all staff members.</li>
            <li>Clear channels for zero-retaliation reporting of harassment concerns.</li>
          </ul>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">3. Employer Vetting & Auditing</h2>
          <p>
            Before any employer is displayed as a Partner or allowed to list jobs on our portals, BforC conducts a structured safety audit to verify POSH compliance. We actively delist any organization that fails to maintain these inclusive standards.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">4. Reporting Violations</h2>
          <p>
            If you experience or witness harassment at any BforC partner workplace, please report it to our redressal cohort immediately at <a href="mailto:brainsforcompassion@gmail.com" className="text-[var(--primary)] hover:underline">brainsforcompassion@gmail.com</a>. All reports are handled with absolute confidentiality and urgency.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
