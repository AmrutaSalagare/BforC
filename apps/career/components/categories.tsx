"use client";

import { Reveal } from "@/components/motion";
import {
  Laptop2, RefreshCw, Clock3, TrendingUp, BookOpen, Globe2, Users
} from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const timelineData: TimelineItem[] = [
  {
    id: "remote",
    label: "Remote Jobs",
    href: "/jobs?remote=true",
    color: "var(--mint)",
    icon: Laptop2,
    description: "Work from anywhere in the world. Enjoy the flexibility of no office commute.",
    relatedIds: ["flexible", "intl"],
  },
  {
    id: "return",
    label: "Return to Work",
    href: "/jobs?category=return",
    color: "var(--blush)",
    icon: RefreshCw,
    description: "Tailored opportunities and support for women transitioning back into the workforce.",
    relatedIds: ["flexible", "community"],
  },
  {
    id: "flexible",
    label: "Flexible Hours",
    href: "/jobs?category=flexible",
    color: "var(--lavender)",
    icon: Clock3,
    description: "Part-time or adaptable schedules so you can balance career and life on your terms.",
    relatedIds: ["remote", "return"],
  },
  {
    id: "leadership",
    label: "Leadership",
    href: "/jobs?category=leadership",
    color: "var(--blush)",
    icon: TrendingUp,
    description: "Executive and management roles to steer organizations towards greater impact.",
    relatedIds: ["research", "community"],
  },
  {
    id: "research",
    label: "Research",
    href: "/jobs?category=research",
    color: "var(--mint)",
    icon: BookOpen,
    description: "Data-driven, analytical, and academic roles focused on social development.",
    relatedIds: ["leadership", "intl"],
  },
  {
    id: "intl",
    label: "International",
    href: "/jobs?category=intl",
    color: "var(--lavender)",
    icon: Globe2,
    description: "Global positions offering cross-border opportunities and cultural exchange.",
    relatedIds: ["remote", "research"],
  },
  {
    id: "community",
    label: "Community Roles",
    href: "/jobs?category=community",
    color: "var(--blush)",
    icon: Users,
    description: "Grassroots and direct-engagement roles working closely with the people you serve.",
    relatedIds: ["return", "leadership"],
  },
];

export function CategoriesSection() {
  return (
    <section
      className="py-16 px-6 relative z-10"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-[1000px] mx-auto">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-3">Explore by Type</p>
          <h2
            id="categories-heading"
            className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[var(--foreground)]"
          >
            Find roles that fit your life
          </h2>
        </Reveal>

        <div className="w-full relative overflow-visible">
           <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  );
}
