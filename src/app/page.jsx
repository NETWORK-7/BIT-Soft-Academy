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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 via-transparent to-blue-100/50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-cyan-200 rounded-full px-4 py-2 mb-8">
            <Zap className="h-5 w-5 text-cyan-600" />
            <span className="text-gray-700 text-sm">Har hafta yangi kurslar qo'shiladi</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Mutaxassislar bilan
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Dasturlashni</span>
            <br />
            O'rganing
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            React, Node.js, TypeScript va boshqa zamonaviy texnologiyalarda bo'lgan kurslar bilan karyerangizni o'zgartiring. 
            Minglab dasturchilarning mahoratini oshirishiga qo'shiling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/sign-up" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Bepul O'rganishni Boshlang</span>
            </Link>
            <Link 
              href="/courses" 
              className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <BookOpenText className="h-5 w-5" />
              <span>Kurslarni Ko'rish</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>4.9/5 Reyting</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-cyan-600" />
              <span>{stats.users}+ O'quvchi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Sertifikatlangan Kurslar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpenText className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.courses}+</div>
              <div className="text-gray-700">Mutaxassis Kurslari</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.users}+</div>
              <div className="text-gray-700">Faol O'quvchilar</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-700">Muvaffaqiyat Foizi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nima uchun <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Bit Soft Academy</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Sanoat mutaxassislariidan amaliy loyihalar, real dasturlar va shaxsiy fikr-mulohazalar bilan o'rganing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Zamonaviy Texnologiyalar",
                description: "React, Next.js, TypeScript va zamonaviy veb-dasturlash vositalarida o'zingizni yangilab boring.",
                color: "from-cyan-400 to-cyan-600"
              },
              {
                icon: Zap,
                title: "Amaliy Loyihalar",
                description: "Noldan real dasturlarni yarating. Amaliy kurslar bilan ishlab o'rganing.",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: Award,
                title: "Mutaxassis Ustozlar",
                description: "Yirik texnologiya kompaniyalari va startaplarda ishlaydigan tajribali dasturchilardan o'rganing.",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: CheckCircle,
                title: "Umrbod Kirish",
                description: "Bir marta ro'yxatdan o'ting va kurs materiallari, yangilanishlar va jamoaviy yordamga abadiy kirish oling.",
                color: "from-green-400 to-green-600"
              },
              {
                icon: Users,
                title: "Faol Jamiyat",
                description: "Minglab o'quvchilarga qo'shiling. Yordam oling, loyihalarni baham ko'ring va boshqa dasturchilar bilan aloqa o'rnating.",
                color: "from-pink-400 to-pink-600"
              },
              {
                icon: TrendingUp,
                title: "Karyera O'sishi",
                description: "Interview tayyorgarligi, portfel loyihalari va karyera yo'nalishi bilan orzuyingdagi ishni toping.",
                color: "from-orange-400 to-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-cyan-500/10 transition">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                O'rganish Safariynga Tayyormisiz?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Bit Soft Academy bilan ajoyib narsalarni yaratayotgan minglab dasturchilarga qo'shiling.
              </p>
              <Link 
                href="/sign-up" 
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center space-x-2"
              >
                <span>Hozir Boshlang</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 font-semibold">Bit Soft Academy</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2026 Bit Soft Academy. Butun dunyo dasturchilarini qo'llab-quvvatlaymiz.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
