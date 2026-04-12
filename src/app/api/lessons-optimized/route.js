import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/admin";
import optimizedFirebase from "@/lib/firebase-optimized.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    
    if (lessonId) {
      // Get single lesson - optimized
      const lessons = await optimizedFirebase.getLessonsByCourseId("dummy");
      const lesson = lessons.find(l => l._id === lessonId);
      
      if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
      }
      
      return NextResponse.json({ lesson });
    }
    
    if (courseId) {
      // Get lessons by course - optimized and cached
      const lessons = await optimizedFirebase.getLessonsByCourseId(courseId);
      
      return NextResponse.json({ 
        success: true,
        lessons,
        count: lessons.length,
        cached: true,
        courseId,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get all lessons
    const courses = await optimizedFirebase.getAllCourses();
    const allLessons = [];
    
    for (const course of courses) {
      const courseLessons = await optimizedFirebase.getLessonsByCourseId(course._id);
      allLessons.push(...courseLessons);
    }
    
    return NextResponse.json({ 
      success: true,
      lessons: allLessons,
      count: allLessons.length,
      cached: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Optimized lessons API error:", error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, title, content, videoUrl, duration, sortOrder } = body;
    
    if (!courseId || !title) {
      return NextResponse.json({ error: "Course ID and title are required" }, { status: 400 });
    }

    const lessonData = {
      courseId,
      title: String(title).trim(),
      content: String(content || "").trim(),
      videoUrl: String(videoUrl || "").trim(),
      duration: Number(duration) || 0,
      sortOrder: Number(sortOrder) || 0
    };

    // Create lesson with optimized Firebase
    const lesson = await optimizedFirebase.createLesson(lessonData);
    
    return NextResponse.json({ 
      success: true,
      lesson,
      message: "Lesson created successfully"
    });
    
  } catch (error) {
    console.error("Optimized lesson creation error:", error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, courseId, title, content, videoUrl, duration, sortOrder } = body;
    
    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
    }

    const updateData = {
      courseId,
      title: String(title || "").trim(),
      content: String(content || "").trim(),
      videoUrl: String(videoUrl || "").trim(),
      duration: Number(duration) || 0,
      sortOrder: Number(sortOrder) || 0
    };

    // Update lesson with optimized Firebase
    const lesson = await optimizedFirebase.updateLesson(lessonId, updateData);
    
    return NextResponse.json({ 
      success: true,
      lesson,
      message: "Lesson updated successfully"
    });
    
  } catch (error) {
    console.error("Optimized lesson update error:", error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
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
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
    }

    // Delete lesson with optimized Firebase
    await optimizedFirebase.deleteLesson(lessonId);
    
    return NextResponse.json({ 
      success: true,
      message: "Lesson deleted successfully"
    });
    
  } catch (error) {
    console.error("Optimized lesson deletion error:", error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
}
