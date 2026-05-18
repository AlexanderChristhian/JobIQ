import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { generateStructured } from "@/lib/ai";
import {
	SESSION_COOKIE,
	getUserBySession,
	updateUserProfileFromCv,
	type ConfidenceBand,
	type RecommendedRole,
} from "@/lib/server-db";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

const allowedExtensions = new Set(["pdf", "docx", "txt", "md"]);

const mimeByExtension: Record<string, string> = {
	pdf: "application/pdf",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	txt: "text/plain",
	md: "text/markdown",
};

const experienceSchema = {
	type: "object",
	properties: {
		role: { type: "string" },
		company: { type: "string" },
		period: { type: "string" },
	},
	required: ["role", "company", "period"],
	additionalProperties: false,
};

const recommendationSchema = {
	type: "object",
	properties: {
		title: { type: "string" },
		location: { type: "string" },
		workModel: { type: "string" },
		salaryRange: { type: "string" },
		match: { type: "integer" },
		confidenceBand: { type: "string", enum: ["high", "medium", "low"] },
		focus: { type: "string" },
		whyMatches: { type: "array", items: { type: "string" } },
		potentialGaps: { type: "array", items: { type: "string" } },
		searchKeywords: { type: "array", items: { type: "string" } },
	},
	required: [
		"title",
		"location",
		"workModel",
		"salaryRange",
		"match",
		"confidenceBand",
		"focus",
		"whyMatches",
		"potentialGaps",
		"searchKeywords",
	],
	additionalProperties: false,
};

const cvReviewSchema = {
	type: "object",
	properties: {
		profile: {
			type: "object",
			properties: {
				title: { type: "string" },
				location: { type: "string" },
				summary: { type: "string" },
				skills: { type: "array", items: { type: "string" } },
				experience: { type: "array", items: experienceSchema },
				profileStrength: { type: "integer" },
				missingSkills: { type: "array", items: { type: "string" } },
			},
			required: [
				"title",
				"location",
				"summary",
				"skills",
				"experience",
				"profileStrength",
				"missingSkills",
			],
			additionalProperties: false,
		},
		review: {
			type: "object",
			properties: {
				headline: { type: "string" },
				strengths: { type: "array", items: { type: "string" } },
				improvements: { type: "array", items: { type: "string" } },
				keywords: { type: "array", items: { type: "string" } },
				suggestedSearches: { type: "array", items: { type: "string" } },
			},
			required: [
				"headline",
				"strengths",
				"improvements",
				"keywords",
				"suggestedSearches",
			],
			additionalProperties: false,
		},
		recommendations: {
			type: "array",
			items: recommendationSchema,
		},
	},
	required: ["profile", "review", "recommendations"],
	additionalProperties: false,
};

interface CvReviewResult {
	profile: {
		title: string;
		location: string;
		summary: string;
		skills: string[];
		experience: Array<{ role: string; company: string; period: string }>;
		profileStrength: number;
		missingSkills: string[];
	};
	review: {
		headline: string;
		strengths: string[];
		improvements: string[];
		keywords: string[];
		suggestedSearches: string[];
	};
	recommendations: Array<{
		title: string;
		location: string;
		workModel: string;
		salaryRange: string;
		match: number;
		confidenceBand: ConfidenceBand;
		focus: string;
		whyMatches: string[];
		potentialGaps: string[];
		searchKeywords: string[];
	}>;
}

function fileExtension(filename: string) {
	return filename.split(".").pop()?.toLowerCase() ?? "";
}

