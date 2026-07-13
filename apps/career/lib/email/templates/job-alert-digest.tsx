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

export interface JobAlertDigestProps {
  seekerName: string;
  jobs: Array<{
    title: string;
    companyName: string;
    location: string;
    jobType: string;
    url: string;
  }>;
  browseAllUrl: string;
}

export function getSubject(props: JobAlertDigestProps): string {
  const count = props.jobs.length;
  return count > 0
    ? `${count} new job${count > 1 ? "s" : ""} waiting for you this week 🌸`
    : "Keep your profile sharp — new jobs are coming!";
}

export default function JobAlertDigest({ seekerName, jobs, browseAllUrl }: JobAlertDigestProps) {
  return (
    <BaseEmail preview={`${jobs.length} new opportunities curated for you this week, ${seekerName}.`}>
      <EmailBadge>Weekly Job Digest</EmailBadge>
      <div style={{ height: "12px" }} />
      <EmailHeading>Your weekly opportunities ✨</EmailHeading>
      <EmailParagraph>
        Hi {seekerName}, here are the latest jobs we found for you this week. Every opportunity
        is a step forward — take a look and apply to the ones that excite you!
      </EmailParagraph>

      {jobs.length === 0 ? (
        <EmailHighlight>
          <p style={{ margin: 0, color: "#6b4556", fontSize: "14px", lineHeight: 1.6 }}>
            No new postings matched your profile this week, but new opportunities are added every
            day. Keep your profile updated to stay ahead!
          </p>
        </EmailHighlight>
      ) : (
        <div>
          {jobs.map((job, idx) => (
            <div key={idx} style={jobCardStyle}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td>
                      <p style={jobTitleStyle}>{job.title}</p>
                      <p style={jobMetaStyle}>
                        {job.companyName}
                        <span style={dotStyle}>·</span>
                        {job.location}
                        <span style={dotStyle}>·</span>
                        {job.jobType}
                      </p>
                    </td>
                    <td style={{ textAlign: "right" as const, verticalAlign: "middle" }}>
                      <a href={job.url} style={viewButtonStyle}>
                        View →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <EmailDivider />
      <EmailParagraph>
        Don&apos;t see the right fit? Browse all active jobs on BforC Careers and find your
        next opportunity.
      </EmailParagraph>
      <EmailButton href={browseAllUrl}>Browse All Jobs →</EmailButton>
      <EmailDivider />
      <p style={footerNoteStyle}>
        You&apos;re receiving this digest because you have a seeker account on BforC Careers.
        We send this every Monday morning.
      </p>
    </BaseEmail>
  );
}

const jobCardStyle: React.CSSProperties = {
  backgroundColor: "#fff8fb",
  border: "1px solid #f0d9e5",
  borderRadius: "10px",
  padding: "14px 18px",
  marginBottom: "10px",
};

const jobTitleStyle: React.CSSProperties = {
  margin: "0 0 4px",
  fontSize: "15px",
  fontWeight: 600,
  color: "#1a0a12",
};

const jobMetaStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#6b4556",
};

const dotStyle: React.CSSProperties = {
  margin: "0 6px",
  color: "#c8a0b4",
};

const viewButtonStyle: React.CSSProperties = {
  color: "#a84370",
  fontSize: "13px",
  fontWeight: 600,
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const footerNoteStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9e7086",
  margin: 0,
  lineHeight: 1.6,
};
