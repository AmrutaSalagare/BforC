import { Search, Star, Building2, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { Reveal, StaggerReveal, StaggerItem, FadeIn, HoverTiltCard } from "@/components/motion";
import { getCompanies } from "@/lib/data/companies";
import type { Company } from "@/lib/data/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vetted Organisations",
  description: "Browse vetted NGOs, social enterprises, and corporate CSR programs on BforC Careers.",
};

const SECTORS = ["All", "NGO", "Social Enterprise", "Corporate CSR", "Research", "Healthcare", "Education"];

function CompanyInitials(name: string) {
  return name.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <HoverTiltCard className="h-full block">
      <Link
        href={`/companies/${company.slug}`}
        className="flex flex-col h-full bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:border-[var(--accent-color)]/30 cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--blush)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between gap-3 flex-wrap mb-5 relative z-10">
        <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[var(--blush)] to-white/50 border border-white flex items-center justify-center font-display text-xl font-medium text-[var(--primary)] shadow-sm">
          {CompanyInitials(company.name)}
        </div>
        {company.womenFriendly && (
          <span className="badge-women-friendly text-[10px] shrink-0">
            Women-Friendly
          </span>
        )}
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-lg font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--accent-color)] transition-colors">
          {company.name}
        </h3>
        <p className="text-xs text-[var(--muted-fg)] mt-1">
          {company.category}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
          <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
            <MapPin size={13} />
            {company.location}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between relative z-10">
        <span className="text-sm font-medium text-[var(--foreground)]">
          {company.openRoles}{" "}
          <span className="text-[var(--faint-fg)] font-normal">open roles</span>
        </span>
        <span className="text-[var(--primary)] bg-[var(--blush)] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
          <ExternalLink size={14} />
        </span>
        </div>
      </Link>
    </HoverTiltCard>
  );
}

  type CompaniesPageProps = {
  searchParams?: Promise<CompaniesRouteSearchParams>;
};

type CompaniesRouteSearchParams = {
  q?: string;
  sector?: string;
};

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  const params = (await searchParams) ?? {};
  const { companies } = await getCompanies({ q: params.q });
  const activeSector = params.sector ?? "All";
  const filteredCompanies = activeSector === "All" ? companies : companies.filter((c) => c.category === activeSector);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <p className="eyebrow mb-4">Impact Organisations</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground)] mb-6 tracking-tight leading-tight text-balance">
            Work with teams that <span className="text-[var(--primary)] italic">care.</span>
          </h1>
          <p className="text-[var(--muted-fg)] text-lg max-w-2xl mx-auto mb-10">
            Discover NGOs, social enterprises, and impact-driven corporations
            vetted for their commitment to social change and inclusive workplaces.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="w-full max-w-xl relative">
          <Form action="/companies">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-[var(--faint-fg)]" />
            </div>
            {params.sector && params.sector !== "All" && (
              <input type="hidden" name="sector" value={params.sector} />
            )}
            <input
              name="q"
              type="text"
              defaultValue={params.q}
              placeholder="Search by name, sector, or city..."
              className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] outline-none text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:border-[var(--primary)]/50 transition-colors"
            />
          </Form>
        </Reveal>

        {/* Sector filter chips */}
        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-2 mt-4">
          {SECTORS.map((sector) => (
            <Link
              key={sector}
              href={sector === "All" ? "/companies" : `/companies?sector=${encodeURIComponent(sector)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeSector === sector
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                  : "bg-white/40 text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)]"
              }`}
            >
              {sector}
            </Link>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mb-6 text-sm text-[var(--muted-fg)] font-medium">
        Showing {filteredCompanies.length} organisation{filteredCompanies.length === 1 ? "" : "s"}{activeSector !== "All" ? ` in ${activeSector}` : ""}

      </Reveal>

      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
        stagger={0.06}
      >
        {filteredCompanies.map((company) => (
          <StaggerItem key={company.id} className="h-full flex flex-col">
            <CompanyCard company={company} />
          </StaggerItem>
        ))}
      </StaggerReveal>

      <FadeIn
        delay={0.3}
        className="mt-20 text-center bg-gradient-to-r from-transparent via-[var(--blush)]/30 to-transparent py-16 rounded-3xl border border-white/20"
      >
        <h2 className="font-display text-3xl text-[var(--foreground)] mb-4">
          Are you an impact organisation?
        </h2>
        <p className="text-[var(--muted-fg)] max-w-xl mx-auto mb-8">
          Join our curated network of NGOs and social enterprises to find
          passionate, purpose-driven talent.
        </p>
        <Link
          href="/signup?role=employer"
          className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors"
        >
          <Building2 size={18} />
          Create Employer Profile
        </Link>
      </FadeIn>
    </main>
  );
}
