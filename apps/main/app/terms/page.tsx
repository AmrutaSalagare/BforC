"use client";

import { Reveal } from "@/components/motion";

export default function Terms() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
            Legal Compliance
          </span>
          <h1 className="font-display text-4xl font-light mb-10">Terms of Use</h1>
        </Reveal>

        <Reveal delay={0.1} className="prose prose-sm text-[var(--muted-foreground)] space-y-6 text-xs leading-relaxed font-light">
          <p><strong>Last Updated: July 8, 2026</strong></p>
          
          <p>
            Welcome to the BrainsForCompassion (BforC) marketing and informational website. By accessing and browsing this site, you agree to comply with and be bound by the following Terms of Use.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">1. Acceptable Use</h2>
          <p>
            You agree to use this site strictly for informational, educational, and collaborative purposes. You must not attempt to compromise the integrity of our contact forms, inject malicious scripts, or disrupt the loading performance of the application.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">2. Intellectual Property</h2>
          <p>
            All content on this site — including the BforC branding, logo graphics, design tokens, icons, text copy, and custom SVG structures — is the exclusive property of BrainsForCompassion. Unauthorised reproduction or distribution of this material is strictly prohibited.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">3. Disclaimers</h2>
          <p>
            While we strive to provide accurate operational data, the team profiles, partner lists, reach statistics, and consulting modules published here represent informational guidelines. BforC does not warrant the completeness or absolute accuracy of this content for specific institutional audits.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts located in Jodhpur, Rajasthan.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
