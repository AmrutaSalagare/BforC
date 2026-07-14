"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { EASE } from "@/components/motion";

const CAREER_SITE_URL = process.env.NEXT_PUBLIC_CAREER_SITE_URL || "/career";

const navLinks = [
  { label: "BforC Careers", href: CAREER_SITE_URL },
  { label: "About us", href: "/story" },
  { label: "Member benefits", href: "/#benefits" },
  { label: "Pricing plans", href: "/#pricing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check initial scroll
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div
          className={`mx-auto max-w-5xl flex items-center justify-between px-6 py-3 rounded-2xl pointer-events-auto transition-all duration-500 ${
            scrolled || mobileMenuOpen
              ? "bg-[color:var(--surface)]/90 backdrop-blur-xl shadow-warm-md border border-[var(--border)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-32 flex items-center">
              <Image
                alt="BforC Logo"
                src="/logo_bforc.png"
                fill
                className="object-contain mix-blend-multiply contrast-125 transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isExternal = link.href.startsWith("http");
              const linkClassName = `text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 relative ${
                isActive
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`;

              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClassName}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[var(--muted)]/60 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a
              href={CAREER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#8c365c] transition-all duration-300 active:scale-[0.98] shadow-warm-sm"
            >
              Partner with us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-[var(--foreground)] rounded-xl hover:bg-[var(--surface-2)] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop tap-to-close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed inset-0 z-40 bg-[var(--background)]/98 backdrop-blur-2xl md:hidden pt-24 px-8 flex flex-col gap-8 shadow-warm-lg overflow-y-auto"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const isExternal = link.href.startsWith("http");
                  const linkClass = `font-display text-4xl font-light leading-none tracking-tight block py-3 border-b border-[var(--border)]/20 last:border-0 ${
                    isActive
                      ? "text-[var(--primary)] font-normal"
                      : "text-[var(--foreground)] hover:text-[var(--primary)]"
                  }`;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4, ease: EASE }}
                    >
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileMenuOpen(false)}
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={linkClass}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
                className="mt-auto mb-10 pt-6 border-t border-[var(--border)] flex flex-col gap-4"
              >
                <a
                  href={CAREER_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-4 rounded-xl font-medium shadow-warm-md hover:bg-[#8c365c] transition-colors text-base"
                >
                  Partner with us <ArrowRight size={16} />
                </a>
                <p className="text-xs text-[var(--muted-foreground)] text-center">
                  brainsforcompassion@gmail.com
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
