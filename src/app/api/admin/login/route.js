import { cookies } from "next/headers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_PASSWORD = "admin123"; // Change this to your desired password
const ADMIN_NAME = "Admin"; // Admin name
const ADMIN_EMAIL = "admin@bitsoft.com"; // Firebase admin email

export async function POST(req) {
  try {
    const { name, password } = await req.json();

    // Check if credentials match
    if (name === ADMIN_NAME && password === ADMIN_PASSWORD) {
      try {
        // Also authenticate with Firebase to get proper auth token
        const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log("✅ Firebase admin authentication successful");
      } catch (firebaseError) {
        console.log("⚠️ Firebase admin auth failed, but continuing with cookie auth:", firebaseError.message);
        // Continue with cookie auth even if Firebase fails
        // This allows admin to work locally without Firebase user
      }

      const cookieStore = await cookies();
      
      // Set admin session cookie
      cookieStore.set("adminAuth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/",
      });

      return Response.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
    }

    return Response.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
