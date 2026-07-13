import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth/session";

// Main marketing site URL — set NEXT_PUBLIC_MAIN_SITE_URL in Vercel env vars
const MAIN_SITE = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";

// Career app entry point as seen from the browser.
// When accessed via the main-app proxy: /career
// When accessed directly (e.g. localhost:3001): /
const CAREER_HOME = process.env.NEXT_PUBLIC_CAREER_HOME_PATH || "/career";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (session) {
    if (session.role === "employer") redirect("/employers/dashboard");
    redirect("/dashboard");
  }

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between">
        {/* Logo → main marketing site */}
        <a href={MAIN_SITE}>
          <Image
            src="/logo_bforc.png"
            alt="BforC Careers"
            width={140}
            height={40}
            className="h-9 w-auto mix-blend-multiply contrast-125"
            priority
          />
        </a>

        {/* Button → career app landing page (via proxy: /career) */}
        <Link
          href={CAREER_HOME}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/70 backdrop-blur-sm border border-white/80 text-[var(--foreground)] hover:bg-white hover:border-[var(--primary)]/20 hover:text-[var(--primary)] shadow-sm transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8M8 1h5m0 0v5m0-5L6 8" />
          </svg>
          BforC Careers
        </Link>
      </header>
      {children}
    </>
  );
}
