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

export interface ApplicationConfirmationProps {
  seekerName: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  dashboardUrl: string;
}

export function getSubject({ jobTitle, companyName }: ApplicationConfirmationProps): string {
  return `Your application to ${jobTitle} at ${companyName} is in! 🎉`;
}

export default function ApplicationConfirmation({
  seekerName,
  jobTitle,
  companyName,
  appliedAt,
  dashboardUrl,
}: ApplicationConfirmationProps) {
  const preview = `You applied to ${jobTitle} at ${companyName} — we're rooting for you!`;

  return (
    <BaseEmail preview={preview}>
      <EmailHeading>You did it, {seekerName}! 🌟</EmailHeading>

      <EmailParagraph>
        Your application has been successfully submitted. This is a big step, and
        you should be proud — every great career moment starts with exactly this
        kind of courage.
      </EmailParagraph>

      <EmailHighlight>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#a84370",
          }}
        >
          Application Summary
        </p>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#1a0a12",
            lineHeight: 1.3,
          }}
        >
          {jobTitle}
        </p>
        <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#6b4556" }}>
          {companyName}
        </p>
        <EmailBadge>Applied on {appliedAt}</EmailBadge>
      </EmailHighlight>

      <EmailParagraph>
        The hiring team at <strong style={{ color: "#1a0a12" }}>{companyName}</strong> will
        review your profile and reach out if your experience is a great match.
        Most employers respond within 3–7 business days — so sit tight and keep
        an eye on your inbox.
      </EmailParagraph>

      <EmailParagraph>
        In the meantime, you can track the status of this and all your other
        applications from your BforC dashboard — anytime, anywhere.
      </EmailParagraph>

      <EmailButton href={dashboardUrl}>Track My Application →</EmailButton>

      <EmailDivider />

      <EmailParagraph>
        Keep going — the right opportunity is closer than you think. We&apos;re here
        cheering you on every step of the way. 💪
      </EmailParagraph>

      <p style={{ margin: "0", fontSize: "14px", color: "#6b4556" }}>
        With encouragement,
        <br />
        <strong style={{ color: "#1a0a12" }}>The BforC Team</strong>
      </p>
    </BaseEmail>
  );
}
