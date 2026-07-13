"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getEmployerProfile } from "@/lib/data/employer";
import { cleanText, isUuid, normalizeOptionalUrl, readFormString } from "@/lib/validation";

export type ProfileActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function saveEmployerProfileAction(
  _state: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") redirect("/login");

  const companyName = cleanText(readFormString(formData, "company_name"), 140);
  if (companyName.length < 2) {
    return { status: "error", message: "Organization name must be at least 2 characters." };
  }

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const existing = await getEmployerProfile(session.userId, session.accessToken);
  const generatedSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = (existing?.slug ?? generatedSlug) || `organization-${session.userId.slice(0, 8)}`;

  const websiteResult = normalizeOptionalUrl(readFormString(formData, "website_url"), "Website URL");
  if (!websiteResult.ok) return { status: "error", message: websiteResult.message };

  const body: Record<string, unknown> = {
    user_id: session.userId,
    company_name: companyName,
    slug,
    sector: cleanText(readFormString(formData, "sector"), 80) || "Social Impact",
    location: cleanText(readFormString(formData, "location"), 120) || "India",
    description: readFormString(formData, "description").slice(0, 2000).trim() || null,
  };

  if (websiteResult.value) body.website_url = websiteResult.value;

  let res: Response;

  if (existing?.id) {
    const params = new URLSearchParams({ id: `eq.${existing.id}` });
    res = await fetch(`${config.url}/rest/v1/employer_profiles?${params}`, {
      method: "PATCH",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(`${config.url}/rest/v1/employer_profiles`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });
  }

  if (!res.ok) {
    return { status: "error", message: "We encountered a temporary connection issue while saving your profile. Please try again in a few moments." };
  }

  return { status: "success", message: "Company profile saved." };
}

export async function requestVerificationAction(
  _state: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") redirect("/login");

  const employerId = formData.get("employer_id") as string;
  if (!employerId || !isUuid(employerId)) return { status: "error", message: "Invalid employer ID." };

  const config = getSupabaseConfig();
  if (!config.ok) return { status: "error", message: config.reason };

  const existing = await getEmployerProfile(session.userId, session.accessToken);
  if (!existing?.id || existing.id !== employerId) {
    return { status: "error", message: "You can only request verification for your own company profile." };
  }

  if (existing.is_verified) {
    return { status: "success", message: "Your company profile is already verified." };
  }

  const params = new URLSearchParams({ id: `eq.${employerId}`, user_id: `eq.${session.userId}` });
  const res = await fetch(`${config.url}/rest/v1/employer_profiles?${params}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      verification_requested_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error("Verification Request Error:", await res.text());
    return { status: "error", message: "Failed to request verification. Please try again." };
  }

  return { status: "success", message: "Verification requested successfully! An admin will review your profile." };
}

export async function uploadLogoAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const session = await getCurrentSession();
  if (!session?.userId || session.role !== "employer") return { error: "Unauthorized" };

  const file = formData.get("logo") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };

  if (file.size > 2 * 1024 * 1024) {
    return { error: "File too large. Maximum 2 MB." };
  }

  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(file.type)) {
    return { error: "Invalid format. Use PNG, JPEG, or WebP." };
  }

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isWebp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  if (!isPng && !isJpeg && !isWebp) {
    return { error: "Invalid image file. Use a real PNG, JPEG, or WebP image." };
  }

  const config = getSupabaseConfig();
  if (!config.ok) return { error: config.reason };

  const dataUrl = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;

  const existing = await getEmployerProfile(session.userId, session.accessToken);
  if (!existing?.id) return { error: "Save your company profile first." };

  const params = new URLSearchParams({ id: `eq.${existing.id}` });
  const res = await fetch(`${config.url}/rest/v1/employer_profiles?${params}`, {
    method: "PATCH",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ logo_url: dataUrl }),
  });

  if (!res.ok) {
    return { error: "Failed to save logo." };
  }

  return { url: dataUrl };
}
