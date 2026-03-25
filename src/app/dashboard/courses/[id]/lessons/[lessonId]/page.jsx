"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, MessageSquare, Clock, Lock } from "lucide-react";
import YouTubePlayer from "@/components/YouTubePlayer";

function getKeyTopics(title) {
  const topics = {
    "Introduction to JavaScript": [
      "What is JavaScript and why learn it",
      "Setting up your development environment",
      "Basic syntax and how JavaScript works",
      "Variables (var, let, const) and naming conventions",
      "Data types: strings, numbers, booleans, null, undefined",
      "Type coercion and typeof operator"
    ],
    "Functions and Scope": [
      "Function declarations vs expressions",
      "Arrow functions and their syntax",
      "Function parameters and default values",
      "Return statements and function output",
      "Variable scope: global, function, and block scope",
      "Closures and lexical scoping",
      "Hoisting and temporal dead zone"
    ],
    "Objects and Arrays": [
      "Creating and accessing objects",
      "Object properties and methods",
      "Array creation and indexing",
      "Array methods: map, filter, reduce, forEach",
      "Array methods: find, some, every, includes",
      "Destructuring objects and arrays",
      "Spread operator and rest parameters"
    ],
    "DOM Manipulation": [
      "What is the DOM and how it works",
      "Selecting elements: getElementById, querySelector, querySelectorAll",
      "Creating and removing elements",
      "Modifying element properties and styles",
      "Event listeners and handling events",
      "Event bubbling and event delegation",
      "Common events: click, change, submit, keyup"
    ],
    "Asynchronous JavaScript": [
      "Understanding synchronous vs asynchronous code",
      "Callbacks and callback hell",
      "Promises: creating, resolving, rejecting",
      "Promise chaining and error handling",
      "Async/await syntax and usage",
      "Error handling with try/catch",
      "Working with multiple async operations"
    ],
    "ES6+ Features": [
      "let and const vs var",
      "Arrow functions and their benefits",
      "Template literals and string interpolation",
      "Destructuring assignments",
      "Spread operator (...)",
      "Classes and constructors",
      "Modules: import and export"
    ],
    "Working with APIs": [
      "Understanding REST APIs and endpoints",
      "The Fetch API and making requests",
      "HTTP methods: GET, POST, PUT, DELETE",
      "Request headers and authentication",
      "JSON format and parsing",
      "Handling API responses and errors",
      "Rate limiting and best practices"
    ],
    "Error Handling": [
      "Types of errors: syntax, runtime, logic",
      "Try/catch/finally blocks",
      "Creating custom errors",
      "Debugging techniques and tools",
      "Console methods: log, error, warn, table",
      "Browser DevTools and breakpoints",
      "Common errors and how to fix them"
    ],
    "Best Practices": [
      "Code organization and structure",
      "Naming conventions and readability",
      "DRY principle (Don't Repeat Yourself)",
      "SOLID principles for JavaScript",
      "Performance optimization techniques",
      "Memory leaks and garbage collection",
      "Code reviews and testing"
    ],
    "Project: Build a Web App": [
      "Planning your application structure",
      "Setting up project files and organization",
      "Building the HTML foundation",
      "Styling with CSS and responsive design",
      "Implementing core JavaScript functionality",
      "Adding interactivity and user feedback",
      "Testing and deploying your application"
    ]
  };
  return topics[title] || [
    "Core concepts and foundational knowledge",
    "Practical implementation techniques",
    "Best practices and industry standards",
    "Real-world applications",
    "Advanced tips and optimization"
  ];
}

// Get lesson-specific summary
function getLessonSummary(title) {
  const summaries = {
    "Introduction to JavaScript": "Start your JavaScript journey by understanding the basics. Learn how JavaScript works, how to set up your environment, and master fundamental concepts like variables and data types. This foundation is essential for everything you'll learn next.",
    "Functions and Scope": "Functions are the building blocks of JavaScript. Understand how to create reusable code with functions, manage variable scope effectively, and leverage powerful concepts like closures to write better code.",
    "Objects and Arrays": "Objects and arrays are crucial data structures in JavaScript. Learn how to organize and manipulate data efficiently using modern array methods and destructuring techniques.",
    "DOM Manipulation": "Connect your JavaScript code to the web page! Learn how to interact with HTML elements, respond to user actions, and dynamically update your pages without reloading.",
    "Asynchronous JavaScript": "Master the art of handling operations that take time. Learn callbacks, promises, and async/await to handle API calls, file operations, and user interactions smoothly.",
    "ES6+ Features": "Modern JavaScript is more powerful and readable. Discover ES6+ features that make your code cleaner, safer, and more efficient.",
    "Working with APIs": "Learn how to fetch real data from the internet! Understand REST APIs and how to integrate them into your applications to access live data.",
    "Error Handling": "Write robust code that handles errors gracefully. Learn debugging techniques and best practices to identify and fix problems quickly.",
    "Best Practices": "Elevate your code quality! Learn industry standards, performance optimization, and practices that professional developers use every day.",
    "Project: Build a Web App": "Apply everything you've learned by building a real web application from scratch. This hands-on project brings all concepts together into a working, deployed application."
  };
  return summaries[title] || "This comprehensive lesson provides everything you need to master this topic. Follow along with the video, take detailed notes, and apply the concepts in the practice exercises.";
}

