import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import { ShieldCheck, AlertCircle, MessageSquare, Clock, Lock, UserX } from "lucide-react";

export const metadata = {
  title: "Anti-Harassment Policy",
  description: "BforC's zero-tolerance policy on harassment, aligned with India's POSH Act 2013.",
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Zero Tolerance",
    body: "Any form of harassment — sexual, verbal, psychological, or digital — is strictly prohibited on the BforC platform and in all associated programmes.",
  },
  {
    icon: MessageSquare,
    title: "Safe Reporting",
    body: "Every complaint is taken seriously. You can report through our platform, by email, or anonymously. We will not dismiss or minimise any concern raised.",
  },
  {
    icon: Lock,
    title: "Full Confidentiality",
    body: "The identity of the complainant and all details of an investigation are kept strictly confidential. Disclosure only occurs as required by law or with consent.",
  },
  {
    icon: UserX,
    title: "Non-Retaliation",
    body: "We strictly prohibit retaliation against anyone who raises a complaint in good faith. Retaliation is itself a serious violation subject to immediate action.",
  },
  {
    icon: Clock,
    title: "Timely Action",
    body: "Complaints are acknowledged within 48 hours and investigations concluded within 60 days, consistent with the timelines set under the POSH Act, 2013.",
  },
  {
    icon: AlertCircle,
    title: "Accountability",
    body: "Substantiated complaints result in consequences proportionate to the violation — including permanent removal from the platform and notification to relevant authorities.",
  },
];

export default function AntiHarassmentPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">Legal &amp; Policy</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] mb-6 leading-tight">
            Anti-Harassment Policy
          </h1>
          <p className="text-[var(--muted-fg)] text-lg max-w-2xl mx-auto leading-relaxed">
            BforC is built for women. Our commitment to safety is not a compliance checkbox — it is the foundation of everything we do. This policy applies to all users, employers, mentors, and anyone who interacts through our platform.
          </p>
          <p className="text-sm text-[var(--muted-fg)] mt-4 font-mono-dm">
            Aligned with the Prevention, Prohibition &amp; Redressal of Sexual Harassment of Women at Workplace Act, 2013 (POSH Act)
          </p>
        </Reveal>

        {/* Core principles */}
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16" stagger={0.08}>
          {principles.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col gap-4 p-6 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--primary)]/10">
                  <Icon size={18} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Detailed policy */}
        <div className="legal-prose">

          <LegalSection title="1. Scope">
            <p>
              This policy applies to all individuals who use, work with, or engage through BforC Careers — including job seekers, employer partners, mentors, programme facilitators, and BforC team members. It covers conduct on the platform, in BforC-facilitated programmes, and in communications arising from platform interactions.
            </p>
          </LegalSection>

          <LegalSection title="2. What Constitutes Harassment">
            <p>
              Harassment includes any unwelcome conduct that creates a hostile, intimidating, or offensive environment. Under the POSH Act, 2013, sexual harassment includes but is not limited to:
            </p>
            <ul>
              <li>Physical contact and advances that are unwelcome</li>
              <li>Demand or request for sexual favours, directly or implicitly</li>
              <li>Sexually coloured remarks, jokes, messages, or media</li>
              <li>Showing pornography or sending unsolicited explicit content</li>
              <li>Any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature</li>
            </ul>
            <p>Beyond sexual harassment, BforC also prohibits:</p>
            <ul>
              <li>Discriminatory conduct based on gender, religion, caste, disability, or sexual orientation</li>
              <li>Bullying, intimidation, or persistent unwanted contact</li>
              <li>Doxxing or sharing personal information without consent</li>
              <li>Threatening or violent language</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Reporting a Complaint">
            <p>If you experience or witness harassment through BforC, you may report it through any of the following channels:</p>
            <ul>
              <li>
                <strong>Platform report:</strong> Use the &ldquo;Report&rdquo; button on any job listing, employer profile, or message thread
              </li>
              <li>
                <strong>Email:</strong> Write to <a href="mailto:brainsforcompassion@gmail.com?subject=Harassment+Report">brainsforcompassion@gmail.com</a> with the subject line &ldquo;Harassment Report&rdquo;
              </li>
              <li>
                <strong>Anonymous report:</strong> You may submit a report without identifying yourself; note that anonymous reports may limit our ability to investigate and take action
              </li>
            </ul>
            <p>
              Complaints should include: the nature of the conduct, when and where it occurred, who was involved, and any supporting evidence such as screenshots or messages.
            </p>
          </LegalSection>

          <LegalSection title="4. Internal Complaints Committee (ICC)">
            <p>
              In accordance with the POSH Act, 2013, BforC has constituted an Internal Complaints Committee (ICC) to receive, inquire into, and recommend action on complaints of sexual harassment.
            </p>
            <p>
              The ICC comprises at least four members, with a presiding officer who is a senior woman employee, at least two members from among employees committed to the cause of women, and one external member from an NGO or association committed to the cause of women.
            </p>
            <p>
              Contact the ICC at: <a href="mailto:brainsforcompassion@gmail.com?subject=ICC+Complaint">brainsforcompassion@gmail.com</a>
            </p>
          </LegalSection>

          <LegalSection title="5. Investigation Process">
            <p>Upon receiving a complaint, we will:</p>
            <ul>
              <li>Acknowledge the complaint within 48 hours</li>
              <li>Notify the respondent of the allegation and provide an opportunity to respond</li>
              <li>Conduct a fair, impartial, and confidential inquiry — interviewing parties and reviewing evidence</li>
              <li>Complete the investigation within 60 days</li>
              <li>Communicate findings and recommended actions to both parties</li>
            </ul>
            <p>
              During an investigation, either party may request interim measures — such as temporary removal of the respondent&apos;s employer profile — to prevent further harm.
            </p>
          </LegalSection>

          <LegalSection title="6. Possible Outcomes">
            <p>
              If a complaint is substantiated, action may include one or more of the following, proportionate to the severity of the conduct:
            </p>
            <ul>
              <li>Written warning to the respondent</li>
              <li>Temporary suspension of platform access</li>
              <li>Permanent removal from BforC Careers</li>
              <li>Notification to the respondent&apos;s employer (where applicable)</li>
              <li>Referral to law enforcement authorities</li>
            </ul>
            <p>
              Filing a complaint in bad faith is itself a violation of this policy and may result in action against the complainant.
            </p>
          </LegalSection>

          <LegalSection title="7. Confidentiality">
            <p>
              All parties to a complaint — the complainant, the respondent, witnesses, and ICC members — are bound by strict confidentiality. No details of a complaint, investigation, or outcome may be disclosed except as required by law or with the explicit written consent of both parties.
            </p>
          </LegalSection>

          <LegalSection title="8. Non-Retaliation">
            <p>
              BforC strictly prohibits any retaliation — direct or indirect — against anyone who has filed a complaint, participated as a witness, or assisted in an investigation. Retaliation includes adverse actions such as demoting, excluding, threatening, or harassing the complainant. Any act of retaliation will be treated as a separate, serious violation.
            </p>
          </LegalSection>

          <LegalSection title="9. Contact">
            <p>To report harassment, ask questions about this policy, or reach the ICC:</p>
            <div className="mt-4 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60">
              <p className="font-semibold text-[var(--foreground)] mb-1">BrainsForCompassion — Internal Complaints Committee</p>
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
