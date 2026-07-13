import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import ProfileIncompleteReminderEmail, { getSubject } from "@/lib/email/templates/profile-incomplete-reminder";

interface ProfileIncompleteReminderInput {
  to: string;
  userName: string;
  profileStrength: number;
}

export async function sendProfileIncompleteReminderEmail(input: ProfileIncompleteReminderInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const profileUrl = `${baseUrl}/profile`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ userName: input.userName, profileStrength: input.profileStrength, profileUrl }),
    template: React.createElement(ProfileIncompleteReminderEmail, {
      userName: input.userName,
      profileStrength: input.profileStrength,
      profileUrl,
    }),
  });
}
