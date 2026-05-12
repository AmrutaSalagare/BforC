import Link from "next/link";
import { Mail } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const socials = [
  { label: "LinkedIn",  Icon: LinkedInIcon,  href: "#" },
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "X",         Icon: XIcon,         href: "#" },
  { label: "Email",     Icon: Mail,          href: "mailto:brainsforcompassion@gmail.com" },
];

const footerLinks = {
  "For Job Seekers": [
    { label: "Browse Jobs",     href: "/jobs" },
    { label: "Companies",       href: "/companies" },
    { label: "Pricing",         href: "/pricing" },
    { label: "Resume Upload",   href: "/signup" },
  ],
  "For Employers": [
    { label: "Post a Job",      href: "/employers" },
    { label: "Talent Search",   href: "/employers/search" },
    { label: "Employer Plans",  href: "/employers/pricing" },
  ],
  "Company": [
    { label: "About BforC",     href: "https://bforc.in/about" },
    { label: "Our Partners",    href: "https://bforc.in/partners" },
    { label: "Contact",         href: "https://bforc.in/contact" },
  ],
  "Legal": [
    { label: "Privacy Policy",  href: "/legal/privacy" },
    { label: "Terms of Service",href: "/legal/terms" },
    { label: "Anti-Harassment", href: "/legal/anti-harassment" },
  ],
};

export function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ backgroundColor: "oklch(0.200 0.015 60)" }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top: Logo + tagline + social */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-12 pb-12 border-b border-white/10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-sm bg-[var(--accent-color)] flex items-center justify-center">
                <span className="font-display text-white text-sm font-medium">B</span>
              </div>
              <span className="font-display text-white/90 text-lg font-medium">BforC Careers</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Where compassion meets career. A women-led platform connecting purpose-driven talent with organisations that need them.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--accent-color)] transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-mono-dm tracking-widest uppercase text-white/40 mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
          <p className="text-xs text-white/30 font-mono-dm">
            Copyright {new Date().getFullYear()} BrainsForCompassion. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan | brainsforcompassion@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
