import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, getUserBySession } from "@/lib/server-db";

export async function GET() {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);

	if (!user) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	return NextResponse.json({ user });
}

