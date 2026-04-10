import { cookies } from "next/headers";

const ADMIN_PASSWORD = "admin123"; // Change this to your desired password
const ADMIN_NAME = "Admin"; // Admin name

export async function POST(req) {
  try {
    const { name, password } = await req.json();

    // Check if credentials match
    if (name === ADMIN_NAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      
      // Set admin session cookie - NOT httpOnly so it can be read by client if needed
      cookieStore.set("adminAuth", "true", {
        httpOnly: false, // Allow client-side access for debugging
        secure: false, // Allow HTTP for development
        sameSite: "lax", // More permissive for cross-site requests
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/",
      });
      
      console.log("Admin login successful, cookie set");

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
