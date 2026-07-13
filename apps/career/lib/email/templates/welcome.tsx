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

export interface WelcomeEmailProps {
  userName: string;
  role: "seeker" | "employer";
  dashboardUrl: string;
}

export function getSubject({ userName }: WelcomeEmailProps): string {
  return `Welcome to BforC Careers, ${userName}! 🌸`;
}

const SEEKER_NEXT_STEP = {
  badge: "Next Step",
  heading: "Complete your profile",
  body: "A complete profile helps employers discover you faster. Add your skills, experience, and a short bio — it only takes a few minutes and makes a big difference.",
  cta: "Complete My Profile",
} as const;

const EMPLOYER_NEXT_STEP = {
  badge: "Next Step",
  heading: "Post your first job",
  body: "You're all set to find talented women ready to grow with your team. Create your first job listing and start receiving applications from motivated candidates.",
  cta: "Post a Job",
} as const;

const SEEKER_FEATURES = [
  "🔍  Browse hundreds of women-friendly job listings",
  "📄  One-click apply with your BforC profile",
  "🔔  Get notified the moment a matching job is posted",
  "💬  Connect with a community of women professionals",
];

const EMPLOYER_FEATURES = [
  "📝  Post unlimited job listings",
  "📊  Track applications in a simple dashboard",
  "🌟  Reach women actively looking for new opportunities",
  "🤝  Build a diverse and inclusive team",
];

export default function WelcomeEmail({
  userName,
  role,
  dashboardUrl,
}: WelcomeEmailProps) {
  const isSeeker = role === "seeker";
  const step = isSeeker ? SEEKER_NEXT_STEP : EMPLOYER_NEXT_STEP;
  const features = isSeeker ? SEEKER_FEATURES : EMPLOYER_FEATURES;

  return (
    <BaseEmail preview={`Welcome to BforC Careers, ${userName}! We're so glad you're here.`}>
      <EmailHeading>Welcome, {userName}! 🌸</EmailHeading>

      <EmailParagraph>
        We&apos;re so glad you&apos;ve joined BforC Careers — a platform built
        with one goal:{" "}
        <strong style={{ color: "#a84370" }}>
          empowering women across India
        </strong>{" "}
        to find meaningful work and grow their careers with confidence.
      </EmailParagraph>

      <EmailParagraph>
        {isSeeker
          ? "Whether you're looking for your first job, a fresh start, or the next big step — BforC is here to help you get there."
          : "Thank you for choosing to hire through BforC. By posting here, you're investing in women's careers — and that matters deeply."}
      </EmailParagraph>

      <EmailDivider />

      {/* Role-specific next step */}
      <div style={{ margin: "4px 0 8px" }}>
        <EmailBadge>{step.badge}</EmailBadge>
      </div>
      <h2
        style={{
          color: "#1a0a12",
          fontSize: "18px",
          fontWeight: 700,
          margin: "10px 0 8px",
          lineHeight: 1.4,
        }}
      >
        {step.heading}
      </h2>
      <EmailParagraph>{step.body}</EmailParagraph>

      <EmailButton href={dashboardUrl}>{step.cta} →</EmailButton>

      <EmailDivider />

      {/* Feature list */}
      <EmailHighlight>
        <p
          style={{
            color: "#1a0a12",
            fontSize: "13px",
            fontWeight: 700,
            margin: "0 0 12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          What&apos;s waiting for you
        </p>
        {features.map((feature) => (
          <p
            key={feature}
            style={{
              color: "#6b4556",
              fontSize: "14px",
              lineHeight: 1.6,
              margin: "0 0 6px",
            }}
          >
            {feature}
          </p>
        ))}
      </EmailHighlight>

      <EmailParagraph>
        If you ever have questions or need a hand, our team is just a reply
        away. Here&apos;s to new beginnings — we&apos;re rooting for you! 💪
      </EmailParagraph>

      <p
        style={{
          color: "#9e7086",
          fontSize: "13px",
          lineHeight: 1.6,
          margin: "24px 0 0",
        }}
      >
        With warmth,
        <br />
        <strong style={{ color: "#a84370" }}>The BforC Careers Team</strong>
      </p>
    </BaseEmail>
  );
}
