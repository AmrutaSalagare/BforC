import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Privacy Policy",
  description: "How BforC Careers collects, uses, and protects your personal information.",
};

const EFFECTIVE = "1 May 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        <Reveal>
          <header className="mb-14 pb-10 border-b border-[var(--primary)]/10">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--muted-fg)] font-mono-dm">
              Effective: {EFFECTIVE} &nbsp;·&nbsp; Last updated: {EFFECTIVE}
            </p>
          </header>
        </Reveal>

        <div className="legal-prose">

          <LegalSection title="1. Introduction">
            <p>
              BforC Careers is operated by BrainsForCompassion (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a women-led career platform headquartered at F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan, India. This Privacy Policy explains how we collect, use, share, and protect the personal information of visitors and registered users of BforC Careers.
            </p>
            <p>
              By creating an account or using our service, you consent to the data practices described in this policy. This policy should be read alongside our <a href="/legal/terms">Terms of Service</a>.
            </p>
          </LegalSection>

          <LegalSection title="2. Information We Collect">
            <Sub>Information you provide</Sub>
            <ul>
              <li>Full name, email address, phone number, and city of residence during sign-up</li>
              <li>Professional profile: work history, skills, educational qualifications, and career preferences</li>
              <li>Resume or CV documents you upload to the platform</li>
              <li>Employer information: organisation name, designation, job postings, and hiring criteria</li>
              <li>Communication with our support team</li>
            </ul>
            <Sub>Information collected automatically</Sub>
            <ul>
              <li>Device type, browser, operating system, and IP address</li>
              <li>Pages visited, features used, and time spent on the platform</li>
              <li>Referring URLs or search queries</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul>
              <li>Match job seekers with verified employer opportunities</li>
              <li>Display your profile to employers you apply to or express interest in</li>
              <li>Send personalised job alerts and platform notifications</li>
              <li>Facilitate access to soft skills training, mentorship, and career programmes</li>
              <li>Process payments and manage subscriptions securely via Razorpay</li>
              <li>Improve platform features through aggregate usage analytics</li>
              <li>Comply with applicable Indian law and legal processes</li>
            </ul>
            <p>We do not sell or rent your personal data to third parties for their marketing purposes.</p>
          </LegalSection>

          <LegalSection title="4. Sharing of Information">
            <ul>
              <li>
                <strong>With employers</strong> — your profile is shared only when you apply for a role or explicitly opt in to employer searches
              </li>
              <li>
                <strong>With payment processors</strong> — Razorpay receives the minimum data necessary to process your transaction; we do not store full card details
              </li>
              <li>
                <strong>With infrastructure providers</strong> — Supabase (database and authentication), Vercel (hosting), and other trusted vendors under strict data processing agreements
              </li>
              <li>
                <strong>For legal compliance</strong> — when required by Indian law, court order, or competent governmental authority
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Data Retention">
            <p>
              We retain your account data for as long as your account is active or as needed to provide our services. You may request deletion at any time. We will delete or anonymise your data within 30 days of a verified deletion request, except where retention is required by law.
            </p>
          </LegalSection>

          <LegalSection id="cookies" title="6. Cookies and Tracking">
            <p>We use cookies for:</p>
            <ul>
              <li><strong>Authentication</strong> — keeping you securely logged in across sessions</li>
              <li><strong>Preferences</strong> — remembering settings like language and theme</li>
              <li><strong>Analytics</strong> — understanding aggregate usage patterns to improve the platform</li>
            </ul>
            <p>
              We do not use cookies for cross-site advertising or sell browsing data. You may manage cookies through your browser settings; disabling authentication cookies will prevent login.
            </p>
          </LegalSection>

          <LegalSection title="7. Your Rights Under Indian Law">
            <p>Under the Digital Personal Data Protection Act, 2023 (DPDPA) and the Information Technology Act, 2000, you have the right to:</p>
            <ul>
              <li>Access a summary of the personal data we process about you</li>
              <li>Correct inaccurate or incomplete personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Withdraw consent for data processing where consent is the legal basis</li>
              <li>Nominate a person to exercise these rights on your behalf</li>
            </ul>
            <p>
              Submit requests to{" "}
              <a href="mailto:brainsforcompassion@gmail.com">brainsforcompassion@gmail.com</a>. We will respond within 30 days.
            </p>
          </LegalSection>

          <LegalSection title="8. Data Security">
            <p>
              We protect your data with HTTPS encryption, Supabase Row-Level Security (RLS), environment-variable management of credentials, and periodic security reviews. While we apply rigorous standards, no digital system is entirely immune to risk, and we recommend using a strong, unique password for your account.
            </p>
          </LegalSection>

          <LegalSection title="9. Children&apos;s Privacy">
            <p>
              BforC Careers is designed for working professionals aged 18 and above. We do not knowingly collect data from minors. If you believe a minor has registered, contact us and we will delete the account promptly.
            </p>
          </LegalSection>

          <LegalSection title="10. Changes to This Policy">
            <p>
              We may revise this Privacy Policy periodically. Significant changes will be communicated by email and platform notice at least 14 days before they take effect. Continued use after the effective date constitutes acceptance.
            </p>
          </LegalSection>

          <LegalSection title="11. Contact and Grievance">
            <p>For privacy questions, data requests, or grievance redressal:</p>
            <ContactBox />
          </LegalSection>

        </div>
      </div>

      <style>{legalStyles}</style>
    </main>
  );
}

function LegalSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <Reveal>
      <div id={id} className="mb-10 scroll-mt-28">
        <h2 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-light text-[var(--foreground)] mb-5 leading-snug tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </Reveal>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="!text-[var(--foreground)] !font-semibold !text-sm mt-4 mb-2">{children}</p>;
}

function ContactBox() {
  return (
    <div className="mt-4 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60">
      <p className="font-semibold text-[var(--foreground)] mb-1">BrainsForCompassion (BforC)</p>
      <p>F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan, India</p>
      <p>
        Email:{" "}
        <a href="mailto:brainsforcompassion@gmail.com">brainsforcompassion@gmail.com</a>
      </p>
    </div>
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
  .legal-prose strong {
    color: var(--foreground);
    font-weight: 600;
  }
  .legal-prose a {
    color: var(--primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .legal-prose a:hover { color: var(--foreground); }
`;
