import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { EMPLOYER_TIERS, SEEKER_TIERS } from "@/lib/subscriptions/tiers";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tier } = await req.json().catch(() => ({}));

    if (typeof tier !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const tierConfig = session.role === "employer"
      ? EMPLOYER_TIERS[tier as keyof typeof EMPLOYER_TIERS]
      : SEEKER_TIERS[tier as keyof typeof SEEKER_TIERS];

    if (!tierConfig) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    if (tierConfig.price <= 0) {
      return NextResponse.json({ error: "This plan does not require payment" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const orderOptions = {
      amount: tierConfig.price * 100, // Razorpay expects amount in smallest currency unit (paise)
      currency: tierConfig.currency,
      receipt: `rcpt_${session.userId.slice(0, 8)}_${Date.now()}`,
      notes: {
        userId: session.userId,
        role: session.role,
        tier: tier,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, tier });
  } catch (error: unknown) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
