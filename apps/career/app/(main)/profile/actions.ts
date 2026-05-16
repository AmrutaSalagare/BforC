"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { upsertSeekerProfile, computeProfileStrength } from "@/lib/data/profile";

export type ProfileActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialProfileState: ProfileActionState = { status: "idle" };

export async function saveProfileAction(
  _state: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await getCurrentSession();
  if (!session?.userId) redirect("/login");

  const full_name = (formData.get("full_name") as string ?? "").trim();
  if (full_name.length < 2) {
    return { status: "error", message: "Full name must be at least 2 characters." };
  }

  const str = (key: string) => (formData.get(key) as string ?? "").trim() || null;
  const title              = str("title");
  const location           = str("location");
  const phone              = str("phone");
  const experience_summary = str("experience_summary");
  const education_summary  = str("education_summary");
  const linkedin_url       = str("linkedin_url");
  const website_url        = str("website_url");
  const skills = (formData.get("skills") as string ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const profile_strength = computeProfileStrength({
    full_name, title, location, phone,
    experience_summary, education_summary, skills, linkedin_url,
  });

  const result = await upsertSeekerProfile(
    {
      user_id: session.userId,
      full_name,
      title,
      location,
      phone,
      linkedin_url,
      website_url,
      skills,
      experience_summary,
      education_summary,
      resume_url: null,
      profile_strength,
    },
    session.accessToken
  );

  if (!result.ok) {
    return { status: "error", message: result.message ?? "Could not save profile. Try again." };
  }

  return { status: "success", message: "Profile saved." };
}
