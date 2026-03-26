import { NextResponse } from "next/server";
import { 
  getAllCourses, 
  getLessonsByCourseId, 
  createCourse as createFirebaseCourse 
} from "@/lib/firebase-db";
import { isAdminRequest } from "@/lib/api/admin";

// Fallback to local database when Firebase is having issues
import {
  getAllCourses as getLocalCourses,
  getLessonsByCourseId as getLocalLessonsByCourseId,
  createCourse as createLocalCourse,
  createLesson as createLocalLesson
} from "@/lib/local-db";

export async function GET() {
  try {
    console.log("🔗 Attempting to connect to Firebase...");
    
    // Try Firebase first
    try {
      const courses = await getAllCourses();
      console.log(`✅ Firebase connected, fetching ${courses.length} courses...`);
      
      // If Firebase returns empty data OR has permission issues, use local fallback
      if (courses.length === 0) {
        console.log("🔄 Firebase returned empty data, using local database fallback...");
        const localCourses = await getLocalCourses();
        console.log(`✅ Local database: fetching ${localCourses.length} courses...`);
        
        const coursesWithLessons = await Promise.all(
          localCourses.map(async (course) => {
            const lessons = await getLocalLessonsByCourseId(course._id);
            return { ...course, lessons };
          })
        );
        
        console.log(`✅ Local database: processed ${coursesWithLessons.length} courses with lessons`);
        return NextResponse.json({ courses: coursesWithLessons });
      }
      
      // Check if Firebase courses have proper structure (might be corrupted)
      const hasValidCourses = courses.some(course => course.title && course._id);
      if (!hasValidCourses || courses.length < 3) {
        console.log("🔄 Firebase data incomplete, using local database fallback...");
        const localCourses = await getLocalCourses();
        console.log(`✅ Local database: fetching ${localCourses.length} courses...`);
        
        const coursesWithLessons = await Promise.all(
          localCourses.map(async (course) => {
            const lessons = await getLocalLessonsByCourseId(course._id);
            return { ...course, lessons };
          })
        );
        
        console.log(`✅ Local database: processed ${coursesWithLessons.length} courses with lessons`);
        return NextResponse.json({ courses: coursesWithLessons });
      }
      
      // Add lessons to each course
      const coursesWithLessons = await Promise.all(
        courses.map(async (course) => {
          try {
            const lessons = await getLessonsByCourseId(course._id);
            return { ...course, lessons };
          } catch (lessonErr) {
            console.error(`❌ Error fetching lessons for course ${course._id}:`, lessonErr);
            return { ...course, lessons: [] };
          }
        })
      );
      
      console.log(`✅ Successfully processed ${coursesWithLessons.length} courses with lessons`);
      return NextResponse.json({ courses: coursesWithLessons });
    } catch (firebaseError) {
      console.log("🔄 Firebase failed, using local database:", firebaseError.message);
      
      // Fallback to local database
      const courses = await getLocalCourses();
      console.log(`✅ Local database: fetching ${courses.length} courses...`);
      
      const coursesWithLessons = await Promise.all(
        courses.map(async (course) => {
          const lessons = await getLocalLessonsByCourseId(course._id);
          return { ...course, lessons };
        })
      );
      
      console.log(`✅ Local database: processed ${coursesWithLessons.length} courses with lessons`);
      return NextResponse.json({ courses: coursesWithLessons });
    }
  } catch (e) {
    console.error("❌ GET /api/courses error:", e);
    return NextResponse.json({ 
      courses: [], 
      error: e.message 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (body.action === "seed-practical") {
      return await seedPracticalCourses();
    }

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const image = String(body.image || "").trim();
    const points = Number(body.points) || 0;
    const tags = Array.isArray(body.tags) ? body.tags : [];
    const duration = String(body.duration || "").trim();
    const rating = body.rating != null ? Number(body.rating) : null;
    const instructor = String(body.instructor || "").trim();

    const courseData = {
      title,
      description,
      image,
      points,
      tags,
      duration,
      rating,
      instructor
    };

    // Try Firebase first, fallback to local
    try {
      console.log("🔗 Creating course with Firebase...");
      const course = await createFirebaseCourse(courseData);
      console.log("✅ Course created with Firebase");
      return NextResponse.json({ success: true, course });
    } catch (firebaseError) {
      console.log("🔄 Firebase failed, creating course locally:", firebaseError.message);
      const course = await createLocalCourse(courseData);
      console.log("✅ Course created locally");
      return NextResponse.json({ success: true, course });
    }
  } catch (e) {
    console.error("POST /api/courses:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

async function seedPracticalCourses() {
  const practicalCourses = [
    {
      title: "HTML & CSS for Beginners",
      description: "Start your web development journey by learning HTML and CSS from scratch. Build your first web pages with hands-on coding exercises.",
      image: "https://cdn-icons-png.flaticon.com/512/1051/1051277.png",
      points: 100,
      tags: ["Frontend", "HTML", "CSS", "Beginner"],
      duration: "6 hours",
      rating: 4.9,
      instructor: "Umedjon Burkhonov"
    },
    {
      title: "JavaScript Fundamentals",
      description: "Learn programming basics with JavaScript. Write your first programs, understand variables, functions, and create interactive web applications.",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      points: 150,
      tags: ["Frontend", "JavaScript", "Programming", "Beginner"],
      duration: "8 hours",
      rating: 4.8,
      instructor: "Umedjon Burkhonov"
    },
    {
      title: "React for Beginners",
      description: "Build modern web applications with React. Learn components, state management, and create your first interactive React apps.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
      points: 200,
      tags: ["Frontend", "React", "JavaScript", "Beginner"],
      duration: "10 hours",
      rating: 4.7,
      instructor: "Umedjon Burkhonov"
    }
  ];

  try {
    const createdCourses = [];
    for (const courseData of practicalCourses) {
      const course = await createFirebaseCourse(courseData);
      createdCourses.push(course);
    }
    return NextResponse.json({ 
      success: true, 
      message: `Created ${createdCourses.length} practical courses`,
      courses: createdCourses 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
