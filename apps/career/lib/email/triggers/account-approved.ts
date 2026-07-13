import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import AccountApprovedEmail, { getSubject } from "@/lib/email/templates/account-approved";

interface AccountApprovedInput {
  to: string;
  employerName: string;
  companyName: string;
}

export async function sendAccountApprovedEmail(input: AccountApprovedInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = `${baseUrl}/employers/dashboard`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ employerName: input.employerName, companyName: input.companyName, dashboardUrl }),
    template: React.createElement(AccountApprovedEmail, {
      employerName: input.employerName,
      companyName: input.companyName,
      dashboardUrl,
    }),
  });
}
