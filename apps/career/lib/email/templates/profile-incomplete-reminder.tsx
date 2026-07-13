import * as React from "react";
import {
  BaseEmail,
  EmailHeading,
  EmailParagraph,
  EmailButton,
  EmailDivider,
  EmailHighlight,
} from "@/lib/email/base";

export interface ProfileIncompleteReminderProps {
  userName: string;
  profileStrength: number;
  profileUrl: string;
}

export function getSubject(props: ProfileIncompleteReminderProps): string {
  return `Your BforC profile is ${props.profileStrength}% complete — finish it to stand out! 🌟`;
}

export default function ProfileIncompleteReminder({
  userName,
  profileStrength,
  profileUrl,
}: ProfileIncompleteReminderProps) {
  const remaining = 100 - profileStrength;

  return (
    <BaseEmail
      preview={`Your profile is ${profileStrength}% complete. A complete profile gets 3x more employer views!`}
    >
      <EmailHeading>Almost there, {userName}! 🌟</EmailHeading>
      <EmailParagraph>
        You&apos;re off to a great start! Your BforC profile is currently{" "}
        <strong>{profileStrength}% complete</strong>. Just{" "}
        <strong>{remaining}% more</strong> and you&apos;ll have a profile that truly shines.
      </EmailParagraph>

      <EmailHighlight>
        <p style={highlightHeadingStyle}>Why a complete profile matters:</p>
        <p style={highlightItemStyle}>✦ &nbsp;3× more likely to be noticed by employers</p>
        <p style={highlightItemStyle}>✦ &nbsp;Appear in more search results</p>
        <p style={highlightItemStyle}>✦ &nbsp;Unlock the ability to apply for jobs (70% required)</p>
        <p style={{ ...highlightItemStyle, marginBottom: 0 }}>
          ✦ &nbsp;Show employers your full potential
        </p>
      </EmailHighlight>

      <EmailParagraph>Here&apos;s what you can add to boost your profile:</EmailParagraph>
      <div style={checklistStyle}>
        <p style={checkItemStyle}>☐ &nbsp;Professional headline / current role</p>
        <p style={checkItemStyle}>☐ &nbsp;Location</p>
        <p style={checkItemStyle}>☐ &nbsp;Phone number</p>
        <p style={checkItemStyle}>☐ &nbsp;LinkedIn or portfolio link</p>
        <p style={checkItemStyle}>☐ &nbsp;Skills (at least 3)</p>
        <p style={checkItemStyle}>☐ &nbsp;Experience summary</p>
        <p style={{ ...checkItemStyle, marginBottom: 0 }}>☐ &nbsp;Education summary</p>
      </div>

      <EmailButton href={profileUrl}>Complete My Profile →</EmailButton>
      <EmailDivider />
      <EmailParagraph>
        Thousands of women across India are building meaningful careers through BforC. Your
        next opportunity might be just one complete profile away. We&apos;re rooting for you! 🌸
      </EmailParagraph>
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

const highlightItemStyle: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "13px",
  color: "#1a0a12",
  lineHeight: 1.5,
};

const checklistStyle: React.CSSProperties = {
  backgroundColor: "#fff8fb",
  border: "1px solid #f0d9e5",
  borderRadius: "10px",
  padding: "16px 20px",
  marginBottom: "20px",
};

const checkItemStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "13px",
  color: "#6b4556",
  lineHeight: 1.5,
};
