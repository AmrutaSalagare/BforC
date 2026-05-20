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
  score: number; // AI match score
  avatarUrl?: string;
};

export const MOCK_METRICS: DashboardMetrics = {
  totalViews: 4280,
  activeJobs: 3,
  totalApplicants: 142,
  hiredCount: 5
};

export const MOCK_JOBS: DashboardJob[] = [
  {
    id: "j-1",
    title: "Program Manager - Women Empowerment",
    type: "Full-time",
    location: "Bangalore (Hybrid)",
    postedAt: "2026-05-10T10:00:00Z",
    status: "Active",
    views: 840,
    applicantsCount: 45,
  },
  {
    id: "j-2",
    title: "Senior Grant Writer",
    type: "Contract",
    location: "Remote",
    postedAt: "2026-05-12T14:30:00Z",
    status: "Active",
    views: 620,
    applicantsCount: 28,
  },
  {
    id: "j-3",
    title: "Field Operations Coordinator",
    type: "Full-time",
    location: "Delhi",
    postedAt: "2026-04-20T09:00:00Z",
    status: "Closed",
    views: 1200,
    applicantsCount: 110,
  },
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "a-1",
    jobId: "j-1",
    jobTitle: "Program Manager",
    name: "Priya Sharma",
    role: "Social Impact Leader",
    appliedAt: "2026-05-15T08:20:00Z",
    status: "New",
    score: 92,
  },
  {
    id: "a-2",
    jobId: "j-1",
    jobTitle: "Program Manager",
    name: "Anita Desai",
    role: "NGO Coordinator",
    appliedAt: "2026-05-14T11:45:00Z",
    status: "Interviewing",
    score: 88,
  },
  {
    id: "a-3",
    jobId: "j-2",
    jobTitle: "Senior Grant Writer",
    name: "Kavita Reddy",
    role: "Freelance Writer",
    appliedAt: "2026-05-16T15:10:00Z",
    status: "Under Review",
    score: 95,
  },
  {
    id: "a-4",
    jobId: "j-1",
    jobTitle: "Program Manager",
    name: "Neha Gupta",
    role: "Operations Manager",
    appliedAt: "2026-05-12T09:30:00Z",
    status: "Rejected",
    score: 65,
  },
];
