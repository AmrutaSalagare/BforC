import { fetchSupabaseRows } from "@/lib/data/supabase";
import { seedCompanies } from "@/lib/data/seed";
import type { Company, CompanyQuery } from "@/lib/data/types";

type SupabaseCompanyRow = {
  id: string;
  company_name?: string;
  name?: string;
  slug?: string;
  rating?: number;
  women_friendly_rating?: number;
  open_roles?: number;
  women_friendly?: boolean;
  location?: string;
  category?: string;
  sector?: string;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function mapCompanyRow(row: SupabaseCompanyRow): Company {
  const name = row.company_name ?? row.name ?? "BforC Partner";
  const rating = row.women_friendly_rating ?? row.rating ?? 0;

  return {
    id: row.id,
    name,
    slug: row.slug ?? slugify(name),
    rating,
    openRoles: row.open_roles ?? 0,
    womenFriendly: row.women_friendly ?? rating >= 4.5,
    location: row.location ?? "India",
    category: row.sector ?? row.category ?? "Social Impact",
  };
}

function filterSeedCompanies(companies: Company[], query: CompanyQuery) {
  const search = query.q?.trim().toLowerCase();

  if (!search) return companies;

  return companies.filter((company) => {
    const haystack = [
      company.name,
      company.location,
      company.category,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}

export async function getCompanies(query: CompanyQuery = {}) {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "company_name.asc");
  params.set("limit", String(query.limit ?? 50));

  if (query.q) {
    params.set("or", `(company_name.ilike.*${query.q}*,sector.ilike.*${query.q}*,location.ilike.*${query.q}*)`);
  }

  const result = await fetchSupabaseRows<SupabaseCompanyRow>(
    "employer_profiles",
    params
  );
  const companies = result.ok
    ? result.data.map(mapCompanyRow)
    : filterSeedCompanies(seedCompanies, query);

  return {
    companies: query.limit ? companies.slice(0, query.limit) : companies,
    source: result.ok ? ("supabase" as const) : ("seed" as const),
  };
}

export async function getFeaturedCompanies(limit = 8) {
  return getCompanies({ limit });
}
