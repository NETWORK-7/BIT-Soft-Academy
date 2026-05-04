"use client";

import React, { useEffect, useState } from "react";
import { BookOpenText, Users, TrendingUp, Code, Zap, Award, ArrowRight, Play, Star, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguageContext } from "@/context/LanguageContext";

export default function LandingPage() {
  const { language } = useLanguageContext();
  const [stats, setStats] = useState({ courses: 0, users: 0 });
  const [courses, setCourses] = useState([]);

  const getBitSoftProjects = (language) => [
    {
      title: language === 'tg' ? 'Bit-Soft CRM' : language === 'ru' ? 'Bit-Soft CRM' : language === 'uz' ? 'Bit-Soft CRM' : 'Bit-Soft CRM',
      description: language === 'tg' ? 'Система идоракунии мизоҷон. Маълумоти мизоҷон, фурӯш, шартномаҳо ва амалиётҳои молиявиро идора кардан барои ҳалли пурра.' : 
                 language === 'ru' ? 'Система управления клиентами. Управление данными клиентов, продажами, договорами и финансовыми операциями для полного решения.' :
                 language === 'uz' ? 'Mijozlarni boshqarish tizimi. Mijozlar ma\'lumotlari, sotuvlar, shartnomalar va moliyaviy operatsiyalarni boshqarish uchun to\'liq yechim.' :
                 'Customer management system. Manage customer data, sales, contracts and financial operations for complete solution.',
      tech: "React, Node.js, MongoDB, Express, JWT, TailwindCSS",
      features: language === 'tg' ? ['Базаи мизоҷон', 'Фурӯши пайгарбар', 'Шартномаҳо', 'Ҳисоботҳо', 'Нақшҳои корбар'] :
              language === 'ru' ? ['База клиентов', 'Отслеживание продаж', 'Договоры', 'Отчеты', 'Роли пользователей'] :
              language === 'uz' ? ['Mijozlar bazasi', 'Sotuvlar tracking', 'Shartnomalar', 'Hisobotlar', 'Foydalanuvchi rollari'] :
              ['Customer Database', 'Sales Tracking', 'Contracts', 'Reports', 'User Roles'],
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-600 to-cyan-600",
      icon: "📊"
    },
    {
      title: language === 'tg' ? 'BitSoft Online Academy' : language === 'ru' ? 'BitSoft Online Academy' : language === 'uz' ? 'BitSoft Online Academy' : 'BitSoft Online Academy',
      description: language === 'tg' ? 'Платформаи таълими онлайн. Курсҳо, видео-дарсҳо, тестҳо, сертификатҳо ва системаи идоракунии донишҷӯён.' :
                 language === 'ru' ? 'Образовательная онлайн-платформа. Курсы, видеоуроки, тесты, сертификаты и система управления студентами.' :
                 language === 'uz' ? 'Onlayn ta\'lim platformasi. Kurslar, videodarslar, testlar, sertifikatlar va o\'quvchilarni boshqarish tizimi.' :
                 'Online learning platform. Courses, video lessons, tests, certificates and student management system.',
      tech: "Next.js, TypeScript, Prisma, PostgreSQL, Stripe, AWS",
      features: language === 'tg' ? ['Идораи курсҳо', 'Видео-дарсҳо', 'Тестҳо', 'Сертификатҳо', 'Системаи пардохт'] :
              language === 'ru' ? ['Управление курсами', 'Видеоуроки', 'Тесты', 'Сертификаты', 'Платежная система'] :
              language === 'uz' ? ['Kurslar boshqaruvi', 'Videodarslar', 'Testlar', 'Sertifikatlar', 'To\'lov tizimi'] :
              ['Course Management', 'Video Lessons', 'Tests', 'Certificates', 'Payment System'],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-600 to-pink-600",
      icon: "🎓"
    },
    {
      title: language === 'tg' ? 'Bit-Soft Student App' : language === 'ru' ? 'Bit-Soft Student App' : language === 'uz' ? 'Bit-Soft Student App' : 'Bit-Soft Student App',
      description: language === 'tg' ? 'Барномаи мобилӣ барои донишҷӯён. Дар ба курсҳо, вазифаҳои хонагӣ, тестҳо, чат ва пайгарбари пешрафт.' :
                 language === 'ru' ? 'Мобильное приложение для студентов. Доступ к курсам, домашние задания, тесты, чат и отслеживание прогресса.' :
                 language === 'uz' ? 'Mobil ilova talabalar uchun. Kurslarga kirish, uyga vazifalar, testlar, chat va progress tracking.' :
                 'Mobile app for students. Access to courses, homework, tests, chat and progress tracking.',
      tech: "React Native, Firebase, Redux, Expo, Node.js",
      features: language === 'tg' ? ['Курсҳои мобилӣ', 'Вазифаҳои хонагӣ', 'Тестҳо', 'Чат', 'Пайгарбари пешрафт'] :
              language === 'ru' ? ['Мобильные курсы', 'Домашние задания', 'Тесты', 'Чат', 'Отслеживание прогресса'] :
              language === 'uz' ? ['Mobil kurslar', 'Uyga vazifalar', 'Testlar', 'Chat', 'Progress tracking'] :
              ['Mobile Courses', 'Homework', 'Tests', 'Chat', 'Progress Tracking'],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-600 to-teal-600",
      icon: "📱"
    }
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/courses").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json())
    ]).then(([coursesData, usersData]) => {
      setStats({
        courses: (coursesData.courses || []).length,
        users: (usersData.users || []).length
      });
      setCourses(coursesData.courses || []);
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {language === 'tg' ? 'Курсҳои нав' : 
                 language === 'ru' ? 'Новые курсы' : 
                 language === 'uz' ? 'Yangi Kurslar' : 
                 'New Courses'}
              </h2>
              <p className="text-slate-600">
                {language === 'tg' ? 'Курсҳои мутахассисони технологияҳои муосир' : 
                 language === 'ru' ? 'Специализированные курсы по современным технологиям' : 
                 language === 'uz' ? 'Zamonaviy texnologiyalar bo\'yicha mutaxassis kurslar' : 
                 'Specialized courses in modern technologies'}
              </p>
            </div>
            <Link href="/courses" className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2">
              {language === 'tg' ? 'Ҳама' : 
               language === 'ru' ? 'Все' : 
               language === 'uz' ? 'Barchasi' : 
               'View All'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course, index) => (
              <div key={course._id || index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Link href={`/courses/${course._id}`} className="block">
                  <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                        <BookOpenText className="h-12 w-12 text-blue-400 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium text-gray-700">{course.rating || 4.8}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex gap-1">
                        {course.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              <BookOpenText className="h-5 w-5" />
              <span>Barcha kurslarni ko'rish</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bit-Soft Real Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-8 shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-800 font-bold text-lg">
                {language === 'tg' ? 'Лоиҳаҳои ҳақиқии Bit-Soft' : 
                 language === 'ru' ? 'Реальные проекты Bit-Soft' : 
                 language === 'uz' ? 'Bit-Soft Real Loyihalar' : 
                 'Bit-Soft Real Projects'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'tg' ? (
                <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Касби ояндаатонро</span> созед</>
              ) : language === 'ru' ? (
                <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Постройте свою будущую</span> карьеру</>
              ) : language === 'uz' ? (
                <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Kelajak kasbingizni</span> quring</>
              ) : (
                <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Build your future</span> career</>
              )}
            </h1>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
              {language === 'tg' ? 'Bit-Soft IT Academy - касбҳои муосири барномасозиро омӯзед ва бо лоиҳаҳои ҳақиқӣ таҷрибаатонро афзун кунед. Мо бо шумо якҷоя карера сохторем.' :
               language === 'ru' ? 'Bit-Soft IT Academy - изучайте современные профессии программирования и получайте опыт с реальными проектами. Мы построим карьеру вместе с вами.' :
               language === 'uz' ? 'Bit-Soft IT Academy - zamonaviy dasturlash kasblarini o\'rganing va real loyihalar bilan tajribangizni oshiring. Biz siz bilan birga karyera quramiz.' :
               'Bit-Soft IT Academy - learn modern programming professions and gain experience with real projects. We will build a career together with you.'}
            </p>
          </div>
          
          <div className="space-y-12">
            {getBitSoftProjects(language).map((project, index) => (
              <div key={index} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r ${project.color} rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="relative h-80 overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-30`}></div>
                          <div className="absolute top-6 left-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">{project.icon}</span>
                                <span className="font-bold text-gray-800 text-lg">{project.title}</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-6 right-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-gray-700">Production Ready</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`order-1 lg:order-${index % 2 === 0 ? '2' : '1'} space-y-6`}>
                    <div>
                      <h3 className={`text-4xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                      {language === 'tg' ? 'Хусусиятҳои асосӣ:' : 
                       language === 'ru' ? 'Основные возможности:' : 
                       language === 'uz' ? 'Asosiy xususiyatlar:' : 
                       'Key Features:'}
                    </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                            <CheckCircle className={`h-5 w-5 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`} />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">Texnologiyalar:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.split(', ').map((tech, techIndex) => (
                          <span key={techIndex} className={`bg-gradient-to-r ${project.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <button className={`bg-gradient-to-r ${project.color} text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3`}>
                        <span>Loyihani ko'rish</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'tg' ? 'Лоиҳаҳои дигари мо низ ҳастанд' : 
                 language === 'ru' ? 'У нас есть и другие проекты' : 
                 language === 'uz' ? 'Boshqa loyihalarimiz ham bor' : 
                 'We have other projects too'}
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                {language === 'tg' ? 'Дар портфели мо бештар аз 15+ лоиҳаҳои муваффақ мавҷуданд. Барои маълумоти бештар бо мо алоқа шавед.' : 
                 language === 'ru' ? 'В нашем портфолио более 15+ успешных проектов. Свяжитесь с нами для получения дополнительной информации.' : 
                 language === 'uz' ? 'Bizning portfelimizda yana 15+ dan ortiq muvaffaqiyatli loyihalar mavjud. Batafsil ma\'lumot uchun biz bilan bog\'laning.' : 
                 'We have 15+ more successful projects in our portfolio. Contact us for more details.'}
              </p>
              <Link href="/courses" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25">
                <Code className="h-5 w-5" />
                <span>
                  {language === 'tg' ? 'Ҳамаи лоиҳаҳо' : 
                   language === 'ru' ? 'Все проекты' : 
                   language === 'uz' ? 'Barcha loyihalar' : 
                   'All Projects'}
                </span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {language === 'tg' ? <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Лоиҳаҳои ҳақиқии</span> мо</> :
               language === 'ru' ? <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Наши реальные</span> проекты</> :
               language === 'uz' ? <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Bizning</span> Real Loyihalarimiz</> :
               <><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Our Real</span> Projects</>}
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
              {language === 'tg' ? 'Бо лоиҳаҳои ҳақиқии коркардаи ширкати Bit-Soft шино шавед. Ҳар як лоиҳа - ин намунаи таҷриба ва маҳорати мо.' :
               language === 'ru' ? 'Познакомьтесь с реальными работающими проектами компании Bit-Soft. Каждый проект - это пример нашего опыта и мастерства.' :
               language === 'uz' ? 'Bit-Soft kompaniyasining real ishlayotgan loyihalari bilan tanishing. Har bir loyiha - bu bizning tajribamiz va mahoratimizning namunasi.' :
               'Get to know the real working projects of Bit-Soft company. Each project is an example of our experience and expertise.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
                <BookOpenText className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">{stats.courses}+</div>
              <div className="text-slate-600">
                {language === 'tg' ? 'Курсҳои касбӣ' : 
                 language === 'ru' ? 'Профессиональные курсы' : 
                 language === 'uz' ? 'Professional Kurslar' : 
                 'Professional Courses'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">{stats.users}+</div>
              <div className="text-slate-600">
                {language === 'tg' ? 'Донишҷӯёни фаъол' : 
                 language === 'ru' ? 'Активные студенты' : 
                 language === 'uz' ? 'Faol O\'quvchilar' : 
                 'Active Students'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-slate-600">
                {language === 'tg' ? 'Муваффақият' : 
                 language === 'ru' ? 'Успех' : 
                 language === 'uz' ? 'Muvaffaqiyat' : 
                 'Success Rate'}
              </div>
            </div>
          </div>
        </div>
      </section>
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
