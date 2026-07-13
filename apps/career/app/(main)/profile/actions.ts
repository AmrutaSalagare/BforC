"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { upsertSeekerProfile, computeProfileStrength } from "@/lib/data/profile";
import { cleanText, normalizeOptionalPhone, normalizeOptionalUrl, parseSkills, readFormString } from "@/lib/validation";

export type ProfileActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function saveProfileAction(
  _state: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await getCurrentSession();
  if (!session?.userId) redirect("/login");
  if (session.role === "employer") {
    redirect("/employers/dashboard/profile");
  }

  const full_name = cleanText(readFormString(formData, "full_name"), 120);
  if (full_name.length < 2) {
    return { status: "error", message: "Full name must be at least 2 characters." };
  }

  const optionalText = (key: string, maxLength: number) => {
    const value = cleanText(readFormString(formData, key), maxLength);
    return value || null;
  };

  const phoneResult = normalizeOptionalPhone(readFormString(formData, "phone"));
  if (!phoneResult.ok) return { status: "error", message: phoneResult.message };

  const linkedinResult = normalizeOptionalUrl(readFormString(formData, "linkedin_url"), "LinkedIn URL");
  if (!linkedinResult.ok) return { status: "error", message: linkedinResult.message };

  const websiteResult = normalizeOptionalUrl(readFormString(formData, "website_url"), "Website URL");
  if (!websiteResult.ok) return { status: "error", message: websiteResult.message };

  const title = optionalText("title", 120);
  const location = optionalText("location", 120);
  const phone = phoneResult.value;
  const experience_summary = readFormString(formData, "experience_summary").slice(0, 3000).trim() || null;
  const education_summary = readFormString(formData, "education_summary").slice(0, 1500).trim() || null;
  const linkedin_url = linkedinResult.value;
  const website_url = websiteResult.value;
  const skills = parseSkills(readFormString(formData, "skills"));

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
