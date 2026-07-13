import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerProfile } from "@/lib/data/employer";
import { EmployerProfileForm } from "@/components/employer-profile-form";
import { EmployerVerificationCard } from "@/components/employer-verification-card";

export default async function EmployerCompanyProfile() {
  const session = await getCurrentSession();
  if (!session || session.role !== "employer") redirect("/login");

  const profile = await getEmployerProfile(session.userId!, session.accessToken);

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Company Profile</h2>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 sm:p-8">
        <EmployerProfileForm profile={profile} userId={session.userId!} />
      </div>

      {profile && profile.id && (
        <EmployerVerificationCard 
          employerId={profile.id}
          isVerified={profile.is_verified}
          verificationRequestedAt={profile.verification_requested_at}
        />
      )}
    </div>
  );
}
