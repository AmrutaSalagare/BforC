"use client";

import { Reveal } from "@/components/motion";

export default function DataProtection() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
            Legal Compliance
          </span>
          <h1 className="font-display text-4xl font-light mb-10">Data Protection Statement</h1>
        </Reveal>

        <Reveal delay={0.1} className="prose prose-sm text-[var(--muted-foreground)] space-y-6 text-xs leading-relaxed font-light">
          <p><strong>Effective Date: July 8, 2026</strong></p>
          
          <p>
            BrainsForCompassion (BforC) is committed to protecting organizational data assets and candidate details. This Data Protection Statement outlines our specific commitments under Indian IT legislation and global GDPR-inspired principles.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">1. Data Sovereignty</h2>
          <p>
            All consulting information, donor lists, baseline reports, and form details are processed and hosted within secure cloud datacenters in India. We verify that our hosting partners maintain strict physical and digital isolation barriers.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">2. Processing Standards</h2>
          <p>
            We process personal data based on explicit consent (such as submitting inquiries through our contact forms). We store this data strictly for the duration necessary to satisfy consulting requirements, after which it is safely purged.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">3. Zero Data Sale Policy</h2>
          <p>
            BforC enforces a zero-sale policy for all data. We do not integrate tracking cookies, analytics pixels from advertising companies, or third-party marketing frameworks.
          </p>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-8 mb-2">4. Contact Compliance Officer</h2>
          <p>
            If you have questions about our data safety audits or want to request a complete export of your interaction records, reach us at <a href="mailto:brainsforcompassion@gmail.com" className="text-[var(--primary)] hover:underline">brainsforcompassion@gmail.com</a>.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
