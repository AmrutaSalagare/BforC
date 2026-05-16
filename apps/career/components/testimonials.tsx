"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";

const testimonials = [
  {
    quote:
      "BforC helped me find a role that aligned with everything I believe in. After a 3-year break, I felt genuinely welcomed back, not just tolerated.",
    name: "Priya M.",
    role: "Programme Officer, Jaipur",
    initials: "PM",
  },
  {
    quote:
      "The Women-Friendly ratings were the game changer. I didn't have to guess which employers actually meant it; the data was right there.",
    name: "Shweta R.",
    role: "Research Analyst, Delhi",
    initials: "SR",
  },
  {
    quote:
      "I uploaded my resume and within minutes my profile was filled in. Applied to 4 roles in 20 minutes. Brilliant for someone juggling family and job hunting.",
    name: "Kavitha N.",
    role: "Community Lead, Chennai",
    initials: "KN",
  },
];

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      className="py-20 px-6 relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-3">Success Stories</p>
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light italic text-[var(--foreground)]"
          >
            Stories that move us forward
          </h2>
        </Reveal>

        {/* Featured testimonial — editorial pull-quote, no card */}
        <Reveal className="mb-14">
          <figure className="max-w-3xl mx-auto text-center">
            <div className="relative py-6">
              <span
                aria-hidden
                className="absolute -top-2 left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none select-none pointer-events-none text-[var(--accent-color)]/10"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-display italic text-[clamp(1.25rem,2.4vw,1.8rem)] font-light leading-relaxed text-[var(--foreground)]">
                {featured.quote}
              </blockquote>
            </div>
            <figcaption className="flex items-center justify-center gap-4 mt-2">
              <span className="w-10 h-px bg-[var(--border)]" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{featured.name}</p>
                <p className="eyebrow mt-0.5">{featured.role}</p>
              </div>
              <span className="w-10 h-px bg-[var(--border)]" aria-hidden />
            </figcaption>
          </figure>
        </Reveal>

        {/* Two secondary testimonials — glass cards, 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {rest.map(({ quote, name, role, initials }, i) => (
            <Reveal key={name} delay={i * 0.1}>
              <motion.figure
                className="flex flex-col h-full bg-white/40 backdrop-blur-md rounded-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                whileHover={{
                  y: -4,
                  boxShadow: "0 16px 48px rgba(168,67,112,0.10)",
                  borderColor: "rgba(168,67,112,0.25)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <blockquote className="font-display italic text-lg font-light leading-snug text-[var(--foreground)] flex-1 mb-5">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/60 flex items-center justify-center font-display text-xs font-medium text-[var(--foreground)] shrink-0">
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
