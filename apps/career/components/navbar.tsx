"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle, ChevronDown, LogOut, Building, Briefcase, CreditCard } from "lucide-react";
import Image from "next/image";
import { logoutAction } from "@/app/auth/actions";

export type NavUser = { role: "seeker" | "employer" } | null;

const publicLinks = [
  { label: "Find a role",  href: "/jobs" },
  { label: "Companies",    href: "/companies" },
  { label: "For Employers", href: "/employers" },
  { label: "Pricing",      href: "/pricing" },
];

const seekerLinks = [
  { label: "Dashboard",   href: "/dashboard" },
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies",   href: "/companies" },
  { label: "Pricing",     href: "/pricing" },
];

const employerLinks = [
  { label: "Dashboard",     href: "/employers/dashboard" },
  { label: "Talent Search", href: "/employers/search" },
  { label: "Plans",         href: "/employers/pricing" },
];

export function Navbar({ user }: { user: NavUser }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = !user ? publicLinks : user.role === "employer" ? employerLinks : seekerLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${
          scrolled
            ? "bg-[var(--background)]/60 backdrop-blur-sm shadow-warm-md"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <Image
              src="/logo_bforc.png"
              alt="Brains For Compassion"
              width={160}
              height={45}
              className="h-10 w-auto mix-blend-multiply contrast-125"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans font-medium text-[var(--foreground)] opacity-80 hover:opacity-100 transition-opacity duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-1.5 text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  <UserCircle size={20} />
                  <span>Profile</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[var(--background)]/80 backdrop-blur-md shadow-warm-lg rounded-2xl overflow-hidden"
                    >
                      {user?.role === "employer" ? (
                        <>
                          <Link
                            href="/employers/dashboard/profile"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                          >
                            <Building size={16} className="text-[var(--muted-fg)]" />
                            Company Profile
                          </Link>
                          <Link
                            href="/employers/dashboard/billing"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                          >
                            <CreditCard size={16} className="text-[var(--muted-fg)]" />
                            Billing & Plan
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                          >
                            <Briefcase size={16} className="text-[var(--muted-fg)]" />
                            My Dashboard
                          </Link>
                          <Link
                            href="/dashboard/billing"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                          >
                            <CreditCard size={16} className="text-[var(--muted-fg)]" />
                            Billing & Plan
                          </Link>
                        </>
                      )}
                      {user?.role === "seeker" && (
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
                        >
                          <UserCircle size={16} className="text-[var(--muted-fg)]" />
                          My Profile
                        </Link>
                      )}
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors border-t border-[var(--primary)]/10"
                        >
                          <LogOut size={16} className="text-[var(--muted-fg)]" />
                          Sign out
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                  <Link
                    href="/login"
                    className="text-sm font-sans font-medium text-[var(--foreground)] px-4 py-2 rounded-xl hover:bg-[var(--foreground)]/5 transition-colors duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-sans font-medium bg-[var(--primary)] text-[var(--background)] px-5 py-2.5 rounded-xl hover:opacity-90 transition duration-200 hover:-translate-y-0.5 active:scale-[0.97] shadow-warm-md"
                  >
                    Sign up
                  </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-[var(--foreground)] cursor-pointer"
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
            className="fixed inset-0 z-[60] bg-[var(--background)]/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col h-full px-6 pt-6 pb-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <a
                  href="/"
                  className="font-sans text-lg font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  BforC Careers
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[var(--foreground)]"
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
                      className="font-sans text-2xl font-medium text-[var(--foreground)] py-3 block hover:text-[var(--primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="mt-auto flex flex-col gap-3">
                {user ? (
                  <>
                    {user.role === "employer" ? (
                      <>
                        <Link
                          href="/employers/dashboard/profile"
                          onClick={() => setMobileOpen(false)}
                          className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                        >
                          Company Profile
                        </Link>
                        <Link
                          href="/employers/dashboard/billing"
                          onClick={() => setMobileOpen(false)}
                          className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                        >
                          Billing & Plan
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setMobileOpen(false)}
                          className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                        >
                          My Dashboard
                        </Link>
                        <Link
                          href="/dashboard/billing"
                          onClick={() => setMobileOpen(false)}
                          className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                        >
                          Billing & Plan
                        </Link>
                      </>
                    )}
                    {user.role === "seeker" && (
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                      >
                        My Profile
                      </Link>
                    )}
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-center py-3.5 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl font-sans font-medium text-sm transition-colors"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setMobileOpen(false)}
                        className="text-center py-3.5 bg-[var(--primary)] text-[var(--background)] rounded-xl font-sans font-medium text-sm shadow-warm-md hover:opacity-90 transition-opacity"
                      >
                        Sign up
                      </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
