export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workModel: string;
  salaryRange: string;
  seniority: string;
  techStack: string[];
  source: string;
  postedAt: string;
  verified: boolean;
  riskFlags: string[];
  matchScore: number;
  confidenceBand: "high" | "medium" | "low";
  whyMatches: string[];
  potentialGaps: string[];
  summary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface SavedJobData {
  id: string;
  title: string;
  company: string;
  location: string;
  workModel: string;
  salaryRange: string;
  seniority: string;
  source: string;
  postedAt: string;
  verified: boolean;
  matchScore: number;
  personalNotes: string;
}

export interface TrackerCard {
  id: string;
  title: string;
  company: string;
  location: string;
  stage: "applied" | "screening" | "interviewing" | "offer";
  stageLabel: string;
  timeAgo: string;
  aiSuggestion?: string;
  actionLabel?: string;
  interviewers?: number;
}

export interface InterviewData {
  role: string;
  company: string;
  question: string;
  confidenceScore: number;
  clarityScore: number;
  keywordsDetected: { label: string; type: string }[];
  checklist: { label: string; description: string; done: boolean }[];
}
