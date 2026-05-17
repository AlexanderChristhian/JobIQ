import { NextResponse } from "next/server";
import data from "@/data/tracker.json";

export async function GET() {
	return NextResponse.json(data);
}
