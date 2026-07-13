import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import ApplicationStatusUpdateEmail, { getSubject } from "@/lib/email/templates/application-status-update";

interface ApplicationStatusUpdateInput {
  to: string;
  seekerName: string;
  jobTitle: string;
  companyName: string;
  newStatus: "reviewing" | "shortlisted" | "rejected" | "withdrawn";
}

export async function sendApplicationStatusUpdateEmail(input: ApplicationStatusUpdateInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = `${baseUrl}/dashboard`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ jobTitle: input.jobTitle, newStatus: input.newStatus }),
    template: React.createElement(ApplicationStatusUpdateEmail, {
      seekerName: input.seekerName,
      jobTitle: input.jobTitle,
      companyName: input.companyName,
      newStatus: input.newStatus,
      dashboardUrl,
    }),
  });
}
