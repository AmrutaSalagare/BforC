"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import {
  User, MapPin, Phone, Globe, BookOpen,
  GraduationCap, Sparkles, CheckCircle, AlertCircle, Save, Link2, Loader2
} from "lucide-react";
import { Spinner } from "@/components/motion";
import { saveProfileAction, type ProfileActionState } from "@/app/(main)/profile/actions";
import { computeProfileStrength } from "@/lib/data/profile";
import type { SeekerProfile } from "@/lib/data/profile";

const initialProfileState: ProfileActionState = { status: "idle" };

function CompletionRing({ strength }: { strength: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (strength / 100) * circ;
  const color = strength >= 80 ? "var(--chart-3)" : strength >= 50 ? "var(--accent-color)" : "var(--primary)";

  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display text-xl font-light text-[var(--foreground)] leading-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {strength}%
        </motion.span>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">
      {children}
    </span>
  );
}

function inputCls(extra = "") {
  return `w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-4 py-3 text-sm font-light text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 outline-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)] transition duration-300 ${extra}`;
}

type Props = {
  profile: SeekerProfile | null;
  fullName: string;
};

export function ProfileForm({ profile, fullName }: Props) {
  const [state, formAction, pending] = useActionState(saveProfileAction, initialProfileState);

  const [formKey, setFormKey] = useState(0);
  const [formData, setFormData] = useState({
    title: profile?.title ?? "",
    location: profile?.location ?? "",
    experience_summary: profile?.experience_summary ?? "",
    education_summary: profile?.education_summary ?? "",
    linkedin_url: profile?.linkedin_url ?? "",
    website_url: profile?.website_url ?? "",
  });

  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");

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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setExtractError("Only PDF files are supported.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setExtractError("File exceeds 4MB limit. Please upload a smaller PDF.");
      return;
    }

    setIsExtracting(true);
    setExtractError("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/extract-resume", {
        method: "POST",
        body: data,
      });

      let json;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        json = await res.json();
      } else {
        throw new Error(`Server returned an error (${res.status}). The file might be too large or the server timed out.`);
      }

      if (!res.ok) throw new Error(json.error || "Extraction failed");

      if (json.data) {
        setFormData(prev => {
          const nextData = {
            ...prev,
            title: json.data.title || prev.title,
            location: json.data.location || prev.location,
            experience_summary: json.data.experience || prev.experience_summary,
            education_summary: json.data.education || prev.education_summary,
            linkedin_url: json.data.linkedin_url || prev.linkedin_url,
            website_url: json.data.website_url || prev.website_url,
          };
          
          let nextSkills = skills;
          if (json.data.skills && Array.isArray(json.data.skills)) {
            nextSkills = json.data.skills;
            setSkills(nextSkills);
          }

          // Auto-update profile strength ring
          setLiveStrength(
            computeProfileStrength({
              full_name: profile?.full_name ?? fullName,
              title: nextData.title,
              location: nextData.location,
              phone: profile?.phone ?? "",
              experience_summary: nextData.experience_summary,
              education_summary: nextData.education_summary,
              linkedin_url: nextData.linkedin_url,
              skills: nextSkills,
            })
          );

          return nextData;
        });

        setFormKey(k => k + 1); // Remount form with new defaults
      }
    } catch (err: unknown) {
      setExtractError(err instanceof Error ? err.message : "Extraction failed");
    } finally {
      setIsExtracting(false);
    }
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
        {/* ?? Sidebar ?? */}
        <div className="lg:sticky lg:top-32 flex flex-col gap-5">
          {/* Profile card */}
          <div className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <div className="w-24 h-24 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center">
              <span className="font-display text-3xl font-light text-[var(--primary)]">
                {initials || "?"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)] text-lg leading-snug">
                {profile?.full_name ?? fullName}
              </p>
              {profile?.title && (
                <p className="text-sm font-light text-[var(--muted-fg)] mt-1">{profile.title}</p>
              )}
            </div>
          </div>

          {/* Completion ring */}
          <div className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-6 shadow-sm">
            <p className="text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-5 text-center">Profile Strength</p>
            <div className="flex justify-center mb-6">
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
        </div>


        {/* ?? Main content ?? */}
        <div className="flex flex-col gap-6">
          {/* Magic Upload (Prominent) */}
          <div className="bg-[var(--accent-color)]/5 border border-[var(--accent-color)]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm relative overflow-hidden group">
            <input 
              type="file" 
              accept="application/pdf"
              onChange={handleFileUpload}
              disabled={isExtracting}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              title="Upload PDF Resume"
            />
            {isExtracting ? (
              <div className="flex items-center gap-4 w-full">
                <Loader2 size={32} className="text-[var(--accent-color)] animate-spin shrink-0" />
                <div>
                  <p className="text-base font-medium text-[var(--accent-color)]">Analyzing Resume...</p>
                  <p className="text-sm text-[var(--muted-fg)] mt-1">Extracting skills & experience using AI</p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 shrink-0 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center text-[var(--accent-color)] group-hover:scale-110 transition-transform">
                  <Sparkles size={28} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-medium text-[var(--foreground)]">Magic Auto-Fill</h2>
                  <p className="text-sm text-[var(--muted-fg)] mt-1 leading-relaxed">Save time! Upload your PDF resume and we will instantly extract and fill your profile details.</p>
                  {extractError && (
                    <p className="text-sm text-red-500 mt-2 font-medium">{extractError}</p>
                  )}
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center justify-center px-4 py-2 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded-xl group-hover:bg-[var(--accent-color)] transition-colors">
                    Select PDF
                  </span>
                </div>
              </>
            )}
          </div>

        {/* ?? Main form ?? */}
        <form
          key={formKey}
          action={formAction}
          onChange={(e) => recalcStrength(e.currentTarget)}
          className="flex flex-col gap-6"
        >
          {/* Hidden skills field */}
          <input type="hidden" name="skills" value={skills.join(",")} />

          {/* Personal Info */}
          <section className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User size={18} strokeWidth={1.5} className="text-[var(--primary)]" />
              <h2 className="font-display text-xl font-light text-[var(--foreground)]">Personal Info</h2>
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
                  defaultValue={formData.title}
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
                  defaultValue={formData.location}
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
          <section className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} strokeWidth={1.5} className="text-[var(--primary)]" />
              <h2 className="font-display text-xl font-light text-[var(--foreground)]">Experience</h2>
            </div>
            <FieldLabel>Summary</FieldLabel>
            <textarea
              name="experience_summary"
              defaultValue={formData.experience_summary}
              rows={5}
              placeholder="Briefly describe your work experience, key roles, and impact..."
              className={inputCls("resize-none leading-relaxed")}
            />
          </section>

          {/* Education */}
          <section className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={18} strokeWidth={1.5} className="text-[var(--primary)]" />
              <h2 className="font-display text-xl font-light text-[var(--foreground)]">Education</h2>
            </div>
            <FieldLabel>Summary</FieldLabel>
            <textarea
              name="education_summary"
              defaultValue={formData.education_summary}
              rows={3}
              placeholder="e.g. MA Social Work, Tata Institute of Social Sciences, 2018"
              className={inputCls("resize-none leading-relaxed")}
            />
          </section>

          {/* Skills */}
          <section className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} strokeWidth={1.5} className="text-[var(--primary)]" />
              <h2 className="font-display text-xl font-light text-[var(--foreground)]">Skills</h2>
            </div>
            <FieldLabel>Add skills (press comma or Enter)</FieldLabel>
            <div className={`${inputCls("px-3 py-2")} flex flex-wrap gap-2 min-h-[52px] cursor-text`}
              onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
            >
              {skills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[12px] font-light tracking-wide text-[var(--primary)]"
                >
                  {sk}
                  <button
                    type="button"
                    onClick={() => removeSkill(sk)}
                    className="hover:text-[var(--foreground)] hover:bg-[var(--primary)]/10 rounded-full w-4 h-4 flex items-center justify-center transition-colors leading-none"
                    aria-label={`Remove ${sk}`}
                  >
                    ?
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
          <section className="bg-[var(--background)] rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Globe size={18} strokeWidth={1.5} className="text-[var(--primary)]" />
              <h2 className="font-display text-xl font-light text-[var(--foreground)]">Online Presence</h2>
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
                  defaultValue={formData.linkedin_url}
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
                  defaultValue={formData.website_url}
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
              disabled={pending || isExtracting}
              className="ml-auto inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-8 py-3.5 rounded-2xl text-[14px] font-light tracking-wide hover:bg-[var(--foreground)] transition duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none shadow-sm"
            >
              {pending ? <><Spinner /> Saving...</> : <><Save size={16} strokeWidth={1.5} /> Save profile</>}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
