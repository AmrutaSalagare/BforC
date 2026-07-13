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

export interface ApplicationStatusUpdateProps {
  seekerName: string;
  jobTitle: string;
  companyName: string;
  newStatus: "reviewing" | "shortlisted" | "rejected" | "withdrawn";
  dashboardUrl: string;
}

type StatusKey = ApplicationStatusUpdateProps["newStatus"];

interface StatusConfig {
  subject: (jobTitle: string) => string;
  badge: string;
  heading: string;
  preview: (name: string, company: string) => string;
  body: (name: string, company: string) => React.ReactNode;
  cta: string;
}

const STATUS_CONFIG: Record<StatusKey, StatusConfig> = {
  reviewing: {
    subject: (jobTitle) =>
      `Your application for ${jobTitle} is being reviewed 👀`,
    badge: "Under Review",
    heading: "Your application is in review!",
    preview: (name, company) =>
      `Great news, ${name}! ${company} is reviewing your application.`,
    body: (name, company) => (
      <>
        <EmailParagraph>Hi {name},</EmailParagraph>
        <EmailParagraph>
          Great news! <strong>{company}</strong> has started reviewing your
          application. This means your profile caught their attention —
          that&apos;s already a win! 🎉
        </EmailParagraph>
        <EmailParagraph>
          Sit tight while they go through the details. We&apos;ll keep you
          posted every step of the way.
        </EmailParagraph>
      </>
    ),
    cta: "View My Application",
  },

  shortlisted: {
    subject: (jobTitle) => `🎊 You've been shortlisted for ${jobTitle}!`,
    badge: "Shortlisted",
    heading: "You've been shortlisted! 🎊",
    preview: (name, company) =>
      `Congratulations ${name}! You've been shortlisted by ${company}.`,
    body: (name, company) => (
      <>
        <EmailParagraph>Hi {name},</EmailParagraph>
        <EmailParagraph>
          Congratulations! 🌟 Out of all the applicants,{" "}
          <strong>{company}</strong> has shortlisted <em>you</em> for this
          role. This is a fantastic milestone — you&apos;re one step closer!
        </EmailParagraph>
        <EmailParagraph>
          The team will be in touch soon with next steps. In the meantime, take
          a moment to celebrate — you&apos;ve earned it! ✨
        </EmailParagraph>
      </>
    ),
    cta: "View Application Details",
  },

  rejected: {
    subject: (jobTitle) => `An update on your application for ${jobTitle}`,
    badge: "Not Selected",
    heading: "Keep going — your journey continues",
    preview: (name) => `Hi ${name}, an update on your recent application.`,
    body: (name, company) => (
      <>
        <EmailParagraph>Hi {name},</EmailParagraph>
        <EmailParagraph>
          We know this isn&apos;t the news you were hoping for.{" "}
          <strong>{company}</strong> has decided not to move forward with your
          application this time — but please don&apos;t let this discourage
          you.
        </EmailParagraph>
        <EmailParagraph>
          Every application is a step forward. Your skills, your story, and
          your ambition are still very much valued here at BforC. There are
          hundreds of opportunities waiting for someone exactly like you. 💪
        </EmailParagraph>
        <EmailParagraph>
          Head back to your dashboard to explore more roles that match your
          profile. The right opportunity is out there!
        </EmailParagraph>
      </>
    ),
    cta: "Explore More Jobs",
  },

  withdrawn: {
    subject: (jobTitle) => `Application withdrawal confirmed — ${jobTitle}`,
    badge: "Withdrawn",
    heading: "Your withdrawal is confirmed",
    preview: (name) =>
      `Hi ${name}, your application has been successfully withdrawn.`,
    body: (name, company) => (
      <>
        <EmailParagraph>Hi {name},</EmailParagraph>
        <EmailParagraph>
          We&apos;ve successfully withdrawn your application for the role at{" "}
          <strong>{company}</strong>. No further action is needed from your
          side.
        </EmailParagraph>
        <EmailParagraph>
          If this was a mistake or you change your mind, you&apos;re always
          welcome to apply again. Your dashboard has plenty of exciting
          opportunities waiting for you.
        </EmailParagraph>
      </>
    ),
    cta: "Go to My Dashboard",
  },
};

export function getSubject(
  props: Pick<ApplicationStatusUpdateProps, "jobTitle" | "newStatus">
): string {
  return STATUS_CONFIG[props.newStatus].subject(props.jobTitle);
}

export default function ApplicationStatusUpdate({
  seekerName,
  jobTitle,
  companyName,
  newStatus,
  dashboardUrl,
}: ApplicationStatusUpdateProps) {
  const config = STATUS_CONFIG[newStatus];
  const preview = config.preview(seekerName, companyName);

  return (
    <BaseEmail preview={preview}>
      <EmailHeading>{config.heading}</EmailHeading>

      {config.body(seekerName, companyName)}

      <EmailHighlight>
        <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#9e7086",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Application For
                </p>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1a0a12",
                  }}
                >
                  {jobTitle}
                </p>
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "14px",
                    color: "#6b4556",
                  }}
                >
                  at {companyName}
                </p>
                <EmailBadge>{config.badge}</EmailBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </EmailHighlight>

      <EmailButton href={dashboardUrl}>{config.cta}</EmailButton>

      <EmailDivider />

      <EmailParagraph>
        You can always track all your applications from your BforC dashboard.
        We&apos;re rooting for you every step of the way! 💖
      </EmailParagraph>
    </BaseEmail>
  );
}
