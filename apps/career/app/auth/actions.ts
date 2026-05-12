"use server";

import { redirect } from "next/navigation";
import { clearAuthCookies, setAuthCookies } from "@/lib/auth/session";
import { signInWithPassword, signUpWithPassword } from "@/lib/auth/supabase-rest";
import type { AuthActionState, UserRole } from "@/lib/auth/types";

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
  const fieldErrors: AuthActionState["fieldErrors"] = {};

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    fieldErrors.password = "Enter your password.";
  }

  return {
    email,
    password,
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
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
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
    return {
      status: "error",
      message: result.message,
    };
  }

  if (!result.data.access_token) {
    return {
      status: "error",
      message: "Login succeeded, but no session token was returned.",
    };
  }

  await setAuthCookies({
    accessToken: result.data.access_token,
    refreshToken: result.data.refresh_token,
    expiresIn: result.data.expires_in,
    userId: result.data.user?.id,
    role: result.data.user?.user_metadata?.role,
  });

  redirect("/");
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
    return {
      status: "error",
      message: result.message,
    };
  }

  if (!result.data.access_token) {
    return {
      status: "success",
      message:
        "Account created. Check your email to confirm your account before signing in.",
    };
  }

  await setAuthCookies({
    accessToken: result.data.access_token,
    refreshToken: result.data.refresh_token,
    expiresIn: result.data.expires_in,
    userId: result.data.user?.id,
    role: result.data.user?.user_metadata?.role ?? validated.role,
  });

  redirect("/");
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login");
}
