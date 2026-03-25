import { NextResponse } from "next/server";
import { requireDb } from "@/lib/db";

export async function POST() {
  try {
    const db = await requireDb();
    if (!db) {
      return NextResponse.json({ 
        success: false, 
        error: "Database not available" 
      });
    }

    const coursesCol = db.collection("courses");
    const lessonsCol = db.collection("lessons");

    // Get all courses
    const courses = await coursesCol.find({}).toArray();
    
    // Get all lessons
    const lessons = await lessonsCol.find({}).toArray();
    
    console.log(`Found ${courses.length} courses and ${lessons.length} lessons`);

    // Define which lessons belong to which course based on titles
    const courseLessonMapping = {
      "JavaScript Fundamentals": [
        "What is JavaScript?",
        "Setting Up Your Environment", 
        "Variables and Data Types",
        "Operators and Expressions",
        "Control Flow: If Statements",
        "Loops and Iteration",
        "Functions",
        "Arrays",
        "Objects",
        "DOM Manipulation",
        "Event Handling",
        "Forms and Validation",
        "Async JavaScript",
        "Error Handling",
        "ES6 Features",
        "Modules and Imports",
        "Local Storage",
        "AJAX and Fetch API",
        "Project: Todo App"
      ],
      "HTML & CSS Mastery": [
        "HTML Basics",
        "HTML Elements and Tags", 
        "Forms and Input",
        "CSS Introduction",
        "CSS Selectors",
        "Box Model",
        "Flexbox",
        "Grid Layout",
        "Responsive Design",
        "Animations",
        "Transitions",
        "Typography",
        "Colors and Backgrounds",
        "Positioning",
        "Media Queries",
        "CSS Variables",
        "Pseudo-classes",
        "Pseudo-elements",
        "Project: Portfolio Site"
      ],
      "React Complete Course": [
        "React Introduction",
        "JSX Syntax",
        "Components",
        "Props",
        "State",
        "Hooks",
        "Events",
        "Conditional Rendering",
        "Lists and Keys",
        "Forms",
        "Routing",
        "Context API",
        "Redux Basics",
        "Performance",
        "Testing",
        "Deployment",
        "Project: E-commerce",
        "Best Practices"
      ],
      "Advanced JavaScript & ES6+": [
        "Advanced Functions",
        "Closures",
        "Prototypes",
        "Classes",
        "Promises",
        "Async/Await",
        "Generators",
        "Modules",
        "Decorators",
        "Metaprogramming",
        "Performance Optimization",
        "Memory Management",
        "Design Patterns",
        "Functional Programming",
        "TypeScript Integration",
        "Web Workers",
        "Service Workers",
        "Project: Advanced App"
      ]
    };

    // Update lessons with correct courseId
    let updatedCount = 0;
    
    for (const course of courses) {
      const courseTitle = course.title;
      const expectedLessons = courseLessonMapping[courseTitle] || [];
      
      // Find lessons that should belong to this course
      const matchingLessons = lessons.filter(lesson => 
        expectedLessons.includes(lesson.title)
      );
      
      console.log(`Course: ${courseTitle}, Expected: ${expectedLessons.length}, Found: ${matchingLessons.length}`);
      
      // Update each lesson with correct courseId
      for (const lesson of matchingLessons) {
        await lessonsCol.updateOne(
          { _id: lesson._id },
          { 
            $set: { 
              courseId: course._id.toString(),
              sortOrder: expectedLessons.indexOf(lesson.title) + 1
            }
          }
        );
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully linked ${updatedCount} lessons to their courses`,
      courses: courses.length,
      totalLessons: lessons.length,
      updatedLessons: updatedCount
    });

  } catch (error) {
    console.error("Link lessons error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
