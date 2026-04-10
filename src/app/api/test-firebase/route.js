import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { ref, get } from "firebase/database";

export async function GET() {
  try {
    console.log("Testing Firebase connection...");
    const testRef = ref(db, '.info/connected');
    const snapshot = await get(testRef);
    const isConnected = snapshot.val();
    
    console.log("Firebase connection status:", isConnected);
    
    const coursesRef = ref(db, 'courses');
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val();
    
    console.log("Courses data exists:", !!coursesData);
    console.log("Number of courses:", coursesData ? Object.keys(coursesData).length : 0);
    
    // Test lessons access
    const lessonsRef = ref(db, 'lessons');
    const lessonsSnapshot = await get(lessonsRef);
    const lessonsData = lessonsSnapshot.val();
    
    console.log("Lessons data exists:", !!lessonsData);
    console.log("Number of lessons:", lessonsData ? Object.keys(lessonsData).length : 0);
    
    return NextResponse.json({
      success: true,
      firebaseConnected: isConnected,
      coursesCount: coursesData ? Object.keys(coursesData).length : 0,
      lessonsCount: lessonsData ? Object.keys(lessonsData).length : 0,
      hasCoursesData: !!coursesData,
      hasLessonsData: !!lessonsData,
      databaseUrl: "https://bitsoft-da7a0-default-rtdb.firebaseio.com/"
    });
    
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      errorDetails: error.toString()
    }, { status: 500 });
  }
}
