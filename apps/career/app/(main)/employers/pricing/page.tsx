import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";

export const metadata = {
  title: "Employer Plans",
  description: "Simple, transparent pricing for organisations hiring on BforC Careers.",
};

const tiers = [
  {
    name: "Starter",
    price: "₹2,499",
    period: "per month",
    description: "For small NGOs and social enterprises making their first hire.",
    features: [
      "Up to 3 active job postings",
      "Applicant dashboard & pipeline",
      "Basic employer profile page",
      "Email support",
      "Access to job seeker applications",
    ],
    cta: "Get started",
    href: "mailto:brainsforcompassion@gmail.com?subject=Employer+Plan+Starter",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹6,499",
    period: "per month",
    description: "For organisations scaling their impact hiring and DEI programmes.",
    features: [
      "Up to 15 active job postings",
      "Talent Search — browse candidate pool",
      "DEI impact report (quarterly)",
      "Featured employer profile badge",
      "Priority support with 24hr response",
      "Soft-skills pre-screening for applicants",
    ],
    cta: "Choose Growth",
    href: "mailto:brainsforcompassion@gmail.com?subject=Employer+Plan+Growth",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    description: "For large corporations with dedicated DEI mandates and CSR requirements.",
    features: [
      "Unlimited job postings",
      "Full talent search with advanced filters",
      "Dedicated Customer Success Manager",
      "Annual inclusivity & POSH audit",
      "Custom employer branding & microsites",
      "CSR-aligned hiring campaign support",
      "White-glove candidate shortlisting",
    ],
    cta: "Contact us",
    href: "mailto:brainsforcompassion@gmail.com?subject=Employer+Plan+Enterprise",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I post jobs on a free plan?",
    a: "You can list your organisation's interest at no cost, but active job postings and applicant management require a Starter plan or above.",
  },
  {
    q: "Is there a trial period?",
    a: "Yes — we offer a 14-day trial on the Growth plan for first-time employer partners. Reach out to get started.",
  },
  {
    q: "What is the Talent Search feature?",
    a: "Talent Search lets employers browse anonymous candidate profiles from our vetted pool, filtered by role, location, skill, and academy status — and express interest in profiles to initiate contact.",
  },
  {
    q: "What does the inclusivity audit include?",
    a: "Our expert team reviews your hiring materials, workplace policies, POSH compliance, and team composition, then delivers a detailed report with actionable recommendations.",
  },
  {
    q: "How do payments work?",
    a: "Monthly plans are billed in INR via Razorpay. Enterprise contracts are invoiced annually. All prices are exclusive of applicable GST.",
  },
];

export default function EmployerPricingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-4">For Employers</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] mb-4 text-balance">
            Employer plans
          </h1>
          <p className="text-[var(--muted-fg)] text-lg max-w-md mx-auto leading-relaxed">
            Hire purposefully. Transparent pricing with no setup fees, no hidden charges.
          </p>
        </Reveal>

        {/* Pricing cards */}
        <StaggerReveal className="grid md:grid-cols-3 gap-6 mb-20" stagger={0.1}>
          {tiers.map(({ name, price, period, description, features, cta, href, highlighted, badge }) => (
            <StaggerItem key={name}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border p-7 transition duration-300 ${
                  highlighted
                    ? "bg-[var(--accent-color)]/8 border-[var(--accent-color)]/30 shadow-[0_8px_40px_rgba(168,67,112,0.12)]"
                    : "bg-white/40 backdrop-blur-md border-white/60"
                }`}
              >
                {badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent-color)] text-[var(--on-accent)] text-[10px] font-mono-dm tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Zap size={9} /> {badge}
                  </span>
                )}

                <div className="mb-6">
                  <p className="font-mono-dm text-xs tracking-widest uppercase text-[var(--faint-fg)] mb-2">{name}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-light text-[var(--foreground)]">{price}</span>
                    {price !== "Custom" && (
                      <span className="text-sm text-[var(--faint-fg)]">/ {period}</span>
                    )}
                  </div>
                  {price === "Custom" && (
                    <p className="text-sm text-[var(--faint-fg)] mb-2">{period}</p>
                  )}
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{description}</p>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--muted-fg)]">
                      <Check size={15} className="text-[var(--accent-color)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] text-sm font-medium transition duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${
                    highlighted
                      ? "bg-[var(--accent-color)] text-[var(--on-accent)] hover:bg-[var(--accent-dark)]"
                      : "border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)]"
                  }`}
                >
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Compare link */}
        <Reveal className="text-center mb-20">
          <p className="text-sm text-[var(--muted-fg)]">
            Looking for job seeker plans?{" "}
            <Link href="/pricing" className="text-[var(--accent-color)] underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">
              View candidate pricing
            </Link>
          </p>
        </Reveal>

        {/* FAQs */}
        <Reveal className="mb-4">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[var(--foreground)] text-center mb-10">
            Frequently asked questions
          </h2>
        </Reveal>

        <StaggerReveal className="flex flex-col divide-y divide-[var(--primary)]/10 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden mb-16" stagger={0.06}>
          {faqs.map(({ q, a }) => (
            <StaggerItem key={q}>
              <div className="px-7 py-6">
                <p className="font-medium text-sm text-[var(--foreground)] mb-2">{q}</p>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Bottom CTA */}
        <Reveal className="text-center bg-gradient-to-r from-transparent via-[var(--blush)]/30 to-transparent py-14 rounded-3xl border border-white/20">
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-3">
            Not sure which plan is right for you?
          </h2>
          <p className="text-[var(--muted-fg)] text-sm mb-7 max-w-sm mx-auto">
            Talk to our team. We&apos;ll recommend the right plan for your organisation size and hiring goals.
          </p>
          <Link
            href="mailto:brainsforcompassion@gmail.com?subject=Employer+Plan+Enquiry"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5"
          >
            Talk to us <ArrowRight size={15} />
          </Link>
        </Reveal>

      </div>
    </main>
  );
}
