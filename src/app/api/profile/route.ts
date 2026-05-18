import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	SESSION_COOKIE,
	getUserBySession,
	updateUserProfile,
} from "@/lib/server-db";

export async function GET() {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({ profile: user.profile });
}

export async function PUT(request: Request) {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json().catch(() => ({}));
	const skills = String(body.skills ?? "")
		.split(",")
		.map((skill) => skill.trim())
		.filter(Boolean);

	const updatedUser = await updateUserProfile(user.id, {
		title: String(body.title ?? ""),
		location: String(body.location ?? ""),
		skills,
	});

	return NextResponse.json({ user: updatedUser, profile: updatedUser.profile });
}

