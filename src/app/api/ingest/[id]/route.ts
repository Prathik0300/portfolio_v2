import { NextResponse } from "next/server";

// No-op ingest endpoint.
// This project uses GA4 (gtag) for analytics and does not run a custom ingest server.
export async function POST() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}