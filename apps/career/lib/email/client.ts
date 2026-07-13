import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// Resend client — lazily created so missing keys don't crash the build.
export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "BforC Careers <noreply@bforc.in>";
