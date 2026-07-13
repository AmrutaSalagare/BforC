"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, ArrowRight } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/motion";
import type { SeekerProfile } from "@/lib/data/profile";

export function TalentSearchClient({ profiles }: { profiles: SeekerProfile[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<SeekerProfile | null>(null);

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return profiles;

    const query = searchQuery.toLowerCase();
    return profiles.filter((p) => {
      const matchName = p.full_name.toLowerCase().includes(query);
      const matchTitle = p.title?.toLowerCase().includes(query) ?? false;
      const matchLocation = p.location?.toLowerCase().includes(query) ?? false;
      const matchSkills = (p.skills || []).some((s) => s.toLowerCase().includes(query));

      return matchName || matchTitle || matchLocation || matchSkills;
    });
  }, [profiles, searchQuery]);

  return (
    <>
      {/* Search bar */}
      <Reveal className="mb-10">
        <div className="relative flex items-center gap-3 p-2 pl-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50">
          <Search size={18} className="text-[var(--faint-fg)] flex-shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-sm text-[var(--foreground)] placeholder-[var(--faint-fg)] focus:outline-none focus:ring-0"
            placeholder="Search by role, skill, location, or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link
            href="/employers/pricing"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--foreground)] text-white text-sm font-medium hover:opacity-90 transition"
          >
            <Filter size={14} /> Filters
          </Link>
        </div>
      </Reveal>

      {/* Profile cards header */}
      <Reveal className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-light text-[var(--foreground)]">
            Featured Candidates <span className="text-[var(--faint-fg)] text-sm ml-2">({filteredProfiles.length})</span>
          </h2>
        </div>
      </Reveal>

      {/* Profile grid */}
      <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16" stagger={0.08}>
        {filteredProfiles.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[var(--muted-fg)] border border-dashed border-black/10 rounded-2xl">
            {searchQuery ? "No candidates found matching your search." : "No public profiles available yet."}
          </div>
        ) : (
          filteredProfiles.map((p) => {
            const initials = p.full_name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <StaggerItem key={p.id}>
                <div 
                  className="relative flex flex-col gap-4 p-6 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 h-full group cursor-pointer hover:border-[var(--primary)]/30 hover:shadow-md transition-all duration-300"
                  onClick={() => setSelectedProfile(p)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{p.full_name}</p>
                      <p className="text-xs text-[var(--muted-fg)] line-clamp-1">{p.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[var(--faint-fg)]">
                    <MapPin size={11} className="flex-shrink-0" /> {p.location || "Remote"}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(p.skills || []).slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full border border-[var(--primary)]/15 text-[var(--primary)] bg-[var(--primary)]/5"
                      >
                        {s}
                      </span>
                    ))}
                    {(p.skills || []).length > 4 && (
                      <span className="text-xs px-2.5 py-1 rounded-full border border-black/5 text-[var(--muted-fg)] bg-black/5">
                        +{(p.skills || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })
        )}
      </StaggerReveal>

      {/* Modal Profile View */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setSelectedProfile(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 sm:p-8 overflow-y-auto">
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
              
              <div className="flex items-start gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {selectedProfile.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-display text-[var(--foreground)]">{selectedProfile.full_name}</h3>
                  <p className="text-[var(--muted-fg)] mb-2">{selectedProfile.title || "No title provided"}</p>
                  <div className="flex items-center gap-1.5 text-sm text-[var(--faint-fg)]">
                    <MapPin size={14} className="flex-shrink-0" /> {selectedProfile.location || "Remote"}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--faint-fg)] mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProfile.skills || []).map((s) => (
                      <span
                        key={s}
                        className="text-sm px-3 py-1.5 rounded-full border border-[var(--primary)]/15 text-[var(--primary)] bg-[var(--primary)]/5"
                      >
                        {s}
                      </span>
                    ))}
                    {(!selectedProfile.skills || selectedProfile.skills.length === 0) && (
                      <p className="text-sm text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>

                {selectedProfile.experience_summary && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--faint-fg)] mb-2">Experience</h4>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                      {selectedProfile.experience_summary}
                    </p>
                  </div>
                )}

                {selectedProfile.education_summary && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--faint-fg)] mb-2">Education</h4>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                      {selectedProfile.education_summary}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--faint-fg)] mb-3">Contact Details</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                    {selectedProfile.phone ? (
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                        <span className="font-medium">Phone:</span>
                        <a href={`tel:${selectedProfile.phone}`} className="text-[var(--primary)] hover:underline">{selectedProfile.phone}</a>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No phone number provided</div>
                    )}

                    {selectedProfile.linkedin_url && (
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                        <span className="font-medium">LinkedIn:</span>
                        <a href={selectedProfile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline truncate max-w-[200px] sm:max-w-xs">{selectedProfile.linkedin_url}</a>
                      </div>
                    )}

                    {selectedProfile.website_url && (
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                        <span className="font-medium">Website:</span>
                        <a href={selectedProfile.website_url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline truncate max-w-[200px] sm:max-w-xs">{selectedProfile.website_url}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedProfile(null)}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
