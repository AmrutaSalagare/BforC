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
      card: "bg-white/40 backdrop-blur-md border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
      price: "text-[var(--foreground)]",
      cta: "border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)]",
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
      card: "bg-white/50 backdrop-blur-md border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
      price: "text-[var(--foreground)]",
      cta: "border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)]",
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
      card: "bg-[var(--accent-color)]/10 backdrop-blur-xl border-2 border-[var(--accent-color)] shadow-[0_8px_30px_var(--accent-color)] scale-[1.02]",
      price: "text-[var(--accent-color)]",
      cta: "bg-[var(--accent-color)] text-[var(--on-accent)] hover:bg-[var(--accent-dark)]",
    },
  },
];

export function PricingTeaser() {
  return (
    <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="pricing-heading">
      <Reveal className="text-center mb-14">
        <p className="eyebrow mb-3">— PLANS —</p>
        <h2
          id="pricing-heading"
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[var(--foreground)]"
        >
          Start free.{" "}
          <em className="font-display not-italic text-[var(--accent-color)]">
            Grow with purpose.
          </em>
        </h2>
        <p className="text-[var(--muted-fg)] mt-3 max-w-md mx-auto text-sm">
          Cost is never a barrier. Pick a plan that fits where you are right now.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
        {tiers.map(({ name, price, period, tagline, features, cta, href, highlight, style }, i) => (
          <Reveal key={name} delay={i * 0.1}>
            <div className={`rounded-2xl border p-7 flex flex-col gap-5 h-full ${style.card} transition-all duration-300`}>
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-dm text-xs tracking-widest uppercase text-[var(--muted-fg)]">
                    {name}
                  </span>
                  {highlight && (
                    <span className="text-[10px] font-mono-dm tracking-wider uppercase text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2 py-0.5 rounded-full">
                      Popular ✦
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className={`font-display text-4xl font-light ${style.price}`}>{price}</span>
                  <span className="text-sm text-[var(--muted-fg)] mb-1">{period}</span>
                </div>
                <p className="text-xs text-[var(--faint-fg)] mt-1">{tagline}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1" aria-label={`${name} plan features`}>
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--muted-fg)]">
                    <Check size={15} className="text-[var(--success)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={href}
                className={`flex items-center justify-center gap-2 py-3 rounded-[4px] text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${style.cta}`}
              >
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="text-center mt-8">
        <p className="text-xs text-[var(--faint-fg)]">
          No hidden fees · Cancel anytime · Your data, your control
        </p>
      </Reveal>
    </section>
  );
}
