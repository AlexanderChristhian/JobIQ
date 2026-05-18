import { NextResponse } from "next/server";
import { generateStructured } from "@/lib/ai";

const trackerSchema = {
	type: "object",
	properties: {
		suggestion: { type: "string" },
	},
	required: ["suggestion"],
	additionalProperties: false,
};

function fallbackSuggestion(stage: string, title: string, company: string) {
	if (stage === "interviewing") {
		return `Prepare two role-specific stories for ${title} at ${company}, then send a concise follow-up within 24 hours of the interview.`;
	}
	if (stage === "screening") {
		return `Review ${company}'s product, salary range, and role expectations before the screening call.`;
	}
	if (stage === "offer") {
		return `Compare the offer against your salary target, work model preference, and growth goals before responding.`;
	}
	return `Send a short follow-up to ${company} that highlights one relevant project and asks about the next step.`;
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({}));
	const cardId = String(body.cardId ?? "");
	const title = String(body.title ?? "this role");
	const company = String(body.company ?? "the company");
	const stage = String(body.stage ?? "applied");

	try {
		const result = await generateStructured<{ suggestion: string }>({
			name: "jobiq_tracker_suggestion",
			schema: trackerSchema,
			maxOutputTokens: 450,
			system:
				"You are JobIQ's application tracker assistant. Suggest one practical next action. Do not imply that the user has applied automatically or that outcomes are guaranteed.",
			user: JSON.stringify({
				cardId,
				title,
				company,
				stage,
				currentSuggestion: body.currentSuggestion ?? "",
			}),
		});

		if (result.status === "mock") {
			return NextResponse.json({
				cardId,
				suggestion: fallbackSuggestion(stage, title, company),
				aiStatus: "mock",
				message: result.reason,
			});
		}

		return NextResponse.json({
			cardId,
			suggestion: result.data.suggestion,
			aiStatus: "live",
			model: result.model,
		});
	} catch (error) {
		return NextResponse.json({
			cardId,
			suggestion: fallbackSuggestion(stage, title, company),
			aiStatus: "mock",
			message:
				error instanceof Error
					? error.message
					: "AI tracker suggestion is unavailable.",
		});
	}
}

