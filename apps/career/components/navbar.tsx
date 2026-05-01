"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Menu, X, ChevronDown } from "lucide-react";

import Image from "next/image";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "For Employers", href: "/employers" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/50 backdrop-blur-lg shadow-warm-sm border-b border-[var(--border)]"
          : "bg-transparent"
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo_bforc.png"
              alt="Brains For Compassion"
              width={160}
              height={45}
              className="h-10 w-auto mix-blend-multiply contrast-125"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[var(--accent-color)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-[var(--accent-color)] text-[var(--on-accent)] px-5 py-2.5 rounded-[4px] hover:bg-[var(--accent-dark)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-[var(--muted-fg)] hover:text-[var(--foreground)]"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[var(--background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col h-full px-6 pt-6 pb-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <Link href="/" className="font-display text-lg font-medium" onClick={() => setMobileOpen(false)}>
                  BforC Careers
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[var(--muted-fg)]"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl font-light text-[var(--foreground)] py-3 border-b border-[var(--border)] block hover:text-[var(--accent-color)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3.5 border border-[var(--accent-color)] text-[var(--accent-color)] rounded-[4px] font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3.5 bg-[var(--accent-color)] text-[var(--on-accent)] rounded-[4px] font-medium"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
