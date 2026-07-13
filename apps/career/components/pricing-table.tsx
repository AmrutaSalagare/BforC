"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Spinner } from "@/components/motion";
import { EMPLOYER_TIERS as EMPLOYER_TIER_LIMITS, SEEKER_TIERS as SEEKER_TIER_LIMITS } from "@/lib/subscriptions/tiers";

export type Tier = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
};

interface PricingTableProps {
  role: "seeker" | "employer";
  currentTier?: string;
}

type RazorpayOptions = {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: () => void;
  prefill: { name: string };
  theme: { color: string };
};

type RazorpayFailure = {
  error: {
    description?: string;
  };
};

type RazorpayInstance = {
  on: (event: "payment.failed", handler: (response: RazorpayFailure) => void) => void;
  open: () => void;
};

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;
type RazorpayWindow = Window & { Razorpay?: RazorpayConstructor };

const SEEKER_TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: SEEKER_TIER_LIMITS.free.price,
    description: "Perfect for getting started",
    features: ["10 applications per year", "Basic profile visibility", "Standard support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: SEEKER_TIER_LIMITS.starter.price,
    description: "For active job seekers",
    popular: true,
    features: ["50 applications per year", "Highlighted profile", "Priority support"],
  },
  {
    id: "premium",
    name: "Premium",
    price: SEEKER_TIER_LIMITS.premium.price,
    description: "For the serious professional",
    features: ["100 applications per year", "Top of list for employers", "24/7 dedicated support"],
  },
];

const EMPLOYER_TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: EMPLOYER_TIER_LIMITS.free.price,
    description: "Try out our platform",
    features: ["3 active job postings", "Standard applicant visibility", "Basic analytics"],
  },
  {
    id: "growth",
    name: "Growth",
    price: EMPLOYER_TIER_LIMITS.growth.price,
    description: "For growing businesses",
    popular: true,
    features: ["15 active job postings", "Featured job tags", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: EMPLOYER_TIER_LIMITS.enterprise.price,
    description: "For large organizations",
    features: ["Unlimited active job postings", "Premium employer branding", "Dedicated account manager"],
  },
];

export function PricingTable({ role, currentTier = "free" }: PricingTableProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const tiers = role === "seeker" ? SEEKER_TIERS : EMPLOYER_TIERS;

  const handleUpgrade = async (tier: Tier) => {
    if (tier.price === 0) return;
    setLoadingTier(tier.id);

    try {
      const res = await fetch("/api/razorpay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tier.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const loadScript = () => {
        return new Promise((resolve) => {
          if ((window as RazorpayWindow).Razorpay) {
            resolve(true);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const loaded = await loadScript();
      if (!loaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "BforC Platform",
        description: `Upgrade to ${tier.name} Plan`,
        order_id: data.orderId,
        handler: function () {
          alert("Payment successful. Your limits have been upgraded.");
          window.location.reload();
        },
        prefill: {
          name: "BforC User",
        },
        theme: {
          color: "#000000",
        },
      };

      const Razorpay = (window as RazorpayWindow).Razorpay;
      if (!Razorpay) {
        alert("Razorpay SDK failed to initialize.");
        return;
      }

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description ?? "Please try again."}`);
      });
      rzp.open();
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Unable to start checkout.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {tiers.map((tier) => {
        const isCurrent = currentTier === tier.id;
        return (
          <div
            key={tier.id}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all ${
              tier.popular
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xl md:-mt-4 md:mb-4"
                : "bg-[var(--background)] border-[var(--primary)]/10 shadow-sm"
            }`}
          >
            {tier.popular && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent-color)] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </span>
            )}
            <div className="mb-8">
              <h3 className={`text-xl font-medium mb-2 ${tier.popular ? "text-[var(--background)]" : "text-[var(--foreground)]"}`}>
                {tier.name}
              </h3>
              <p className={`text-sm ${tier.popular ? "text-[var(--background)]/80" : "text-[var(--muted-fg)]"}`}>
                {tier.description}
              </p>
            </div>
            <div className="mb-8 flex items-baseline text-3xl font-display">
              Rs. {tier.price.toLocaleString("en-IN")}
              <span className={`text-sm ml-1 ${tier.popular ? "text-[var(--background)]/60" : "text-[var(--muted-fg)]"}`}>
                /year
              </span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className={`shrink-0 mt-0.5 ${
                      tier.popular ? "text-[var(--background)]" : "text-[var(--accent-color)]"
                    }`}
                  />
                  <span className={`text-sm ${tier.popular ? "text-[var(--background)]/90" : "text-[var(--foreground)]/90"}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(tier)}
              disabled={isCurrent || loadingTier !== null}
              className={`w-full py-3.5 rounded-2xl text-sm font-medium transition-all flex justify-center items-center gap-2 ${
                isCurrent
                  ? "bg-transparent border-2 border-[var(--primary)]/20 text-[var(--muted-fg)] cursor-not-allowed"
                  : tier.popular
                  ? "bg-[var(--background)] text-[var(--foreground)] hover:bg-white/90"
                  : "bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)]/10"
              }`}
            >
              {loadingTier === tier.id ? (
                <><Spinner className="w-4 h-4" /> Processing...</>
              ) : isCurrent ? (
                "Current Plan"
              ) : tier.price === 0 ? (
                "Included"
              ) : (
                "Upgrade Now"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
