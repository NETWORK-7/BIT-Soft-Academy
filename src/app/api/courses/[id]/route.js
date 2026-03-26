import { NextResponse } from "next/server";
import { 
  getCourseById,
  updateCourse,
  deleteCourse
} from "@/lib/firebase-db";
import { isAdminRequest } from "@/lib/api/admin";

export async function PUT(req, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    
    if (!id) {
      return NextResponse.json({ 
        error: "Course ID is required" 
      }, { status: 400 });
    }

    const updateData = {};
    if (body.title !== undefined) updateData.title = String(body.title).trim();
    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.videoUrl !== undefined) updateData.videoUrl = String(body.videoUrl).trim();
    if (body.instructor !== undefined) updateData.instructor = String(body.instructor).trim();
    if (body.duration !== undefined) updateData.duration = String(body.duration).trim();
    if (body.points !== undefined) updateData.points = Number(body.points) || 0;

    const success = await updateCourse(id, updateData);
    
    if (success) {
      console.log(`✅ Updated course: ${id}`);
      return NextResponse.json({ 
        success: true,
        message: "Course updated successfully"
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Course not found" 
      }, { status: 404 });
    }

  } catch (error) {
    console.error("❌ PUT /api/courses/[id] error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ 
        error: "Course ID is required" 
      }, { status: 400 });
    }

    const success = await deleteCourse(id);
    
    if (success) {
      console.log(`✅ Deleted course: ${id}`);
      return NextResponse.json({ 
        success: true,
        message: "Course deleted successfully"
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Course not found" 
      }, { status: 404 });
    }

  } catch (error) {
    console.error("❌ DELETE /api/courses/[id] error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
