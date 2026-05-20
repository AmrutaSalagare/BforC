import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CheckBox } from "@/components/ui/checkbox";

export default function PostNewJob() {
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
        <form className="space-y-8">
          
          {/* Basic Info */}
          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Title *</label>
              <input 
                type="text" 
                placeholder="e.g. Program Manager, Social Worker"
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Type *</label>
                <select className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors" required>
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Location *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bangalore, Remote, Hybrid"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Minimum Salary (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 300000"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Maximum Salary (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 600000"
                  className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Job Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Job Description *</label>
              <textarea 
                rows={5}
                placeholder="Describe the role, responsibilities, and impact..."
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Requirements</label>
              <textarea 
                rows={4}
                placeholder="List skills, qualifications, or experience required..."
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--faint-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors resize-none"
              />
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Preferences & Tags</h3>
            
            <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-[var(--border)] bg-white/30 hover:bg-white/50 transition-colors">
              <div className="mt-0.5">
                <CheckBox checked={true} onClick={() => {}} color="var(--primary)" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">Women-Friendly Workplace</p>
                <p className="text-xs text-[var(--muted-fg)] mt-1">This role offers flexible hours, maternity benefits, or is specifically designed to support women in the workforce.</p>
              </div>
            </label>
          </section>

          <div className="pt-6 flex items-center justify-end gap-4 border-t border-[var(--border)]">
            <Link 
              href="/employers/dashboard/jobs"
              className="px-6 py-2.5 rounded-[4px] text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              Cancel
            </Link>
            <button type="button" className="px-6 py-2.5 rounded-[4px] text-sm font-medium text-[var(--accent-color)] border border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--on-accent)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
              Save as Draft
            </button>
            <button type="submit" className="bg-[var(--accent-color)] text-[var(--on-accent)] px-6 py-2.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]">
              Publish Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
