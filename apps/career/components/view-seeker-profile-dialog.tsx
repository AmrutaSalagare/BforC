"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Briefcase, GraduationCap, Link as LinkIcon, Globe, Phone, BarChart3 } from "lucide-react";
import { Spinner } from "@/components/motion";
import type { SeekerProfile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  seekerId: string;
  children: React.ReactNode;
};

export function ViewSeekerProfileDialog({ seekerId, children }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<SeekerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Ensure createPortal only runs client-side */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setOpen(false), []);

  /* ESC key to dismiss */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const fetchProfile = async () => {
    setOpen(true);
    if (profile) return; // already loaded
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/seeker-profiles/${seekerId}`);
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      setProfile(await res.json());
    } catch {
      setError("We couldn't retrieve the candidate's profile details. Please refresh the page and try again.");
    } finally {
      setLoading(false);
    }
  };

  const initials = profile?.full_name
    ? profile.full_name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("")
    : "?";

  const modal = (
    <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label="Candidate profile"
          >
            {/* Scrim */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px]" />

            {/* Card */}
            <motion.div
              className="relative bg-[var(--background)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--primary)]/10 w-full max-w-md sm:max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header band */}
              <div className="relative h-24 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--background)] border-b border-[var(--primary)]/10 flex-shrink-0">
                <button
                  onClick={close}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] hover:bg-white/90 transition-colors z-10"
                  aria-label="Close profile"
                >
                  <X size={16} />
                </button>
                
                {/* Avatar positioned outside the scrollable clipping context */}
                <div className="absolute -bottom-8 left-6 z-20">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--background)] border border-[var(--primary)]/10 shadow-md flex items-center justify-center font-display text-2xl font-light text-[var(--primary)]">
                    {initials}
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-6 pt-10">

                {/* Loading state */}
                {loading && (
                  <div className="flex items-center gap-3 py-8 text-[var(--muted-fg)] text-sm">
                    <Spinner /> Loading profile…
                  </div>
                )}

                {/* Error state */}
                {error && !loading && (
                  <div className="py-6 text-center space-y-2">
                    <p className="text-sm text-[var(--destructive)]">{error}</p>
                    <button
                      onClick={() => { setProfile(null); fetchProfile(); }}
                      className="text-xs text-[var(--accent-color)] hover:underline"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Profile content */}
                {profile && !loading && (
                  <div className="space-y-5">
                    {/* Name + title */}
                    <div>
                      <h3 className="font-display text-2xl font-light text-[var(--foreground)] leading-tight">{profile.full_name}</h3>
                      {profile.title && <p className="text-sm font-light text-[var(--foreground)]/70 mt-0.5">{profile.title}</p>}
                    </div>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2">
                      {profile.location && (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide text-[var(--foreground)]/80 bg-[var(--primary)]/5 px-3 py-1.5 rounded-xl border border-[var(--primary)]/10">
                          <MapPin size={12} strokeWidth={1.5} /> {profile.location}
                        </span>
                      )}
                      {profile.phone && (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide text-[var(--foreground)]/80 bg-[var(--primary)]/5 px-3 py-1.5 rounded-xl border border-[var(--primary)]/10">
                          <Phone size={12} strokeWidth={1.5} /> {profile.phone}
                        </span>
                      )}
                      {typeof profile.profile_strength === "number" && (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide bg-[var(--primary)] text-[var(--background)] px-3 py-1.5 rounded-xl border border-[var(--primary)]/10 shadow-sm">
                          <BarChart3 size={12} strokeWidth={1.5} /> {profile.profile_strength}% complete
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <hr className="border-[var(--primary)]/10" />

                    {/* Experience */}
                    {profile.experience_summary && (
                      <section>
                        <h4 className="text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 flex items-center gap-2 mb-2">
                          <Briefcase size={14} strokeWidth={1.5} /> Experience
                        </h4>
                        <p className="text-sm font-light text-[var(--foreground)]/80 whitespace-pre-wrap leading-relaxed">{profile.experience_summary}</p>
                      </section>
                    )}

                    {/* Education */}
                    {profile.education_summary && (
                      <section>
                        <h4 className="text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 flex items-center gap-2 mb-2">
                          <GraduationCap size={14} strokeWidth={1.5} /> Education
                        </h4>
                        <p className="text-sm font-light text-[var(--foreground)]/80 whitespace-pre-wrap leading-relaxed">{profile.education_summary}</p>
                      </section>
                    )}

                    {/* Skills */}
                    {profile.skills && profile.skills.length > 0 && (
                      <section>
                        <h4 className="text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[12px] font-light tracking-wide px-3 py-1 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Links */}
                    {(profile.linkedin_url || profile.website_url) && (
                      <section className="flex items-center gap-4 pt-1">
                        {profile.linkedin_url && (
                          <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide text-[var(--primary)] hover:underline"
                          >
                            <LinkIcon size={14} strokeWidth={1.5} /> LinkedIn
                          </a>
                        )}
                        {profile.website_url && (
                          <a
                            href={profile.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide text-[var(--primary)] hover:underline"
                          >
                            <Globe size={14} strokeWidth={1.5} /> Website
                          </a>
                        )}
                      </section>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  return (
    <>
      <span onClick={fetchProfile} className="cursor-pointer">{children}</span>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
