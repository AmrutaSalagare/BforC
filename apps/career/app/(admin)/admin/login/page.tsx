import { adminLoginAction } from "./actions";
import { Lock } from "lucide-react";
import Link from "next/link";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600/10 p-3 rounded-2xl ring-1 ring-blue-500/20">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-display font-medium text-white tracking-tight">
          System Administration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Super Admin access portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#111111] py-8 px-4 shadow-2xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-white/5">
          <form className="space-y-6" action={adminLoginAction}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Admin Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-0 py-2.5 px-3 bg-[#1a1a1a] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-500 transition-all"
                  placeholder="admin@bforc.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-0 py-2.5 px-3 bg-[#1a1a1a] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {params?.message && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                {params.message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Authenticate
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                &larr; Return to public site
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
