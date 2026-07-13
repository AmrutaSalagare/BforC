import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import PasswordResetEmail, { getSubject } from "@/lib/email/templates/password-reset";

interface PasswordResetEmailInput {
  to: string;
  userName: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({ to, userName, resetUrl }: PasswordResetEmailInput) {
  await sendEmail({
    to,
    subject: getSubject({ userName, resetUrl }),
    template: React.createElement(PasswordResetEmail, { userName, resetUrl }),
  });
}
