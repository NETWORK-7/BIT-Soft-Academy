"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Clock, BookOpen, User, Search, Filter, Sparkles, TrendingUp, Award, Zap, Target, Rocket } from "lucide-react";
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
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setIsSignedIn(!!data.user);
        setIsLoaded(true);
        setTimeout(() => setAnimateCards(true), 100);
      })
      .catch(() => {
        setIsSignedIn(false);
        setIsLoaded(true);
        setTimeout(() => setAnimateCards(true), 100);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6">
            <Rocket className="h-5 w-5 text-purple-600" />
            <span className="text-purple-800 font-semibold">Dashboard Courses</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">All Courses</span>
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Explore our expertly crafted courses and take the next step in your
            coding journey. From beginner to advanced — master modern web
            development with hands-on projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Skill Building</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Career Growth</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Certification</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-12 animate-fade-in-up animation-delay-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 hover:bg-white"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 hover:bg-white appearance-none cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-purple-600">
              {sortedCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-purple-600">
              {courses.length}
            </span>{" "}
            courses
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl animate-spin mb-4">⏳</div>
            <p className="text-gray-600 mt-4 animate-pulse">Loading courses...</p>
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-red-50/80 backdrop-blur-xl rounded-2xl border-2 border-red-200 animate-bounce-in">
            <div className="text-6xl mb-4 animate-spin">⚠️</div>
            <h3 className="text-2xl font-semibold text-red-700">
              Error Loading Courses
            </h3>
            <p className="text-red-600 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course, index) => (
              <Link
                key={course._id || course.id}
                href={`/courses/${course._id}`}
                className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 block ${
                  animateCards ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-purple-400/80 to-blue-400/80 relative overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-32 w-32 absolute bottom-0 right-0 translate-x-8 translate-y-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="h-32 w-32 absolute bottom-0 right-0 translate-x-8 translate-y-8 flex items-center justify-center">
                      <div className="text-4xl text-white/50 animate-pulse">
                        📚
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium text-gray-700">{course.rating || 4.8}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {course.title}
                  </h3>

                  <div className="flex items-center mt-3 text-gray-600">
                    <User className="h-4 w-4 mr-2 text-purple-400" />
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
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
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
          <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
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
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
