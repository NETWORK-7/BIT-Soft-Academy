import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/firebase-db";
import { verifyPassword } from "@/lib/auth/password";
import { signUserToken, SESSION_COOKIE } from "@/lib/auth/token";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const id = user._id;
    const token = await signUserToken({
      id,
      email: user.email,
      name: user.name,
    });

    const res = NextResponse.json({
      success: true,
      user: { id, email: user.email, name: user.name, language: user.language },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error("login:", e);
    return NextResponse.json({ error: e.message || "Login failed" }, { status: 500 });
  }
}
