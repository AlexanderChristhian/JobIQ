export interface InterviewFeedbackItem {
	id: string;
	label: string;
	score: number;
}

export interface InterviewFeedback {
	feedback: InterviewFeedbackItem[];
	suggestion: string;
}

export interface InterviewSubmitPayload {
	answer: string;
	questionIndex: number;
	question: string;
}

export interface TrackerSuggestionPayload {
	cardId: string;
	title: string;
	company: string;
	stage: string;
}

export interface TrackerSuggestion {
	cardId: string;
	suggestion: string;
}

export interface RecommendationsRequestPayload {
	timestamp: number;
}

export interface WizardEventMap {
	"interview:submit_answer": InterviewSubmitPayload;
	"interview:send_feedback": InterviewFeedback;
	"tracker:request_suggestion": TrackerSuggestionPayload;
	"tracker:send_suggestion": TrackerSuggestion;
	"recommendations:request": RecommendationsRequestPayload;
	"recommendations:send_results": RecommendationsResults;
	"wizard:connected": null;
	"wizard:disconnected": null;
}

export interface RecommendationJob {
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

export interface RecommendationsResults {
	jobs: RecommendationJob[];
}

export const ROOM = "jobiq";
