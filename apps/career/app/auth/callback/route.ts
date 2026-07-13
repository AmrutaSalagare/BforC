/**
 * @deprecated — Email confirmation is currently disabled in Supabase.
 *
 * TODO (production): Implement this callback route when email confirmation
 * is re-enabled. Steps needed:
 *
 * 1. Enable "Confirm email" in Supabase Dashboard → Authentication → Providers → Email
 * 2. Set Site URL in Supabase Dashboard → Authentication → URL Configuration
 *    - Production: https://your-domain.com
 *    - Add redirect URLs: https://your-domain.com/** and http://localhost:3000/**
 * 3. Implement the handler below to exchange the confirmation token for a session:
 *
 *   import { NextRequest, NextResponse } from "next/server";
 *
 *   export async function GET(request: NextRequest) {
 *     const { searchParams } = new URL(request.url);
 *     const token_hash = searchParams.get("token_hash");
 *     const type = searchParams.get("type");          // "email" | "recovery" etc.
 *     const next = searchParams.get("next") ?? "/dashboard";
 *
 *     if (token_hash && type) {
 *       // Exchange token_hash for a session via Supabase REST API
 *       // POST /auth/v1/verify  { type, token_hash }
 *       // Set auth cookies → redirect to `next`
 *     }
 *
 *     return NextResponse.redirect(new URL("/login?error=invalid_link", request.url));
 *   }
 */

export const dynamic = "force-dynamic";

// Placeholder — not active until email confirmation is re-enabled
export async function GET() {
  const { NextResponse } = await import("next/server");
  return NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );
}
