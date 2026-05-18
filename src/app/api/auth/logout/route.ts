import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, deleteSession } from "@/lib/server-db";

export async function POST() {
	const cookieStore = await cookies();
	const token = cookieStore.get(SESSION_COOKIE)?.value;
	await deleteSession(token);

	const response = NextResponse.json({ ok: true });
	response.cookies.delete(SESSION_COOKIE);
	return response;
}

