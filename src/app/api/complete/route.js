import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lessonId, courseId } = await req.json();

    if (!lessonId || !courseId) {
      return NextResponse.json(
        { error: "lessonId and courseId are required" },
        { status: 400 }
      );
    }

    // Return success response (no database storage)
    return NextResponse.json({
      message: "Lesson completed successfully!",
      pointsEarned: 10,
      totalPoints: 10,
      completedLessons: [{ lessonId, courseId, pointsEarned: 10 }]
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// GET user progress
export async function GET(req) {
  try {
    // Return default user progress (no authentication)
    return NextResponse.json({
      totalPoints: 0,
      completedLessons: [],
      lessonsCount: 0
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({
      totalPoints: 0,
      completedLessons: [],
      lessonsCount: 0,
      error: error.message
    }, { status: 200 });
  }
}

