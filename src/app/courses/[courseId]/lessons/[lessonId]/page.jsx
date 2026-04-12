"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, BookOpen, Lock } from "lucide-react";
import YouTubePlayer from "@/components/YouTubePlayer";

// Get lesson-specific topics
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


function getVideoId(lessonIndex) {
  
  return "lfmg-EJ8gm4";
}

export default function LessonPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchLessonData = async () => {
    const { courseId, lessonId } = await params;
    fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          const found = (data.courses || []).find((c) => c._id === courseId);
          setCourse(found);
      
          if (found && found._id) {
            fetch(`/api/lessons?courseId=${found._id}`)
              .then((res) => res.json())
              .then((data) => {
                const lessons = Array.isArray(data.lessons) ? data.lessons : [];
                setAllLessons(lessons);
                
                // Process lessons to ensure they have proper videoId
                const processedLessons = lessons.map(lesson => {
                  // If lesson has videoUrl but no videoId, extract videoId from URL
                  if (lesson.videoUrl && !lesson.videoId) {
                    const match = lesson.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
                    lesson.videoId = match ? match[1] : null;
                  }
                  return lesson;
                });
                
                let currentLesson = processedLessons.find((l) => l._id === lessonId);
                
                if (!currentLesson) {
                  const index = parseInt(lessonId);
                  if (!isNaN(index) && index >= 0 && index < processedLessons.length) {
                    currentLesson = processedLessons[index];
                  }
                }
                
                if (!currentLesson && processedLessons.length > 0) {
                  currentLesson = processedLessons[0];
                }
                
                setLesson(currentLesson || null);
                setLoading(false);
              })
              .catch((err) => {
                console.error("Error fetching lessons:", err);
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          console.error("Error fetching course:", err);
          setLoading(false);
        });

      // Fetch user progress
      fetch("/api/complete")
        .then((res) => res.json())
        .then((data) => {
          if (data.totalPoints) {
            setTotalPoints(data.totalPoints);
          }
      
          if (data.completedLessons) {
            const isCompleted = data.completedLessons.some(
              (l) => l.lessonId === lessonId || l.lessonId === lessonId
            );
            setCompleted(isCompleted);
          }
        })
        .catch((err) => console.log("Progress fetch not available"));
  };
    
  useEffect(() => {
    // Check authentication first
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.user);
        setAuthChecked(true);
        
        if (!data.user) {
          setLoading(false);
          return;
        }
        
        // Only fetch lesson data if authenticated
        fetchLessonData();
      })
      .catch(() => {
        setIsAuthenticated(false);
        setAuthChecked(true);
        setLoading(false);
      });
  }, [params]);

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
          <Lock className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access this lesson and start learning.
          </p>
          <Link
            href="/sign-in"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">Lesson not found</p>
        </div>
      </div>
    );
  }

  const currentLessonIndex = allLessons.findIndex((l) => l._id === lesson._id);
  const nextLesson = allLessons[currentLessonIndex + 1];
  const prevLesson = allLessons[currentLessonIndex - 1];

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

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Link
            href={`/courses/${course._id}`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate max-w-[200px] sm:max-w-none">Back to {course.title}</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-xs sm:text-sm text-gray-600">
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-purple-600 flex items-center gap-1">
              <span className="hidden sm:inline">{'\u2b50'}</span>
              <span>{totalPoints} points</span>
            </div>
          </div>
        </div>
        
    
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-linear-to-r from-brand-from to-brand-to h-full transition-all duration-300"
              style={{ width: `${((currentLessonIndex + 1) / allLessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
      
          <div className="lg:col-span-3">
           
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <YouTubePlayer 
                videoId={lesson.videoId} 
                title={lesson.title}
                className="aspect-video"
              />

          
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
                
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{lesson.duration || 45} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <span>Video + Quiz</span>
                  </div>
                </div>

                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {lesson.content}
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Topics</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
                    {getKeyTopics(lesson.title).map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lesson Summary</h3>
                  <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      {getLessonSummary(lesson.title)}
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Resources</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">📹</span>
                      <span><strong>Video Tutorial:</strong> Complete video lesson with step-by-step explanations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">📝</span>
                      <span><strong>Code Examples:</strong> Download source code and practice files</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">✅</span>
                      <span><strong>Quiz:</strong> Test your knowledge with interactive questions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">💬</span>
                      <span><strong>Discussion:</strong> Ask questions and learn from others</span>
                    </li>
                  </ul>
                </div>

                {/* Complete Button */}
                <div className="mb-8">
                  <button
                    onClick={handleCompleteLesson}
                    disabled={completed || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition ${
                      completed
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : isSubmitting
                        ? "bg-gray-400 text-white cursor-wait"
                        : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                    }`}
                  >
                    {isSubmitting ? "⏳ Processing..." : completed ? "✓ Lesson Completed" : "Mark as Complete"}
                  </button>
                  {completed && (
                    <p className="mt-3 text-green-600 font-semibold text-lg">
                      🎉 You earned 10 points! Total: {totalPoints} points
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {prevLesson ? (
                <Link
                  href={`/courses/${course._id}/lessons/${currentLessonIndex - 1}`}
                  className="flex-1 bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-600 hover:shadow-lg transition text-center"
                >
                  <p className="text-sm text-gray-600 mb-2">← Previous Lesson</p>
                  <p className="font-semibold text-gray-900 truncate">{prevLesson.title}</p>
                </Link>
              ) : (
                <div className="flex-1"></div>
              )}
              
              {nextLesson ? (
                <Link
                  href={`/courses/${course._id}/lessons/${currentLessonIndex + 1}`}
                  className="flex-1 bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-600 hover:shadow-lg transition text-center"
                >
                  <p className="text-sm text-gray-600 mb-2">Next Lesson →</p>
                  <p className="font-semibold text-gray-900 truncate">{nextLesson.title}</p>
                </Link>
              ) : (
                <Link
                  href={`/courses/${course._id}`}
                  className="flex-1 bg-green-600 text-white rounded-lg p-4 hover:bg-green-700 transition text-center"
                >
                  <p className="text-sm mb-2">Course Complete! 🎉</p>
                  <p className="font-semibold">Back to Course</p>
                </Link>
              )}
            </div>
          </div>

        
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Course Content</h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {allLessons.map((l, idx) => (
                  <Link
                    key={l._id || idx}
                    href={`/courses/${course._id}/lessons/${idx}`}
                    className={`block p-3 rounded-lg transition ${
                      l._id === lesson._id
                        ? "bg-purple-100 border-2 border-purple-600"
                        : "bg-gray-50 border border-gray-200 hover:border-purple-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {l._id === lesson._id ? (
                        <CheckCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {idx + 1}. {l.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{l.duration || 45} min</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
