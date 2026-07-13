"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import Link from "next/link";
import type { Company } from "@/lib/data/types";

function CompanyInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function CompaniesSection({ companies }: { companies: Company[] }) {
  return (
    <section
      className="py-14 px-4 sm:px-6 max-w-7xl mx-auto"
      aria-labelledby="companies-heading"
    >
      <Reveal className="mb-10">
        <p className="text-[var(--primary)] text-sm font-medium mb-3">
          Featured Organisations
        </p>
        <h2
          id="companies-heading"
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none text-[var(--foreground)]"
        >
          Work with teams that care
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {companies.map(
          (
            { name, slug, openRoles, womenFriendly, logoUrl },
            index,
          ) => (
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
                className="relative overflow-hidden flex flex-col gap-3 p-5 bg-transparent rounded-2xl border border-[var(--primary)]/10 hover:bg-[var(--foreground)]/5 transition duration-300 group h-full shadow-warm-md"
              >
                <div aria-hidden className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  {logoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={logoUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-right opacity-[0.55]"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,1) 62%, rgba(0,0,0,1) 100%)",
                        maskImage:
                          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,1) 62%, rgba(0,0,0,1) 100%)",
                      }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-end pr-10 font-sans text-7xl font-semibold text-[var(--foreground)] opacity-[0.14]"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,1) 62%, rgba(0,0,0,1) 100%)",
                        maskImage:
                          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,1) 62%, rgba(0,0,0,1) 100%)",
                      }}
                    >
                      {CompanyInitials(name)}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--background)]/8" />
                </div>

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-end min-h-[22px]">
                    {womenFriendly && (
                      <span className="text-[11px] leading-none font-sans font-medium bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-1 rounded-full shrink-0">
                        Women-Friendly
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-sans font-medium text-[var(--foreground)] leading-snug truncate">
                      {name}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--border)]" />
                      <span className="text-xs font-sans text-[var(--foreground)]/80 truncate">
                        {openRoles} open role{openRoles !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 mt-2">
                    <span className="inline-flex items-center justify-center text-[11px] font-sans font-medium px-3 py-1.5 rounded-full bg-[var(--foreground)]/5 text-[var(--foreground)]/80">
                      View organisation
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ),
        )}
      </div>

      <Reveal delay={0.2} className="text-center mt-10">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[var(--foreground)] border border-[var(--primary)]/10 px-6 py-3 rounded-xl hover:bg-[var(--foreground)]/5 transition duration-300 shadow-warm-md"
        >
          View all organisations
        </Link>
      </Reveal>

    </section>
  );
}
