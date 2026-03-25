"use client";

import React, { useState } from "react";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const seedCourses = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(`✅ ${result.message}`);
        setTimeout(() => {
          window.location.href = "/dashboard/courses";
        }, 2000);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Seed Courses</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to add 4 practical beginner courses with hands-on video lessons.
        </p>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}
        
        <button
          onClick={seedCourses}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-wait"
        >
          {loading ? "⏳ Seeding Courses..." : "🚀 Seed Practical Courses"}
        </button>
        
        <div className="mt-6 text-sm text-gray-500">
          <p><strong>Courses to be created:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>HTML & CSS for Beginners (6 lessons)</li>
            <li>JavaScript Fundamentals (6 lessons)</li>
            <li>React for Beginners (6 lessons)</li>
            <li>Python Programming Basics (6 lessons)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
