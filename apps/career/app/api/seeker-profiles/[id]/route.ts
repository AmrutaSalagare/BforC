import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { getCurrentSession } from "@/lib/auth/session";
import { isUuid } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id || !isUuid(id)) {
    return NextResponse.json({ error: "Invalid profile id" }, { status: 400 });
  }

  const config = getSupabaseConfig();
  if (!config.ok) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const session = await getCurrentSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Session expired. Please refresh the page and log in again." }, { status: 401 });
  }
  if (session.role !== "employer") {
    return NextResponse.json({ error: "Employer account required" }, { status: 403 });
  }

  const qs = new URLSearchParams({ id: `eq.${id}`, select: "*", limit: "1" });
  const res = await fetch(`${config.url}/rest/v1/seeker_profiles?${qs}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) {
      return NextResponse.json({ error: "Session expired. Please refresh the page." }, { status: 401 });
    }
    return NextResponse.json({ error: "Could not load profile." }, { status: res.status });
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
