"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Start exploring",
    features: [
      "Apply to up to 10 jobs/year",
      "Basic resume upload",
      "Community support",
      "Job alerts",
    ],
    cta: "Start Free",
    href: "/signup?plan=free",
    highlight: false,
    style: {
      card: "bg-transparent border border-[var(--primary)]/10 shadow-warm-md",
      price: "text-[var(--foreground)]",
      cta: "bg-transparent border border-[var(--primary)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/5 shadow-sm",
    },
  },
  {
    name: "Starter",
    price: "₹499",
    period: "/ year",
    tagline: "Most popular",
    features: [
      "Apply to up to 50 jobs/year",
      "Priority AI resume parsing",
      "Basic email support",
      "Profile featured to employers",
    ],
    cta: "Get Starter",
    href: "/signup?plan=starter",
    highlight: false,
    style: {
      card: "bg-transparent border border-[var(--primary)]/10 shadow-warm-md text-[var(--foreground)]",
      price: "text-[var(--foreground)]",
      cta: "bg-[var(--foreground)]/5 border border-[var(--primary)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/10 shadow-warm-md",
    },
  },
  {
    name: "Premium",
    price: "₹899",
    period: "/ year",
    tagline: "Best value",
    features: [
      "Apply to up to 100 jobs/year",
      "Exclusive dedicated support",
      "Featured profile visibility",
      "Early access to new roles",
    ],
    cta: "Go Premium",
    href: "/signup?plan=premium",
    highlight: true,
    style: {
      card: "bg-[var(--primary)]/90 backdrop-blur-md border border-[var(--primary)] text-white shadow-warm-lg scale-[1.02]",
      price: "text-white",
      cta: "bg-white text-[var(--primary)] hover:opacity-90 shadow-warm-md",
    },
  },
];

export function PricingTeaser() {
  return (
    <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="pricing-heading">
      <Reveal className="text-center mb-14">
        <p className="text-[var(--primary)] text-sm font-medium mb-3">Plans</p>
        <h2
          id="pricing-heading"
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium text-[var(--foreground)] leading-none"
        >
          Start free.{" "}
          <em className="font-sans not-italic text-[var(--primary)]">
            Grow with purpose.
          </em>
        </h2>
        <p className="font-sans text-[var(--foreground)] mt-3 max-w-md mx-auto text-sm opacity-80">
          Cost is never a barrier. Pick a plan that fits where you are right now.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
        {tiers.map(({ name, price, period, tagline, features, cta, href, highlight, style }, i) => (
          <Reveal key={name} delay={i * 0.1}>
            <div className={`rounded-2xl p-7 flex flex-col gap-5 h-full ${style.card} transition duration-300`}>
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sans font-medium text-sm text-current opacity-80">
                    {name}
                  </span>
                  {highlight && (
                    <span className="text-xs font-sans font-medium text-current bg-white/20 px-2 py-0.5 rounded-xl border border-current">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className={`font-sans text-5xl font-medium ${style.price}`}>{price}</span>
                  <span className="text-sm text-current opacity-80 mb-1 font-sans">{period}</span>
                </div>
                <p className="text-sm text-current opacity-70 mt-1 font-sans">{tagline}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1" aria-label={`${name} plan features`}>
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-current opacity-90 font-sans">
                    <Check size={15} className="text-current shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={href}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-sans font-medium transition duration-200 hover:-translate-y-0.5 ${style.cta}`}
              >
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="text-center mt-8">
        <p className="text-xs text-[var(--foreground)] opacity-60 font-sans">
          No hidden fees | Cancel anytime | Your data, your control
        </p>
      </Reveal>
    </section>
  );
}
