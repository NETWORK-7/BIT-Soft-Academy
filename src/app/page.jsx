"use client";

import React, { useEffect, useState } from "react";
import { BookOpenText, Users, TrendingUp, Code, Zap, Award, ArrowRight, Play, Star, CheckCircle, Clock } from "lucide-react";
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/10 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-8">
                <Zap className="h-5 w-5 text-cyan-300" />
                <span className="text-cyan-100 text-sm font-medium">Har hafta yangi kurslar qo'shiladi</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Kelajak kasbini
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> zamonaviy usulda</span>
                <br />
                o'rganing
              </h1>
              
              <p className="text-xl text-cyan-100 mb-8 max-w-2xl">
                Dasturlashni quruq nazariya bilan emas, real amaliyot va real loyihalar orqali o'rganing. 
                Premium kurslar, ochiq kodlar va komyuniti bir joyda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link 
                  href="/courses" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
                >
                  <BookOpenText className="h-5 w-5" />
                  <span>Kurslarni boshlash</span>
                </Link>
                <Link 
                  href="/courses" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Code className="h-5 w-5" />
                  <span>Loyihalar</span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Professional Development" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500 rounded-xl shadow-xl shadow-cyan-500/50 transform rotate-12"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-xl shadow-xl shadow-blue-500/50 transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Yangi Kurslar</h2>
              <p className="text-slate-600">Zamonaviy texnologiyalar bo'yicha mutaxassis kurslar</p>
            </div>
            <Link href="/courses" className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2">
              Barchasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Angular", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "TypeScript", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "JavaScript", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "React JS & Redux", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1555949967-2e3cd62f2726?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "Vue JS & Vue X", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "NodeJS & ExpressJS", duration: "12 soat", lessons: "24 dars", level: "Yangi", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
            ].map((course, index) => (
              <div key={index} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1461749280684-dcc714de5c24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-semibold">{course.level}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Clock className="h-5 w-5 text-white mb-1" />
                    <p className="text-white text-sm font-medium">{course.duration}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">{course.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">{course.lessons}</span>
                    <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1">
                      Batafsil ko'rish <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3 mb-6">
              <Code className="h-5 w-5 text-cyan-300" />
              <span className="text-cyan-100 font-semibold text-lg">Real loyihalar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Professional</span> <br />Loyihalar
            </h2>
            <p className="text-cyan-100 text-xl max-w-3xl mx-auto mb-12">
              Noldan real dunyo loyihalarini yarating va o'zing portfelingizni shakllantiring
            </p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              Barcha loyihalarni ko'rish <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            [
              { title: "MERN Stack - Telegram clone", tech: "MongoDB, Express, React, Node.js", status: "Production Ready", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "Next.js - X Clone", tech: "Next.js, Tailwind, TypeScript", status: "Production Ready", image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "Next.js - Drive Clone", tech: "Next.js, Prisma, TypeScript", status: "Production Ready", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "Nuxt.js - Jira Clone", tech: "Nuxt.js, Vue.js, Tailwind", status: "Production Ready", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "Node.js - Telegram Bot", tech: "Node.js, Express, Telegram API", status: "Production Ready", image: "https://images.unsplash.com/photo-1515879218367-8466d946aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { title: "React Native - Netflix", tech: "React Native, Firebase, Redux", status: "Production Ready", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
            ].map((project, index) => (
              <div key={index} className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden hover:bg-slate-800/70 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">{project.status}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                      <Code className="h-4 w-4 text-cyan-400 mb-1" />
                      <p className="text-white text-xs font-medium">{project.tech}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Zamonaviy texnologiyalar yordamida to'liq darajadagi loyihani yarating. 
                    Boshlang'ichdan tugaguncha to'liq qo'llab-namiz.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-400 text-sm">250+ o'quvchilar</span>
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2">
                      <span>Proyektni ko'rish</span> <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Bizning <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">yutuqlarimiz</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Minglab o'quvchilar ishonchilariga qo'shildi va o'z kar'erasiga boshladilar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
                <BookOpenText className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">{stats.courses}+</div>
              <div className="text-slate-600">Professional Kurslar</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">{stats.users}+</div>
              <div className="text-slate-600">Faol O'quvchilar</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-slate-600">Muvaffaqiyat</div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Bit Soft Academy</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Zamonaviy usulda dasturlashni o'rganing. Real loyihalar, ochiq kodlar va sifatli ta'lim bir joyda.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Platforma</h3>
              <ul className="space-y-3">
                <li><Link href="/courses" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Kurslar</Link></li>
                <li><Link href="/courses" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Loyihalar</Link></li>
                <li><Link href="/courses" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Kod manbalar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Qoidalar</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Foydalanish shartlari</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Maxfiylik siyosati</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Ko'p beriladigan savollar</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Bog'lanish</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Biz bilan</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">Telegram <span className="text-xs bg-slate-800 px-2 py-1 rounded">@bitsoft</span></a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">GitHub</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2026 Bit Soft Academy. Barcha huquqlar himoyalangan.
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Star className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Users className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
