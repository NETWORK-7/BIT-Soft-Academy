import { 
  createCourse,
  createLesson,
  deleteCourse,
  getAllCourses,
  getLessonsByCourseId
} from '../src/lib/firebase-db.js';

// Course data
const courses = [
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

// Lesson data
const lessons = [
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
  {
    title: "JavaScript Introduction",
    content: "Get started with JavaScript programming. Learn variables, data types, and basic operators.",
    duration: 50,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
  },
  {
    title: "React Introduction",
    content: "Get started with React library. Learn what React is, why use it, and how it works.",
    duration: 45,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
  }
];

async function clearAndSeedFirebaseData() {
  try {
    console.log("🧹 Starting Firebase data cleanup and seeding...");
    
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
    for (const courseData of courses) {
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
    
    for (const mapping of lessonMappings) {
      const lessonData = lessons[mapping.lessonIndex];
      const course = createdCourses[mapping.courseIndex];
      
      console.log(`📖 Creating lesson: ${lessonData.title} for course: ${course.title}`);
      
      const lesson = await createLesson({
        ...lessonData,
        courseId: course._id
      });
      
      console.log(`✅ Created lesson: ${lesson.title} (ID: ${lesson._id})`);
    }
    
    console.log("🎉 Firebase seeding completed successfully!");
    console.log(`📊 Created ${createdCourses.length} courses and ${lessonMappings.length} lessons`);
    
    // Verify the data
    const finalCourses = await getAllCourses();
    console.log(`✅ Verification: Found ${finalCourses.length} courses in Firebase`);
    
    for (const course of finalCourses) {
      const courseLessons = await getLessonsByCourseId(course._id);
      console.log(`📚 Course: ${course.title} - ${courseLessons.length} lessons`);
    }
    
  } catch (error) {
    console.error("❌ Error seeding Firebase data:", error);
    throw error;
  }
}

// Run the seeding
clearAndSeedFirebaseData().catch(console.error);
