import { fetchSupabaseRows } from "@/lib/data/supabase";
import { Building2, MapPin, Star, Globe, Users, ShieldCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal, MagneticButton } from "@/components/motion";
import { notFound } from "next/navigation";
import { seedCompanies, seedJobs } from "@/lib/data/seed";

type SupabaseEmployerRow = {
  id: string;
  company_name?: string;
  slug?: string;
  sector?: string;
  location?: string;
  description?: string | null;
  logo_url?: string | null;
  women_friendly?: boolean;
  women_friendly_rating?: number;
  is_verified?: boolean;
  open_roles?: number;
  jobs?: { count: number }[];
};

async function getCompanyBySlug(slug: string): Promise<(SupabaseEmployerRow & { openRoles: number }) | null> {
  const params = new URLSearchParams({ slug: `eq.${slug}`, select: "*,jobs(count)", limit: "1" });
  const result = await fetchSupabaseRows<SupabaseEmployerRow>("employer_profiles", params);
  if (!result.ok || result.data.length === 0) {
    const company = seedCompanies.find(c => c.slug === slug);
    if (!company) return null;
    const companyJobsCount = seedJobs.filter(j => j.company === company.name).length;
    return {
      id: company.id,
      company_name: company.name,
      slug: company.slug,
      sector: company.category,
      location: company.location,
      description: `This is a sample description for ${company.name}, a vetted organization partnering with BrainsForCompassion. We specialize in ${company.category} and are dedicated to providing positive, inclusive environments for female professionals.`,
      logo_url: null,
      women_friendly: company.womenFriendly,
      women_friendly_rating: company.rating,
      is_verified: true,
      open_roles: company.openRoles || companyJobsCount,
      openRoles: company.openRoles || companyJobsCount,
    };
  }
  const row = result.data[0];
  let openRoles = row.open_roles ?? 0;
  if (row.jobs && row.jobs.length > 0) openRoles = row.jobs[0].count;
  return { ...row, openRoles };
}

function CompanyInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  return {
    title: company ? (company.company_name ?? "Organisation") : "Organisation",
    description: company?.description ?? "View open roles and learn more about this organisation on BforC Careers.",
  };
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  const name = company.company_name ?? "Organisation";
  const rating = company.women_friendly_rating ?? 0;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Reveal className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[var(--accent)] flex items-center justify-center font-display text-3xl font-medium text-[var(--primary)] shrink-0 shadow-warm-sm">
              {company.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={company.logo_url} alt={`${name} logo`} className="w-full h-full object-contain p-2 rounded-2xl" />
              ) : CompanyInitials(name)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-medium text-[var(--foreground)]">{name}</h1>
                {company.is_verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
                {company.women_friendly && (
                  <span className="badge-women-friendly">Women-Friendly</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                {company.location && (
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {company.location}</span>
                )}
                {company.sector && (
                  <span className="flex items-center gap-1.5"><Building2 size={14} /> {company.sector}</span>
                )}
                {rating > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star size={14} className="fill-[var(--primary)] text-[var(--primary)]" /> {rating.toFixed(1)} Women-Friendly Rating
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.1} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, label: "Open Roles", value: `${company.openRoles}` },
            { icon: Globe, label: "Sector", value: company.sector ?? "Social Impact" },
            { icon: MapPin, label: "Location", value: company.location ?? "India" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/40 dark:bg-[var(--card)] backdrop-blur-md rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-1">
                <Icon size={14} />
                <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
              </div>
              <p className="font-semibold text-[var(--foreground)]">{value}</p>
            </div>
          ))}
        </Reveal>

        {/* About */}
        {company.description && (
          <Reveal delay={0.15} className="bg-white/40 dark:bg-[var(--card)] backdrop-blur-md rounded-2xl border border-[var(--border)] p-8 mb-8">
            <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-4">About {name}</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-base">{company.description}</p>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal delay={0.2} className="flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Link
              href={`/jobs?q=${encodeURIComponent(name)}`}
              className="group inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-[var(--foreground)] hover:shadow-warm-md hover:-translate-y-1"
            >
              View Open Roles
              <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              ← All Organisations
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </main>
  );
}
