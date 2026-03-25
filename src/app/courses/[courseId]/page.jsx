"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Star, User, ChevronRight } from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export default function CourseDetailsPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const { language } = useLanguageContext();

  useEffect(() => {
    const unwrapParams = async () => {
      const { courseId } = await params;

      if (!courseId) {
        setLoading(false);
        return;
      }

   
      fetch("/api/courses")
        .then((res) => {
          console.log("📡 API Response status:", res.status);
          if (!res.ok) {
            throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("📚 Courses data:", data);
          const found = (data.courses || []).find((c) => c._id === courseId);
          console.log("🎯 Found course:", found);
          
          if (!found) {
            console.warn("Course not found. Available IDs:", data.courses?.map(c => c._id));
            setLoading(false);
            return;
          }

          setCourse(found);

       
          if (found._id) {
            return fetch(`/api/lessons?courseId=${found._id}`)
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch lessons");
                return res.json();
              })
              .then((data) => {
                let lessonsList = Array.isArray(data.lessons) ? data.lessons : [];
                
                // If no lessons from API, add practical lessons based on course title
                if (lessonsList.length === 0 && course && course.title) {
                  if (course.title.includes("React")) {
                    lessonsList = [
                      {
                        _id: "react-1",
                        title: t(language, "lessons.reactSetup"),
                        content: "Install React and create your first component. Learn basic structure of React applications.",
                        duration: 40,
                        videoId: "Ke90Tje7VS0"
                      },
                      {
                        _id: "react-2", 
                        title: t(language, "lessons.componentsProps"),
                        content: "Understand React components and how to pass data between them using props. Build reusable UI elements.",
                        duration: 45,
                        videoId: "TNhaISOUy6Q"
                      },
                      {
                        _id: "react-3",
                        title: t(language, "lessons.stateManagement"),
                        content: "Make your components interactive! Learn to manage state and update your UI when data changes.",
                        duration: 50,
                        videoId: "O6P86uwfR0M"
                      },
                      {
                        _id: "react-4",
                        title: t(language, "lessons.handlingUserEvents"), 
                        content: "Respond to user clicks and input. Learn event handling to make your React apps interactive.",
                        duration: 40,
                        videoId: "iZhHR0J8V3g"
                      },
                      {
                        _id: "react-5",
                        title: t(language, "lessons.conditionalRendering"),
                        content: "Show or hide content based on conditions. Learn to render different UI based on your app state.",
                        duration: 35,
                        videoId: "G0goR3In5pM"
                      },
                      {
                        _id: "react-6",
                        title: t(language, "lessons.buildingTodoApp"),
                        content: "Apply everything by building a complete todo application. Practice React concepts in a real project.",
                        duration: 60,
                        videoId: "E1E08s2T_jE"
                      }
                    ];
                  } else if (course.title.includes("HTML") || course.title.includes("CSS")) {
                    lessonsList = [
                      {
                        _id: "html-1",
                        title: t(language, "lessons.writingFirstHTML"),
                        content: "Learn to write your first HTML code. Create headings, paragraphs, and understand basic structure of web pages.",
                        duration: 25,
                        videoId: "kUMe1FH4CHE"
                      },
                      {
                        _id: "html-2",
                        title: t(language, "lessons.addingTextLinks"),
                        content: "Master text formatting and create links between pages. Practice writing real HTML code that you can see immediately.",
                        duration: 30,
                        videoId: "W6NZfCO5SIk"
                      },
                      {
                        _id: "html-3",
                        title: t(language, "lessons.creatingListsImages"),
                        content: "Learn to add bullet points, numbered lists, and images to your web pages. Make your content more engaging.",
                        duration: 35,
                        videoId: "3YW65K6LcIA"
                      },
                      {
                        _id: "html-4",
                        title: t(language, "lessons.cssBasics"),
                        content: "Add style to your HTML! Learn CSS syntax and change colors, fonts, and make your pages look professional.",
                        duration: 40,
                        videoId: "Vg4h8o2ZrKg"
                      },
                      {
                        _id: "html-5",
                        title: t(language, "lessons.cssLayouts"),
                        content: "Arrange elements on your page using Flexbox. Create responsive layouts that work on all devices.",
                        duration: 45,
                        videoId: "NCwa_xi0Uuc"
                      },
                      {
                        _id: "html-6",
                        title: t(language, "lessons.buildingFirstWebPage"),
                        content: "Combine HTML and CSS to build a complete web page from scratch. Practice everything you've learned!",
                        duration: 50,
                        videoId: "y17RuWkWdn8"
                      }
                    ];
                  } else if (course.title.includes("JavaScript")) {
                    lessonsList = [
                      {
                        _id: "js-1",
                        title: t(language, "lessons.javascriptSetup"),
                        content: "Set up your coding environment and write your first JavaScript program. See instant results in browser!",
                        duration: 30,
                        videoId: "W6NZfCO5SIk"
                      },
                      {
                        _id: "js-2",
                        title: t(language, "lessons.variablesDataTypes"),
                        content: "Learn to store information in variables. Work with text, numbers, and understand different data types.",
                        duration: 35,
                        videoId: "y17RuWkWdn8"
                      },
                      {
                        _id: "js-3",
                        title: t(language, "lessons.functionsReusableCode"),
                        content: "Write functions to reuse your code. Learn to create blocks of code that you can call multiple times.",
                        duration: 40,
                        videoId: "N57P4GiAqD0"
                      },
                      {
                        _id: "js-4",
                        title: t(language, "lessons.ifStatements"),
                        content: "Teach your program to make decisions. Use if statements to control what your code does based on conditions.",
                        duration: 35,
                        videoId: "IsX4T6I4eJw"
                      },
                      {
                        _id: "js-5",
                        title: t(language, "lessons.loopsRepeatingActions"),
                        content: "Learn to repeat code efficiently. Use for and while loops to handle repetitive tasks.",
                        duration: 40,
                        videoId: "AxEgZ2zIjX0"
                      },
                      {
                        _id: "js-6",
                        title: t(language, "lessons.arraysStoringLists"),
                        content: "Work with lists of data. Learn to create, modify, and loop through arrays in JavaScript.",
                        duration: 45,
                        videoId: "R8rmfD9Y8_c"
                      }
                    ];
                  } else if (course.title.includes("Python")) {
                    // Python lessons removed - using Tailwind CSS instead
                    lessonsList = [];
                  }
                }
                
                setLessons(lessonsList);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching course/lessons:", err);
          setLoading(false);
        });
    };

    unwrapParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">Course not found</p>
          <Link href="/courses" className="text-purple-600 hover:text-purple-700 font-semibold">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-brand-from to-brand-to text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            {t(language, "lessons.backToCourses")}
          </Link>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-white/90 mt-3 max-w-2xl">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
          <div className="lg:col-span-2">
           
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <Clock className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600 text-sm">{t(language, "lessons.duration")}</p>
                <p className="text-2xl font-bold text-gray-900">{course.duration || "12 hrs"}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600 text-sm">{t(language, "courses.lessons")}</p>
                <p className="text-2xl font-bold text-gray-900">{lessons.length || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <p className="text-gray-600 text-sm">{t(language, "courses.rating")}</p>
                <p className="text-2xl font-bold text-gray-900">{course.rating || "4.8"}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-6 w-6 text-purple-600 mb-2 text-lg">⭐</div>
                <p className="text-gray-600 text-sm">Points</p>
                <p className="text-2xl font-bold text-gray-900">{course.points || 100}</p>
              </div>
            </div>

         
            <div className="bg-white rounded-xl shadow p-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-linear-to-r from-brand-from/80 to-brand-to/80 rounded-full flex items-center justify-center text-3xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t(language, "lessons.instructor")}</h3>
                  <p className="text-gray-600">{course.instructor || "Expert Instructor"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{t(language, "lessons.courseContent")} ({lessons.length} {t(language, "courses.lessons")})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <Link
                      key={lesson._id || index}
                      href={`/courses/${course._id}/lessons/${lesson._id || index}`}
                      className="p-6 hover:bg-purple-50 transition block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                          </div>
                          {lesson.description && (
                            <p className="text-gray-600 ml-11">{lesson.description}</p>
                          )}
                          {lesson.duration && (
                            <p className="text-sm text-gray-500 ml-11 mt-1">
                              ⏱️ {lesson.duration} minutes
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">{t(language, "lessons.noLessons")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-8 sticky top-4">
              <button
                onClick={() => setEnrolled(!enrolled)}
                className={`w-full py-3 rounded-lg font-bold text-lg transition mb-4 ${
                  enrolled
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {enrolled ? t(language, "lessons.enrolled") : t(language, "courses.enroll")}
              </button>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">{t(language, "lessons.courseLevel")}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {course.tags?.[0] || "Beginner"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t(language, "lessons.topics")}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {course.tags?.slice(1).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
