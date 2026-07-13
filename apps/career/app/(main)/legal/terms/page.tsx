import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing your use of BforC Careers.",
};

const EFFECTIVE = "1 May 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        <Reveal>
          <header className="mb-14 pb-10 border-b border-[var(--primary)]/10">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] mb-4 leading-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-[var(--muted-fg)] font-mono-dm">
              Effective: {EFFECTIVE} &nbsp;·&nbsp; Last updated: {EFFECTIVE}
            </p>
          </header>
        </Reveal>

        <div className="legal-prose">

          <LegalSection title="1. Acceptance">
            <p>
              By creating an account or using any feature of BforC Careers, you agree to these Terms of Service and our <a href="/legal/privacy">Privacy Policy</a>. These Terms form a legally binding contract between you and BrainsForCompassion (&ldquo;BforC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered at F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan, India.
            </p>
          </LegalSection>

          <LegalSection title="2. Eligibility">
            <p>
              You must be at least 18 years old to use BforC Careers. Employer accounts are available to lawfully registered organisations operating in India. By using our platform you confirm you meet these requirements.
            </p>
          </LegalSection>

          <LegalSection title="3. Accounts">
            <p>
              You are responsible for the security of your account credentials and all activity under your account. Provide accurate, complete, and current registration information and update it promptly when it changes. You may not share your account or create accounts on behalf of another person without their consent.
            </p>
            <p>
              We may suspend or permanently terminate accounts that violate these Terms, contain false information, or are involved in harmful conduct, without prior notice.
            </p>
          </LegalSection>

          <LegalSection title="4. Job Seekers">
            <p>As a job seeker you may:</p>
            <ul>
              <li>Browse all job listings and apply to roles that match your profile</li>
              <li>Upload and manage your professional profile and resume</li>
              <li>Access soft skills training, mentorship sessions, and community resources</li>
              <li>Subscribe to paid plans for enhanced visibility and features</li>
            </ul>
            <p>You must not:</p>
            <ul>
              <li>Create duplicate accounts or misrepresent your identity or qualifications</li>
              <li>Use BforC Careers to solicit other users for unrelated commercial purposes</li>
              <li>Redistribute or commercially exploit training content provided for personal use</li>
              <li>Apply for roles you knowingly do not meet the minimum requirements for</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Employers and Organisations">
            <p>As a verified employer you may:</p>
            <ul>
              <li>Post job openings and manage applications through the employer dashboard</li>
              <li>View profiles of candidates who have applied or opted into talent searches</li>
              <li>Access DEI reports, inclusivity audits, and CSR-aligned hiring support</li>
            </ul>
            <p>You must not:</p>
            <ul>
              <li>Post roles that violate any anti-discrimination provisions under Indian law</li>
              <li>Contact or recruit candidates outside of BforC for roles discovered through the platform, without a paid plan that permits direct contact</li>
              <li>Use candidate data for purposes beyond the direct hiring process</li>
              <li>Misrepresent remuneration, location, or working conditions in job listings</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Paid Plans and Payments">
            <p>
              BforC Careers offers free and paid subscription plans for both job seekers and employers. Payments are processed securely by Razorpay. By subscribing you authorise the applicable charge. All plan fees are in Indian Rupees (INR) and inclusive of applicable taxes.
            </p>
            <p>
              Refunds are considered on a case-by-case basis within 7 days of purchase for technical issues preventing access to paid features. Contact <a href="mailto:brainsforcompassion@gmail.com">brainsforcompassion@gmail.com</a> with your order details.
            </p>
          </LegalSection>

          <LegalSection title="7. Prohibited Conduct">
            <ul>
              <li>Harassment, intimidation, or abusive communication directed at any user</li>
              <li>Uploading or distributing malware, spam, or unsolicited bulk messages</li>
              <li>Attempting to gain unauthorised access to any system or user data</li>
              <li>Automated scraping, crawling, or data extraction without written consent</li>
              <li>Any conduct that violates Indian law, including the IT Act, 2000 and IPC provisions</li>
            </ul>
          </LegalSection>

          <LegalSection title="8. Intellectual Property">
            <p>
              All platform content — design, text, curriculum, logos, and software — is the property of BrainsForCompassion or its licensors. You may not copy, reproduce, or distribute it without prior written permission.
            </p>
            <p>
              By uploading content (profile, resume, listings), you grant BforC a non-exclusive, royalty-free licence to display and use that content solely to deliver our services.
            </p>
          </LegalSection>

          <LegalSection title="9. Disclaimers">
            <p>
              BforC Careers is provided &ldquo;as is&rdquo;. We do not guarantee employment outcomes, the accuracy of employer-provided information, or uninterrupted platform availability. We make no warranty that any job listing will remain open or that any application will receive a response.
            </p>
          </LegalSection>

          <LegalSection title="10. Limitation of Liability">
            <p>
              To the fullest extent permitted by Indian law, BrainsForCompassion&apos;s aggregate liability for any claim under these Terms shall not exceed the amounts paid by you in the 12 months preceding the claim. We are not liable for indirect, consequential, or punitive damages.
            </p>
          </LegalSection>

          <LegalSection title="11. Governing Law">
            <p>
              These Terms are governed by Indian law. Disputes will first be pursued through good-faith negotiation, then subject to the exclusive jurisdiction of courts in Jodhpur, Rajasthan.
            </p>
          </LegalSection>

          <LegalSection title="12. Changes">
            <p>
              We may amend these Terms. Material changes will be communicated by email and platform notice at least 14 days in advance. Continued use after the effective date constitutes acceptance of the updated Terms.
            </p>
          </LegalSection>

          <LegalSection title="13. Contact">
            <p>Questions about these Terms:</p>
            <div className="mt-4 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60">
              <p className="font-semibold text-[var(--foreground)] mb-1">BrainsForCompassion (BforC)</p>
              <p>F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan, India</p>
              <p>
                <a href="mailto:brainsforcompassion@gmail.com">brainsforcompassion@gmail.com</a>
              </p>
            </div>
          </LegalSection>

        </div>
      </div>

      <style>{legalStyles}</style>
    </main>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mb-10">
        <h2 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-light text-[var(--foreground)] mb-5 leading-snug tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </Reveal>
  );
}

const legalStyles = `
  .legal-prose p {
    color: var(--muted-fg);
    font-size: 0.9375rem;
    line-height: 1.75;
    margin-bottom: 0.875rem;
  }
  .legal-prose ul {
    list-style: none;
    padding: 0;
    margin-bottom: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .legal-prose li {
    color: var(--muted-fg);
    font-size: 0.9375rem;
    line-height: 1.7;
    padding-left: 1.25rem;
    position: relative;
  }
  .legal-prose li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.58em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--primary);
    opacity: 0.55;
  }
  .legal-prose strong { color: var(--foreground); font-weight: 600; }
  .legal-prose a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
  .legal-prose a:hover { color: var(--foreground); }
`;
