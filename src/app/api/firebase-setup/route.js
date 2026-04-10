import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { ref, get, set, remove } from "firebase/database";

export async function GET() {
  try {
    console.log("🔗 Testing Firebase connection...");
    
    // Test basic connection
    const testRef = ref(db, '.info/connected');
    const testSnapshot = await get(testRef);
    const isConnected = testSnapshot.val();
    
    console.log("Firebase connection status:", isConnected);
    
    // Test database access
    const coursesRef = ref(db, 'courses');
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val();
    
    const lessonsRef = ref(db, 'lessons');
    const lessonsSnapshot = await get(lessonsRef);
    const lessonsData = lessonsSnapshot.val();
    
    // Create admin user if not exists
    const adminUserRef = ref(db, 'users/admin');
    const adminUserSnapshot = await get(adminUserRef);
    const adminUserExists = adminUserSnapshot.val();
    
    if (!adminUserExists) {
      console.log("Creating admin user in Firebase...");
      await set(adminUserRef, {
        email: "admin@bitsoft.com",
        password: "admin123", // In production, this should be hashed
        name: "Admin",
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log("✅ Admin user created in Firebase");
    } else {
      console.log("✅ Admin user already exists in Firebase");
    }
    
    // Create sample data if database is empty
    if (!coursesData || Object.keys(coursesData).length === 0) {
      console.log("Creating sample courses...");
      const sampleCourses = [
        {
          title: "React Fundamentals",
          description: "Learn the basics of React.js including components, state, and hooks.",
          instructor: "Admin",
          duration: "4 hours",
          points: 100,
          rating: 4.5,
          tags: ["Frontend", "React", "JavaScript"],
          image: "https://cdn-icons-png.flaticon.com/512/919/919832.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          title: "Node.js Backend Development",
          description: "Master server-side JavaScript with Node.js and Express.",
          instructor: "Admin",
          duration: "6 hours",
          points: 150,
          rating: 4.7,
          tags: ["Backend", "Node.js", "Express"],
          image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          title: "Full-Stack Web Development",
          description: "Build complete web applications from frontend to backend.",
          instructor: "Admin",
          duration: "8 hours",
          points: 200,
          rating: 4.8,
          tags: ["Full-Stack", "MERN", "JavaScript"],
          image: "https://cdn-icons-png.flaticon.com/512/919/919852.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      await set(coursesRef, sampleCourses);
      console.log("✅ Sample courses created");
    }
    
    return NextResponse.json({
      success: true,
      message: "Firebase setup completed successfully",
      connectionStatus: isConnected,
      coursesCount: coursesData ? Object.keys(coursesData).length : 0,
      lessonsCount: lessonsData ? Object.keys(lessonsData).length : 0,
      adminUserCreated: !adminUserExists,
      databaseUrl: "https://bitsoft-da7a0-default-rtdb.firebaseio.com/",
      instructions: {
        adminLogin: {
          username: "Admin",
          password: "admin123"
        },
        firebaseConsole: "https://console.firebase.google.com/project/bitsoft-da7a0/authentication/users"
      }
    });
    
  } catch (error) {
    console.error("Firebase setup error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Failed to setup Firebase"
    }, { status: 500 });
  }
}
