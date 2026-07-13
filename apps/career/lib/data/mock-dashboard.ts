export type DashboardMetrics = {
  totalViews: number;
  activeJobs: number;
  totalApplicants: number;
  hiredCount: number;
};

export type JobStatus = "Active" | "Paused" | "Closed" | "Draft";

export type DashboardJob = {
  id: string;
  title: string;
  type: string;
  location: string;
  postedAt: string;
  status: JobStatus;
  views: number;
  applicantsCount: number;
};

export type ApplicantStatus = "New" | "Under Review" | "Interviewing" | "Hired" | "Rejected";

export type Applicant = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  role: string;
  appliedAt: string;
  status: ApplicantStatus;
  score: number;
  avatarUrl?: string;
};
