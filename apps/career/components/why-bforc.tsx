"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import { Star, Cpu, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Star,
    title: "Women-Friendly Ratings",
    body: "Every company is rated on maternity policies, flexibility, pay equity, and safety. No guessing. Just clarity.",
    color: "var(--blush)",
  },
  {
    icon: Cpu,
    title: "AI Resume Parsing",
    body: "Upload your resume and we auto-fill your entire profile. Apply to roles in under 2 minutes — even from your phone.",
    color: "var(--mint)",
  },
  {
    icon: ShieldCheck,
    title: "Verified Employers Only",
    body: "Every organisation on BforC Careers is verified. No fake listings, no ghosting. Your time and trust are respected.",
    color: "var(--lavender)",
  },
];

export function WhyBforCSection() {
  return (
    <section
      className="py-20 px-6"
      aria-labelledby="why-bforc-heading"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-3">— WHY BFORC CAREERS —</p>
          <h2
            id="why-bforc-heading"
            className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-tight text-[var(--foreground)]"
          >
            Built differently,{" "}
            <em className="font-display not-italic text-[var(--accent-color)]">
              for you
            </em>
          </h2>
          <p className="text-[var(--muted-fg)] mt-4 text-base leading-relaxed max-w-lg">
            We didn't copy another job board. We asked women in social impact
            what they actually needed — and built that.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {reasons.map(({ icon: Icon, title, body, color }) => (
            <StaggerItem key={title}>
              <motion.div
                className="group flex flex-col gap-4 p-7 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 hover:border-[var(--primary)]/30 transition-colors duration-300 h-full"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 16px 48px rgba(168,67,112,0.12)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color + "66" }}
                >
                  <Icon size={22} className="text-[var(--foreground)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--foreground)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{body}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
