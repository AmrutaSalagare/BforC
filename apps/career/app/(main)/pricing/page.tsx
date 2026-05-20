import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";

export const metadata = {
  title: "Pricing — BforC Careers",
  description: "Simple, transparent pricing for purpose-driven job seekers.",
};

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started and explore opportunities at no cost.",
    features: [
      "Apply to up to 10 roles/year",
      "Basic profile",
      "Browse all listings",
      "Community support",
    ],
    cta: "Get started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "₹499",
    period: "per year",
    description: "For active job seekers who want to move faster.",
    features: [
      "Apply to up to 50 roles/year",
      "Priority resume parsing",
      "Profile visibility boost",
      "Basic support",
    ],
    cta: "Choose Starter",
    href: "/signup",
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Premium",
    price: "₹899",
    period: "per year",
    description: "For professionals who want every advantage.",
    features: [
      "Apply to up to 100 roles/year",
      "Featured profile placement",
      "Exclusive job alerts",
      "Priority support",
    ],
    cta: "Choose Premium",
    href: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] mb-4 text-balance">
            Simple, transparent plans
          </h1>
          <p className="text-[var(--muted-fg)] text-lg max-w-md mx-auto leading-relaxed">
            Start free. Upgrade when you&apos;re ready.
            No hidden fees, no dark patterns.
          </p>
        </Reveal>

        <StaggerReveal className="grid md:grid-cols-3 gap-6" stagger={0.1}>
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
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent-color)] text-[var(--on-accent)] text-[10px] font-mono-dm tracking-widest uppercase px-3 py-1 rounded-full">
                    {badge}
                  </span>
                )}

                <div className="mb-6">
                  <p className="font-mono-dm text-xs tracking-widest uppercase text-[var(--faint-fg)] mb-2">
                    {name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-light text-[var(--foreground)]">{price}</span>
                    <span className="text-sm text-[var(--faint-fg)]">/ {period}</span>
                  </div>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{description}</p>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--muted-fg)]">
                      <Check
                        size={15}
                        className="text-[var(--accent-color)] shrink-0 mt-0.5"
                      />
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

        <Reveal delay={0.3} className="text-center mt-12 text-sm text-[var(--muted-fg)]">
          All plans include access to the full job directory.
          Payments processed securely via{" "}
          <span className="text-[var(--foreground)] font-medium">Razorpay</span>.
          Cancel anytime.
        </Reveal>
      </div>
    </main>
  );
}
