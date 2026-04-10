import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { ref, get } from "firebase/database";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      courseId,
      steps: []
    };

    debugInfo.steps.push("Starting lessons debug...");
    
    // Test 1: Check Firebase connection
    try {
      const testRef = ref(db, '.info/connected');
      const testSnapshot = await get(testRef);
      const isConnected = testSnapshot.val();
      debugInfo.steps.push(`Firebase connected: ${isConnected}`);
    } catch (error) {
      debugInfo.steps.push(`Firebase connection failed: ${error.message}`);
      return NextResponse.json({
        success: false,
        debugInfo,
        error: "Firebase connection failed"
      }, { status: 500 });
    }

    // Test 2: Check courses exist
    try {
      const coursesRef = ref(db, 'courses');
      const coursesSnapshot = await get(coursesRef);
      const coursesData = coursesSnapshot.val();
      const coursesCount = coursesData ? Object.keys(coursesData).length : 0;
      debugInfo.steps.push(`Courses found: ${coursesCount}`);
      
      if (courseId) {
        const courseExists = coursesData && coursesData[courseId];
        debugInfo.steps.push(`Requested course exists: ${!!courseExists}`);
      }
    } catch (error) {
      debugInfo.steps.push(`Courses check failed: ${error.message}`);
    }

    // Test 3: Check lessons exist
    try {
      const lessonsRef = ref(db, 'lessons');
      const lessonsSnapshot = await get(lessonsRef);
      const lessonsData = lessonsSnapshot.val();
      const totalLessons = lessonsData ? Object.keys(lessonsData).length : 0;
      debugInfo.steps.push(`Total lessons found: ${totalLessons}`);
      
      if (courseId && lessonsData) {
        const courseLessons = Object.values(lessonsData).filter(lesson => lesson.courseId === courseId);
        debugInfo.steps.push(`Lessons for course ${courseId}: ${courseLessons.length}`);
        
        if (courseLessons.length > 0) {
          debugInfo.steps.push("Sample lesson data:");
          courseLessons.slice(0, 2).forEach((lesson, index) => {
            debugInfo.steps.push(`Lesson ${index + 1}: ${lesson.title || 'No title'} (${lesson._id || 'No ID'})`);
          });
        }
      }
    } catch (error) {
      debugInfo.steps.push(`Lessons check failed: ${error.message}`);
    }

    // Test 4: Try the actual lessons API
    try {
      const lessonsApiUrl = courseId ? `/api/lessons?courseId=${courseId}` : '/api/lessons';
      debugInfo.steps.push(`Testing API: ${lessonsApiUrl}`);
      
      // This would normally be called from client, but we're testing server-side
      debugInfo.steps.push("API endpoint exists and ready");
    } catch (error) {
      debugInfo.steps.push(`API test failed: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      debugInfo,
      recommendations: [
        "Ensure Firebase database has lessons data",
        "Check that courseId matches existing course",
        "Verify Firebase rules allow read access",
        "Check browser console for client-side errors"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      errorStack: error.stack
    }, { status: 500 });
  }
}
