"use server";

import { redirect } from "next/navigation";
import { clearAuthCookies, setAuthCookies } from "@/lib/auth/session";
import { signInWithPassword, signUpWithPassword } from "@/lib/auth/supabase-rest";
import { getSupabaseConfig } from "@/lib/data/supabase";
import type { AuthActionState, UserRole } from "@/lib/auth/types";
import { sendWelcomeEmail } from "@/lib/email/triggers/welcome";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLogin(formData: FormData) {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");
  const role = readString(formData, "role") as UserRole;
  const fieldErrors: AuthActionState["fieldErrors"] = {};

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    fieldErrors.email = "Email address is too long.";
  }

  if (!password) {
    fieldErrors.password = "Enter your password.";
  } else if (password.length > 128) {
    fieldErrors.password = "Password is too long.";
  }

  if (role !== "seeker" && role !== "employer") {
    fieldErrors.role = "Select whether you are a job seeker or employer.";
  }

  return {
    email,
    password,
    role,
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  };
}

function validateSignup(formData: FormData) {
  const fullName = readString(formData, "fullName");
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");
  const role = readString(formData, "role") as UserRole;
  const fieldErrors: AuthActionState["fieldErrors"] = {};

  if (fullName.length < 2) {
    fieldErrors.fullName = "Enter your full name.";
  } else if (fullName.length > 120) {
    fieldErrors.fullName = "Full name must be 120 characters or fewer.";
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    fieldErrors.email = "Email address is too long.";
  }

  if (password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  } else if (password.length > 128) {
    fieldErrors.password = "Password is too long.";
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    fieldErrors.password = "Password must include at least one letter and one number.";
  }

  if (role !== "seeker" && role !== "employer") {
    fieldErrors.role = "Choose whether you are a job seeker or employer.";
  }

  return {
    fullName,
    email,
    password,
    role,
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  };
}

export async function loginAction(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validated = validateLogin(formData);

  if (!validated.isValid) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validated.fieldErrors,
    };
  }

  const result = await signInWithPassword(validated.email, validated.password);

  if (!result.ok) {
    let errorMessage = result.message;
    if (errorMessage.includes("invalid_credentials") || errorMessage.includes("Invalid login credentials")) {
      errorMessage = "The email or password you entered is incorrect.";
    } else if (errorMessage.includes("{")) {
      errorMessage = "An error occurred during sign in. Please try again.";
    }

    return {
      status: "error",
      message: errorMessage,
    };
  }

  if (!result.data.access_token || !result.data.user) {
    return {
      status: "error",
      message: "Login succeeded, but no session token or user was returned.",
    };
  }

  const storedRole = result.data.user?.user_metadata?.role ?? "seeker";
  const selectedRole = validated.role;

  // STRICT CHECK: Is this user in the super_admins table?
  const config = getSupabaseConfig();
  if (config.ok) {
    const adminCheck = await fetch(`${config.url}/rest/v1/super_admins?id=eq.${result.data.user.id}&select=id`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });

    if (adminCheck.ok) {
      const admins = await adminCheck.json();
      if (admins && admins.length > 0) {
        return {
          status: "error",
          message: "Admin accounts must use the dedicated Admin Portal (/admin/login).",
        };
      }
    }
  }

  if (storedRole !== selectedRole) {
    const label = storedRole === "employer" ? "an employer" : "a job seeker";
    return {
      status: "error",
      message: `This account is registered as ${label}. Select "${storedRole === "employer" ? "Employer" : "Job Seeker"}" to sign in.`,
    };
  }

  await setAuthCookies({
    accessToken: result.data.access_token,
    refreshToken: result.data.refresh_token,
    expiresIn: result.data.expires_in,
    userId: result.data.user?.id,
    role: storedRole,
  });

  if (storedRole === "employer") {
    redirect("/employers/dashboard");
  }
  redirect("/dashboard");
}

export async function signupAction(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validated = validateSignup(formData);

  if (!validated.isValid) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validated.fieldErrors,
    };
  }

  const result = await signUpWithPassword({
    fullName: validated.fullName,
    email: validated.email,
    password: validated.password,
    role: validated.role,
  });

  if (!result.ok) {
    let errorMessage = result.message;
    if (errorMessage.includes("user_already_exists") || errorMessage.includes("User already registered")) {
      errorMessage = "An account with this email already exists.";
    } else if (errorMessage.includes("{")) {
      errorMessage = "An error occurred during sign up. Please try again.";
    }

    return {
      status: "error",
      message: errorMessage,
    };
  }

  const serverRole = result.data.user?.user_metadata?.role;
  const userConfirmed = result.data.user?.confirmed_at;
  const identities = result.data.user?.identities;
  const hasNoIdentities = Array.isArray(identities) && identities.length === 0;
  const loginRedirect = `/login?email=${encodeURIComponent(validated.email)}&registered=true`;

  if (!result.data.access_token) {
    if (hasNoIdentities) {
      redirect(loginRedirect);
    }
    if (serverRole && serverRole !== validated.role) {
      redirect(loginRedirect);
    }
    if (userConfirmed) {
      redirect(loginRedirect);
    }
    redirect(loginRedirect);
  }

  const role = serverRole ?? validated.role;

  await setAuthCookies({
    accessToken: result.data.access_token,
    refreshToken: result.data.refresh_token,
    expiresIn: result.data.expires_in,
    userId: result.data.user?.id,
    role,
  });

  // Create employer profile stub on first signup
  if (role === "employer" && result.data.user?.id) {
    const config = getSupabaseConfig();
    if (config.ok) {
      fetch(`${config.url}/rest/v1/employer_profiles`, {
        method: "POST",
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${result.data.access_token}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          user_id: result.data.user.id,
          company_name: validated.fullName,
          slug: validated.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `organization-${result.data.user.id.slice(0, 8)}`,
        }),
      }).catch(() => {});
    }
  }

  // Send welcome email (fire-and-forget — never blocks signup)
  sendWelcomeEmail({
    to: validated.email,
    userName: validated.fullName,
    role: role as "seeker" | "employer",
  }).catch(() => {});

  if (role === "employer") {
    redirect("/employers/dashboard");
  }
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login");
}
