import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Admin test endpoint working",
    timestamp: new Date().toISOString(),
    routes: {
      adminSignIn: "/admin/sign-in",
      adminDashboard: "/admin",
      adminCourses: "/admin/courses",
      adminLessons: "/admin/lessons",
      adminUsers: "/admin/users"
    }
  });
}
