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

export interface JobPostedConfirmationProps {
  employerName: string;
  jobTitle: string;
  location: string;
  jobType: string;
  dashboardUrl: string;
}

export function getSubject(props: Pick<JobPostedConfirmationProps, "jobTitle">): string {
  return `Your job listing "${props.jobTitle}" is now live! 🚀`;
}

export default function JobPostedConfirmation({
  employerName,
  jobTitle,
  location,
  jobType,
  dashboardUrl,
}: JobPostedConfirmationProps) {
  const preview = `Great news, ${employerName}! Your job listing for "${jobTitle}" has been published successfully.`;

  return (
    <BaseEmail preview={preview}>
      <EmailHeading>Your job is live! 🚀</EmailHeading>

      <EmailParagraph>Hi {employerName},</EmailParagraph>
      <EmailParagraph>
        Wonderful news! Your job listing has been published successfully on the
        BforC Careers platform. Talented women across India can now discover and
        apply for this opportunity.
      </EmailParagraph>

      <EmailHighlight>
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
          Job Listing Details
        </p>
        <p
          style={{
            margin: "0 0 4px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a0a12",
          }}
        >
          {jobTitle}
        </p>

        <table
          cellPadding={0}
          cellSpacing={0}
          style={{ marginTop: "12px", width: "100%" }}
        >
          <tbody>
            <tr>
              <td style={{ paddingBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#9e7086",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  📍 Location
                </span>
                <span style={{ fontSize: "14px", color: "#1a0a12" }}>
                  {location}
                </span>
              </td>
              <td style={{ paddingBottom: "8px", paddingLeft: "24px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#9e7086",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  💼 Job Type
                </span>
                <span style={{ fontSize: "14px", color: "#1a0a12" }}>
                  {jobType}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "12px" }}>
          <EmailBadge>Published</EmailBadge>
        </div>
      </EmailHighlight>

      <EmailParagraph>
        You can manage your listing — edit details, view applicants, update the
        status, or close the role — all from your employer dashboard.
      </EmailParagraph>

      <EmailButton href={dashboardUrl}>View on Dashboard</EmailButton>

      <EmailDivider />

      <EmailParagraph>
        Thank you for choosing BforC Careers to find your next great hire. We
        are proud to help build more inclusive workplaces across India. 💖
      </EmailParagraph>
    </BaseEmail>
  );
}
