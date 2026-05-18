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
			return NextResponse.json({ cardId, message: result.reason }, { status: 503 });
		}

		return NextResponse.json({
			cardId,
			suggestion: result.data.suggestion,
			aiStatus: "live",
			model: result.model,
		});
	} catch (error) {
		return NextResponse.json(
			{
				cardId,
				message:
					error instanceof Error
						? error.message
						: "AI tracker suggestion is unavailable.",
			},
			{ status: 503 },
		);
	}
}
