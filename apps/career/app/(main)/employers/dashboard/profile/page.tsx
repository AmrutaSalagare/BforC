export default function EmployerCompanyProfile() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Company Profile</h2>
      
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 sm:p-8">
        <form className="space-y-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--blush)] to-white/50 border border-white flex items-center justify-center font-display text-2xl font-medium text-[var(--primary)] shadow-sm shrink-0">
              GC
            </div>
            <div>
              <button type="button" className="text-sm font-medium text-[var(--accent-color)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-sm">
                Upload New Logo
              </button>
              <p className="text-xs text-[var(--muted-fg)] mt-1">Recommended size 256x256px.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Organization Name</label>
              <input 
                type="text" 
                defaultValue="Global Compassion"
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Impact Sector</label>
              <select className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors">
                <option>Women Empowerment</option>
                <option>Education</option>
                <option>Climate Action</option>
                <option>Healthcare</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Organization Description</label>
            <textarea 
              rows={4}
              defaultValue="We are dedicated to supporting marginalized communities through accessible education and skill development programs."
              className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Website URL</label>
              <input 
                type="url" 
                defaultValue="https://globalcompassion.org"
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Location</label>
              <input 
                type="text" 
                defaultValue="Bangalore, India"
                className="w-full bg-white/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end border-t border-[var(--border)]">
            <button type="submit" className="bg-[var(--accent-color)] text-[var(--on-accent)] px-6 py-2.5 rounded-[4px] text-sm font-medium hover:bg-[var(--accent-dark)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
