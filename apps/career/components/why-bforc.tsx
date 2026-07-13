"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import { Star, Cpu, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Star,
    title: "Women-Friendly Ratings",
    body: "Every company is rated on maternity policies, flexibility, pay equity, and safety. No guessing. Just clarity.",
  },
  {
    icon: Cpu,
    title: "AI Resume Parsing",
    body: "Upload your resume and we auto-fill your entire profile. Apply to roles in under 2 minutes - even from your phone.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Employers Only",
    body: "Every organisation on BforC Careers is verified. No fake listings, no ghosting. Your time and trust are respected.",
  },
];

export function WhyBforCSection() {
  return (
    <section className="py-20 px-4 sm:px-6" aria-labelledby="why-bforc-heading">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-4xl mx-auto mb-14 text-center">
          <h2
            id="why-bforc-heading"
            className="font-display font-medium tracking-tight text-[var(--foreground)]"
          >
            <span className="inline-grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center justify-center gap-3 sm:gap-8">
              <span className="text-[clamp(4.6rem,9.5vw,7.75rem)] leading-[0.82] bg-gradient-to-r from-[var(--foreground)] to-[var(--primary)] bg-clip-text text-transparent">
                BforC
              </span>
              <span className="text-[clamp(1.9rem,3.9vw,3.05rem)] leading-[1.06] text-center sm:text-left">
                <span className="block">
                  Careers is built <b>differently.</b>
                </span>
                <span className="block mt-2">
                  is built <b>for you.</b>
                </span>
              </span>
            </span>
          </h2>

          <p className="text-[var(--foreground)] opacity-90 mt-6 text-base leading-relaxed max-w-5xl mx-auto font-sans">
            We are not just another job board. We empower women in social impact
            and help them rebuild. BforC is a community of like-minded, strong,
            independent women doing impactful work for positive change. We close
            the gap between talented women and meaningful organizations,
            bringing them closer to the opportunities they deserve, and
            transforming career paths for women excluded from the workforce.
          </p>
        </Reveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {reasons.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <motion.div
                className="group flex flex-col gap-4 p-7 bg-transparent rounded-2xl border border-[var(--primary)]/10 hover:bg-[var(--foreground)]/5 transition-colors duration-300 h-full shadow-warm-md"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[var(--primary)]/10">
                  <Icon size={22} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-[var(--foreground)] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm font-sans text-[var(--foreground)] opacity-80 leading-relaxed">
                    {body}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
