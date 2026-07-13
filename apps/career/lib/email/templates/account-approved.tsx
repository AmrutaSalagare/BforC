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

export interface AccountApprovedProps {
  employerName: string;
  companyName: string;
  dashboardUrl: string;
}

export function getSubject(props: AccountApprovedProps): string {
  return `🎉 ${props.companyName} is now verified on BforC Careers!`;
}

export default function AccountApproved({
  employerName,
  companyName,
  dashboardUrl,
}: AccountApprovedProps) {
  return (
    <BaseEmail
      preview={`Congratulations! ${companyName} has been verified on BforC Careers. Your verified badge is live.`}
    >
      <EmailBadge>✓ Verified</EmailBadge>
      <div style={{ height: "12px" }} />
      <EmailHeading>Congratulations, {employerName}! 🎊</EmailHeading>
      <EmailParagraph>
        We&apos;re delighted to let you know that <strong>{companyName}</strong> has been
        reviewed and officially verified on BforC Careers. Your organisation is now part of a
        trusted network committed to empowering women across India.
      </EmailParagraph>

      <EmailHighlight>
        <p style={highlightHeadingStyle}>What your Verified badge means:</p>
        <p style={benefitStyle}>✦ &nbsp;A verified badge appears on your company profile</p>
        <p style={benefitStyle}>✦ &nbsp;Candidates trust verified employers 3× more</p>
        <p style={benefitStyle}>✦ &nbsp;Your jobs are highlighted in search results</p>
        <p style={{ ...benefitStyle, marginBottom: 0 }}>
          ✦ &nbsp;Priority placement in the BforC employer directory
        </p>
      </EmailHighlight>

      <EmailParagraph>
        You can now attract top talent from across the country. Job postings from verified
        employers consistently receive more qualified applications from women who are specifically
        looking for safe, inclusive, and growth-oriented workplaces.
      </EmailParagraph>

      <EmailButton href={dashboardUrl}>Go to Your Dashboard →</EmailButton>
      <EmailDivider />
      <EmailParagraph>
        Thank you for being part of BforC&apos;s mission to build more equitable workplaces
        and create real opportunities for women across India. Together, we&apos;re making a
        difference. 🌸
      </EmailParagraph>
      <p style={signOffStyle}>
        With gratitude,
        <br />
        <strong>The BforC Team</strong>
      </p>
    </BaseEmail>
  );
}

const highlightHeadingStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "13px",
  fontWeight: 700,
  color: "#a84370",
  letterSpacing: "0.3px",
};

const benefitStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "13px",
  color: "#1a0a12",
  lineHeight: 1.6,
};

const signOffStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b4556",
  lineHeight: 1.8,
  margin: 0,
};
