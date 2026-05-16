"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import {
  User, MapPin, Phone, Globe, BookOpen,
  GraduationCap, Sparkles, Upload, CheckCircle, AlertCircle, Save, Link2,
} from "lucide-react";
import { saveProfileAction, initialProfileState } from "@/app/(main)/profile/actions";
import { computeProfileStrength } from "@/lib/data/profile";
import type { SeekerProfile } from "@/lib/data/profile";

function CompletionRing({ strength }: { strength: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (strength / 100) * circ;
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-light text-[var(--foreground)] leading-none">
          {strength}%
        </span>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-mono-dm tracking-widest uppercase text-[var(--faint-fg)] mb-1.5">
      {children}
    </span>
  );
}

function inputCls(extra = "") {
  return `w-full bg-white/50 backdrop-blur-sm border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/10 transition-all duration-200 ${extra}`;
}

type Props = {
  profile: SeekerProfile | null;
  fullName: string;
};

export function ProfileForm({ profile, fullName }: Props) {
  const [state, formAction, pending] = useActionState(saveProfileAction, initialProfileState);

  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");

  const [liveStrength, setLiveStrength] = useState(
    profile?.profile_strength ?? computeProfileStrength({ ...profile, full_name: profile?.full_name ?? fullName })
  );

  function addSkill(raw: string) {
    const tag = raw.trim();
    if (tag && !skills.includes(tag)) setSkills((s) => [...s, tag]);
    setSkillInput("");
  }

  function removeSkill(tag: string) {
    setSkills((s) => s.filter((sk) => sk !== tag));
  }

  function onSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === "Backspace" && skillInput === "" && skills.length > 0) {
      setSkills((s) => s.slice(0, -1));
    }
  }

  function recalcStrength(form: HTMLFormElement) {
    const data = new FormData(form);
    setLiveStrength(
      computeProfileStrength({
        full_name: (data.get("full_name") as string) ?? "",
        title: (data.get("title") as string) ?? "",
        location: (data.get("location") as string) ?? "",
        phone: (data.get("phone") as string) ?? "",
        experience_summary: (data.get("experience_summary") as string) ?? "",
        education_summary: (data.get("education_summary") as string) ?? "",
        linkedin_url: (data.get("linkedin_url") as string) ?? "",
        skills,
      })
    );
  }

  const initials = (profile?.full_name ?? fullName)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const strengthTips = [
    { label: "Full name",    done: !!profile?.full_name },
    { label: "Title",        done: !!profile?.title },
    { label: "Experience",   done: !!profile?.experience_summary },
    { label: "Education",    done: !!profile?.education_summary },
    { label: "Skills",       done: skills.length > 0 },
    { label: "LinkedIn",     done: !!profile?.linkedin_url },
    { label: "Location",     done: !!profile?.location },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      {/* Page heading */}
      <div className="mb-8">
        <p className="eyebrow mb-2">My Account</p>
        <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-light text-[var(--foreground)]">
          Your Profile
        </h1>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
        {/* ── Sidebar ── */}
        <div className="lg:sticky lg:top-28 flex flex-col gap-4">
          {/* Profile card */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[var(--accent-color)]/15 border-2 border-[var(--accent-color)]/30 flex items-center justify-center">
              <span className="font-display text-2xl font-medium text-[var(--accent-color)]">
                {initials || "?"}
              </span>
            </div>
            <div>
              <p className="font-semibold text-[var(--foreground)] text-base leading-snug">
                {profile?.full_name ?? fullName}
              </p>
              {profile?.title && (
                <p className="text-xs text-[var(--muted-fg)] mt-0.5">{profile.title}</p>
              )}
            </div>
          </div>

          {/* Completion ring */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <p className="eyebrow mb-4 text-center">Profile Strength</p>
            <div className="flex justify-center mb-5">
              <CompletionRing strength={liveStrength} />
            </div>
            <ul className="flex flex-col gap-2">
              {strengthTips.map(({ label, done }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-[var(--muted-fg)]">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      done
                        ? "bg-[var(--accent-color)]/15 border-[var(--accent-color)]/40"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {done && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                    )}
                  </div>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume — coming soon */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-dashed border-[var(--border)] p-6 flex flex-col items-center text-center gap-3 opacity-60">
            <Upload size={22} className="text-[var(--faint-fg)]" />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Resume Upload</p>
              <p className="text-xs text-[var(--faint-fg)] mt-1">AI parsing coming soon</p>
            </div>
          </div>
        </div>

        {/* ── Main form ── */}
        <form
          action={formAction}
          onChange={(e) => recalcStrength(e.currentTarget)}
          className="flex flex-col gap-6"
        >
          {/* Hidden skills field */}
          <input type="hidden" name="skills" value={skills.join(",")} />

          {/* Personal Info */}
          <section className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <User size={16} className="text-[var(--accent-color)]" />
              <h2 className="font-semibold text-sm text-[var(--foreground)]">Personal Info</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Full Name *</FieldLabel>
                <input
                  name="full_name"
                  defaultValue={profile?.full_name ?? fullName}
                  placeholder="Your full name"
                  required
                  className={inputCls()}
                />
              </div>
              <div>
                <FieldLabel>Professional Title</FieldLabel>
                <input
                  name="title"
                  defaultValue={profile?.title ?? ""}
                  placeholder="e.g. Programme Officer"
                  className={inputCls()}
                />
              </div>
              <div>
                <FieldLabel>
                  <MapPin size={10} className="inline mr-1" />
                  Location
                </FieldLabel>
                <input
                  name="location"
                  defaultValue={profile?.location ?? ""}
                  placeholder="City, State"
                  className={inputCls()}
                />
              </div>
              <div>
                <FieldLabel>
                  <Phone size={10} className="inline mr-1" />
                  Phone
                </FieldLabel>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={profile?.phone ?? ""}
                  placeholder="+91 98765 43210"
                  className={inputCls()}
                />
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={16} className="text-[var(--accent-color)]" />
              <h2 className="font-semibold text-sm text-[var(--foreground)]">Experience</h2>
            </div>
            <FieldLabel>Summary</FieldLabel>
            <textarea
              name="experience_summary"
              defaultValue={profile?.experience_summary ?? ""}
              rows={5}
              placeholder="Briefly describe your work experience, key roles, and impact..."
              className={inputCls("resize-none leading-relaxed")}
            />
          </section>

          {/* Education */}
          <section className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap size={16} className="text-[var(--accent-color)]" />
              <h2 className="font-semibold text-sm text-[var(--foreground)]">Education</h2>
            </div>
            <FieldLabel>Summary</FieldLabel>
            <textarea
              name="education_summary"
              defaultValue={profile?.education_summary ?? ""}
              rows={3}
              placeholder="e.g. MA Social Work, Tata Institute of Social Sciences, 2018"
              className={inputCls("resize-none leading-relaxed")}
            />
          </section>

          {/* Skills */}
          <section className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={16} className="text-[var(--accent-color)]" />
              <h2 className="font-semibold text-sm text-[var(--foreground)]">Skills</h2>
            </div>
            <FieldLabel>Add skills (press comma or Enter)</FieldLabel>
            <div className={`${inputCls()} flex flex-wrap gap-1.5 min-h-[44px] cursor-text`}
              onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
            >
              {skills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 text-xs text-[var(--accent-color)] font-medium"
                >
                  {sk}
                  <button
                    type="button"
                    onClick={() => removeSkill(sk)}
                    className="hover:text-[var(--accent-dark)] transition-colors leading-none"
                    aria-label={`Remove ${sk}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={onSkillKeyDown}
                onBlur={() => { if (skillInput.trim()) addSkill(skillInput); }}
                placeholder={skills.length === 0 ? "e.g. Community Outreach, Research, Grant Writing" : ""}
                className="flex-1 min-w-32 bg-transparent outline-none text-sm placeholder:text-[var(--faint-fg)]"
              />
            </div>
          </section>

          {/* Online presence */}
          <section className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Globe size={16} className="text-[var(--accent-color)]" />
              <h2 className="font-semibold text-sm text-[var(--foreground)]">Online Presence</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>
                  <Link2 size={10} className="inline mr-1" />
                  LinkedIn URL
                </FieldLabel>
                <input
                  name="linkedin_url"
                  type="url"
                  defaultValue={profile?.linkedin_url ?? ""}
                  placeholder="https://linkedin.com/in/yourname"
                  className={inputCls()}
                />
              </div>
              <div>
                <FieldLabel>
                  <Globe size={10} className="inline mr-1" />
                  Website / Portfolio
                </FieldLabel>
                <input
                  name="website_url"
                  type="url"
                  defaultValue={profile?.website_url ?? ""}
                  placeholder="https://yourwebsite.com"
                  className={inputCls()}
                />
              </div>
            </div>
          </section>

          {/* Save bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            {state.status !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 text-sm ${
                  state.status === "success"
                    ? "text-emerald-600"
                    : "text-[var(--destructive)]"
                }`}
              >
                {state.status === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                {state.message}
              </motion.div>
            )}
            <button
              type="submit"
              disabled={pending}
              className="ml-auto inline-flex items-center gap-2 bg-[var(--accent-color)] text-[var(--on-accent)] px-7 py-3 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
            >
              <Save size={15} />
              {pending ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
