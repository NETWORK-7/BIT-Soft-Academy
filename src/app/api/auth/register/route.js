import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/firebase-db";
import { hashPassword } from "@/lib/auth/password";
import { signUserToken, SESSION_COOKIE } from "@/lib/auth/token";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "").trim();
    const language = String(body.language || "en").slice(0, 8);

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if user already exists in Firebase
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 });
    }

    const password_hash = await hashPassword(password);

    let newUser;
    try {
      // Create user in Firebase
      newUser = await createUser({
        email,
        password_hash,
        name,
        language,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      if (e.message.includes("already exists")) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
      }
      throw e;
    }

    const id = newUser._id;
    const token = await signUserToken({
      id,
      email,
      name,
    });

    const res = NextResponse.json({
      success: true,
      user: { id, email, name, language },
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
    console.error("register:", e);
    return NextResponse.json({ error: e.message || "Registration failed" }, { status: 500 });
  }
}
