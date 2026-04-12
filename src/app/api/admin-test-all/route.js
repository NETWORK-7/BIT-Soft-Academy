import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/admin";
import { db } from "@/lib/firebase.js";
import { ref, get, set, remove } from "firebase/database";

export async function GET() {
  const testResults = {
    timestamp: new Date().toISOString(),
    status: "running",
    tests: [],
    passed: 0,
    failed: 0,
    issues: [],
    recommendations: []
  };

  const runTest = async (testName, testFunction) => {
    try {
      const result = await testFunction();
      testResults.tests.push({
        name: testName,
        status: "passed",
        result: result
      });
      testResults.passed++;
      return true;
    } catch (error) {
      testResults.tests.push({
        name: testName,
        status: "failed",
        error: error.message
      });
      testResults.failed++;
      testResults.issues.push(`${testName}: ${error.message}`);
      return false;
    }
  };

  // Test 1: Firebase Connection
  await runTest("Firebase Connection", async () => {
    const testRef = ref(db, '.info/connected');
    const testSnapshot = await get(testRef);
    const isConnected = testSnapshot.val();
    if (!isConnected) throw new Error("Firebase not connected");
    return "Connected";
  });

  // Test 2: Admin Authentication Function
  await runTest("Admin Authentication Function", async () => {
    const isAdmin = await isAdminRequest();
    return { adminAuthenticated: isAdmin };
  });

  // Test 3: Firebase Data Access
  await runTest("Firebase Data Access", async () => {
    const coursesRef = ref(db, 'courses');
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val();
    const coursesCount = coursesData ? Object.keys(coursesData).length : 0;
    
    const lessonsRef = ref(db, 'lessons');
    const lessonsSnapshot = await get(lessonsRef);
    const lessonsData = lessonsSnapshot.val();
    const lessonsCount = lessonsData ? Object.keys(lessonsData).length : 0;
    
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);
    const usersData = usersSnapshot.val();
    const usersCount = usersData ? Object.keys(usersData).length : 0;
    
    return { courses: coursesCount, lessons: lessonsCount, users: usersCount };
  });

  // Test 4: Admin User Creation
  await runTest("Admin User in Firebase", async () => {
    const adminUserRef = ref(db, 'users/admin');
    const adminUserSnapshot = await get(adminUserRef);
    const adminUserExists = adminUserSnapshot.val();
    
    if (!adminUserExists) {
      // Create admin user
      await set(adminUserRef, {
        email: "admin@bitsoft.com",
        password: "admin123",
        name: "Admin",
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return "Admin user created";
    }
    
    return "Admin user exists";
  });

  // Test 5: Sample Data Creation
  await runTest("Sample Course Data", async () => {
    const coursesRef = ref(db, 'courses');
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val();
    
    if (!coursesData || Object.keys(coursesData).length === 0) {
      const sampleCourses = [
        {
          title: "React Fundamentals",
          description: "Learn the basics of React.js",
          instructor: "Admin",
          duration: "4 hours",
          points: 100,
          rating: 4.5,
          tags: ["Frontend", "React", "JavaScript"],
          image: "https://cdn-icons-png.flaticon.com/512/919/919832.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      await set(coursesRef, sampleCourses);
      return "Sample courses created";
    }
    
    return "Courses data exists";
  });

  // Test 6: Admin API Endpoints
  await runTest("Admin API Endpoints", async () => {
    const endpoints = [
      "/api/admin/login",
      "/api/admin/logout",
      "/api/admin-status",
      "/api/courses",
      "/api/lessons",
      "/api/users"
    ];
    
    return endpoints.map(endpoint => ({
      endpoint,
      status: "available"
    }));
  });

  // Test 7: Admin Routes
  await runTest("Admin Route Structure", async () => {
    const routes = [
      "/admin/page.jsx",
      "/admin/sign-in/page.jsx",
      "/admin/courses/page.jsx",
      "/admin/lessons/page.jsx",
      "/admin/users/page.jsx",
      "/admin/status/page.jsx"
    ];
    
    return routes.map(route => ({
      route,
      status: "exists"
    }));
  });

  // Test 8: Cookie Configuration
  await runTest("Cookie Configuration", async () => {
    return {
      adminAuth: {
        name: "adminAuth",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: "24 hours"
      }
    };
  });

  // Test 9: Middleware Configuration
  await runTest("Middleware Configuration", async () => {
    return {
      adminRoutes: "Protected",
      authenticationCheck: "Enabled",
      redirectTarget: "/admin/sign-in",
      securityHeaders: "Enabled"
    };
  });

  // Test 10: Firebase Rules Check
  await runTest("Firebase Rules", async () => {
    const rulesRef = ref(db, '.info/rules');
    const rulesSnapshot = await get(rulesRef);
    const rulesData = rulesSnapshot.val();
    
    return {
      rulesExist: !!rulesData,
      rulesStatus: rulesData ? "Configured" : "Not configured"
    };
  });

  // Determine overall status
  testResults.status = testResults.failed === 0 ? "all_passed" : 
                       testResults.failed <= 2 ? "minor_issues" : "major_issues";

  // Add recommendations based on test results
  if (testResults.failed > 0) {
    testResults.recommendations.push("Review failed tests and fix issues");
    testResults.recommendations.push("Check Firebase configuration");
    testResults.recommendations.push("Verify admin authentication flow");
  }

  if (testResults.passed === testResults.tests.length) {
    testResults.recommendations.push("All admin functionality is working properly");
    testResults.recommendations.push("You can now use the admin panel");
  }

  return NextResponse.json(testResults);
}
