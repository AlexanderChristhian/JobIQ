import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import preferencesData from "@/data/preferences.json";
import { generateStructured } from "@/lib/ai";
import {
	SESSION_COOKIE,
	getUserBySession,
	type RecommendedRole,
	type UserProfile,
} from "@/lib/server-db";
import type {
	RecommendationJob,
	RecommendationsResults,
} from "@/lib/wizard-types";

const jobSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		title: { type: "string" },
		company: { type: "string" },
		location: { type: "string" },
		workModel: { type: "string" },
		salaryRange: { type: "string" },
		seniority: { type: "string" },
		techStack: { type: "array", items: { type: "string" } },
		source: { type: "string" },
		postedAt: { type: "string" },
		verified: { type: "boolean" },
		riskFlags: { type: "array", items: { type: "string" } },
		matchScore: { type: "integer" },
		confidenceBand: { type: "string", enum: ["high", "medium", "low"] },
		whyMatches: { type: "array", items: { type: "string" } },
		potentialGaps: { type: "array", items: { type: "string" } },
		summary: { type: "string" },
		description: { type: "string" },
		responsibilities: { type: "array", items: { type: "string" } },
		qualifications: { type: "array", items: { type: "string" } },
	},
	required: [
		"id",
		"title",
		"company",
		"location",
		"workModel",
		"salaryRange",
		"seniority",
		"techStack",
		"source",
		"postedAt",
		"verified",
		"riskFlags",
		"matchScore",
		"confidenceBand",
		"whyMatches",
		"potentialGaps",
		"summary",
		"description",
		"responsibilities",
		"qualifications",
	],
	additionalProperties: false,
};

const recommendationsSchema = {
	type: "object",
	properties: {
		jobs: {
			type: "array",
			items: jobSchema,
		},
	},
	required: ["jobs"],
	additionalProperties: false,
};

function fallbackRecommendations(): RecommendationsResults {
	return { jobs: [] };
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 60);
}

function roleToJob(role: RecommendedRole, index: number): RecommendationJob {
	return {
		id: `cv-${slugify(role.title) || index + 1}`,
		title: role.title,
		company: role.company,
		location: role.location,
		workModel: role.workModel,
		salaryRange: role.salaryRange,
		seniority: "Based on CV",
		techStack: role.searchKeywords.length > 0 ? role.searchKeywords : [],
		source: "CV analysis",
		postedAt: "Personalized now",
		verified: false,
		riskFlags: [],
		matchScore: role.match,
		confidenceBand: role.confidenceBand,
		whyMatches: role.whyMatches,
		potentialGaps: role.potentialGaps,
		summary: role.focus,
		description:
			role.focus ||
			"Search for real openings with this role title and compare each posting against your CV.",
		responsibilities: [],
		qualifications: role.searchKeywords,
	};
}

function hasProfileSignal(profile: UserProfile | null) {
	return Boolean(
		profile &&
			(profile.summary ||
				profile.skills.length > 0 ||
				profile.experience.length > 0 ||
				profile.recommendedRoles.length > 0),
	);
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({}));
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);
	const profile = body.profile ?? user?.profile ?? null;
	const preferences = body.preferences ?? preferencesData.preferences;
	const feedback = body.feedback ?? {};
	const notes = body.notes ?? {};
	const candidateJobs = Array.isArray(body.candidateJobs)
		? (body.candidateJobs as RecommendationJob[])
		: [];
	const storedRoleJobs =
		user?.profile.recommendedRoles.map((role, index) => roleToJob(role, index)) ??
		[];

	if (!hasProfileSignal(profile)) {
		return NextResponse.json({
			...fallbackRecommendations(),
			aiStatus: "mock",
			message: "Upload your CV to generate personalized recommendations.",
		});
	}

	try {
		if (candidateJobs.length === 0 && storedRoleJobs.length > 0) {
			return NextResponse.json({
				jobs: storedRoleJobs,
				aiStatus: "live",
				model: "CV review",
			});
		}

		const result = await generateStructured<RecommendationsResults>({
			name: "jobiq_recommendations",
			schema: recommendationsSchema,
			maxOutputTokens: 6500,
			system:
				"You are JobIQ's job recommendation assistant. If candidate jobs are provided, rank only those jobs. If no candidate jobs are provided, generate job search target cards from the user's CV profile without inventing real employer postings. Keep the user in control, expose uncertainty, and do not filter on sensitive traits.",
			user: JSON.stringify({
				task:
					candidateJobs.length > 0
						? "Return the best 6 to 8 recommendations for this user. Re-rank jobs, adjust summaries, and make whyMatches and potentialGaps specific to the user's profile and preferences. Preserve each candidate job id."
						: "Return 4 to 6 job search target cards. Do not name companies or active job openings. Use company='Role search', source='CV analysis', postedAt='Personalized now', verified=false, and responsibilities/qualifications as role guidance only.",
				profile,
				preferences,
				feedback,
				notes,
				candidateJobs,
			}),
		});

		if (result.status === "mock") {
			return NextResponse.json({
				jobs: storedRoleJobs,
				aiStatus: "mock",
				message: result.reason,
			});
		}

		return NextResponse.json({
			...result.data,
			aiStatus: "live",
			model: result.model,
		});
	} catch (error) {
		return NextResponse.json({
			jobs: storedRoleJobs,
			aiStatus: "mock",
			message:
				error instanceof Error
					? error.message
					: "AI recommendations are unavailable.",
		});
	}
}
