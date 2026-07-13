"use client";

import { motion, type Variants } from "framer-motion";
import { Search, UserPlus, Briefcase, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import Link from "next/link";

const STEPS = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up in minutes. Add your experience, skills, and what kind of role you're looking for.",
    color: "var(--primary)",
    bg: "var(--accent)",
  },
  {
    icon: Search,
    step: "02",
    title: "Discover Roles",
    description: "Browse curated jobs at NGOs and social enterprises filtered for women-friendly workplaces.",
    color: "var(--chart-1)",
    bg: "oklch(from var(--chart-1) l c h / 0.15)",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Apply & Get Hired",
    description: "Apply with one click. Track your applications and connect with purpose-driven employers.",
    color: "var(--chart-3)",
    bg: "var(--brand-teal)",
  },
];

const lineEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: lineEase } },
};

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-[var(--background)]" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto max-w-5xl">
        <Reveal className="text-center mb-20">
          <p className="eyebrow mb-3">Simple Process</p>
          <h2 id="how-it-works-heading" className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--foreground)] leading-tight">
            How it works
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connector lines on desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px">
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(to right, var(--primary), var(--chart-1))" }}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />
          </div>
          <div className="hidden md:block absolute top-12 left-[calc(66.66%+1rem)] right-[1rem] h-px">
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(to right, var(--chart-1), var(--chart-3))" }}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            />
          </div>

          {STEPS.map(({ icon: Icon, step, title, description, color, bg }, idx) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={32} strokeWidth={1.5} style={{ color }} />
                </div>
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow"
                  style={{ backgroundColor: color }}
                >
                  {step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[var(--foreground)] hover:shadow-warm-md hover:-translate-y-1"
          >
            Get Started Free
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
