import { NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import { docToLesson } from "@/lib/models/course";
import { isAdminRequest } from "@/lib/api/admin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    
    if (!courseId && !lessonId) {
      return NextResponse.json({ lessons: [] });
    }

    const db = await requireDb();
    
    if (lessonId) {
      // Get single lesson
      const lesson = await db.collection("lessons").findOne({ _id: lessonId });
      if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
      }
      return NextResponse.json({ lesson: docToLesson(lesson) });
    } else {
      // Get lessons for a course
      const rows = await db
        .collection("lessons")
        .find({ courseId })
        .sort({ sortOrder: 1, createdAt: 1 })
        .toArray();
      const lessons = rows.map(docToLesson);
      return NextResponse.json({ lessons });
    }
  } catch (e) {
    console.error("GET /api/lessons:", e);
    return NextResponse.json({ lessons: [], error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const courseId = String(body.courseId || "").trim();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    if (!courseId || !title) {
      return NextResponse.json({ error: "courseId and title are required" }, { status: 400 });
    }

    const durationMinutes = Number(body.duration) || Number(body.duration_minutes) || 45;
    const videoId = String(body.videoId || body.video_id || "").trim();

    const db = await requireDb();
    const lessonsCol = db.collection("lessons");
    const last = await lessonsCol.find({ courseId }).sort({ sortOrder: -1 }).limit(1).toArray();
    const sortOrder = (last[0]?.sortOrder ?? -1) + 1;

    const result = await lessonsCol.insertOne({
      courseId,
      title,
      content,
      durationMinutes,
      videoId,
      sortOrder,
      createdAt: new Date(),
    });
    const doc = await lessonsCol.findOne({ _id: result.insertedId });
    const lesson = docToLesson(doc);
    return NextResponse.json({ success: true, lesson });
  } catch (e) {
    console.error("POST /api/lessons:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
