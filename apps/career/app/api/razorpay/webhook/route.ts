import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { sendPaymentReceiptEmail } from "@/lib/email/triggers/payment-receipt";
import { EMPLOYER_TIERS, SEEKER_TIERS } from "@/lib/subscriptions/tiers";
import { isUuid } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const signatureBuffer = Buffer.from(signature, "hex");
    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    const config = getSupabaseConfig();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!config.ok || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // Handle events
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      const amount = payment.amount;
      const notes = payment.notes;
      const userId = notes?.userId;
      const tier = notes?.tier;
      const role = notes?.role;

      if (!userId || !tier || !role || !isUuid(userId)) {
        console.error("Missing metadata in payment notes:", notes);
        return NextResponse.json({ success: true }); // Acknowledge to stop retries
      }

      if (role !== "seeker" && role !== "employer") {
        console.error("Invalid payment role:", role);
        return NextResponse.json({ success: true });
      }

      const tierConfig = role === "employer"
        ? EMPLOYER_TIERS[tier as keyof typeof EMPLOYER_TIERS]
        : SEEKER_TIERS[tier as keyof typeof SEEKER_TIERS];

      if (!tierConfig || amount !== tierConfig.price * 100 || payment.currency !== tierConfig.currency) {
        console.error("Payment metadata does not match a known plan:", { role, tier, amount, currency: payment.currency });
        return NextResponse.json({ success: true });
      }

      // 1. Insert into payments table
      await fetch(`${config.url}/rest/v1/payments`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          user_id: userId,
          amount: amount,
          currency: payment.currency,
          status: "captured",
          razorpay_order_id: orderId,
          razorpay_payment_id: payment.id,
          razorpay_signature: signature,
          metadata: { ...notes, event: event.event },
        }),
      });

      // 2. Update subscription tier and reset limits
      const applicationsUsed = 0;
      const jobsPostedUsed = 0;

      await fetch(`${config.url}/rest/v1/subscriptions?user_id=eq.${userId}`, {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: tier,
          applications_used: applicationsUsed,
          jobs_posted_used: jobsPostedUsed,
          period_start: new Date().toISOString(),
          period_end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          updated_at: new Date().toISOString()
        }),
      });

      // 3. Send Email (Payment Receipt)
      try {
        const userRes = await fetch(`${config.url}/auth/v1/admin/users/${userId}`, {
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          const email = userData.email;
          const fullName = userData.user_metadata?.full_name || "Customer";
          if (email) {
            await sendPaymentReceiptEmail({
              to: email,
              employerName: fullName,
              planName: tier.toUpperCase(),
              amount: amount / 100,
              currency: payment.currency,
              transactionId: payment.id,
              billingDate: new Date().toLocaleDateString(),
              nextBillingDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
            });
          }
        }
      } catch (e) {
        console.error("Failed to send receipt email:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
