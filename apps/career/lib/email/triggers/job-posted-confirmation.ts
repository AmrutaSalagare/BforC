import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import JobPostedConfirmationEmail, { getSubject } from "@/lib/email/templates/job-posted-confirmation";

interface JobPostedConfirmationInput {
  to: string;
  employerName: string;
  jobTitle: string;
  location: string;
  jobType: string;
}

export async function sendJobPostedConfirmationEmail(input: JobPostedConfirmationInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = `${baseUrl}/employers/dashboard/jobs`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ jobTitle: input.jobTitle }),
    template: React.createElement(JobPostedConfirmationEmail, {
      employerName: input.employerName,
      jobTitle: input.jobTitle,
      location: input.location,
      jobType: input.jobType,
      dashboardUrl,
    }),
  });
}
