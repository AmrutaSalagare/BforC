import type { JobType } from "@/lib/data/types";

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Volunteer"] as const;
export const JOB_STATUSES = ["draft", "active", "paused", "closed"] as const;
export const APPLICATION_STATUSES = ["submitted", "reviewing", "shortlisted", "rejected", "withdrawn"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];
export type SalaryPeriod = "annual_inr" | "monthly_inr" | "annual_lpa";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_ANNUAL_SALARY_INR = 100_000_000;

export function readFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export function parseJobStatus(value: string): JobStatus | null {
  return JOB_STATUSES.includes(value as JobStatus) ? (value as JobStatus) : null;
}

export function parseJobType(value: string): JobType | null {
  return JOB_TYPES.includes(value as JobType) ? (value as JobType) : null;
}

export function cleanText(value: string, maxLength: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizeOptionalUrl(value: string, label: string): ValidationResult<string | null> {
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: null };

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { ok: false, message: `${label} must start with http:// or https://.` };
    }
    return { ok: true, value: url.href };
  } catch {
    return { ok: false, message: `Enter a valid ${label.toLowerCase()}.` };
  }
}

export function normalizeOptionalPhone(value: string): ValidationResult<string | null> {
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: null };

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return { ok: false, message: "Enter a valid phone number." };
  }
  if (!/^[+\d][\d\s().-]+$/.test(trimmed)) {
    return { ok: false, message: "Phone number can only contain digits, spaces, +, -, and parentheses." };
  }
  return { ok: true, value: trimmed };
}

export function parseSkills(value: string): string[] {
  const seen = new Set<string>();
  const skills: string[] = [];

  for (const raw of value.split(",")) {
    const skill = cleanText(raw, 40);
    const key = skill.toLowerCase();
    if (!skill || seen.has(key)) continue;
    seen.add(key);
    skills.push(skill);
    if (skills.length >= 30) break;
  }

  return skills;
}

function parseSalaryNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return NaN;
  return parsed;
}

export function normalizeSalaryRange(formData: FormData): ValidationResult<{ salaryMin: number; salaryMax: number }> {
  const period = readFormString(formData, "salary_period") as SalaryPeriod;
  const salaryPeriod: SalaryPeriod =
    period === "monthly_inr" || period === "annual_lpa" || period === "annual_inr" ? period : "annual_inr";

  const rawMin = parseSalaryNumber(readFormString(formData, "salary_min"));
  const rawMax = parseSalaryNumber(readFormString(formData, "salary_max"));

  if (rawMin === null && rawMax === null) {
    return { ok: true, value: { salaryMin: 0, salaryMax: 0 } };
  }

  if (rawMin === null || rawMax === null) {
    return { ok: false, message: "Enter both minimum and maximum salary, or leave both blank." };
  }

  if (Number.isNaN(rawMin) || Number.isNaN(rawMax) || rawMin < 0 || rawMax < 0) {
    return { ok: false, message: "Salary must be a valid positive number." };
  }

  const multiplier = salaryPeriod === "monthly_inr" ? 12 : salaryPeriod === "annual_lpa" ? 100_000 : 1;
  const salaryMin = Math.round(rawMin * multiplier);
  const salaryMax = Math.round(rawMax * multiplier);

  if (salaryMin === 0 && salaryMax === 0) {
    return { ok: true, value: { salaryMin: 0, salaryMax: 0 } };
  }

  if (salaryMin <= 0 || salaryMax <= 0) {
    return { ok: false, message: "Salary must be greater than zero, or leave both salary fields blank." };
  }

  if (salaryMin > salaryMax) {
    return { ok: false, message: "Minimum salary must be less than or equal to maximum salary." };
  }

  if (salaryMax > MAX_ANNUAL_SALARY_INR) {
    return { ok: false, message: "Salary looks too high. Enter annual INR, monthly INR, or LPA using the salary period selector." };
  }

  return { ok: true, value: { salaryMin, salaryMax } };
}

export function parseJobForm(formData: FormData): ValidationResult<{
  title: string;
  jobType: JobType;
  location: string;
  status: JobStatus;
  salaryMin: number;
  salaryMax: number;
  womenFriendly: boolean;
  description: string;
  tags: string[];
}> {
  const title = cleanText(readFormString(formData, "title"), 120);
  if (title.length < 3) return { ok: false, message: "Job title must be at least 3 characters." };

  const jobType = parseJobType(readFormString(formData, "job_type"));
  if (!jobType) return { ok: false, message: "Select a valid job type." };

  const location = cleanText(readFormString(formData, "location"), 120);
  if (location.length < 2) return { ok: false, message: "Location is required." };

  const status = parseJobStatus(readFormString(formData, "status") || "active");
  if (!status) return { ok: false, message: "Invalid job status." };

  const description = readFormString(formData, "description").slice(0, 5000);
  if (description.length < 30) {
    return { ok: false, message: "Job description must be at least 30 characters." };
  }

  const salary = normalizeSalaryRange(formData);
  if (!salary.ok) return salary;

  const tags = readFormString(formData, "requirements")
    .split("\n")
    .map((item) => cleanText(item, 80))
    .filter(Boolean)
    .slice(0, 20);

  return {
    ok: true,
    value: {
      title,
      jobType,
      location,
      status,
      salaryMin: salary.value.salaryMin,
      salaryMax: salary.value.salaryMax,
      womenFriendly: readFormString(formData, "women_friendly") === "true",
      description,
      tags,
    },
  };
}
