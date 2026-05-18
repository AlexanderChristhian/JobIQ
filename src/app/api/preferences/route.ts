import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	SESSION_COOKIE,
	getUserBySession,
	updateUserPreferences,
	type JobPreferences,
} from "@/lib/server-db";

function stringArray(value: unknown) {
	if (Array.isArray(value)) {
		return value.map((item) => String(item).trim()).filter(Boolean);
	}

	return String(value ?? "")
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}

export async function GET() {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({ preferences: user.profile.jobPreferences });
}

export async function PUT(request: Request) {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json().catch(() => ({}));
	const updates: Partial<JobPreferences> = {
		targetRole: String(body.targetRole ?? ""),
		preferredLocation: String(body.preferredLocation ?? ""),
		workModel: String(body.workModel ?? "Flexible"),
		notes: String(body.notes ?? ""),
		salaryMin: Math.max(0, Number(body.salaryMin) || 0),
		salaryMax: Math.max(0, Number(body.salaryMax) || 0),
		desiredRoles: stringArray(body.desiredRoles),
		keywords: stringArray(body.keywords),
	};

	const updatedUser = await updateUserPreferences(user.id, updates);
	return NextResponse.json({
		user: updatedUser,
		preferences: updatedUser.profile.jobPreferences,
	});
}
