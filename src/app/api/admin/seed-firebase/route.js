import { NextResponse } from "next/server";
import { 
  createCourse, 
  createLesson, 
  getAllCourses, 
  getLessonsByCourseId 
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

const LESSONS_DATA = {
  "HTML & CSS Mastery": [
    {
      title: "HTML Basics",
      content: "Learn the fundamental structure of HTML documents. Understand tags, elements, and semantic HTML5. Create your first web page with proper HTML structure.",
      duration: 45,
      sortOrder: 1,
      videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
    },
    {
      title: "HTML Elements and Tags",
      content: "Master HTML elements including headings, paragraphs, lists, links, and images. Learn how to structure content properly with semantic tags.",
      duration: 50,
      sortOrder: 2,
      videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE"
    },
    {
      title: "Forms and Input",
      content: "Create interactive forms with various input types. Learn text fields, checkboxes, radio buttons, select dropdowns, and textarea. Understand form validation.",
      duration: 55,
      sortOrder: 3,
      videoUrl: "https://www.youtube.com/embed/G3e-cpL8GME"
    },
    {
      title: "CSS Introduction",
      content: "Learn how to style HTML elements with CSS. Understand selectors, properties, and values. Create beautiful and responsive designs.",
      duration: 40,
      sortOrder: 4,
      videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc"
    },
    {
      title: "CSS Selectors",
      content: "Master element, class, ID, attribute, and combinators selectors. Learn specificity and selector performance. Write efficient CSS.",
      duration: 50,
      sortOrder: 5,
      videoUrl: "https://www.youtube.com/embed/2pL-Mi-sLQg"
    },
    {
      title: "Box Model",
      content: "Understand margin, border, padding, and content areas. Learn how browsers calculate element dimensions. Debug layout issues using box model concepts.",
      duration: 45,
      sortOrder: 6,
      videoUrl: "https://www.youtube.com/embed/rj5So2U7p_o"
    },
    {
      title: "Flexbox Layout",
      content: "Master CSS Flexbox for creating flexible layouts. Learn flex container, flex items, and flex properties. Build responsive layouts easily.",
      duration: 60,
      sortOrder: 7,
      videoUrl: "https://www.youtube.com/embed/3Y65oGiQqHs"
    },
    {
      title: "Grid Layout",
      content: "Learn CSS Grid for complex layouts. Master grid containers, grid items, and grid properties. Create advanced responsive designs.",
      duration: 65,
      sortOrder: 8,
      videoUrl: "https://www.youtube.com/embed/EiNiSFIPIQE"
    },
    {
      title: "Responsive Design",
      content: "Create websites that work on all devices. Learn media queries, breakpoints, and mobile-first design. Optimize for different screen sizes.",
      duration: 55,
      sortOrder: 9,
      videoUrl: "https://www.youtube.com/embed/srvUrASNj0s"
    },
    {
      title: "Project: Portfolio Site",
      content: "Build a complete portfolio website using HTML and CSS. Apply all concepts learned in this course. Create a professional-looking portfolio.",
      duration: 90,
      sortOrder: 10,
      videoUrl: "https://www.youtube.com/embed/7sPUq2w3Fh8"
    }
  ],
  "JavaScript Complete Course": [
    {
      title: "JavaScript Introduction",
      content: "Get started with JavaScript programming. Learn variables, data types, and basic operators. Write your first JavaScript programs.",
      duration: 50,
      sortOrder: 1,
      videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    {
      title: "Functions and Scope",
      content: "Master JavaScript functions, parameters, and return values. Understand function scope, closures, and hoisting. Write reusable code.",
      duration: 55,
      sortOrder: 2,
      videoUrl: "https://www.youtube.com/embed/N-866Ov2vJc"
    },
    {
      title: "Arrays and Objects",
      content: "Work with complex data structures using arrays and objects. Learn array methods, object properties, and destructuring. Manipulate data efficiently.",
      duration: 60,
      sortOrder: 3,
      videoUrl: "https://www.youtube.com/embed/X-iSQQgH8qs"
    },
    {
      title: "DOM Manipulation",
      content: "Interact with web pages using JavaScript. Learn to select elements, modify content, handle events, and create dynamic user interfaces.",
      duration: 65,
      sortOrder: 4,
      videoUrl: "https://www.youtube.com/embed/XI4q_8m8K4Y"
    },
    {
      title: "Async JavaScript",
      content: "Master asynchronous programming with callbacks, promises, and async/await. Handle API calls and time-based operations effectively.",
      duration: 70,
      sortOrder: 5,
      videoUrl: "https://www.youtube.com/embed/PoRJ-bF3q2o"
    },
    {
      title: "Error Handling",
      content: "Write robust code with proper error handling. Learn try-catch blocks, error objects, and debugging techniques. Handle edge cases gracefully.",
      duration: 45,
      sortOrder: 6,
      videoUrl: "https://www.youtube.com/embed/c_3QQHkHJx8"
    },
    {
      title: "ES6 Features",
      content: "Learn modern JavaScript features including arrow functions, template literals, destructuring, and spread operators. Write cleaner, more efficient code.",
      duration: 60,
      sortOrder: 7,
      videoUrl: "https://www.youtube.com/embed/NCwa_xi0Uuc"
    },
    {
      title: "Modules and Imports",
      content: "Organize code with ES6 modules. Learn import/export syntax, module bundling, and dependency management. Build scalable applications.",
      duration: 50,
      sortOrder: 8,
      videoUrl: "https://www.youtube.com/embed/xsMj3MkS_1g"
    },
    {
      title: "Local Storage",
      content: "Persist data in the browser using localStorage and sessionStorage. Learn to save user preferences, cache data, and create offline-capable apps.",
      duration: 40,
      sortOrder: 9,
      videoUrl: "https://www.youtube.com/embed/kj9S7261m_w"
    },
    {
      title: "Project: Todo App",
      content: "Build a complete todo application using JavaScript. Apply all concepts learned including DOM manipulation, local storage, and event handling.",
      duration: 90,
      sortOrder: 10,
      videoUrl: "https://www.youtube.com/embed/JB8n6Jyq5zU"
    }
  ],
  "React for Beginners": [
    {
      title: "React Introduction",
      content: "Get started with React library. Learn what React is, why use it, and how it works. Set up your first React application.",
      duration: 45,
      sortOrder: 1,
      videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
    },
    {
      title: "JSX Syntax",
      content: "Master JSX - JavaScript XML syntax. Learn to write HTML-like code in JavaScript. Understand JSX rules, expressions, and components.",
      duration: 50,
      sortOrder: 2,
      videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q"
    },
    {
      title: "Components",
      content: "Build reusable UI components. Learn functional vs class components, component composition, and component lifecycle. Create modular interfaces.",
      duration: 60,
      sortOrder: 3,
      videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
    },
    {
      title: "Props",
      content: "Pass data between components using props. Learn prop types, default props, and prop drilling. Create flexible, reusable components.",
      duration: 55,
      sortOrder: 4,
      videoUrl: "https://www.youtube.com/embed/Ih1y5a3Y6qE"
    },
    {
      title: "State Management",
      content: "Manage component state with useState hook. Learn state updates, state lifting, and component communication. Create dynamic interfaces.",
      duration: 65,
      sortOrder: 5,
      videoUrl: "https://www.youtube.com/embed/O6P86uwP-PI"
    },
    {
      title: "Hooks",
      content: "Master React hooks including useState, useEffect, useContext, and custom hooks. Write functional components with state and lifecycle features.",
      duration: 70,
      sortOrder: 6,
      videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q"
    },
    {
      title: "Event Handling",
      content: "Handle user interactions in React. Learn event handlers, synthetic events, and event delegation. Create interactive user interfaces.",
      duration: 45,
      sortOrder: 7,
      videoUrl: "https://www.youtube.com/embed/9X2nn2JlGdc"
    },
    {
      title: "Conditional Rendering",
      content: "Render components conditionally based on state and props. Learn ternary operators, logical operators, and if statements in JSX.",
      duration: 40,
      sortOrder: 8,
      videoUrl: "https://www.youtube.com/embed/0iYt2JL2_0k"
    },
    {
      title: "Lists and Keys",
      content: "Render lists of data in React. Learn map function, key prop, and list optimization. Handle dynamic data efficiently.",
      duration: 50,
      sortOrder: 9,
      videoUrl: "https://www.youtube.com/embed/9X2nn2JL2_0k"
    },
    {
      title: "Project: Interactive Dashboard",
      content: "Build a complete interactive dashboard using React. Apply all concepts learned including components, state, hooks, and event handling.",
      duration: 90,
      sortOrder: 10,
      videoUrl: "https://www.youtube.com/embed/7sPUq2w3Fh8"
    }
  ]
};

export async function POST() {
  try {
    console.log("🌱 Starting Firebase database seeding...");
    console.log("📋 Checking existing data...");
    const existingCourses = await getAllCourses();
    console.log(`Found ${existingCourses.length} existing courses`);
    const createdCourses = [];
    
    for (const courseData of COURSES_DATA) {
      console.log(`📚 Creating course: ${courseData.title}`);
      const course = await createCourse(courseData);
      createdCourses.push(course);
      console.log(`✅ Course created with ID: ${course._id}`);
      const lessons = LESSONS_DATA[courseData.title] || [];
      console.log(`📄 Creating ${lessons.length} lessons for ${courseData.title}`);
      
      for (let i = 0; i < lessons.length; i++) {
        const lessonData = lessons[i];
        const lessonWithCourseId = {
          ...lessonData,
          courseId: course._id
        };
        
        const lesson = await createLesson(lessonWithCourseId);
        console.log(`✅ Lesson created: ${lesson.title} (Sort Order: ${lesson.sortOrder})`);
      }
    }
    
    console.log("\n🔍 Verifying seeded data...");
    const finalCourses = await getAllCourses();
    let totalLessons = 0;
    
    for (const course of finalCourses) {
      const lessons = await getLessonsByCourseId(course._id);
      totalLessons += lessons.length;
      console.log(`📚 ${course.title}: ${lessons.length} lessons`);
    }
    
    console.log(`\n🎉 Seeding completed successfully!`);
    console.log(`📊 Summary: ${finalCourses.length} courses, ${totalLessons} lessons created`);
    
    return NextResponse.json({ 
      success: true,
      message: `Successfully seeded ${finalCourses.length} courses and ${totalLessons} lessons`,
      courses: finalCourses.length,
      lessons: totalLessons,
      courseDetails: finalCourses.map(c => ({
        id: c._id,
        title: c.title,
        instructor: c.instructor,
        duration: c.duration,
        points: c.points
      }))
    });
    
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const courses = await getAllCourses();
    let totalLessons = 0;
    
    for (const course of courses) {
      const lessons = await getLessonsByCourseId(course._id);
      totalLessons += lessons.length;
    }
    
    return NextResponse.json({ 
      courses: courses.length,
      lessons: totalLessons,
      courseDetails: courses.map(c => ({
        id: c._id,
        title: c.title,
        instructor: c.instructor,
        duration: c.duration,
        points: c.points
      }))
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
