"use client";

import React, { useEffect, useState } from "react";
import { BookOpenText, Users, TrendingUp, Code, Zap, Award, ArrowRight, Play, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [stats, setStats] = useState({ courses: 0, users: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/courses").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json())
    ]).then(([coursesData, usersData]) => {
      setStats({
        courses: (coursesData.courses || []).length,
        users: (usersData.users || []).length
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
            <Zap className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 text-sm">Har hafta yangi kurslar qo'shiladi</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Kelajak kasbini
            <span className="text-gray-900"> zamonaviy usulda</span>
            <br />
            o'rganing
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Dasturlashni quruq nazariya bilan emas, real amaliyot va real loyihalar orqali o'rganing. 
            Premium kurslar, ochiq kodlar va komyuniti bir joyda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/courses" 
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center space-x-2"
            >
              <BookOpenText className="h-5 w-5" />
              <span>Kurslarni boshlash</span>
            </Link>
            <Link 
              href="/courses" 
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <Code className="h-5 w-5" />
              <span>Loyihalar</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Yangi Kurslar</h2>
            <Link href="/courses" className="text-gray-600 hover:text-gray-900 font-medium">
              Barchasi →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Angular", duration: "12 soat", lessons: "24 dars", level: "Yangi" },
              { title: "TypeScript", duration: "12 soat", lessons: "24 dars", level: "Yangi" },
              { title: "JavaScript", duration: "12 soat", lessons: "24 dars", level: "Yangi" },
              { title: "React JS & Redux", duration: "12 soat", lessons: "24 dars", level: "Yangi" },
              { title: "Vue JS & Vue X", duration: "12 soat", lessons: "24 dars", level: "Yangi" },
              { title: "NodeJS & ExpressJS", duration: "12 soat", lessons: "24 dars", level: "Yangi" }
            ].map((course, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                  </div>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{course.duration}</span>
                  <span>{course.lessons}</span>
                </div>
                <button className="mt-4 text-sm text-gray-700 hover:text-gray-900 font-medium">
                  Batafsil ko'rish →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Yangi Loyihalar</h2>
            <Link href="/courses" className="text-gray-600 hover:text-gray-900 font-medium">
              Barchasi →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "MERN Stack - Telegram clone", tech: "Next.js, Tailwind, Prisma", status: "production build" },
              { title: "Next.js - X clone", tech: "Next.js, Tailwind, Prisma", status: "production build" },
              { title: "Next.js - Drive clone", tech: "Next.js, Tailwind, Prisma", status: "production build" },
              { title: "Nuxt.js - Jira clone", tech: "Next.js, Tailwind, Prisma", status: "production build" },
              { title: "Node.js - Telegram bot", tech: "Next.js, Tailwind, Prisma", status: "production build" },
              { title: "React Native - Netflix clone", tech: "Next.js, Tailwind, Prisma", status: "production build" }
            ].map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">{project.status}</span>
                  </div>
                  <Code className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {project.tech}
                </div>
                <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                  Batafsil ko'rish →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Yangiliklardan xabardor bo'ling
          </h2>
          <p className="text-gray-600 mb-8">
            Yangi kurslar, bepul loyihalar va IT sohasidagi so'nggi yangiliklarni pochtangizga qabul qiling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email manzilingiz" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
              Obuna bo'lish
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-900 font-bold">Bit Soft Academy</span>
              </div>
              <p className="text-gray-600 text-sm">
                Zamonaviy usulda dasturlashni o'rganing. Real loyihalar, ochiq kodlar va sifatli ta'lim bir joyda.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platforma</h3>
              <ul className="space-y-2">
                <li><Link href="/courses" className="text-gray-600 hover:text-gray-900 text-sm">Kurslar</Link></li>
                <li><Link href="/courses" className="text-gray-600 hover:text-gray-900 text-sm">Loyihalar</Link></li>
                <li><Link href="/courses" className="text-gray-600 hover:text-gray-900 text-sm">Kod manbalar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Qoidalar</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">Foydalanish shartlari</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">Maxfiylik siyosati</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">Ko'p beriladigan savollar</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">Bog'lanish</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Biz bilan</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Telegram</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">GitHub</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center text-gray-600 text-sm">
              © 2026 Bit Soft Academy. Barcha huquqlar himoyalangan.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
