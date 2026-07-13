import { JobsSearchPage } from "@/components/jobs-search-page";
import { getJobs } from "@/lib/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Jobs",
  description: "Search and apply for social impact, NGO, and women-friendly jobs on BforC Careers.",
};

type JobsRouteSearchParams = {
  q?: string;
  location?: string;
};

type JobsPageProps = {
  searchParams?: Promise<JobsRouteSearchParams>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = (await searchParams) ?? {};
  const { jobs } = await getJobs({
    q: params.q,
    location: params.location,
  });

  return (
    <JobsSearchPage
      jobs={jobs}
      query={params.q}
      location={params.location}
    />
  );
}
