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
			return NextResponse.json({ message: result.reason }, { status: 503 });
		}

		return NextResponse.json({
			feedback: result.data.feedback.map((item) => ({
				...item,
				score: clamp(item.score),
			})),
			suggestion: result.data.suggestion,
			aiStatus: "live",
			model: result.model,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: "AI interview feedback is unavailable.",
			},
			{ status: 503 },
		);
	}
}
