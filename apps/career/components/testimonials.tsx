"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "BforC helped me find a role that aligned with everything I believe in. After a 3-year break, I felt genuinely welcomed back — not just tolerated.",
    name: "Priya M.",
    role: "Programme Officer, Jaipur",
    initials: "PM",
  },
  {
    quote:
      "The Women-Friendly ratings were the game changer. I didn't have to guess which employers actually meant it — the data was right there.",
    name: "Shweta R.",
    role: "Research Analyst, Delhi",
    initials: "SR",
  },
  {
    quote:
      "I uploaded my resume and within minutes my profile was filled in. Applied to 4 roles in 20 minutes. That's just brilliant for someone juggling family and job hunting.",
    name: "Kavitha N.",
    role: "Community Lead, Chennai",
    initials: "KN",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 px-6 relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">— SUCCESS STORIES —</p>
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light italic text-[var(--foreground)]"
          >
            Stories that move us forward
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials }, i) => (
            <Reveal key={name} delay={i * 0.12}>
              <motion.figure
                className="flex flex-col h-full bg-white/40 backdrop-blur-md rounded-xl p-7 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  boxShadow: "0 20px 60px rgba(168,67,112,0.10)",
                  borderColor: "rgba(168,67,112,0.25)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <Quote
                  size={24}
                  className="text-[var(--primary)] mb-4 shrink-0"
                  aria-hidden
                />
                <blockquote className="font-display italic text-xl font-light leading-snug text-[var(--foreground)] flex-1 mb-6">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center font-display text-sm font-medium text-[var(--foreground)] shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
