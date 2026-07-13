"use client";

import { useActionState, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { saveEmployerProfileAction, uploadLogoAction } from "@/app/(main)/employers/dashboard/profile/actions";
import type { EmployerProfile } from "@/lib/data/employer";

type Props = {
  profile: EmployerProfile | null;
  userId: string;
};

export function EmployerProfileForm({ profile, userId }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveEmployerProfileAction, { status: "idle" });
  const [logoUrl, setLogoUrl] = useState<string | null>(profile?.logo_url ?? null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Use a PNG, JPEG, or WebP image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File too large. Maximum 2 MB.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("logo", file);
    const result = await uploadLogoAction(fd);
    setUploading(false);

    if (result.url) {
      setLogoUrl(result.url);
      router.refresh();
    } else {
      alert(result.error ?? "Upload failed.");
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <p
          className={`rounded-[4px] border px-3 py-2 text-xs font-medium ${
            state.status === "success"
              ? "border-green-600/20 bg-green-50 text-green-700"
              : "border-[var(--destructive)]/20 bg-white/70 text-[var(--destructive)]"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center font-display text-2xl font-light text-[var(--primary)] shadow-sm shrink-0 overflow-hidden">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Company logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[var(--primary)]/60 text-[11px] font-light tracking-wide">Logo</span>
          )}
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 hover:opacity-100 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] rounded-xl"
          >
            <Upload size={14} strokeWidth={1.5} />
            {uploading ? "Uploading..." : logoUrl ? "Change Logo" : "Upload Logo"}
          </button>
          <p className="text-[11px] font-light text-[var(--foreground)]/60 mt-1">Recommended size 256x256px. Max 2 MB.</p>
        </div>
      </div>

      <input type="hidden" name="user_id" value={userId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Organization Name *</label>
          <input
            type="text"
            name="company_name"
            defaultValue={profile?.company_name ?? ""}
            required
            placeholder="e.g. Global Compassion Foundation"
            className="w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-3 py-2.5 text-sm font-light text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Impact Sector</label>
          <select
            name="sector"
            defaultValue={profile?.sector ?? ""}
            className="w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-3 py-2.5 text-sm font-light text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)] transition-colors"
          >
            <option value="">Select sector</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Education">Education</option>
            <option value="Climate Action">Climate Action</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Livelihood">Livelihood</option>
            <option value="Social Impact">Social Impact</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Organization Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={profile?.description ?? ""}
          placeholder="Describe your organisation's mission, impact, and culture..."
          className="w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-3 py-2.5 text-sm font-light text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)] transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Website URL</label>
          <input
            type="url"
            name="website_url"
            defaultValue={profile?.website_url ?? ""}
            placeholder="https://example.org"
            className="w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-3 py-2.5 text-sm font-light text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[12px] font-light tracking-wide text-[var(--foreground)] opacity-80 mb-2">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={profile?.location ?? ""}
            placeholder="e.g. Bangalore, India"
            className="w-full bg-[var(--background)] border border-[var(--primary)]/10 rounded-xl px-3 py-2.5 text-sm font-light text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end border-t border-[var(--primary)]/10">
        <button
          type="submit"
          disabled={pending}
          className="bg-[var(--primary)] text-[var(--background)] px-8 py-3 rounded-2xl text-[13px] font-light tracking-wide hover:bg-[var(--foreground)] transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:opacity-50 shadow-sm"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
