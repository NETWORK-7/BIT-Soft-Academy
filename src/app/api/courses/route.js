import { NextResponse } from "next/server";
import coursesData from "@/data/courses.json";

export async function GET(req) {
  try {
    // TODO: Add Supabase auth check if you want to protect this endpoint
    return NextResponse.json({ courses: coursesData.courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ courses: coursesData.courses });
  }
}
