import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import NewApplicationReceivedEmail, { getSubject } from "@/lib/email/templates/new-application-received";

interface NewApplicationReceivedInput {
  to: string;
  employerName: string;
  seekerName: string;
  jobTitle: string;
  appliedAt: string;
}

export async function sendNewApplicationReceivedEmail(input: NewApplicationReceivedInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const applicantsUrl = `${baseUrl}/employers/dashboard/applicants`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ employerName: input.employerName, seekerName: input.seekerName, jobTitle: input.jobTitle, appliedAt: input.appliedAt, applicantsUrl }),
    template: React.createElement(NewApplicationReceivedEmail, {
      employerName: input.employerName,
      seekerName: input.seekerName,
      jobTitle: input.jobTitle,
      appliedAt: input.appliedAt,
      applicantsUrl,
    }),
  });
}
