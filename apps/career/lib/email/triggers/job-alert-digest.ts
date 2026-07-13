import * as React from "react";
import { sendEmail } from "@/lib/email/send";
import JobAlertDigestEmail, { getSubject } from "@/lib/email/templates/job-alert-digest";

interface Job {
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  url: string;
}

interface JobAlertDigestInput {
  to: string;
  seekerName: string;
  jobs: Job[];
}

export async function sendJobAlertDigestEmail(input: JobAlertDigestInput) {
  const baseUrl = process.env.NEXT_PUBLIC_CAREER_SITE_URL ?? "http://localhost:3001";
  const browseAllUrl = `${baseUrl}/jobs`;

  await sendEmail({
    to: input.to,
    subject: getSubject({ seekerName: input.seekerName, jobs: input.jobs, browseAllUrl }),
    template: React.createElement(JobAlertDigestEmail, {
      seekerName: input.seekerName,
      jobs: input.jobs,
      browseAllUrl,
    }),
  });
}
