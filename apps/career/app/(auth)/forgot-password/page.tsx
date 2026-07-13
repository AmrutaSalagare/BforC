"use client";

import { useActionState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { sendPasswordResetAction } from "./actions";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(sendPasswordResetAction, { status: "idle" });

  return (
    <main className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[var(--background)] flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.15)] relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-display font-light tracking-tight text-[var(--foreground)]">Reset Password</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        {state.message && (
          <p
            className={`rounded-[4px] border px-3 py-2 text-xs font-medium ${
              state.status === "success"
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-[var(--destructive)]/20 bg-white/70 text-[var(--destructive)]"
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        )}

        {state.status === "success" ? (
          <div className="text-center pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-color)] hover:underline"
            >
              <ArrowLeft size={15} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            <div className="relative z-0 mt-6">
              <input
                type="email"
                name="email"
                id="floating_email_reset"
                className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[var(--primary)] peer transition-colors"
                placeholder=" "
                autoComplete="email"
                required
              />
              <label
                htmlFor="floating_email_reset"
                className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <Mail className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
                Email Address
              </label>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="group w-full flex items-center justify-center py-3.5 px-4 bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] rounded-[4px] text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] transition duration-300 shadow-sm"
            >
              {pending ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-[var(--muted-foreground)]">
              <Link href="/login" className="font-semibold text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
                Back to Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
