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
    <div className="min-h-screen bg-white">
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Kurslar
              </h1>
              <p className="text-gray-600">
                Zamonaviy dasturlash kurslari
              </p>
            </div>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Dashboardga o'tish
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Kurslarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Barcha kurslar" : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          >
            <option value="popular">Mashhur</option>
            <option value="rating">Reyting</option>
            <option value="newest">Yangi</option>
          </select>
        </div>
        {loading && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Xatolik yuz berdi
              </h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCourses.map((course) => (
                <div key={course._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <Link href={`/courses/${course._id}`} className="block">
                    <div className="relative h-32 bg-gray-100">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-3xl text-gray-400">
                            📚
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Kurslar
                          </h1>
                          <p className="text-gray-600">
                            Zamonaviy dasturlash kurslari
                          </p>
                        </div>
                        {isSignedIn && (
                          <Link
                            href="/dashboard"
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                          >
                            Dashboardga o'tish
                          </Link>
                        )}
                      </div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {course.enrolled ? (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                              ✓ Ro'yxatdan o'tilgan
                            </span>
                          ) : (
                            <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-800 transition">
                              Ro'yxatdan o'tish
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {getLessonCount(course.lessons)} dars
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