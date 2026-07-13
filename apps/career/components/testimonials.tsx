"use client";

import { Reveal } from "@/components/motion";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "BforC helped me find a role that aligned with everything I believe in. After a 3-year break, I felt genuinely welcomed back, not just tolerated.",
    name: "Priya M.",
    designation: "Programme Officer, Jaipur",
    src: "/images/testimonials/card-01.svg",
  },
  {
    quote:
      "The Women-Friendly ratings were the game changer. I didn't have to guess which employers actually meant it; the data was right there.",
    name: "Shweta R.",
    designation: "Research Analyst, Delhi",
    src: "/images/testimonials/card-02.svg",
  },
  {
    quote:
      "I uploaded my resume and within minutes my profile was filled in. Applied to 4 roles in 20 minutes. Brilliant for someone juggling family and job hunting.",
    name: "Kavitha N.",
    designation: "Community Lead, Chennai",
    src: "/images/testimonials/card-03.svg",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[var(--primary)] text-sm font-medium mb-3">Success Stories</p>
          <h2
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium text-[var(--foreground)]"
          >
            Stories that move us forward
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-[2rem] border border-[var(--primary)]/10 bg-[var(--background)]/70 backdrop-blur-sm shadow-warm-md px-4 sm:px-8 py-8">
            <div className="flex justify-center">
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                colors={{
                  name: "var(--foreground)",
                  designation: "var(--foreground)",
                  testimony: "var(--foreground)",
                  arrowBackground: "var(--foreground)",
                  arrowForeground: "var(--background)",
                  arrowHoverBackground: "var(--primary)",
                }}
                fontSizes={{
                  name: "1.75rem",
                  designation: "1rem",
                  quote: "1.125rem",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
