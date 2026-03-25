"use client";

import React, { useState, useEffect } from "react";

export default function DiagnosticPage() {
  const [diagnostic, setDiagnostic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    runDiagnostic();
  }, []);

  const runDiagnostic = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/diagnostic");
      const data = await response.json();
      setDiagnostic(data);
    } catch (error) {
      setDiagnostic({ status: "error", error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const linkLessons = async () => {
    setSeeding(true);
    try {
      const response = await fetch("/api/link-lessons", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        alert(`✅ ${data.message}`);
        // Run diagnostic again after linking
        setTimeout(runDiagnostic, 1000);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Running diagnostic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Project Diagnostic</h1>
          <p className="text-gray-600 mb-6">Check database status and fix issues automatically</p>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={runDiagnostic}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              🔄 Run Diagnostic
            </button>
            {diagnostic?.issues?.length > 0 && (
              <button
                onClick={linkLessons}
                disabled={seeding}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {seeding ? "⏳ Fixing..." : "🔧 Auto-Fix Issues"}
              </button>
            )}
          </div>

          {/* Status */}
          <div className={`p-4 rounded-lg mb-6 ${
            diagnostic?.status === "healthy" ? "bg-green-100 text-green-800" :
            diagnostic?.status === "error" ? "bg-red-100 text-red-800" :
            "bg-yellow-100 text-yellow-800"
          }`}>
            <h3 className="font-bold text-lg mb-2">
              Status: {diagnostic?.status?.toUpperCase() || "UNKNOWN"}
            </h3>
            {diagnostic?.database === false && (
              <p>❌ Database connection failed</p>
            )}
            {diagnostic?.status === "healthy" && (
              <p>✅ Everything looks good!</p>
            )}
          </div>

          {/* Issues */}
          {diagnostic?.issues?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-red-800 mb-3">🚨 Issues Found:</h3>
              <ul className="space-y-2">
                {diagnostic.issues.map((issue, index) => (
                  <li key={index} className="text-red-700">• {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Fixes */}
          {diagnostic?.fixes?.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-3">💡 Recommended Fixes:</h3>
              <ul className="space-y-2">
                {diagnostic.fixes.map((fix, index) => (
                  <li key={index} className="text-blue-700">• {fix}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Courses Info */}
          {diagnostic?.courses && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">📚 Courses ({diagnostic.courses.length})</h3>
                {diagnostic.courses.length === 0 ? (
                  <p className="text-gray-600">No courses found</p>
                ) : (
                  <ul className="space-y-2">
                    {diagnostic.courses.map((course, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{course.title}</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          course.lessonCount > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {course.lessonCount} lessons
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">📖 Lessons ({diagnostic.lessons.length})</h3>
                {diagnostic.lessons.length === 0 ? (
                  <p className="text-gray-600">No lessons found</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {diagnostic.lessons.slice(0, 5).map((lesson, index) => (
                      <li key={index} className="text-gray-600">
                        • {lesson.title}
                      </li>
                    ))}
                    {diagnostic.lessons.length > 5 && (
                      <li className="text-gray-500">... and {diagnostic.lessons.length - 5} more</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 mb-3">🔗 Quick Links:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <a href="/dashboard/courses" className="text-purple-600 hover:text-purple-800 underline">
                📋 Dashboard Courses
              </a>
              <a href="/courses" className="text-purple-600 hover:text-purple-800 underline">
                🌐 Public Courses
              </a>
              <a href="/api/courses" className="text-purple-600 hover:text-purple-800 underline">
                🔌 Courses API
              </a>
              <a href="/api/diagnostic" className="text-purple-600 hover:text-purple-800 underline">
                🩺 Diagnostic API
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
