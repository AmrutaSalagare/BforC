import { JobsSearchPage } from "@/components/jobs-search-page";
import { getJobs } from "@/lib/data/jobs";

type JobsRouteSearchParams = {
  q?: string;
  location?: string;
  remote?: string;
  type?: string;
};

type JobsPageProps = {
  searchParams?: Promise<JobsRouteSearchParams>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = (await searchParams) ?? {};
  const { jobs, source } = await getJobs({
    q: params.q,
    location: params.location,
    type: params.type,
    remoteOnly: params.remote === "true",
  });

  return (
    <JobsSearchPage
      jobs={jobs}
      query={params.q}
      location={params.location}
      source={source}
    />
  );
}
