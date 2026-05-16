"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { Star } from "lucide-react";
import Link from "next/link";
import type { Company } from "@/lib/data/types";

function CompanyInitials(name: string) {
  return name.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

export function CompaniesSection({ companies }: { companies: Company[] }) {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="companies-heading">
      <Reveal className="mb-10">
        <p className="eyebrow mb-3">Featured Organisations</p>
        <h2
          id="companies-heading"
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[var(--foreground)]"
        >
          Work with teams that care
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {companies.map(({ name, slug, rating, openRoles, womenFriendly }, index) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={`/companies/${slug}`}
              className="flex flex-col gap-3 p-5 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 hover:border-[var(--accent-color)]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group h-full"
            >
              <div className="flex flex-wrap items-start justify-between gap-y-3 gap-x-2">
                <div className="w-12 h-12 rounded-lg bg-[var(--blush)]/70 flex items-center justify-center font-display text-lg font-medium text-[var(--foreground)] shrink-0">
                  {CompanyInitials(name)}
                </div>
                {womenFriendly && (
                  <span className="badge-women-friendly text-[10px] shrink-0">
                    Women-Friendly
                  </span>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-color)] transition-colors leading-snug">
                  {name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} className="fill-[var(--accent-color)] text-[var(--accent-color)]" />
                  <span className="text-xs text-[var(--muted-fg)]">{rating}</span>
                </div>
              </div>

              <p className="text-xs text-[var(--faint-fg)] mt-auto">
                {openRoles} open role{openRoles !== 1 ? "s" : ""}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.2} className="text-center mt-10">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-color)] border border-[var(--accent-color)] px-6 py-3 rounded-[4px] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)] transition-all duration-300"
        >
          View all organisations
        </Link>
      </Reveal>
    </section>
  );
}
