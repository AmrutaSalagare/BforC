import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/data/supabase";
import crypto from "crypto";
import { isUuid } from "@/lib/validation";

/**
 * Secret route to bootstrap an admin account.
 * Usage: POST /api/admin/bootstrap
 * Body: { "secret": "your_cron_secret", "userId": "the_uuid" }
 * 
 * Once run successfully, the user must log out and log back in to get the updated role in their JWT and cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, userId } = body;

    const expectedSecret = process.env.CRON_SECRET;
    const secretBuffer = typeof secret === "string" ? Buffer.from(secret) : null;
    const expectedBuffer = expectedSecret ? Buffer.from(expectedSecret) : null;
    if (
      !secretBuffer ||
      !expectedBuffer ||
      secretBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(secretBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof userId !== "string" || !isUuid(userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    const config = getSupabaseConfig();
    if (!config.ok) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ error: "Service role key not configured" }, { status: 500 });
    }

    // Update the user's role in app_metadata
    const res = await fetch(`${config.url}/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_metadata: { role: "admin" },
        app_metadata: { role: "admin" }, // Also set app_metadata for good measure if needed
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `User ${userId} elevated to admin. Please log out and log back in for changes to take effect.`,
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
