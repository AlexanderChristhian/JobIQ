import { NextResponse } from "next/server";
import data from "@/data/interview.json";

export async function GET() {
  return NextResponse.json(data);
}
