"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Clock3 } from "lucide-react";
import { requestVerificationAction, type ProfileActionState } from "@/app/(main)/employers/dashboard/profile/actions";
import { Spinner } from "@/components/motion";

interface EmployerVerificationCardProps {
  employerId: string;
  isVerified: boolean;
  verificationRequestedAt: string | null;
}

const initialState: ProfileActionState = { status: "idle" };

export function EmployerVerificationCard({ employerId, isVerified, verificationRequestedAt }: EmployerVerificationCardProps) {
  const [state, formAction, pending] = useActionState(requestVerificationAction, initialState);

  // If already requested in this session, fake it until reload
  const requested = state.status === "success" || verificationRequestedAt;

  if (isVerified) {
    return (
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 mt-8 flex items-center gap-4">
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h3 className="text-emerald-800 font-medium">Verified Employer</h3>
          <p className="text-emerald-600/80 text-sm mt-1">
            Your company is verified. The verified badge is now displayed on your public profile and job postings.
          </p>
        </div>
      </div>
    );
  }

  if (requested) {
    return (
      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 mt-8 flex items-center gap-4">
        <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
          <Clock3 size={24} />
        </div>
        <div>
          <h3 className="text-amber-800 font-medium">Verification Pending</h3>
          <p className="text-amber-600/80 text-sm mt-1">
            We have received your verification request. Our admin team will review it shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-2xl p-6 mt-8">
      <div className="flex gap-4">
        <div className="bg-[var(--primary)]/10 text-[var(--primary)] p-3 rounded-full h-fit">
          <AlertCircle size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-[var(--foreground)] font-medium">Request Verification</h3>
          <p className="text-[var(--muted-fg)] text-sm mt-1 mb-4">
            Get a verified badge on your company profile and job postings. This builds trust with top talent and increases your application rates.
          </p>
          
          <form action={formAction}>
            <input type="hidden" name="employer_id" value={employerId} />
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded-xl hover:bg-[var(--foreground)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {pending ? <><Spinner className="w-4 h-4" /> Requesting...</> : "Request Verification Now"}
            </button>
            {state.status === "error" && (
              <p className="text-rose-500 text-sm mt-2">{state.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
