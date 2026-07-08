"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();

  // Parallax effects tied to scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Primary Accent Orb - Softened */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[5%] left-[-10%] w-[55vw] h-[55vw] opacity-20"
      >
        <motion.div
          animate={{ x: [0, 60, -40, 0], scale: [1, 1.1, 0.95, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-[40%_60%_70%_30%] mix-blend-multiply filter blur-[100px]"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </motion.div>

      {/* Secondary Orb - Softened */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] opacity-25"
      >
        <motion.div
          animate={{ x: [0, -70, 50, 0], scale: [1, 1.15, 0.85, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-[60%_40%_30%_70%] mix-blend-multiply filter blur-[120px]"
          style={{ backgroundColor: "var(--muted)" }}
        />
      </motion.div>

      {/* Tertiary Orb - Softened */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] opacity-20"
      >
        <motion.div
          animate={{ x: [0, 50, -50, 0], scale: [1, 0.9, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-[50%_50%_60%_40%] mix-blend-multiply filter blur-[140px]"
          style={{ backgroundColor: "var(--muted)" }}
        />
      </motion.div>

      {/* Master frosted glass overlay to blend everything elegantly and preserve contrast */}
      <div className="absolute inset-0 backdrop-blur-[80px] bg-white/40" />
    </div>
  );
}
