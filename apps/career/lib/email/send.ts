import { render } from "@react-email/render";
import type { ReactElement } from "react";
import { resend, EMAIL_FROM } from "./client";

interface SendEmailOptions {
  to: string;
  subject: string;
  template: ReactElement;
}

/**
 * Sends a transactional email via Resend.
 * Errors are logged but never rethrown — email failures must never break user flows.
 */
export async function sendEmail({ to, subject, template }: SendEmailOptions): Promise<void> {
  if (!resend) {
    // Dev: log the email details so developers know it would have been sent.
    console.info(`[EMAIL] (no API key) To: ${to} | Subject: ${subject}`);
    return;
  }

  try {
    const html = await render(template);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`[EMAIL] Failed to send to ${to}:`, error);
    }
  } catch (err) {
    console.error(`[EMAIL] Unexpected error sending to ${to}:`, err);
  }
}
