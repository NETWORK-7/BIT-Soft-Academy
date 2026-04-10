import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { ref, get, set, remove } from "firebase/database";

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    steps: []
  };

  try {
    debugInfo.steps.push("Testing Firebase configuration...");
    
    // Test 1: Basic connection
    const testRef = ref(db, '.info/connected');
    const testSnapshot = await get(testRef);
    const isConnected = testSnapshot.val();
    debugInfo.steps.push(`✅ Firebase connection: ${isConnected}`);
    
    // Test 2: Database access
    const dbTestRef = ref(db, 'test_connection');
    await set(dbTestRef, {
      message: "Connection test",
      timestamp: new Date().toISOString()
    });
    
    const dbTestSnapshot = await get(dbTestRef);
    const dbTestData = dbTestSnapshot.val();
    debugInfo.steps.push(`✅ Database write/read: ${!!dbTestData}`);
    
    // Clean up test data
    await remove(dbTestRef);
    
    // Test 3: Check existing data
    const coursesRef = ref(db, 'courses');
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val();
    const coursesCount = coursesData ? Object.keys(coursesData).length : 0;
    
    const lessonsRef = ref(db, 'lessons');
    const lessonsSnapshot = await get(lessonsRef);
    const lessonsData = lessonsSnapshot.val();
    const lessonsCount = lessonsData ? Object.keys(lessonsData).length : 0;
    
    debugInfo.steps.push(`✅ Courses found: ${coursesCount}`);
    debugInfo.steps.push(`✅ Lessons found: ${lessonsCount}`);
    
    // Test 4: Admin user check
    const adminRef = ref(db, 'users/admin');
    const adminSnapshot = await get(adminRef);
    const adminData = adminSnapshot.val();
    const adminExists = !!adminData;
    
    debugInfo.steps.push(`✅ Admin user exists: ${adminExists}`);
    
    // Test 5: Firebase rules check
    const rulesRef = ref(db, '.info/rules');
    const rulesSnapshot = await get(rulesRef);
    const rulesData = rulesSnapshot.val();
    const hasRules = !!rulesData;
    
    debugInfo.steps.push(`✅ Firebase rules configured: ${hasRules}`);
    
    return NextResponse.json({
      success: true,
      debugInfo,
      connectionStatus: {
        connected: isConnected,
        database: !!dbTestData,
        coursesCount,
        lessonsCount,
        adminExists,
        hasRules
      },
      firebaseConfig: {
        projectId: "bitsoft-da7a0",
        databaseUrl: "https://bitsoft-da7a0-default-rtdb.firebaseio.com/",
        authDomain: "bitsoft-da7a0.firebaseapp.com"
      },
      recommendations: []
    });
    
  } catch (error) {
    debugInfo.steps.push(`❌ Error: ${error.message}`);
    
    return NextResponse.json({
      success: false,
      debugInfo,
      error: error.message,
      errorStack: error.stack,
      recommendations: [
        "Check Firebase project configuration",
        "Verify database rules allow read/write access",
        "Ensure API key is valid",
        "Check network connectivity"
      ]
    }, { status: 500 });
  }
}
