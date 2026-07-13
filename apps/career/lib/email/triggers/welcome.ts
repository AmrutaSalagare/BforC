import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import WelcomeEmail, { getSubject } from "@/lib/email/templates/welcome";

interface WelcomeEmailInput {
  to: string;
  userName: string;
  role: "seeker" | "employer";
}

export async function sendWelcomeEmail({ to, userName, role }: WelcomeEmailInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const dashboardUrl = role === "employer"
    ? `${baseUrl}/employers/dashboard`
    : `${baseUrl}/dashboard`;

  await sendEmail({
    to,
    subject: getSubject({ userName, role, dashboardUrl }),
    template: React.createElement(WelcomeEmail, { userName, role, dashboardUrl }),
  });
}
