"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Clock, BookOpen, User, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setIsSignedIn(!!data.user);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsSignedIn(false);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!isSignedIn) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isSignedIn]);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Data Science",
    "Cloud",
    "Full-Stack",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      course.tags?.some(
        (tag) => tag === selectedCategory || tag.includes(selectedCategory),
      );
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "rating")
      return parseFloat(b.rating || 4.8) - parseFloat(a.rating || 4.8);
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  const getLessonCount = (lessons) => {
    if (Array.isArray(lessons)) return lessons.length;
    if (typeof lessons === "number") return lessons;
    return 24;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">All Courses</h1>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Explore our expertly crafted courses and take the next step in your
            coding journey. From beginner to advanced — master modern web
            development with hands-on projects.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 transition appearance-none bg-white cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {sortedCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {courses.length}
            </span>{" "}
            courses
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl animate-spin">⏳</div>
            <p className="text-gray-600 mt-4">Loading courses...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border-2 border-red-200">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-red-700">
              Error Loading Courses
            </h3>
            <p className="text-red-600 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <Link
                key={course._id || course.id}
                href={`/courses/${course._id}`}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 block"
              >
                <div className="h-48 bg-linear-to-br from-brand-from/80 to-brand-to/80 relative overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-32 w-32 absolute bottom-0 right-0 translate-x-8 translate-y-8 object-contain drop-shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="h-32 w-32 absolute bottom-0 right-0 translate-x-8 translate-y-8 flex items-center justify-center">
                      <div className="text-4xl text-white/50">
                        📚
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {course.title}
                  </h3>

                  <div className="flex items-center mt-3 text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      by {course.instructor || "Expert Instructor"}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-4 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-600 border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-center flex-col">
                      <Clock className="h-5 w-5 text-purple-600 mb-1" />
                      <span className="font-medium">
                        {course.duration || "8 hours"}
                      </span>
                      <span className="text-xs text-gray-500">Duration</span>
                    </div>

                    <div className="flex items-center justify-center flex-col">
                      <BookOpen className="h-5 w-5 text-purple-600 mb-1" />
                      <span className="font-medium">
                        {getLessonCount(course.lessons)} lessons
                      </span>
                      <span className="text-xs text-gray-500">Content</span>
                    </div>

                    <div className="flex items-center justify-center flex-col">
                      <Star className="h-5 w-5 text-yellow-500 mb-1" />
                      <span className="font-medium">
                        {course.rating || "4.8"}
                      </span>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {course.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className="w-full bg-linear-to-r from-brand-from to-brand-to hover:brightness-110 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                      View Course
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">
                      Continue learning
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700">
              No courses found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
