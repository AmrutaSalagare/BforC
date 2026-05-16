import { HeroSection }         from "@/components/hero";
import { CategoriesSection }   from "@/components/categories";
import { FeaturedJobs }        from "@/components/featured-jobs";
import { CompaniesSection }    from "@/components/companies";
import { EmployerCTASection }  from "@/components/employer-cta";
import { TestimonialsSection } from "@/components/testimonials";
import { WhyBforCSection }     from "@/components/why-bforc";
import { getFeaturedCompanies } from "@/lib/data/companies";
import { getFeaturedJobs }      from "@/lib/data/jobs";
import { getCurrentSession }    from "@/lib/auth/session";

export default async function HomePage() {
  const [{ jobs }, { companies }, session] = await Promise.all([
    getFeaturedJobs(6),
    getFeaturedCompanies(8),
    getCurrentSession(),
  ]);

  const isLoggedIn = !!session;

  return (
    <main id="main-content">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--accent-color)] focus:text-[var(--on-accent)] focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <HeroSection />
      <CategoriesSection />
      <FeaturedJobs jobs={jobs} />
      <CompaniesSection companies={companies} />
      <EmployerCTASection />
      {!isLoggedIn && <WhyBforCSection />}
      <TestimonialsSection />
    </main>
  );
}
