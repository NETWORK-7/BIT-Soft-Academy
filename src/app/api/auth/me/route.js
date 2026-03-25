import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyUserToken, SESSION_COOKIE } from "@/lib/auth/token";

export async function GET() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }
    const user = await verifyUserToken(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
