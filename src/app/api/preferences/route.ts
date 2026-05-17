import { NextResponse } from "next/server";
import data from "@/data/preferences.json";

export async function GET() {
  return NextResponse.json(data);
}
