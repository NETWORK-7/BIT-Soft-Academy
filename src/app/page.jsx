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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-slate-900/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">CodeMaster</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/sign-in" className="text-white/80 hover:text-white transition">Sign In</Link>
              <Link href="/sign-up" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span className="text-white/80 text-sm">New courses added weekly</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Master
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Modern Web</span>
            <br />
            Development
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Transform your career with cutting-edge courses in React, Node.js, TypeScript, and more. 
            Join thousands of developers advancing their skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/sign-up" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Learning Free</span>
            </Link>
            <Link 
              href="/courses" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition flex items-center justify-center space-x-2"
            >
              <BookOpenText className="h-5 w-5" />
              <span>Browse Courses</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-white/60">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-cyan-400" />
              <span>{stats.users}+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-400" />
              <span>Certified Courses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpenText className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{stats.courses}+</div>
              <div className="text-white/80">Expert Courses</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{stats.users}+</div>
              <div className="text-white/80">Active Students</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-2">85%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CodeMaster</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Learn from industry experts with hands-on projects, real-world applications, and personalized feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Modern Technologies",
                description: "Stay current with React, Next.js, TypeScript, and cutting-edge web development tools.",
                color: "from-cyan-400 to-cyan-600"
              },
              {
                icon: Zap,
                title: "Hands-on Projects",
                description: "Build real applications from scratch. Learn by doing with practical, project-based courses.",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: Award,
                title: "Expert Instructors",
                description: "Learn from experienced developers who work at top tech companies and startups.",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: CheckCircle,
                title: "Lifetime Access",
                description: "Once enrolled, get lifetime access to course materials, updates, and community support.",
                color: "from-green-400 to-green-600"
              },
              {
                icon: Users,
                title: "Active Community",
                description: "Join thousands of learners. Get help, share projects, and network with fellow developers.",
                color: "from-pink-400 to-pink-600"
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description: "Land your dream job with interview prep, portfolio projects, and career guidance.",
                color: "from-orange-400 to-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of developers who are already building amazing things with CodeMaster.
              </p>
              <Link 
                href="/sign-up" 
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-semibold">CodeMaster</span>
            </div>
            <div className="text-white/60 text-sm">
              © 2024 CodeMaster. Empowering developers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
