"use server";

import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { setAuthCookies } from "@/lib/auth/session";

export async function adminLoginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return redirect("/admin/login?message=Email and password are required");
  }

  const config = getSupabaseConfig();
  if (!config.ok) {
    return redirect(`/admin/login?message=${encodeURIComponent(config.reason)}`);
  }

  // Use the REST API to authenticate via Supabase Auth
  const res = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return redirect(`/admin/login?message=${encodeURIComponent(data.error_description || data.msg || "Authentication failed")}`);
  }

  // STRICT CHECK: Query the super_admins table
  const adminCheck = await fetch(`${config.url}/rest/v1/super_admins?id=eq.${data.user.id}&select=id`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  if (!adminCheck.ok) {
    return redirect("/admin/login?message=Error verifying admin privileges.");
  }

  const admins = await adminCheck.json();

  if (!admins || admins.length === 0) {
    return redirect("/admin/login?message=Access Denied: You are not in the super_admins table.");
  }

  // Create session
  await setAuthCookies({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    userId: data.user?.id,
    role: "admin",
  });

  // Redirect to protected dashboard
  redirect("/admin");
}
