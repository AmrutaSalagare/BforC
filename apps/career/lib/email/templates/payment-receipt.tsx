import * as React from "react";
import {
  BaseEmail,
  EmailHeading,
  EmailParagraph,
  EmailButton,
  EmailDivider,
  EmailHighlight,
  EmailBadge,
} from "@/lib/email/base";

export interface PaymentReceiptProps {
  employerName: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  billingDate: string;
  nextBillingDate: string;
  dashboardUrl: string;
}

export function getSubject({ planName }: Pick<PaymentReceiptProps, "planName">): string {
  return `Your BforC ${planName} receipt — thank you!`;
}

export default function PaymentReceipt({
  employerName,
  planName,
  amount,
  currency,
  transactionId,
  billingDate,
  nextBillingDate,
  dashboardUrl,
}: PaymentReceiptProps) {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

  const preview = `Receipt confirmed — ${formattedAmount} for ${planName}. Thank you for supporting women's careers in India.`;

  return (
    <BaseEmail preview={preview}>
      {/* Greeting */}
      <EmailBadge>Payment Confirmed ✓</EmailBadge>

      <div style={{ marginTop: "20px" }}>
        <EmailHeading>Thank you, {employerName}!</EmailHeading>
      </div>

      <EmailParagraph>
        Your payment has been received and your <strong>{planName}</strong>{" "}
        subscription is now active. We're glad to have you with us — together
        we're opening more doors for talented women across India.
      </EmailParagraph>

      {/* Receipt table inside a highlight box */}
      <EmailHighlight>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ borderCollapse: "collapse" }}
        >
          <tbody>
            <ReceiptRow
              label="Plan"
              value={planName}
              isFirst
            />
            <ReceiptRow
              label="Amount Paid"
              value={formattedAmount}
              highlight
            />
            <ReceiptRow
              label="Transaction ID"
              value={transactionId}
              mono
            />
            <ReceiptRow
              label="Billing Date"
              value={billingDate}
            />
            <ReceiptRow
              label="Next Billing Date"
              value={nextBillingDate}
              isLast
            />
          </tbody>
        </table>
      </EmailHighlight>

      <EmailDivider />

      {/* What they have access to */}
      <EmailHeading>What's included in your plan</EmailHeading>

      <EmailParagraph>
        With the <strong>{planName}</strong> plan, your organisation now has full access to:
      </EmailParagraph>

      <table
        cellPadding={0}
        cellSpacing={0}
        style={{ width: "100%", marginBottom: "16px" }}
      >
        <tbody>
          {[
            "Post unlimited job listings to our curated talent network",
            "Search and filter verified women-first candidate profiles",
            "Access employer branding tools to showcase your culture",
            "Priority support from the BforC team",
          ].map((item) => (
            <tr key={item}>
              <td
                style={{
                  verticalAlign: "top",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "#a84370",
                  fontSize: "16px",
                  lineHeight: 1,
                }}
              >
                ✦
              </td>
              <td
                style={{
                  color: "#6b4556",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  paddingBottom: "10px",
                }}
              >
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EmailParagraph>
        Head to your dashboard to post your first role or explore the candidate
        pool — your team deserves great hires, and great candidates are waiting.
      </EmailParagraph>

      <EmailButton href={dashboardUrl}>Go to Employer Dashboard →</EmailButton>

      <EmailDivider />

      {/* Support note */}
      <EmailParagraph>
        Questions about your subscription or need an invoice?{" "}
        <a
          href="mailto:support@bforc.in"
          style={{ color: "#a84370", textDecoration: "none", fontWeight: 600 }}
        >
          support@bforc.in
        </a>{" "}
        — we typically respond within one business day.
      </EmailParagraph>

      <EmailParagraph>
        With gratitude,
        <br />
        <strong style={{ color: "#1a0a12" }}>The BforC Team</strong>
      </EmailParagraph>
    </BaseEmail>
  );
}

/* ─── Internal helper ─────────────────────────────────────────────────────── */

interface ReceiptRowProps {
  label: string;
  value: string;
  isFirst?: boolean;
  isLast?: boolean;
  highlight?: boolean;
  mono?: boolean;
}

function ReceiptRow({
  label,
  value,
  isFirst = false,
  isLast = false,
  highlight = false,
  mono = false,
}: ReceiptRowProps) {
  const borderTop = isFirst ? "none" : "1px solid #f0d9e5";

  return (
    <tr>
      <td
        style={{
          borderTop,
          paddingTop: isFirst ? 0 : "12px",
          paddingBottom: isLast ? 0 : "12px",
          paddingRight: "16px",
          color: "#9e7086",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.3px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          width: "40%",
          verticalAlign: "middle",
        }}
      >
        {label}
      </td>
      <td
        style={{
          borderTop,
          paddingTop: isFirst ? 0 : "12px",
          paddingBottom: isLast ? 0 : "12px",
          color: highlight ? "#a84370" : "#1a0a12",
          fontSize: highlight ? "17px" : "14px",
          fontWeight: highlight ? 700 : 500,
          fontFamily: mono
            ? "'Courier New', Courier, monospace"
            : "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          verticalAlign: "middle",
          wordBreak: "break-all",
        }}
      >
        {value}
      </td>
    </tr>
  );
}
