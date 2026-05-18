import { NextResponse } from "next/server";
import {
	SESSION_COOKIE,
	authenticateUser,
	createSession,
} from "@/lib/server-db";

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({}));

	try {
		const user = await authenticateUser(
			String(body.email ?? ""),
			String(body.password ?? ""),
		);
		const session = await createSession(user.id);
		const response = NextResponse.json({ user });

		response.cookies.set(SESSION_COOKIE, session.token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			expires: session.expiresAt,
			path: "/",
		});

		return response;
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: "We could not sign you in.",
			},
			{ status: 401 },
		);
	}
}

