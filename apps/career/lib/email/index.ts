/**
 * Central barrel export for all transactional email triggers.
 * Import only what you need — each function maps to one email type.
 */

export { sendWelcomeEmail } from "./triggers/welcome";
export { sendPasswordResetEmail } from "./triggers/password-reset";
export { sendApplicationConfirmationEmail } from "./triggers/application-confirmation";
export { sendNewApplicationReceivedEmail } from "./triggers/new-application-received";
export { sendApplicationStatusUpdateEmail } from "./triggers/application-status-update";
export { sendJobPostedConfirmationEmail } from "./triggers/job-posted-confirmation";
export { sendJobAlertDigestEmail } from "./triggers/job-alert-digest";
export { sendProfileIncompleteReminderEmail } from "./triggers/profile-incomplete-reminder";
export { sendAccountApprovedEmail } from "./triggers/account-approved";
export { sendPaymentReceiptEmail } from "./triggers/payment-receipt";
