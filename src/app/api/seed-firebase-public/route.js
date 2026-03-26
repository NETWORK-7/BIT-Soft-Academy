import { NextResponse } from "next/server";
import { 
  createCourse, 
  createLesson, 
  getAllCourses, 
  getLessonsByCourseId,
  deleteCourse
} from "@/lib/firebase-db";

// Course data for your learning platform
const COURSES_DATA = [
  {
    title: "HTML & CSS Mastery",
    description: "Master the fundamentals of web development with HTML5 and CSS3. Build responsive, modern websites from scratch.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919827.png",
    points: 150,
    tags: ["Frontend", "HTML", "CSS", "Beginner"],
    duration: "8 hours",
    rating: 4.8,
    instructor: "Sarah Chen"
  },
  {
    title: "JavaScript Complete Course",
    description: "Learn JavaScript from basics to advanced concepts. Master ES6+, async programming, and modern JS frameworks.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919832.png",
    points: 200,
    tags: ["Frontend", "JavaScript", "Programming", "Intermediate"],
    duration: "12 hours",
    rating: 4.7,
    instructor: "Mike Johnson"
  },
  {
    title: "React for Beginners",
    description: "Build modern web applications with React. Learn components, state management, and create your first interactive React apps.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
    points: 200,
    tags: ["Frontend", "React", "Programming", "Beginner"],
    duration: "10 hours",
    rating: 4.7,
    instructor: "Alex Rivera"
  }
];

// Lesson data distributed across courses
const LESSONS_DATA = [
  // HTML & CSS Mastery lessons
  {
    title: "HTML Basics",
    content: "Learn the fundamental structure of HTML documents. Understand tags, elements, and semantic HTML5.",
    duration: 45,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
  },
  {
    title: "CSS Introduction",
    content: "Learn how to style HTML elements with CSS. Understand selectors, properties, and values.",
    duration: 40,
    sortOrder: 2,
    videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc"
  },
  // JavaScript Complete Course lessons
  {
    title: "JavaScript Introduction",
    content: "Get started with JavaScript programming. Learn variables, data types, and basic operators.",
    duration: 50,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
  },
  // React for Beginners lessons
  {
    title: "React Introduction",
    content: "Get started with React library. Learn what React is, why use it, and how it works.",
    duration: 45,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
  }
];

export async function POST() {
  try {
    console.log("🧹 Starting Firebase cleanup and seeding...");
    
    // Clear existing data
    const existingCourses = await getAllCourses();
    console.log(`📋 Found ${existingCourses.length} existing courses`);
    
    if (existingCourses.length > 0) {
      console.log("🗑️  Deleting existing courses and lessons...");
      for (const course of existingCourses) {
        await deleteCourse(course._id);
        console.log(`🗑️  Deleted course: ${course.title || course._id}`);
      }
    }
    
    // Create courses
    const createdCourses = [];
    for (const courseData of COURSES_DATA) {
      console.log(`📚 Creating course: ${courseData.title}`);
      const course = await createCourse(courseData);
      createdCourses.push(course);
      console.log(`✅ Created course: ${course.title} (ID: ${course._id})`);
    }
    
    // Create lessons and associate with courses
    const lessonMappings = [
      { lessonIndex: 0, courseIndex: 0 }, // HTML Basics -> HTML & CSS Mastery
      { lessonIndex: 1, courseIndex: 0 }, // CSS Introduction -> HTML & CSS Mastery
      { lessonIndex: 2, courseIndex: 1 }, // JavaScript Introduction -> JavaScript Complete Course
      { lessonIndex: 3, courseIndex: 2 }, // React Introduction -> React for Beginners
    ];
    
    const createdLessons = [];
    for (const mapping of lessonMappings) {
      const lessonData = LESSONS_DATA[mapping.lessonIndex];
      const course = createdCourses[mapping.courseIndex];
      
      console.log(`📖 Creating lesson: ${lessonData.title} for course: ${course.title}`);
      
      try {
        const lesson = await createLesson({
          ...lessonData,
          courseId: course._id
        });
        
        createdLessons.push(lesson);
        console.log(`✅ Created lesson: ${lesson.title} (ID: ${lesson._id})`);
      } catch (lessonError) {
        console.error(`❌ Failed to create lesson: ${lessonData.title}`, lessonError);
        // Continue with other lessons even if one fails
      }
    }
    
    console.log("🎉 Firebase seeding completed successfully!");
    console.log(`📊 Created ${createdCourses.length} courses and ${createdLessons.length} lessons`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdCourses.length} courses with ${createdLessons.length} lessons`,
      courses: createdCourses.length,
      lessons: createdLessons.length,
      courseIds: createdCourses.map(c => ({ title: c.title, id: c._id }))
    });

  } catch (error) {
    console.error("❌ Seeding error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
