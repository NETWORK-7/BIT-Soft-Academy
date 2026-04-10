import { NextResponse } from "next/server";
import { 
  getLessonsByCourseId,
  getLessonById,
  createLesson as createFirebaseLesson,
  updateLesson as updateFirebaseLesson,
  deleteLesson as deleteFirebaseLesson
} from "@/lib/firebase-db";
import { isAdminRequest } from "@/lib/api/admin";

// Fallback to local database when Firebase is having issues
import {
  getLessonsByCourseId as getLocalLessonsByCourseId,
  getLessonById as getLocalLessonById,
  createLesson as createLocalLesson,
  updateLesson as updateLocalLesson,
  deleteLesson as deleteLocalLesson
} from "@/lib/local-db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    
    console.log("Lessons API called:", { courseId, lessonId });
    
    if (!courseId && !lessonId) {
      console.log("No courseId or lessonId provided, returning empty lessons");
      return NextResponse.json({ lessons: [] });
    }

    // Try Firebase first, fallback to local
    try {
      console.log("Firebase: Attempting to fetch lessons...");
      
      if (lessonId) {
        // Get single lesson
        console.log(`Fetching single lesson: ${lessonId}`);
        const lesson = await getLessonById(lessonId);
        console.log(`Lesson found: ${!!lesson}`);
        return NextResponse.json({ lesson });
      } else {
        // Get lessons by course
        console.log(`Fetching lessons for course: ${courseId}`);
        const lessons = await getLessonsByCourseId(courseId);
        console.log(`Firebase: Found ${lessons.length} lessons for course ${courseId}`);
        return NextResponse.json({ 
          success: true,
          lessons: lessons,
          count: lessons.length 
        });
      }
    } catch (firebaseError) {
      console.log("Firebase failed, using local database:", firebaseError.message);
      console.log("Firebase error details:", firebaseError);
      
      try {
        if (lessonId) {
          const lesson = await getLocalLessonById(lessonId);
          return NextResponse.json({ lesson });
        } else {
          const lessons = await getLocalLessonsByCourseId(courseId);
          return NextResponse.json({ 
            success: true,
            lessons: lessons,
            count: lessons.length,
            source: "local"
          });
        }
      } catch (localError) {
        console.error("Local database also failed:", localError);
        return NextResponse.json({ 
          success: false,
          lessons: [], 
          error: "Both Firebase and local database failed",
          firebaseError: firebaseError.message,
          localError: localError.message
        }, { status: 500 });
      }
    }
  } catch (e) {
    console.error("GET /api/lessons - General error:", e);
    return NextResponse.json({ 
      success: false,
      lessons: [], 
      error: e.message,
      stack: e.stack
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const courseId = String(body.courseId || "").trim();
    const videoUrl = String(body.videoUrl || "").trim();
    const duration = Number(body.duration) || 0;
    const sortOrder = Number(body.sortOrder) || 0;

    if (!title || !courseId) {
      return NextResponse.json({ 
        error: "Title and courseId are required" 
      }, { status: 400 });
    }

    const lessonData = {
      title,
      content,
      courseId,
      videoUrl,
      duration,
      sortOrder
    };

    // Try Firebase first, fallback to local
    try {
      console.log("🔗 Creating lesson with Firebase...");
      const lesson = await createFirebaseLesson(lessonData);
      console.log("✅ Lesson created with Firebase");
      return NextResponse.json({ success: true, lesson });
    } catch (firebaseError) {
      console.log("🔄 Firebase failed, creating lesson locally:", firebaseError.message);
      const lesson = await createLocalLesson(lessonData);
      console.log("✅ Lesson created locally");
      return NextResponse.json({ success: true, lesson });
    }
  } catch (e) {
    console.error("POST /api/lessons:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const lessonId = String(body.lessonId || "").trim();
    
    if (!lessonId) {
      return NextResponse.json({ 
        error: "Lesson ID is required" 
      }, { status: 400 });
    }

    const updateData = {};
    if (body.title !== undefined) updateData.title = String(body.title).trim();
    if (body.content !== undefined) updateData.content = String(body.content).trim();
    if (body.videoUrl !== undefined) updateData.videoUrl = String(body.videoUrl).trim();
    if (body.duration !== undefined) updateData.duration = Number(body.duration) || 0;
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder) || 0;

    // Try Firebase first, fallback to local
    try {
      console.log("🔗 Updating lesson with Firebase...");
      const success = await updateFirebaseLesson(lessonId, updateData);
      console.log("✅ Lesson updated with Firebase");
      return NextResponse.json({ success });
    } catch (firebaseError) {
      console.log("🔄 Firebase failed, updating lesson locally:", firebaseError.message);
      const success = await updateLocalLesson(lessonId, updateData);
      console.log("✅ Lesson updated locally");
      return NextResponse.json({ success });
    }
  } catch (e) {
    console.error("PUT /api/lessons:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");
    
    if (!lessonId) {
      return NextResponse.json({ 
        error: "Lesson ID is required" 
      }, { status: 400 });
    }

    // Try Firebase first, fallback to local
    try {
      console.log("🔗 Deleting lesson with Firebase...");
      const success = await deleteFirebaseLesson(lessonId);
      console.log("✅ Lesson deleted with Firebase");
      return NextResponse.json({ success });
    } catch (firebaseError) {
      console.log("🔄 Firebase failed, deleting lesson locally:", firebaseError.message);
      const success = await deleteLocalLesson(lessonId);
      console.log("✅ Lesson deleted locally");
      return NextResponse.json({ success });
    }
  } catch (e) {
    console.error("DELETE /api/lessons:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
