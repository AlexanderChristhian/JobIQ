import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/ai";
import type { InterviewFeedback } from "@/lib/wizard-types";

const interviewSchema = {
	type: "object",
	properties: {
		feedback: {
			type: "array",
			items: {
				type: "object",
				properties: {
					id: {
						type: "string",
						enum: ["clarity", "relevance", "confidence", "structure"],
					},
					label: { type: "string" },
					score: { type: "integer" },
				},
				required: ["id", "label", "score"],
				additionalProperties: false,
			},
		},
		suggestion: { type: "string" },
	},
	required: ["feedback", "suggestion"],
	additionalProperties: false,
};

function clamp(score: number) {
	return Math.max(35, Math.min(98, Math.round(score)));
}

function fallbackFeedback(answer: string, question: string): InterviewFeedback {
	const words = answer.trim().split(/\s+/).filter(Boolean);
	const hasMetric = /\b(\d+%|\$?\d+[kKmM]?|weeks?|months?|users?|revenue)\b/.test(
		answer,
	);
	const hasStructure =
		/\b(situation|task|action|result|first|then|finally|because)\b/i.test(
			answer,
		);
	const mentionsQuestion = question
		.toLowerCase()
		.split(/\W+/)
		.filter((word) => word.length > 4)
		.some((word) => answer.toLowerCase().includes(word));

	const lengthScore = words.length >= 80 ? 82 : words.length >= 45 ? 74 : 60;

	return {
		feedback: [
			{ id: "clarity", label: "Clarity", score: clamp(lengthScore + 4) },
			{
				id: "relevance",
				label: "Relevance",
				score: clamp(lengthScore + (mentionsQuestion ? 10 : -4)),
			},
			{
				id: "confidence",
				label: "Confidence",
				score: clamp(lengthScore + (hasMetric ? 8 : -3)),
			},
			{
				id: "structure",
				label: "Structure",
				score: clamp(lengthScore + (hasStructure ? 10 : -6)),
			},
		],
		suggestion: hasMetric
			? "Good use of concrete detail. Tighten the answer by naming the decision, the trade-off, and the outcome in one clear sequence."
			: "Add one measurable result or specific example. A stronger answer should connect your action to a business or team outcome.",
	};
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({}));
	const answer = String(body.answer ?? "");
	const question = String(body.question ?? "Tell me about yourself.");
	const questionIndex = Number(body.questionIndex ?? 0);

	try {
		const result = await generateStructured<InterviewFeedback>({
			name: "jobiq_interview_feedback",
			schema: interviewSchema,
			maxOutputTokens: 1000,
			system:
				"You are JobIQ's interview coach. Give direct, supportive, non-absolute feedback. Score from 0 to 100 and make the suggestion actionable.",
			user: JSON.stringify({
				questionIndex,
				question,
				answer,
				task: "Evaluate the answer for clarity, relevance, confidence, and structure. Return exactly those four feedback items.",
			}),
		});

		if (result.status === "mock") {
			return NextResponse.json({
				...fallbackFeedback(answer, question),
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
			...fallbackFeedback(answer, question),
			aiStatus: "mock",
			message:
				error instanceof Error
					? error.message
					: "AI interview feedback is unavailable.",
		});
	}
}

