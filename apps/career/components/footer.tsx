import Link from "next/link";
import { Mail } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/session";

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

const companyLinks = [
  { label: "About BforC",     href: "https://bforc.in/about" },
  { label: "Our services",    href: "https://bforc.in/services" },
  { label: "Our Partners",    href: "https://bforc.in/partners" },
  { label: "Contact",         href: "https://bforc.in/contact" },
];

const legalLinks = [
  { label: "Privacy Policy",   href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Anti-Harassment",  href: "/legal/anti-harassment" },
];

const publicSeekerLinks = [
  { label: "Find a role",    href: "/jobs" },
  { label: "View plans",     href: "/pricing" },
  { label: "Resume Upload",  href: "/signup" },
];

const authedSeekerLinks = [
  { label: "Browse Jobs",    href: "/jobs" },
  { label: "Pricing",        href: "/pricing" },
  { label: "Resume Upload",  href: "/profile" },
];

const employerLinks = [
  { label: "Post a Job",      href: "/employers" },
  { label: "Talent Search",   href: "/employers/search" },
  { label: "Employer Plans",  href: "/employers/pricing" },
];

export async function Footer() {
  const session = await getCurrentSession();
  const isLoggedIn = !!session;

  const seekerLinks = isLoggedIn ? authedSeekerLinks : publicSeekerLinks;
  const showEmployerColumn = !isLoggedIn || session?.role === "employer";

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
              A women-led platform where compassion meets careers. Working on connecting
              skilled talent with purpose-driven organisations that work for social impact.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--accent-color)] transition duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className={`grid grid-cols-2 gap-8 mb-12 ${showEmployerColumn ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
          <div>
            <p className="text-xs font-mono-dm tracking-widest uppercase text-white/40 mb-4">
              For Job Seekers
            </p>
            <ul className="flex flex-col gap-2.5">
              {seekerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {showEmployerColumn && (
            <div>
              <p className="text-xs font-mono-dm tracking-widest uppercase text-white/40 mb-4">
                For Employers
              </p>
              <ul className="flex flex-col gap-2.5">
                {employerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-mono-dm tracking-widest uppercase text-white/40 mb-4">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono-dm tracking-widest uppercase text-white/40 mb-4">
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
