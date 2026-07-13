import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion";
import { getCurrentSession } from "@/lib/auth/session";
import { getAllSeekerProfiles } from "@/lib/data/profile";
import { TalentSearchClient } from "./TalentSearchClient";

export const metadata = {
  title: "Talent Search",
  description: "Search our curated pool of purpose-driven, soft-skills-trained women professionals.",
};

const filters = [
  { icon: Briefcase,     label: "Role / Function",   examples: "Marketing, Engineering, Finance" },
  { icon: GraduationCap, label: "Skill Level",        examples: "Entry, Mid, Senior, Leadership" },
  { icon: MapPin,        label: "Location",           examples: "Mumbai, Delhi, Bengaluru, Remote" },
  { icon: Sparkles,      label: "Training Status",    examples: "Academy Graduate, Mentorship Alumni" },
];

export default async function TalentSearchPage() {
  const session = await getCurrentSession();
  if (session?.role !== "employer") redirect("/employers");

  const profiles = await getAllSeekerProfiles(session.accessToken);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Reveal className="mb-12">
          <p className="eyebrow mb-4">For Employers</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-light text-[var(--foreground)] leading-tight mb-4">
                Find the right talent
              </h1>
              <p className="text-[var(--muted-fg)] text-lg max-w-xl leading-relaxed">
                Search our curated pool of purpose-driven women professionals — all vetted, many academy-trained, and ready to contribute from day one.
              </p>
            </div>
            <Link
              href="mailto:brainsforcompassion@gmail.com?subject=Talent+Search+Access+Request"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-6 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Request full access <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <TalentSearchClient profiles={profiles} />



      </div>
    </main>
  );
}
