"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { type JSX, useRef } from "react";
import React from "react";

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
    <Tag className={`${className ?? ""} flex flex-wrap`} style={{ columnGap: "0.25em", rowGap: "0.02em" }}>
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

// Spinner (inline)
/** Lightweight CSS spinner — no deps, respects button disabled state */
export function Spinner({ className }: { className?: string }) {
  return <span className={`spinner ${className ?? ""}`} aria-hidden />;
}

// PageTransition
/**
 * Wraps page content with a subtle fade+slide-up entrance.
 * Use inside layout.tsx children or individual page components.
 */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
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
  delay = 0,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
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
        
        setTimeout(() => {
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            if (nodeRef.current)
              nodeRef.current.textContent = Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, delay);
      }}
    >
      0{suffix}
    </motion.span>
  );
}

// MagneticButton
/** Creates a tactile "magnetic" pull effect when hovering over elements like buttons */
export function MagneticButton({
  children,
  className,
  as: Tag = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const shouldReduce = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25); // pull strength
    y.set(middleY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{ display: "inline-block" }}
      {...props}
    >
      <motion.div style={{ x: springX, y: springY }} className="w-full h-full flex items-center justify-center">
        {children}
      </motion.div>
    </Tag>
  );
}

// HoverTiltCard
/** Adds a subtle 3D tilt effect based on mouse position over the card */
export function HoverTiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);
  const shouldReduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// CursorSpotlight
/** Adds a soft, premium gradient spotlight that follows the user's cursor globally */
export function CursorSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const shouldReduce = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduce) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, shouldReduce]);

  const transX = useTransform(springX, (val) => val - 200);
  const transY = useTransform(springY, (val) => val - 200);

  if (shouldReduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity: 0.4 }} // keep it subtle
    >
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 400,
          height: 400,
          // Center the spotlight on the cursor
          x: transX,
          y: transY,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
