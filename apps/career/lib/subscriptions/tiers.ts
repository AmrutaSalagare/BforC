/**
 * Subscription tier definitions — single source of truth for limits and features.
 * When Razorpay is integrated, these map to plan IDs.
 */

export const SEEKER_TIERS = {
  free: {
    name: "Free",
    applicationLimit: 10,  // per year
    features: ["Apply to up to 10 roles/year", "Basic profile", "Browse all listings", "Community support"],
    price: 0,
    currency: "INR",
  },
  starter: {
    name: "Starter",
    applicationLimit: 50,
    features: ["Apply to up to 50 roles/year", "Priority resume parsing", "Profile visibility boost", "Basic support"],
    price: 499,
    currency: "INR",
  },
  premium: {
    name: "Premium",
    applicationLimit: 100,
    features: ["Apply to up to 100 roles/year", "Featured profile placement", "Exclusive job alerts", "Priority support"],
    price: 899,
    currency: "INR",
  },
} as const;

export const EMPLOYER_TIERS = {
  free: {
    name: "Free",
    activeJobLimit: 3,    // max active postings at any time
    features: ["Up to 3 active job listings", "Basic employer profile", "Standard applicant view"],
    price: 0,
    currency: "INR",
  },
  growth: {
    name: "Growth",
    activeJobLimit: 15,
    features: ["Up to 15 active job listings", "Verified badge", "Featured in search", "Priority support"],
    price: 4999,
    currency: "INR",
  },
  enterprise: {
    name: "Enterprise",
    activeJobLimit: Infinity,
    features: ["Unlimited job listings", "Dedicated account manager", "Custom integrations", "Analytics dashboard"],
    price: 14999,
    currency: "INR",
  },
} as const;

export type SeekerTier = keyof typeof SEEKER_TIERS;
export type EmployerTier = keyof typeof EMPLOYER_TIERS;

export function getSeekerLimit(tier: string): number {
  return SEEKER_TIERS[tier as SeekerTier]?.applicationLimit ?? SEEKER_TIERS.free.applicationLimit;
}

export function getEmployerJobLimit(tier: string): number {
  return EMPLOYER_TIERS[tier as EmployerTier]?.activeJobLimit ?? EMPLOYER_TIERS.free.activeJobLimit;
}
