"use client";

import Link from "next/link";
import { Star, Clock, BookOpen, User, Search, Filter, X, Sparkles, TrendingUp, Award, Zap } from "lucide-react";
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
  const [animateCards, setAnimateCards] = React.useState(false);
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);

  useEffect(() => {
    setIsLoaded(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setIsSignedIn(!!data.user))
      .catch(() => setIsSignedIn(false));
    
    // Load enrolled courses from localStorage
    const savedEnrollments = localStorage.getItem('enrolledCourses');
    if (savedEnrollments) {
      setEnrolledCourses(JSON.parse(savedEnrollments));
    }
    
    // Trigger card animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
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

  const handleEnroll = (courseId) => {
    const updatedEnrollments = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrollments);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrollments));
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-semibold">Premium Courses</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-fade-in-up">
              {language === 'tg' ? 'Курсҳо' : language === 'ru' ? 'Курсы' : language === 'uz' ? 'Kurslar' : 'Courses'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
              {language === 'tg' ? 'Курсҳои муосири барномасозӣ бо касби ояндаатонро сохторед' : 
               language === 'ru' ? 'Современные курсы программирования помогут построить вашу будущую карьеру' :
               language === 'uz' ? 'Zamonaviy dasturlash kurslari bilan kelajak kasbingizni quring' :
               'Build your future career with modern programming courses'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="h-4 w-4 text-green-300" />
                <span className="text-sm">500+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-purple-300" />
                <span className="text-sm">Hands-on Projects</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'tg' ? 'Ҷустуҷӯи курсҳо...' : language === 'ru' ? 'Поиск курсов...' : language === 'uz' ? 'Kurslarni qidirish...' : 'Search courses...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:bg-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? (language === 'tg' ? 'Ҳамаи курсҳо' : language === 'ru' ? 'Все курсы' : language === 'uz' ? 'Barcha kurslar' : 'All Courses') : cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:bg-white"
            >
              <option value="popular">{language === 'tg' ? 'Машҳур' : language === 'ru' ? 'Популярные' : language === 'uz' ? 'Mashhur' : 'Popular'}</option>
              <option value="rating">{language === 'tg' ? 'Рейтинг' : language === 'ru' ? 'Рейтинг' : language === 'uz' ? 'Reyting' : 'Rating'}</option>
              <option value="newest">{language === 'tg' ? 'Нав' : language === 'ru' ? 'Новые' : language === 'uz' ? 'Yangi' : 'Newest'}</option>
            </select>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                {language === 'tg' ? 'Ба панели идоракунӣ' : language === 'ru' ? 'В панель управления' : language === 'uz' ? 'Dashboardga o\'tish' : 'Go to Dashboard'}
              </Link>
            )}
          </div>
        </div>
        {loading && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 animate-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-red-200 p-12 text-center max-w-md mx-auto animate-bounce-in">
              <div className="text-6xl mb-4 animate-spin">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Xatolik yuz berdi
              </h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCourses.map((course, index) => (
                <div 
                  key={course._id} 
                  className={`group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                    animateCards ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/courses/${course._id}`} className="block">
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                          <div className="text-6xl opacity-50 animate-pulse">
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
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        {isEnrolled(course._id) ? (
                          <span className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                            ✓ {language === 'tg' ? 'Сабти ном шудааст' : language === 'ru' ? 'Зарегистрирован' : language === 'uz' ? 'Ro\'yxatdan o\'tilgan' : 'Enrolled'}
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleEnroll(course._id)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            {language === 'tg' ? 'Сабти ном' : language === 'ru' ? 'Записаться' : language === 'uz' ? 'Ro\'yxatdan o\'tish' : 'Enroll'}
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-400" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-purple-400" />
                            {getLessonCount(course.lessons)} dars
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{course.rating}</span>
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
          <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {language === 'tg' ? 'Курсҳо ёфт нашуд' : language === 'ru' ? 'Курсы не найдены' : language === 'uz' ? 'Kurslar topilmadi' : 'No courses found'}
            </h3>
            <p className="text-gray-500 mt-2">
              {language === 'tg' ? 'Ҷустуҷӯ ё филтрро тағйир диҳед' : language === 'ru' ? 'Попробуйте изменить поиск или фильтры' : language === 'uz' ? 'Qidirish yoki filtr mezonlarini o\'zgartirib ko\'ring' : 'Try adjusting your search or filter criteria'}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {language === 'tg' ? 'Филтрро тоза кунед' : language === 'ru' ? 'Очистить фильтры' : language === 'uz' ? 'Filtrlarni tozalash' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}