export default function LessonPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const { id, lessonId } = await params;
      
      // Fetch course
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          const foundCourse = (data.courses || []).find((c) => c._id === id || c.id === parseInt(id));
          if (foundCourse) {
            setCourse(foundCourse);
            
            // Fetch lessons for this course
            if (foundCourse._id) {
              fetch(`/api/lessons?courseId=${foundCourse._id}`)
                .then((res) => res.json())
                .then((data) => {
                  const lessons = Array.isArray(data.lessons) ? data.lessons : [];
                  setAllLessons(lessons);
                  
                  // Find lesson by ID or index
                  let foundLesson = lessons.find((l) => l._id === lessonId);
                  if (!foundLesson) {
                    const index = parseInt(lessonId);
                    if (!isNaN(index) && index >= 0 && index < lessons.length) {
                      foundLesson = lessons[index];
                    }
                  }
                  
                  if (foundLesson) {
                    setLesson(foundLesson);
                  }
                  setLoading(false);
                });
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        });

   
      fetch("/api/complete")
        .then((res) => res.json())
        .then((data) => {
          if (data.totalPoints) {
            setTotalPoints(data.totalPoints);
          }
          if (data.completedLessons) {
            const isCompleted = data.completedLessons.some(
              (l) => l.lessonId === lessonId
            );
            setCompleted(isCompleted);
          }
        })
        .catch((err) => console.log("Progress fetch not available"));
    };
    unwrapParams();
  }, [params]);

  const handleCompleteLesson = async () => {
    if (completed) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson._id,
          courseId: course._id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCompleted(true);
        setTotalPoints(data.totalPoints);
        alert(`🎉 Excellent! You earned ${data.pointsEarned} points!\nTotal points: ${data.totalPoints}`);
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Error completing lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
        <div className="text-2xl text-purple-600 font-semibold animate-pulse">Loading lesson...</div>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-600">Lesson not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/dashboard/courses/${course.id}/lessons`} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="h-5 w-5" />
            Back to Lessons
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCompleteLesson}
              disabled={completed || isSubmitting}
              className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                completed
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : isSubmitting
                  ? "bg-gray-300 text-gray-600 cursor-wait"
                  : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              {isSubmitting ? "Processing..." : completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2">
         
            <div className="bg-black rounded-2xl shadow-lg overflow-hidden mb-8 aspect-video">
              {lesson.videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-brand-from to-brand-to">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-2xl font-semibold">Video Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

         
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-4">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>45 minutes</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  <CheckCircle className="h-5 w-5" />
                  <span>{completed ? "Completed" : "In Progress"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Lesson</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {lesson.content || `In this lesson, you will learn the key concepts and practical skills needed to master ${lesson.title}. Follow along with the video, take notes, and complete the quiz at the end to test your understanding.`}
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Topics</h3>
              <ul className="space-y-3 text-gray-700">
                {getKeyTopics(lesson.title).map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lesson Summary</h3>
                <p className="text-gray-700">
                  {getLessonSummary(lesson.title)}
                </p>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition">
                  <Download className="h-6 w-6 text-purple-600" />
                  <span className="font-semibold text-gray-900">Download Lesson Notes</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition">
                  <Download className="h-6 w-6 text-purple-600" />
                  <span className="font-semibold text-gray-900">Download Code Examples</span>
                </a>
              </div>
            </div>
          </div>

        
          <div>
          
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 sticky top-28">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
              
              {completed && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">✅ Lesson Completed!</p>
                  <p className="text-green-600 text-sm mt-1">+10 points earned</p>
                  <p className="text-green-600 text-sm">Total: {totalPoints} points</p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Lesson Progress</h4>
                <p className="text-sm text-gray-600">
                  {completed ? "This lesson is complete! 🎉" : "Complete this lesson to earn points and progress"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Questions?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Join our community forum to discuss this lesson with other learners.
              </p>
              <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition">
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
