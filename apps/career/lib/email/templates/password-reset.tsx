import * as React from "react";
import {
  BaseEmail,
  EmailHeading,
  EmailParagraph,
  EmailButton,
  EmailDivider,
  EmailHighlight,
} from "@/lib/email/base";

export interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
}

export function getSubject(_props: PasswordResetEmailProps): string {
  return "Reset your BforC password";
}

export default function PasswordResetEmail({
  userName,
  resetUrl,
}: PasswordResetEmailProps) {
  return (
    <BaseEmail preview="Reset your BforC Careers password — link expires in 1 hour.">
      <EmailHeading>Password reset request</EmailHeading>

      <EmailParagraph>
        Hi {userName}, we received a request to reset the password for your
        BforC Careers account. No worries — it happens to the best of us!
      </EmailParagraph>

      <EmailParagraph>
        Click the button below to choose a new password. This link is valid for{" "}
        <strong style={{ color: "#1a0a12" }}>1 hour</strong> from the time this
        email was sent.
      </EmailParagraph>

      <EmailButton href={resetUrl}>Reset My Password →</EmailButton>

      <EmailHighlight>
        <p
          style={{
            color: "#1a0a12",
            fontSize: "13px",
            fontWeight: 700,
            margin: "0 0 6px",
          }}
        >
          Didn&apos;t request this?
        </p>
        <p style={{ color: "#6b4556", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
          If you didn&apos;t ask to reset your password, you can safely ignore
          this email. Your account is secure and nothing has changed.
        </p>
      </EmailHighlight>

      <EmailDivider />

      {/* Security note */}
      <p
        style={{
          color: "#9e7086",
          fontSize: "13px",
          lineHeight: 1.7,
          margin: "0 0 16px",
        }}
      >
        🔒{" "}
        <strong style={{ color: "#6b4556" }}>
          BforC will never ask for your password via email.
        </strong>{" "}
        If you ever receive a suspicious message asking for your password or
        personal details, please do not respond and report it to us immediately.
      </p>

      <p
        style={{
          color: "#9e7086",
          fontSize: "13px",
          lineHeight: 1.6,
          margin: "0 0 4px",
        }}
      >
        If the button above doesn&apos;t work, copy and paste this link into
        your browser:
      </p>
      <p
        style={{
          color: "#a84370",
          fontSize: "13px",
          wordBreak: "break-all",
          margin: "0 0 24px",
        }}
      >
        {resetUrl}
      </p>

      <p
        style={{
          color: "#9e7086",
          fontSize: "13px",
          lineHeight: 1.6,
          margin: "24px 0 0",
        }}
      >
        Stay safe,
        <br />
        <strong style={{ color: "#a84370" }}>The BforC Careers Team</strong>
      </p>
    </BaseEmail>
  );
}
