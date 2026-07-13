import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import ApplicationConfirmationEmail, { getSubject } from "@/lib/email/templates/application-confirmation";

interface ApplicationConfirmationInput {
  to: string;
  seekerName: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
}

export async function sendApplicationConfirmationEmail(input: ApplicationConfirmationInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = `${baseUrl}/dashboard`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ seekerName: input.seekerName, jobTitle: input.jobTitle, companyName: input.companyName, appliedAt: input.appliedAt, dashboardUrl }),
    template: React.createElement(ApplicationConfirmationEmail, {
      seekerName: input.seekerName,
      jobTitle: input.jobTitle,
      companyName: input.companyName,
      appliedAt: input.appliedAt,
      dashboardUrl,
    }),
  });
}
