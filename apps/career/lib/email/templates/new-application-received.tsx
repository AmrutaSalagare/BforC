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

export interface NewApplicationReceivedProps {
  employerName: string;
  seekerName: string;
  jobTitle: string;
  appliedAt: string;
  applicantsUrl: string;
}

export function getSubject({ seekerName, jobTitle }: NewApplicationReceivedProps): string {
  return `New application from ${seekerName} for ${jobTitle}`;
}

export default function NewApplicationReceived({
  employerName,
  seekerName,
  jobTitle,
  appliedAt,
  applicantsUrl,
}: NewApplicationReceivedProps) {
  const preview = `${seekerName} just applied for ${jobTitle} — review their profile now.`;

  return (
    <BaseEmail preview={preview}>
      <EmailHeading>You have a new applicant! 🎯</EmailHeading>

      <EmailParagraph>
        Hi {employerName}, great news — a candidate has applied for one of your
        open roles on BforC Careers. Here&apos;s a quick summary:
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
          New Application
        </p>
        <p
          style={{
            margin: "0 0 4px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#1a0a12",
            lineHeight: 1.3,
          }}
        >
          {seekerName}
        </p>
        <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#6b4556" }}>
          applied for <strong style={{ color: "#1a0a12" }}>{jobTitle}</strong>
        </p>
        <EmailBadge>Received on {appliedAt}</EmailBadge>
      </EmailHighlight>

      <EmailParagraph>
        Candidates who hear back quickly are far more likely to stay engaged —
        and the best talent moves fast. We recommend reviewing this application
        within <strong style={{ color: "#1a0a12" }}>48 hours</strong> to give
        {" "}{seekerName} the thoughtful response she deserves.
      </EmailParagraph>

      <EmailParagraph>
        Head over to your applicants dashboard to review her full profile,
        resume, and any additional materials she has shared.
      </EmailParagraph>

      <EmailButton href={applicantsUrl}>Review Applicants →</EmailButton>

      <EmailDivider />

      <EmailParagraph>
        Thank you for hiring on BforC — every role you post helps create more
        opportunities for women across India. 🌸
      </EmailParagraph>

      <p style={{ margin: "0", fontSize: "14px", color: "#6b4556" }}>
        Warm regards,
        <br />
        <strong style={{ color: "#1a0a12" }}>The BforC Careers Team</strong>
      </p>
    </BaseEmail>
  );
}
