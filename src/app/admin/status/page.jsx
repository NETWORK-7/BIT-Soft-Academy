"use client";
import React, { useState, useEffect } from "react";
import { Shield, CheckCircle, XCircle, AlertCircle, RefreshCw, Settings, Users, BookOpenText, Layers } from "lucide-react";

export default function AdminStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-test-all");
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Status check failed:", error);
      setStatus({
        status: "error",
        tests: [],
        passed: 0,
        failed: 1,
        issues: [`Failed to check status: ${error.message}`]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Testing admin functionality...</div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "all_passed":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "minor_issues":
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      case "major_issues":
      case "error":
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "all_passed":
        return "bg-green-50 border-green-200 text-green-800";
      case "minor_issues":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "major_issues":
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin System Status</h1>
            </div>
            <button
              onClick={checkAdminStatus}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {/* Overall Status */}
          <div className={`border rounded-lg p-4 mb-6 ${getStatusColor(status?.status)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(status?.status)}
                <span className="font-medium ml-2">
                  {status?.status === "all_passed" && "All admin systems operational"}
                  {status?.status === "minor_issues" && "Minor issues found"}
                  {status?.status === "major_issues" && "Major issues found"}
                  {status?.status === "error" && "Admin system has errors"}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{status?.passed || 0} passed</span>
                <span className="mx-2">|</span>
                <span className="font-medium">{status?.failed || 0} failed</span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
              <div className="space-y-2">
                {status?.tests?.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {test.status === "passed" ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span className="text-sm text-gray-700">{test.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      test.status === "passed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {test.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues */}
            {status?.issues && status.issues.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h2>
                <div className="space-y-2">
                  {status.issues.map((issue, index) => (
                    <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                      <XCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5" />
                      <span className="text-sm text-red-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {status?.recommendations && status.recommendations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-2">
                {status.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/admin" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <Settings className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-blue-900">Admin Dashboard</div>
                <div className="text-xs text-blue-700">Main admin panel</div>
              </div>
            </a>

            <a href="/admin/sign-in" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <Shield className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-green-900">Admin Sign In</div>
                <div className="text-xs text-green-700">Authentication</div>
              </div>
            </a>

            <a href="/admin/courses" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <BookOpenText className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-purple-900">Manage Courses</div>
                <div className="text-xs text-purple-700">Course management</div>
              </div>
            </a>

            <a href="/admin/lessons" className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <Layers className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-orange-900">Manage Lessons</div>
                <div className="text-xs text-orange-700">Lesson management</div>
              </div>
            </a>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Debug Information</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Timestamp: {status?.timestamp}</div>
              <div>Total Tests: {status?.tests?.length || 0}</div>
              <div>Success Rate: {status?.passed && status?.tests ? 
                Math.round((status.passed / status.tests.length) * 100) : 0}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
