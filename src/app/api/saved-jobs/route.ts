import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	SESSION_COOKIE,
	deleteSavedJob,
	getUserBySession,
	listSavedJobs,
	saveUserJob,
	updateSavedJobNote,
} from "@/lib/server-db";

async function requireUser() {
	const cookieStore = await cookies();
	const user = await getUserBySession(cookieStore.get(SESSION_COOKIE)?.value);
	if (!user) throw new Error("Unauthorized");
	return user;
}

export async function GET() {
	try {
		const user = await requireUser();
		return NextResponse.json({ savedJobs: await listSavedJobs(user.id) });
	} catch {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}

export async function POST(request: Request) {
	try {
		const user = await requireUser();
		const body = await request.json().catch(() => ({}));
		return NextResponse.json({ savedJobs: await saveUserJob(user.id, body) });
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error ? error.message : "Unable to save this job.",
			},
			{ status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 },
		);
	}
}

export async function PUT(request: Request) {
	try {
		const user = await requireUser();
		const body = await request.json().catch(() => ({}));
		const id = String(body.id ?? "");
		const personalNotes = String(body.personalNotes ?? "");
		return NextResponse.json({
			savedJobs: await updateSavedJobNote(user.id, id, personalNotes),
		});
	} catch {
		return NextResponse.json(
			{ message: "Unable to update this saved job." },
			{ status: 400 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const user = await requireUser();
		const id = new URL(request.url).searchParams.get("id") ?? "";
		return NextResponse.json({ savedJobs: await deleteSavedJob(user.id, id) });
	} catch {
		return NextResponse.json(
			{ message: "Unable to remove this saved job." },
			{ status: 400 },
		);
	}
}
