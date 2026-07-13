export type JobType = "Full-time" | "Part-time" | "Contract" | "Volunteer";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  tags: string[];
  womenFriendly: boolean;
  postedDaysAgo: number;
  type: JobType;
  isVerified?: boolean;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  rating: number;
  openRoles: number;
  womenFriendly: boolean;
  location: string;
  category: string;
  logoUrl?: string | null;
  isVerified?: boolean;
};

export type JobQuery = {
  q?: string;
  location?: string;
  type?: string;
  remoteOnly?: boolean;
  limit?: number;
};

export type CompanyQuery = {
  q?: string;
  limit?: number;
};
