"use client";

import { Reveal } from "@/components/motion";

const CAREER_SITE_URL = process.env.NEXT_PUBLIC_CAREER_SITE_URL || "/career";

export default function Privacy() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
            Legal Compliance
          </span>
          <h1 className="font-display text-4xl font-light mb-10">Privacy Policy</h1>
        </Reveal>

        <Reveal delay={0.1} className="prose prose-sm text-[var(--muted-foreground)] space-y-6 text-xs leading-relaxed font-light">
          <p><strong>Effective Date: July 8, 2026</strong></p>
          
          <p>
            At BrainsForCompassion (BforC), we prioritize the privacy and security of our partners, consultants, and platform users. This Privacy Policy outlines how we collect, store, and utilize data across our consulting services and organizational communications.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">1. Information We Collect</h2>
          <p>
            We collect personal details submitted via our contact forms (such as name, organization name, email address, and subject files). For career-specific data (resumes, application histories), please refer to the dedicated privacy policy on our Career Portal at <a href={CAREER_SITE_URL} className="text-[var(--primary)] hover:underline">{CAREER_SITE_URL.replace(/^https?:\/\//, "")}</a>.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To evaluate and respond to corporate partnership, CSR initiative, or NGO strategy consulting requests.</li>
            <li>To communicate updates regarding BforC Soft Skills Academy cycles and Mentorship Circle programs.</li>
            <li>To audit and compile general analytics on website metrics to ensure loading speeds remain fast on networks across India.</li>
          </ul>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">3. Data Security & Integrity</h2>
          <p>
            We implement industry-standard encryption protocols (HTTPS) to safeguard data transmitted via our web interfaces. We strictly do not sell, rent, or distribute user details to third-party advertisers. All collected details are stored securely on our hosting servers.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">4. User Rights</h2>
          <p>
            You have the right to request access to the personal data we store, request rectification, or request complete removal of your records. To do so, please contact our privacy compliance cohort directly at <a href="mailto:brainsforcompassion@gmail.com" className="text-[var(--primary)] hover:underline">brainsforcompassion@gmail.com</a>.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">5. Updates to This Policy</h2>
          <p>
            We may periodically revise this policy to reflect operational changes. The effective date at the top of the page will show the date of the latest revisions.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
