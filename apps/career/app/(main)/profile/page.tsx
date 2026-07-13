import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getSeekerProfile } from "@/lib/data/profile";
import { ProfileForm } from "@/components/profile-form";

export const metadata = {
  title: "My Profile",
};

function getFullNameFromToken(token: string): string {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8")
    );
    return (payload?.user_metadata?.full_name as string) ?? "";
  } catch {
    return "";
  }
}

export default async function ProfilePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  if (session.role === "employer") redirect("/employers/dashboard/profile");

  const [profile] = await Promise.all([
    session.userId
      ? getSeekerProfile(session.userId, session.accessToken)
      : Promise.resolve(null),
  ]);

  const fullName = getFullNameFromToken(session.accessToken);

  return <ProfileForm profile={profile} fullName={fullName} />;
}
