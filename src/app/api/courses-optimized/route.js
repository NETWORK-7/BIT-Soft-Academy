import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/admin";
import optimizedFirebase from "@/lib/firebase-optimized.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    
    if (courseId) {
      // Get single course
      const courses = await optimizedFirebase.getAllCourses();
      const course = courses.find(c => c._id === courseId);
      
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
      
      return NextResponse.json({ course });
    }
    
    // Get all courses - this is now cached and fast
    const courses = await optimizedFirebase.getAllCourses();
    
    return NextResponse.json({ 
      success: true,
      courses,
      count: courses.length,
      cached: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Optimized courses API error:", error);
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
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const courseData = {
      title,
      description,
      image: String(body.image || "").trim(),
      points: Number(body.points) || 0,
      tags: Array.isArray(body.tags) ? body.tags : [],
      duration: String(body.duration || "").trim(),
      rating: body.rating != null ? Number(body.rating) : null,
      instructor: String(body.instructor || "").trim()
    };

    // Create course with optimized Firebase
    const course = await optimizedFirebase.createCourse(courseData);
    
    return NextResponse.json({ 
      success: true,
      course,
      message: "Course created successfully"
    });
    
  } catch (error) {
    console.error("Optimized course creation error:", error);
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
    const { courseId } = body;
    
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const updateData = {
      title: String(body.title || "").trim(),
      description: String(body.description || "").trim(),
      image: String(body.image || "").trim(),
      points: Number(body.points) || 0,
      tags: Array.isArray(body.tags) ? body.tags : [],
      duration: String(body.duration || "").trim(),
      rating: body.rating != null ? Number(body.rating) : null,
      instructor: String(body.instructor || "").trim()
    };

    // Update course with optimized Firebase
    const course = await optimizedFirebase.updateCourse(courseId, updateData);
    
    return NextResponse.json({ 
      success: true,
      course,
      message: "Course updated successfully"
    });
    
  } catch (error) {
    console.error("Optimized course update error:", error);
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
    const courseId = searchParams.get("courseId");
    
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Delete course with optimized Firebase
    await optimizedFirebase.deleteCourse(courseId);
    
    return NextResponse.json({ 
      success: true,
      message: "Course deleted successfully"
    });
    
  } catch (error) {
    console.error("Optimized course deletion error:", error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
}
