"use client";

import { useActionState, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CheckBox } from "@/components/ui/checkbox";
import { createJobAction } from "./actions";

export function PostNewJobForm() {
  const [state, formAction, pending] = useActionState(createJobAction, { status: "idle" });
  const [womenFriendly, setWomenFriendly] = useState(false);
  const [salaryPeriod, setSalaryPeriod] = useState("annual_inr");
  const [salaryMin, setSalaryMin] = useState("");
  const [description, setDescription] = useState("");

  const salaryLabel =
    salaryPeriod === "monthly_inr"
      ? "Monthly salary in INR"
      : "Annual salary in INR";
  const minPlaceholder = salaryPeriod === "monthly_inr" ? "e.g. 30000" : "e.g. 360000";
  const maxPlaceholder = salaryPeriod === "monthly_inr" ? "e.g. 60000" : "e.g. 720000";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/employers/dashboard/jobs"
          className="p-2 -ml-2 text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-full"
          aria-label="Back to Jobs"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Post a New Job</h2>
          <p className="text-sm text-[var(--muted-fg)] mt-1">Fill out the details below to create a new job posting.</p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 sm:p-8">
        {state.message && (
          <p
            className={`mb-6 rounded-[4px] border px-3 py-2 text-xs font-medium ${
              state.status === "success"
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-[var(--destructive)]/20 bg-white/70 text-[var(--destructive)]"
            }`}
          >
            {state.message}
          </p>
        )}

        <form action={formAction} id="new-job-form" className="space-y-8">
          <input type="hidden" name="women_friendly" value={String(womenFriendly)} />

          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Program Manager, Social Worker"
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Type *</label>
                <select name="job_type" className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors" required>
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Bangalore, Remote, Hybrid"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Salary Period</label>
                <select
                  name="salary_period"
                  value={salaryPeriod}
                  onChange={(event) => setSalaryPeriod(event.target.value)}
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                >
                  <option value="annual_inr">Annual CTC (INR)</option>
                  <option value="monthly_inr">Monthly Salary (INR)</option>
                </select>
                <p className="text-xs text-[var(--muted-fg)] mt-1">Stored as annual INR for search and comparisons.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Minimum Salary *</label>
                <input
                  type="number"
                  name="salary_min"
                  min="0"
                  step="1"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder={minPlaceholder}
                  aria-describedby="new-job-salary-help"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Maximum Salary *</label>
                <input
                  type="number"
                  name="salary_max"
                  min={salaryMin || "0"}
                  step="1"
                  placeholder={maxPlaceholder}
                  aria-describedby="new-job-salary-help"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                  required
                />
              </div>
            </div>
            <p id="new-job-salary-help" className="text-xs text-[var(--muted-fg)] -mt-3">
              Use the same period for both values. Current entry mode: {salaryLabel}.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Job Details</h3>
            <div className="relative">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Description *</label>
              <textarea 
                name="description" 
                rows={5} 
                minLength={30} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, responsibilities, and impact... (Minimum 30 characters)" 
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors resize-none pb-8" 
                required 
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-medium tracking-wide">
                <span className={description.length < 30 ? "text-[var(--destructive)]" : "text-green-600"}>
                  {description.length}
                </span>
                <span className="text-[var(--faint-fg)]"> / 30 min</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Requirements</label>
              <textarea name="requirements" rows={4} placeholder="List skills, qualifications, or experience required..." className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors resize-none" />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Preferences & Tags</h3>
            <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-[var(--border)] bg-white/30 hover:bg-white/50 transition-colors">
              <div className="mt-0.5">
                <CheckBox checked={womenFriendly} onClick={() => setWomenFriendly((v) => !v)} color="var(--primary)" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">Women-Friendly Workplace</p>
                <p className="text-xs text-[var(--muted-fg)] mt-1">This role offers flexible hours, maternity benefits, or is specifically designed to support women in the workforce.</p>
              </div>
            </label>
          </section>

          <div className="pt-6 flex items-center justify-end gap-4 border-t border-[var(--border)]">
            <Link href="/employers/dashboard/jobs" className="px-6 py-2.5 rounded-[4px] text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
              Cancel
            </Link>
            <button type="submit" name="status" value="draft" disabled={pending} className="px-6 py-2.5 rounded-[4px] text-sm font-medium text-[var(--accent-color)] border border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50">
              {pending ? "Saving..." : "Save as Draft"}
            </button>
            <button type="submit" name="status" value="active" disabled={pending} className="bg-[var(--accent-color)] text-[var(--on-accent)] px-6 py-2.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] disabled:opacity-50">
              {pending ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
