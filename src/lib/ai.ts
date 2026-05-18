type JsonSchema = Record<string, unknown>;

type InputTextContent = {
	type: "input_text";
	text: string;
};

type InputFileContent = {
	type: "input_file";
	filename: string;
	file_data: string;
};

type UserContent = string | Array<InputTextContent | InputFileContent>;
type AiProvider = "gemini" | "openai";
type GeminiPart =
	| { text: string }
	| { inline_data: { mime_type: string; data: string } };

interface GenerateStructuredOptions {
	name: string;
	system: string;
	user: UserContent;
	schema: JsonSchema;
	maxOutputTokens?: number;
}

export type AiResult<T> =
	| { status: "live"; model: string; data: T }
	| { status: "mock"; reason: string };

function extractOpenAiOutputText(payload: unknown): string {
	if (
		payload &&
		typeof payload === "object" &&
		"output_text" in payload &&
		typeof payload.output_text === "string"
	) {
		return payload.output_text;
	}

	if (!payload || typeof payload !== "object" || !("output" in payload)) {
		return "";
	}

	const output = (payload as { output?: unknown }).output;
	if (!Array.isArray(output)) return "";

	return output
		.flatMap((item) => {
			if (!item || typeof item !== "object" || !("content" in item)) return [];
			const content = (item as { content?: unknown }).content;
			return Array.isArray(content) ? content : [];
		})
		.map((part) => {
			if (!part || typeof part !== "object") return "";
			if ("text" in part && typeof part.text === "string") return part.text;
			return "";
		})
		.join("");
}

function extractGeminiOutputText(payload: unknown): string {
	if (!payload || typeof payload !== "object" || !("candidates" in payload)) {
		return "";
	}

	const candidates = (payload as { candidates?: unknown }).candidates;
	if (!Array.isArray(candidates)) return "";

	return candidates
		.flatMap((candidate) => {
			if (!candidate || typeof candidate !== "object") return [];
			const content = (candidate as { content?: unknown }).content;
			if (!content || typeof content !== "object") return [];
			const parts = (content as { parts?: unknown }).parts;
			return Array.isArray(parts) ? parts : [];
		})
		.map((part) => {
			if (!part || typeof part !== "object") return "";
			return "text" in part && typeof part.text === "string" ? part.text : "";
		})
		.join("");
}

function getProvider(): AiProvider {
	const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
	return provider === "openai" ? "openai" : "gemini";
}

function parseDataUrl(fileData: string) {
	const match = fileData.match(/^data:([^;]+);base64,(.+)$/);
	if (!match) return null;
	return { mimeType: match[1], data: match[2] };
}

function toGeminiParts(user: UserContent): GeminiPart[] {
	if (typeof user === "string") return [{ text: user }];

	return user.flatMap<GeminiPart>((part) => {
		if (part.type === "input_text") return [{ text: part.text }];

		const file = parseDataUrl(part.file_data);
		if (!file) {
			return [
				{
					text: `Attached file ${part.filename} could not be encoded for Gemini.`,
				},
			];
		}

		return [
			{
				inline_data: {
					mime_type: file.mimeType,
					data: file.data,
				},
			},
		];
	});
}

function parseJsonOutput<T>(text: string): T {
	try {
		return JSON.parse(text) as T;
	} catch {
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (!jsonMatch) throw new Error("AI returned a non-JSON response.");
		return JSON.parse(jsonMatch[0]) as T;
	}
}

function extractApiError(detail: string) {
	try {
		const parsed = JSON.parse(detail) as {
			error?: { message?: string; code?: string; status?: string };
		};
		return parsed.error?.message ?? detail;
	} catch {
		return detail;
	}
}

function buildProviderError(provider: AiProvider, status: number, detail: string) {
	const message = extractApiError(detail).slice(0, 500);
	if (status === 429) {
		return provider === "gemini"
			? "Gemini free quota or rate limit has been reached. Wait for quota reset or check the Google AI Studio billing and rate limit page."
			: "OpenAI quota has been reached. Check the OpenAI project billing and usage limit.";
	}
	if (status === 401 || status === 403) {
		return provider === "gemini"
			? "Gemini API key is invalid or does not have access to this model."
			: "OpenAI API key is invalid or does not have access to this model.";
	}
	return `${provider === "gemini" ? "Gemini" : "OpenAI"} request failed (${status}): ${message}`;
}

async function generateWithOpenAi<T>({
	name,
	system,
	user,
	schema,
	maxOutputTokens = 1200,
}: GenerateStructuredOptions): Promise<AiResult<T>> {
	const apiKey = process.env.OPENAI_API_KEY?.trim();
	if (!apiKey) {
		return { status: "mock", reason: "OPENAI_API_KEY is not set" };
	}

	const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
	const response = await fetch("https://api.openai.com/v1/responses", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			store: false,
			input: [
				{ role: "system", content: system },
				{ role: "user", content: user },
			],
			text: {
				format: {
					type: "json_schema",
					name,
					strict: true,
					schema,
				},
			},
			max_output_tokens: maxOutputTokens,
		}),
	});

	if (!response.ok) {
		const detail = await response.text();
		throw new Error(buildProviderError("openai", response.status, detail));
	}

	const payload = await response.json();
	const outputText = extractOpenAiOutputText(payload);
	if (!outputText) {
		throw new Error("OpenAI returned an empty response.");
	}

	return {
		status: "live",
		model,
		data: parseJsonOutput<T>(outputText),
	};
}

async function generateWithGemini<T>({
	system,
	user,
	schema,
	maxOutputTokens = 1200,
}: GenerateStructuredOptions): Promise<AiResult<T>> {
	const apiKey = process.env.GEMINI_API_KEY?.trim();
	if (!apiKey) {
		return { status: "mock", reason: "GEMINI_API_KEY is not set" };
	}

	const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
		{
			method: "POST",
			headers: {
				"x-goog-api-key": apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				system_instruction: {
					parts: [{ text: system }],
				},
				contents: [
					{
						role: "user",
						parts: toGeminiParts(user),
					},
				],
				generationConfig: {
					responseMimeType: "application/json",
					responseJsonSchema: schema,
					maxOutputTokens,
				},
			}),
		},
	);

	if (!response.ok) {
		const detail = await response.text();
		throw new Error(buildProviderError("gemini", response.status, detail));
	}

	const payload = await response.json();
	const outputText = extractGeminiOutputText(payload);
	if (!outputText) {
		throw new Error("Gemini returned an empty response.");
	}

	return {
		status: "live",
		model,
		data: parseJsonOutput<T>(outputText),
	};
}

export async function generateStructured<T>(
	options: GenerateStructuredOptions,
): Promise<AiResult<T>> {
	return getProvider() === "openai"
		? generateWithOpenAi<T>(options)
		: generateWithGemini<T>(options);
}
