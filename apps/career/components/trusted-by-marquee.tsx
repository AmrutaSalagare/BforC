"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Globe, Users, Target, Leaf } from "lucide-react";

const PARTNERS = [
  { name: "Heartful Chi", icon: Heart },
  { name: "Akshaya Patra", icon: Leaf },
  { name: "Project Baala", icon: Users },
  { name: "Global AID", icon: Globe },
  { name: "Women's Relief", icon: Shield },
  { name: "Impact India", icon: Target },
];

export function TrustedByMarquee() {
  return (
    <motion.section 
      initial={{ opacity: 0, rotateX: -15, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-12 border-b border-[var(--border)]/60 bg-[var(--background)] overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center eyebrow text-[var(--muted-foreground)]">Trusted by leading social impact organisations</p>
      </div>
      
      <div className="relative flex w-full overflow-hidden group">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-48 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-48 bg-gradient-to-l from-[var(--background)] to-transparent" />

        {/* Marquee Track */}
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 md:gap-24 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the array to create seamless loop */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div 
                key={`${partner.name}-${i}`} 
                className="flex items-center gap-3 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 group/logo cursor-pointer opacity-70 hover:opacity-100"
              >
                <Icon size={28} strokeWidth={1.5} className="group-hover/logo:scale-110 transition-transform duration-300" />
                <span className="font-display text-2xl font-semibold tracking-tight">{partner.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
