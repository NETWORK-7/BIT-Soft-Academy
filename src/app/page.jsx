"use client";

import React, { useEffect, useState } from "react";
import { BookOpenText, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
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
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to CodeMaster</h1>
        <p className="text-xl text-gray-600 mb-12">Your learning hub for modern web development</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Courses</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">{stats.courses}</p>
              </div>
              <BookOpenText className="h-12 w-12 text-purple-300" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Users</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.users}</p>
              </div>
              <Users className="h-12 w-12 text-blue-300" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Completion Rate</p>
                <p className="text-4xl font-bold text-green-600 mt-2">85%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-lg text-gray-900">Frontend Development</h3>
              <p className="text-gray-600 mt-2">Master React, TypeScript, CSS, and modern frontend tools to build beautiful web applications.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-lg text-gray-900">Backend Development</h3>
              <p className="text-gray-600 mt-2">Learn Node.js, Express, and database design to build scalable server applications.</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-lg text-gray-900">Full Stack Skills</h3>
              <p className="text-gray-600 mt-2">Combine frontend and backend knowledge to build complete web applications.</p>
            </div>
            <div className="border-l-4 border-pink-600 pl-4">
              <h3 className="font-semibold text-lg text-gray-900">Best Practices</h3>
              <p className="text-gray-600 mt-2">Learn security, performance optimization, testing, and deployment strategies.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/courses" className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition">
            Explore All Courses
          </a>
        </div>
      </div>
    </div>
  );
}
