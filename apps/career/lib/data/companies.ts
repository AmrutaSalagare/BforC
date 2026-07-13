import { fetchSupabaseRows } from "@/lib/data/supabase";
import type { Company, CompanyQuery } from "@/lib/data/types";
import { seedCompanies } from "./seed";

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
  logo_url?: string | null;
  jobs?: { count: number }[];
  is_verified?: boolean;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function cleanFilterTerm(value: string) {
  return value.replace(/[^\p{L}\p{N}\s.-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

function mapCompanyRow(row: SupabaseCompanyRow): Company {
  const name = row.company_name ?? row.name ?? "BforC Partner";
  const rating = row.women_friendly_rating ?? row.rating ?? 0;
  
  // Extract count from jobs(count) join
  let openRoles = row.open_roles ?? 0;
  if (row.jobs && row.jobs.length > 0) {
    openRoles = row.jobs[0].count;
  }

  return {
    id: row.id,
    name,
    slug: row.slug ?? slugify(name),
    rating,
    openRoles,
    womenFriendly: row.women_friendly ?? rating >= 4.5,
    location: row.location ?? "India",
    category: row.sector ?? row.category ?? "Social Impact",
    logoUrl: row.logo_url ?? null,
    isVerified: Boolean(row.is_verified),
  };
}

export async function getCompanies(query: CompanyQuery = {}) {
  const params = new URLSearchParams();
  params.set("select", "*,jobs(count)");
  params.set("order", "company_name.asc");
  params.set("limit", String(query.limit ?? 50));

  const q = query.q ? cleanFilterTerm(query.q) : "";
  if (q) {
    params.set("or", `(company_name.ilike.*${q}*,sector.ilike.*${q}*,location.ilike.*${q}*)`);
  }

  const result = await fetchSupabaseRows<SupabaseCompanyRow>(
    "employer_profiles",
    params
  );
  if (!result.ok) {
    let filteredCompanies = [...seedCompanies];
    const q = query.q ? cleanFilterTerm(query.q).toLowerCase() : "";
    if (q) {
      filteredCompanies = filteredCompanies.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q)
      );
    }
    return {
      companies: query.limit ? filteredCompanies.slice(0, query.limit) : filteredCompanies,
      source: "seed" as const,
    };
  }

  return {
    companies: query.limit ? result.data.slice(0, query.limit).map(mapCompanyRow) : result.data.map(mapCompanyRow),
    source: "supabase" as const,
  };
}

export async function getFeaturedCompanies(limit = 8) {
  return getCompanies({ limit });
}
