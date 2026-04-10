"use client";

import { useEffect, useState } from "react";
import { Trophy, Flame, Clock, BookOpen, Target, TrendingUp, Calendar, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

import LanguageSettings from "@/components/LanguageSettings";

export default function Dashboard() {
  const { language } = useLanguageContext();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("Auth check timeout, redirecting to sign-in");
      router.push("/sign-in");
    }, 5000);

    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        clearTimeout(timeoutId);
        if (data.user) {
          setUser(data.user);
          console.log("User authenticated:", data.user.email);
        } else {
          console.log("User not authenticated, redirecting to sign-in");
          router.push("/sign-in");
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error("Auth check failed:", error);
        router.push("/sign-in");
      });

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 font-medium">Loading your dashboard...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait a moment</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600 font-medium">Authentication required</div>
          <div className="text-sm text-gray-500 mt-2">Redirecting to sign-in...</div>
        </div>
      </div>
    );
  }

  const userStats = {
    points: 1240,
    coursesCompleted: 7,
    currentStreak: 14,
    totalHours: 48,
    rank: 8,
    level: 12,
  };

  const recentActivity = [
    { icon: BookOpen, text: "Completed 'Advanced React Patterns'", time: "2 hours ago", color: "text-green-600" },
    { icon: Award, text: "Earned 'TypeScript Master' badge", time: "Yesterday", color: "text-amber-600" },
    { icon: Flame, text: "Started 'Next.js Deep Dive'", time: "3 days ago", color: "text-orange-600" },
    { icon: Target, text: "Achieved daily goal for 14 days straight!", time: "Today", color: "text-purple-600" },
  ];

  const inProgressCourses = [
    { title: "Next.js Fundamentals", progress: 0, lessonsLeft: 6, courseId: "1" },
    { title: "TypeScript for Professionals", progress: 0, lessonsLeft: 12, courseId: "2" },
    { title: "Tailwind CSS Mastery", progress: 0, lessonsLeft: 2, courseId: "3" },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Qaytib kelib bo'ldingiz, {(user?.name && user.name.split(" ")[0]) || "Dasturchi"}!
          </h1>
          <p className="text-gray-600">
            Siz <span className="font-semibold text-gray-900">{userStats.currentStrust} kunlik</span> seriyadasiz. Davom eting!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Jami ballar</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.points.toLocaleString()}</p>
              </div>
              <Trophy className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tugatilgan kurslar</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.coursesCompleted}</p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Joriy seriya</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-2">
                  {userStats.currentStreak} <Flame className="h-6 w-6" />
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Global reyting</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">#{userStats.rank}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
       
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-gray-600" /> Davom etayotgan kurslar
            </h2>
            <div className="space-y-6">
              {inProgressCourses.map((course) => (
                <Link key={course.title} href={`/dashboard/courses/${course.courseId}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                      <span className="text-sm text-gray-500">{course.lessonsLeft} {t(language, "dashboard.lessonsLeft")}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="mt-3 text-right text-sm font-medium text-purple-600">{course.progress}{t(language, "dashboard.percentComplete")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="h-7 w-7 text-purple-600" /> {t(language, "dashboard.recentActivity")}
            </h2>
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gray-100 ${activity.color}`}>
                    <activity.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-linear-to-r from-brand-from to-brand-to rounded-2xl shadow-lg p-8 text-primary-foreground flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{t(language, "dashboard.continueLearnin")}</h3>
            <p className="text-primary-foreground/85">{t(language, "dashboard.exploreCourses")}</p>
          </div>
          <Link href="/dashboard/courses">
            <button className="flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-colors shadow-md">
              {t(language, "dashboard.browseCourses")} <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>


        <div className="mt-12">
          <LanguageSettings />
        </div>

     
        <div className="mt-12 text-center bg-card rounded-2xl shadow-md py-6 px-8 border border-border">
          <p className="text-lg text-muted-foreground">
            {t(language, "dashboard.level")} <span className="text-3xl font-bold text-primary">{userStats.level}</span> •{" "}
            <span className="text-amber-600 font-semibold">{userStats.totalHours} {t(language, "dashboard.hoursLearned")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}