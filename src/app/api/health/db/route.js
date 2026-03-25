import { NextResponse } from "next/server";
import { getDb, getMongoUri } from "@/lib/db";

export async function GET() {
  const uri = getMongoUri();
  if (!uri) {
    return NextResponse.json(
      {
        ok: false,
        error: "No MongoDB URI in environment",
        hint:
          "Set MONGODB_URI=mongodb://127.0.0.1:27017/codemaster (or DATABASE_URL starting with mongodb://) in `.env.local`, then restart the dev server.",
        configured: false,
      },
      { status: 503 }
    );
  }
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ ok: false, error: "Could not connect" }, { status: 503 });
    }
    await db.command({ ping: 1 });
    return NextResponse.json({ ok: true, message: "MongoDB reachable." });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 503 });
  }
}
