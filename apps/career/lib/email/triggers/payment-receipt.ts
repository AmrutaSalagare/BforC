import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import PaymentReceiptEmail, { getSubject } from "@/lib/email/templates/payment-receipt";

interface PaymentReceiptInput {
  to: string;
  employerName: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  billingDate: string;
  nextBillingDate: string;
}

export async function sendPaymentReceiptEmail(input: PaymentReceiptInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = `${baseUrl}/employers/dashboard`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ planName: input.planName }),
    template: React.createElement(PaymentReceiptEmail, {
      employerName: input.employerName,
      planName: input.planName,
      amount: input.amount,
      currency: input.currency,
      transactionId: input.transactionId,
      billingDate: input.billingDate,
      nextBillingDate: input.nextBillingDate,
      dashboardUrl,
    }),
  });
}
