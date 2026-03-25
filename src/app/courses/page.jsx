"use client";

import Link from "next/link";
import { Star, Clock, BookOpen, User, Search, Filter, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("popular");
  const { language } = useLanguageContext();
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setIsSignedIn(!!data.user))
      .catch(() => setIsSignedIn(false));
  }, []);

  React.useEffect(() => {
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
  }, []);

  const categories = ["All", "Frontend", "Backend", "Data Science", "Cloud", "Full-Stack"];
  
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
      course.tags?.some(tag => tag === selectedCategory || tag.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "rating") return parseFloat(b.rating || 4.8) - parseFloat(a.rating || 4.8);
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  const getLessonCount = (lessons) => {
    if (Array.isArray(lessons)) return lessons.length;
    if (typeof lessons === "number") return lessons;
    return 24;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-from to-brand-to text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t(language, "courses.exploreCourses")}
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            {t(language, "courses.browseFullCatalog")}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t(language, "courses.searchCourses")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? t(language, "courses.allCourses") : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          >
            <option value="popular">{t(language, "courses.popular")}</option>
            <option value="rating">{t(language, "courses.rating")}</option>
            <option value="newest">{t(language, "courses.newest")}</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                Error loading courses
              </h2>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/courses/${course._id}`} className="block">
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {course.enrolled ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✓ {t(language, "courses.enrolled")}
                            </span>
                          ) : (
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                              {t(language, "courses.enroll")}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Course Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {getLessonCount(course.lessons)} {t(language, "courses.lessons")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No courses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}