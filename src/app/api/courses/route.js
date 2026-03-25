import { NextResponse } from "next/server";
import { 
  getAllCourses, 
  getLessonsByCourseId, 
  createCourse as createFirebaseCourse 
} from "@/lib/firebase-db";
import { isAdminRequest } from "@/lib/api/admin";

export async function GET() {
  try {
    console.log("🔗 Attempting to connect to Firebase...");
    const courses = await getAllCourses();
    
    console.log(`✅ Database connected, fetching ${courses.length} courses...`);
    
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

    const db = await requireDb();
    const now = new Date();
    const result = await db.collection("courses").insertOne({
      title,
      description,
      image,
      points,
      tags,
      duration,
      rating,
      instructor,
      createdAt: now,
      updatedAt: now,
    });
    const doc = await db.collection("courses").findOne({ _id: result.insertedId });
    const course = docToCourse(doc, 0);
    return NextResponse.json({ success: true, course });
  } catch (e) {
    console.error("POST /api/courses:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

async function seedPracticalCourses() {
  const db = await requireDb();
  const coursesCol = db.collection("courses");
  const lessonsCol = db.collection("lessons");

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
    },
    {
      title: "Python Programming Basics",
      description: "Start coding with Python. Learn variables, loops, functions, and build your first programs in this beginner-friendly course.",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
      points: 180,
      tags: ["Python", "Programming", "Backend", "Beginner"],
      duration: "9 hours",
      rating: 4.9,
      instructor: "Emma Davis"
    }
  ];

  const practicalLessons = {
    "HTML & CSS for Beginners": [
      { title: "Writing Your First HTML", content: "Learn to write your first HTML code. Create headings, paragraphs, and understand basic structure of web pages.", videoId: "kUMe1FH4CHE", duration: 25 },
      { title: "Adding Text and Links", content: "Master text formatting and create links between pages. Practice writing real HTML code that you can see immediately.", videoId: "W6NZfCO5SIk", duration: 30 },
      { title: "Creating Lists and Images", content: "Learn to add bullet points, numbered lists, and images to your web pages. Make your content more engaging.", videoId: "3YW65K6LcIA", duration: 35 },
      { title: "CSS Basics - Colors and Fonts", content: "Add style to your HTML! Learn CSS syntax and change colors, fonts, and make your pages look professional.", videoId: "Vg4h8o2ZrKg", duration: 40 },
      { title: "CSS Layouts with Flexbox", content: "Arrange elements on your page using Flexbox. Create responsive layouts that work on all devices.", videoId: "NCwa_xi0Uuc", duration: 45 },
      { title: "Building Your First Web Page", content: "Combine HTML and CSS to build a complete web page from scratch. Practice everything you've learned!", videoId: "y17RuWkWdn8", duration: 50 }
    ],
    "JavaScript Fundamentals": [
      { title: "JavaScript Setup and First Code", content: "Set up your coding environment and write your first JavaScript program. See instant results in browser!", videoId: "W6NZfCO5SIk", duration: 30 },
      { title: "Variables and Data Types", content: "Learn to store information in variables. Work with text, numbers, and understand different data types.", videoId: "y17RuWkWdn8", duration: 35 },
      { title: "Functions - Reusable Code", content: "Write functions to reuse your code. Learn to create blocks of code that you can call multiple times.", videoId: "N57P4GiAqD0", duration: 40 },
      { title: "If Statements - Making Decisions", content: "Teach your program to make decisions. Use if statements to control what your code does based on conditions.", videoId: "IsX4T6I4eJw", duration: 35 },
      { title: "Loops - Repeating Actions", content: "Learn to repeat code efficiently. Use for and while loops to handle repetitive tasks.", videoId: "AxEgZ2zIjX0", duration: 40 },
      { title: "Arrays - Storing Lists", content: "Work with lists of data. Learn to create, modify, and loop through arrays in JavaScript.", videoId: "R8rmfD9Y8_c", duration: 45 }
    ],
    "React for Beginners": [
      { title: "React Setup and First Component", content: "Install React and create your first component. Learn basic structure of React applications.", videoId: "Ke90Tje7VS0", duration: 40 },
      { title: "Components and Props", content: "Understand React components and how to pass data between them using props. Build reusable UI elements.", videoId: "TNhaISOUy6Q", duration: 45 },
      { title: "State Management with useState", content: "Make your components interactive! Learn to manage state and update your UI when data changes.", videoId: "O6P86uwfR0M", duration: 50 },
      { title: "Handling User Events", content: "Respond to user clicks and input. Learn event handling to make your React apps interactive.", videoId: "iZhHR0J8V3g", duration: 40 },
      { title: "Conditional Rendering", content: "Show or hide content based on conditions. Learn to render different UI based on your app state.", videoId: "G0goR3In5pM", duration: 35 },
      { title: "Building a Todo App", content: "Apply everything by building a complete todo application. Practice React concepts in a real project.", videoId: "E1E08s2T_jE", duration: 60 }
    ],
    "Python Programming Basics": [
      { title: "Python Setup and First Program", content: "Install Python and write your first program. Learn print function and see immediate results.", videoId: "rfscVS0vtbw", duration: 30 },
      { title: "Variables and Basic Math", content: "Store and manipulate data. Learn variables, basic math operations, and string manipulation.", videoId: "DZwmZ8Usvnk", duration: 35 },
      { title: "User Input and Strings", content: "Get input from users and work with text. Learn input() function and string methods.", videoId: "QXeEoD0pB3E", duration: 40 },
      { title: "Lists and Loops", content: "Work with collections of data. Learn Python lists and how to loop through them efficiently.", videoId: "ohBxdw73EwM", duration: 45 },
      { title: "Functions in Python", content: "Create reusable code blocks. Learn to define and call functions with parameters and return values.", videoId: "9Os0o3wzS_I", duration: 40 },
      { title: "Building a Simple Calculator", content: "Create a working calculator program. Apply all concepts to build your first useful Python application.", videoId: "JRCJ6r2Jy9k", duration: 50 }
    ]
  };

  // Clear existing data
  await coursesCol.deleteMany({});
  await lessonsCol.deleteMany({});

  // Create courses and lessons
  const createdCourses = [];
  for (const courseData of practicalCourses) {
    const result = await coursesCol.insertOne({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    createdCourses.push({
      ...courseData,
      _id: result.insertedId.toString()
    });
  }

  let totalLessonsCreated = 0;
  for (const course of createdCourses) {
    const lessons = practicalLessons[course.title] || [];
    
    for (let i = 0; i < lessons.length; i++) {
      const lessonData = lessons[i];
      
      await lessonsCol.insertOne({
        courseId: course._id,
        title: lessonData.title,
        content: lessonData.content,
        durationMinutes: lessonData.duration,
        videoId: lessonData.videoId,
        sortOrder: i + 1,
        createdAt: new Date(),
      });
      
      totalLessonsCreated++;
    }
  }

  return NextResponse.json({
    success: true,
    message: `Successfully created ${createdCourses.length} practical courses with ${totalLessonsCreated} lessons`,
    courses: createdCourses.length,
    lessons: totalLessonsCreated
  });
}
