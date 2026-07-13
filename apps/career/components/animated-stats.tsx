"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay?: number;
}

function AnimatedCircleStat({ value, suffix, label, color, delay = 0 }: AnimatedStatProps) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const size = 120;
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  // Map to a 0-75% arc for visual variety
  const maxPercent = 0.75;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            ref={ref}
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={isInView ? { strokeDashoffset: circ * (1 - maxPercent) } : {}}
            transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-display text-2xl font-medium text-[var(--foreground)] leading-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          >
            {isInView ? (
              <CountUpLocal target={value} suffix={suffix} duration={1400} delay={(delay + 0.3) * 1000} />
            ) : `0${suffix}`}
          </motion.span>
        </div>
      </div>
      <p className="eyebrow text-center">{label}</p>
    </div>
  );
}

function CountUpLocal({ target, suffix, duration, delay }: { target: number; suffix: string; duration: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        if (ref.current) ref.current.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
  { value: 2400, suffix: "+", label: "Women Placed",  color: "var(--primary)",    delay: 0 },
  { value: 340,  suffix: "+", label: "Active Roles",  color: "var(--chart-1)",   delay: 0.15 },
  { value: 18,   suffix: "",  label: "Countries",     color: "var(--chart-3)",   delay: 0.3 },
];

export function AnimatedStatsSection() {
  return (
    <section className="py-20 px-6 bg-[var(--card)] border-y border-[var(--border)]/40">
      <div className="container mx-auto max-w-4xl">
        <motion.p
          className="eyebrow text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Impact, In Numbers
        </motion.p>
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {STATS.map((s) => (
            <AnimatedCircleStat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
