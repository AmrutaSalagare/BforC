import { HeroSection }         from "@/components/hero";
import { TrustedByMarquee }    from "@/components/trusted-by-marquee";
import { CategoriesSection }   from "@/components/categories";
import { FeaturedJobs }        from "@/components/featured-jobs";
import { CompaniesSection }    from "@/components/companies";
import { EmployerCTASection }  from "@/components/employer-cta";
import { TestimonialsSection } from "@/components/testimonials";
import { WhyBforCSection }     from "@/components/why-bforc";
import { ScrollProgressBar, PageTransition } from "@/components/motion";
import { getFeaturedCompanies } from "@/lib/data/companies";
import { getFeaturedJobs }      from "@/lib/data/jobs";
import { getCurrentSession }    from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getCurrentSession();
  if (session?.role === "employer") redirect("/employers/dashboard");
  if (session?.role === "seeker") redirect("/dashboard");

  const [{ jobs }, { companies }] = await Promise.all([
    getFeaturedJobs(6),
    getFeaturedCompanies(8),
  ]);

  const user = null;

  return (
    <PageTransition>
      <ScrollProgressBar />
      <main id="main-content">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--accent-color)] focus:text-[var(--on-accent)] focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>

        <HeroSection user={user} />
        <TrustedByMarquee />
        <CategoriesSection />
        <FeaturedJobs jobs={jobs} />
        <CompaniesSection companies={companies} />
        <WhyBforCSection />
        <TestimonialsSection />
        <EmployerCTASection />
      </main>
    </PageTransition>
  );
}
