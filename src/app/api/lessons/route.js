import { NextResponse } from "next/server";
import lessonsData from "@/data/lessons.json";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    
    if (!courseId) {
      return NextResponse.json({ lessons: [] });
    }

    // Return lessons from JSON
    const jsonLessons = lessonsData.lessons[courseId] || [];
    return NextResponse.json({ lessons: jsonLessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json({ lessons: [], error: error.message }, { status: 500 });
  }
}
