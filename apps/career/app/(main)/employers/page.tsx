import Link from "next/link";
import { Building2, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";

export const metadata = {
  title: "For Employers — BforC Careers",
  description: "Find passionate, purpose-driven talent for your NGO or social enterprise.",
};

const features = [
  {
    icon: Users,
    title: "Access Curated Talent",
    body: "Connect with thousands of skilled, purpose-driven professionals actively seeking roles in social impact.",
    color: "var(--blush)",
  },
  {
    icon: ShieldCheck,
    title: "Verified Organisation Profile",
    body: "Build trust with job seekers by showcasing your women-friendly policies, culture, and benefits.",
    color: "var(--mint)",
  },
  {
    icon: Building2,
    title: "Post & Manage Roles",
    body: "Publish openings, review applications, and manage your talent pipeline — all in one place.",
    color: "var(--lavender)",
  },
];

export default function EmployersPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">For Organisations</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-tight text-[var(--foreground)] mb-6">
            Find talent that <em className="not-italic text-[var(--primary)]">cares</em>
          </h1>
          <p className="text-[var(--muted-fg)] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            BforC Careers connects NGOs, social enterprises, and impact-driven
            organisations with passionate professionals ready to make a difference.
          </p>

          <div className="inline-flex items-center gap-2 bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 text-[var(--accent-color)] px-5 py-2.5 rounded-full text-sm font-medium">
            Employer portal launching soon
          </div>
        </Reveal>

        {/* Feature cards */}
        <StaggerReveal className="grid md:grid-cols-3 gap-6 mb-16" stagger={0.1}>
          {features.map(({ icon: Icon, title, body, color }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col gap-4 p-7 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 h-full">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: color + "55" }}
                >
                  <Icon size={20} className="text-[var(--foreground)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--foreground)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* CTA */}
        <Reveal className="text-center bg-gradient-to-r from-transparent via-[var(--blush)]/30 to-transparent py-14 rounded-3xl border border-white/20">
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-3">
            Interested in posting on BforC Careers?
          </h2>
          <p className="text-[var(--muted-fg)] text-sm mb-7 max-w-md mx-auto">
            We&apos;re onboarding a select group of impact organisations early.
            Reach out and we&apos;ll get you set up.
          </p>
          <Link
            href="mailto:brainsforcompassion@gmail.com?subject=Employer%20Enquiry%20-%20BforC%20Careers"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
