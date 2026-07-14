"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const CAREER_SITE_URL = process.env.NEXT_PUBLIC_CAREER_SITE_URL || "/career";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#ede5f0] text-[#2d1a3a] pt-20 pb-10 px-8 relative z-10 border-t border-[#d4c0e0]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Info Column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-28 flex items-center">
              <Image
                alt="BforC Logo"
                src="/logo_bforc.png"
                fill
                sizes="(max-width: 768px) 100vw, 112px"
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-xs text-[#5a3e72] leading-relaxed max-w-xs font-light">
            &ldquo;Brains for Compassion is an all-women organisation with a strong focus on supporting like-minded organisations to bring a positive change across the globe.&rdquo;
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/company/brains-for-compassion/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7a5a90] hover:text-[var(--primary)] hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/brainsforcompassion/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7a5a90] hover:text-[var(--primary)] hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="text-[#7a5a90] hover:text-[var(--primary)] hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8a6aaa] font-mono-dm">
            Navigation
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-[#4a2e60]">
            <li>
              <a href={CAREER_SITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors duration-200 flex items-center gap-1">
                BforC Careers <ArrowUpRight size={11} className="text-[var(--primary)]" />
              </a>
            </li>
            <li>
              <Link href="/story" className="hover:text-[var(--primary)] transition-colors duration-200">
                About us
              </Link>
            </li>
            <li>
              <Link href="/#benefits" className="hover:text-[var(--primary)] transition-colors duration-200">
                Member benefits
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-[var(--primary)] transition-colors duration-200">
                Pricing plans
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Career Resources */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8a6aaa] font-mono-dm">
            Career Portal
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-[#4a2e60]">
            <li>
              <a
                href={`${CAREER_SITE_URL}/jobs`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors duration-200"
              >
                Browse Jobs
              </a>
            </li>
            <li>
              <a
                href={`${CAREER_SITE_URL}/signup`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors duration-200"
              >
                Upload Resume
              </a>
            </li>
            <li>
              <a href="mailto:brainsforcompassion@gmail.com" className="hover:text-[var(--primary)] transition-colors duration-200">
                Contact & Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8a6aaa] font-mono-dm">
            Contact Us
          </span>
          <div className="flex flex-col gap-3 text-sm text-[#4a2e60]">
            <a
              href="mailto:varsha@bforc.org"
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors duration-200"
            >
              <Mail size={14} className="text-[var(--primary)] shrink-0" />
              <span className="truncate">varsha@bforc.org</span>
            </a>
            <a
              href="mailto:jyothi@bforc.org"
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors duration-200"
            >
              <Mail size={14} className="text-[var(--primary)] shrink-0" />
              <span className="truncate">jyothi@bforc.org</span>
            </a>
            <a
              href="tel:+919461992263"
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors duration-200 text-xs"
            >
              <span className="text-[var(--primary)] font-semibold shrink-0">+91</span>
              <span>9461992263</span>
            </a>
            <div className="flex items-start gap-2 pt-2 border-t border-[#c4a8d8]">
              <MapPin size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
              <span className="leading-relaxed text-[11px] text-[#5a3e72]">
                F6, Mahaveer Nagar, Pal Link Road, Behind Kamla Nagar Hospital, Jodhpur, Rajasthan
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-5xl mx-auto pt-8 border-t border-[#c4a8d8] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#7a5a90] font-mono-dm">
        <div>
          <span>© {currentYear} BrainsForCompassion. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors duration-200">
            Privacy and cookie policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--primary)] transition-colors duration-200">
            Terms of use
          </Link>
          <Link href="/data-protection" className="hover:text-[var(--primary)] transition-colors duration-200">
            Data Protection
          </Link>
          <Link href="/anti-harassment" className="hover:text-[var(--primary)] transition-colors duration-200">
            Anti-Harassment (POSH)
          </Link>
        </div>
      </div>
    </footer>
  );
}
