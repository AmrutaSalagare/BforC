import { CheckCircle2 } from "lucide-react";

export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span 
      className={`inline-flex items-center justify-center text-emerald-500 hover:text-emerald-600 transition-colors ${className}`}
      title="Verified Employer"
    >
      <CheckCircle2 size={18} fill="currentColor" className="text-white" />
    </span>
  );
}
