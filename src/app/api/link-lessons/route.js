import { NextResponse } from "next/server";
import { 
  getAllCourses, 
  getLessonsByCourseId, 
  updateLesson 
} from "@/lib/firebase-db";

export async function POST() {
  try {
    console.log("🔗 Linking lessons using Firebase...");
    
    const courses = await getAllCourses();
    let linkedCount = 0;
    let errors = [];
    
    for (const course of courses) {
      try {
        const lessons = await getLessonsByCourseId(course._id);
        
        // Update each lesson to ensure it has the correct courseId
        for (const lesson of lessons) {
          if (lesson.courseId !== course._id) {
            const updated = await updateLesson(lesson._id, { courseId: course._id });
            if (updated) {
              linkedCount++;
            } else {
              errors.push(`Failed to update lesson ${lesson._id}`);
            }
          }
        }
      } catch (courseError) {
        errors.push(`Error processing course ${course._id}: ${courseError.message}`);
      }
    }
    
    console.log(`✅ Linked ${linkedCount} lessons across ${courses.length} courses`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully linked ${linkedCount} lessons`,
      linkedCount,
      totalCourses: courses.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error("❌ Link lessons error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