function clean(value: FormDataEntryValue | null) {
	return typeof value === "string" ? value.trim() : "";
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function compactStringArray(items: unknown[], limit: number) {
	return Array.from(
		new Set(
			items
				.map((item) => (typeof item === "string" ? item.trim() : ""))
				.filter(Boolean)
				.slice(0, limit),
		),
	);
}

function createRecommendedRoles(result: CvReviewResult): RecommendedRole[] {
	return result.recommendations.slice(0, 6).map((role) => ({
		title: role.title.trim(),
		company: "Role search",
		location: role.location.trim() || "Flexible",
		match: clamp(Number(role.match) || 0, 0, 100),
		workModel: role.workModel.trim() || "Flexible",
		salaryRange: role.salaryRange.trim() || "Research salary before applying",
		focus: role.focus.trim(),
		whyMatches: compactStringArray(role.whyMatches, 5),
		potentialGaps: compactStringArray(role.potentialGaps, 5),
		searchKeywords: compactStringArray(role.searchKeywords, 8),
		confidenceBand: role.confidenceBand,
	}));
}

export async function POST(request: Request) {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const formData = await request.formData().catch(() => null);
	if (!formData) {
		return NextResponse.json(
			{ message: "Send the CV as a multipart form upload." },
			{ status: 400 },
		);
	}

	const file = formData.get("cv");

	if (!(file instanceof File)) {
		return NextResponse.json(
			{ message: "Upload a CV file before running the review." },
			{ status: 400 },
		);
	}

	const extension = fileExtension(file.name);
	if (!allowedExtensions.has(extension)) {
		return NextResponse.json(
			{ message: "Use a PDF, DOCX, TXT, or Markdown CV file." },
			{ status: 400 },
		);
	}

	if (file.size > MAX_FILE_BYTES) {
		return NextResponse.json(
			{ message: "CV file must be smaller than 8 MB." },
			{ status: 400 },
		);
	}

	const targetRole = clean(formData.get("targetRole"));
	const preferredLocation = clean(formData.get("preferredLocation"));
	const workModel = clean(formData.get("workModel")) || "Flexible";
	const notes = clean(formData.get("notes"));
	const mimeType = file.type || mimeByExtension[extension];
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const instructions = JSON.stringify({
		task: "Review this CV and return a structured candidate profile plus role recommendations.",
		userInputs: {
			targetRole,
			preferredLocation,
			workModel,
			notes,
		},
		rules: [
			"Base profile facts only on the CV and explicit user inputs.",
			"Recommend job search targets, not fake employer postings.",
			"Do not invent company names, active vacancies, dates, degrees, or certifications.",
			"Make recommendations specific enough that the user can search real job boards.",
			"Do not use sensitive traits for ranking or filtering.",
		],
	});

	let userContent:
		| Array<{ type: "input_text"; text: string }>
		| Array<
				| { type: "input_file"; filename: string; file_data: string }
				| { type: "input_text"; text: string }
		  >;

	if (extension === "txt" || extension === "md") {
		userContent = [
			{
				type: "input_text",
				text: `${instructions}\n\nCV text:\n${fileBuffer.toString("utf8").slice(0, 70000)}`,
			},
		];
	} else if (extension === "docx") {
		const extracted = await mammoth.extractRawText({ buffer: fileBuffer });
		const cvText = extracted.value.trim();
		if (!cvText) {
			return NextResponse.json(
				{ message: "We could not extract readable text from this DOCX file." },
				{ status: 400 },
			);
		}

		userContent = [
			{
				type: "input_text",
				text: `${instructions}\n\nCV text:\n${cvText.slice(0, 70000)}`,
			},
		];
	} else {
		userContent = [
			{
				type: "input_file",
				filename: file.name,
				file_data: `data:${mimeType};base64,${fileBuffer.toString("base64")}`,
			},
			{ type: "input_text", text: instructions },
		];
	}

	try {
		const result = await generateStructured<CvReviewResult>({
			name: "jobiq_cv_review",
			schema: cvReviewSchema,
			maxOutputTokens: 6500,
			system:
				"You are JobIQ's career analysis assistant. Extract only evidence-backed CV information, explain uncertainty plainly, and generate practical role search targets without fabricating real job postings.",
			user: userContent,
		});

		if (result.status !== "live") {
			return NextResponse.json(
				{ message: result.reason },
				{ status: 503 },
			);
		}

		const data = result.data;
		const updatedUser = await updateUserProfileFromCv(user.id, {
			title: data.profile.title,
			location: data.profile.location,
			summary: data.profile.summary,
			experience: data.profile.experience,
			skills: compactStringArray(data.profile.skills, 24),
			profileStrength: clamp(Number(data.profile.profileStrength) || 75, 35, 98),
			missingSkills: compactStringArray(data.profile.missingSkills, 8),
			recommendedRoles: createRecommendedRoles(data),
			cvFileName: file.name,
			jobPreferences: {
				targetRole,
				preferredLocation,
				workModel,
				notes,
			},
			cvReview: {
				headline: data.review.headline,
				strengths: compactStringArray(data.review.strengths, 8),
				improvements: compactStringArray(data.review.improvements, 8),
				keywords: compactStringArray(data.review.keywords, 16),
				suggestedSearches: compactStringArray(data.review.suggestedSearches, 8),
			},
		});

		return NextResponse.json({
			user: updatedUser,
			review: updatedUser.profile.cvReview,
			recommendations: updatedUser.profile.recommendedRoles,
			aiStatus: "live",
			model: result.model,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Unable to review this CV right now.",
			},
			{ status: 500 },
		);
	}
}
