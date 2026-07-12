"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { type JSX, useRef } from "react";

// Shared easing curve
// The signature "expo ease-out" - starts fast, settles very slowly and elegantly
export const EASE = [0.16, 1, 0.3, 1] as const;

// Scroll Progress Bar
/** Thin magenta line at the very top of the viewport */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ring)] z-[100]"
    />
  );
}

// Reveal (fade + slide-up)
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
  duration?: number;
  distance?: number;
}

export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  duration = 0.8,
  distance = 36,
}: RevealProps) {
  const shouldReduce = useReducedMotion();
  const dirMap = {
    up: { y: shouldReduce ? 0 : distance, x: 0 },
    left: { y: 0, x: shouldReduce ? 0 : -distance },
    right: { y: 0, x: shouldReduce ? 0 : distance },
  };
  const { y, x } = dirMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// StaggerReveal
/** Wraps children and staggers their reveal on scroll entry */
export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside StaggerReveal */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// TextReveal (word-by-word stagger)
/**
 * Splits a string into words and staggers their fade+slide entry.
 * Inspired by Augen.pro style typography animations.
 *
 * Usage:
 *   <TextReveal text="Find Work That Moves the World" as="h1" className="..." />
 */
interface TextRevealProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function TextReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.07,
  duration = 0.65,
}: TextRevealProps) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  const wordVariant = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 22 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE, delay: delay + index * stagger },
    }),
  };

  return (
    <Tag
      className={`${className ?? ""} flex flex-wrap`}
      style={{ columnGap: "0.25em", rowGap: "0.02em" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={wordVariant}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

// ParallaxSection
/**
 * Wraps children in a parallax container.
 * `speed` > 0 = slower than scroll (background feel).
 * `speed` < 0 = faster than scroll (foreground feel).
 */
export function ParallaxSection({
  children,
  speed = 0.3,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [-speed * 60, speed * 60]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

// FadeIn (simple opacity only)
/** Ultra-lightweight - only animates opacity. Best for backgrounds and decorative elements. */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// CountUp
export function CountUp({
  target,
  suffix = "",
  duration = 1500,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  // Simple approach - no state churn on re-renders
  const nodeRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      onViewportEnter={() => {
        if (triggered.current) return;
        triggered.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          if (nodeRef.current)
            nodeRef.current.textContent =
              Math.floor(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      0{suffix}
    </motion.span>
  );
}
