"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion";
import { motion } from "framer-motion";
import { JobCard, type Job } from "@/components/job-card";

export function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  return (
    <section
      className="pt-8 md:pt-10 pb-24 px-6 bg-[var(--background)] relative z-10"
      aria-labelledby="featured-jobs-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)]/5 text-[var(--primary)] text-sm font-medium mb-4 shadow-warm-md">
              <Sparkles size={14} />
              <span>Handpicked Opportunities</span>
            </div>
            <h2
              id="featured-jobs-heading"
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.95] tracking-tight text-[var(--foreground)]"
            >
              Find your passion and purpose.
            </h2>
          </div>
          <Link
            href="/jobs"
            className="hidden md:inline-flex items-center gap-2 bg-transparent text-[var(--foreground)] border border-[var(--primary)]/10 px-6 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-300 hover:bg-[var(--foreground)]/5 shadow-warm-md"
          >
            Browse all roles <ArrowRight size={16} />
          </Link>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 40, rotateX: 10, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0, 
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2} className="mt-12 text-center md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-transparent text-[var(--foreground)] border border-[var(--primary)]/10 px-6 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-300 hover:bg-[var(--foreground)]/5 shadow-warm-md"
          >
            View all opportunities <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
