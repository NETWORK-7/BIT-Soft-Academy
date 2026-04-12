"use client";
import React, { useEffect } from "react";

export default function AdminDebug() {
  useEffect(() => {
    // Check current cookies
    const cookies = document.cookie.split(';').map(c => c.trim());
    console.log("Current cookies:", cookies);
    
    const adminAuth = cookies.find(c => c.startsWith('adminAuth='));
    console.log("Admin auth cookie found:", !!adminAuth);
    console.log("Admin auth cookie value:", adminAuth?.split('=')[1]);
    
    // Check current URL
    console.log("Current URL:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Debug Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Debug Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Check Console Logs</h3>
              <p className="text-gray-600">Open browser console (F12) to see debug information</p>
            </div>
            
            <div>
              <h3 className="font-medium">Current Routes</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li><a href="/admin" className="text-blue-600 hover:underline">Admin Dashboard</a></li>
                <li><a href="/admin/sign-in" className="text-blue-600 hover:underline">Admin Sign In</a></li>
                <li><a href="/admin/courses" className="text-blue-600 hover:underline">Admin Courses</a></li>
                <li><a href="/admin/lessons" className="text-blue-600 hover:underline">Admin Lessons</a></li>
                <li><a href="/admin/users" className="text-blue-600 hover:underline">Admin Users</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Test Admin Login</h3>
              <button 
                onClick={() => window.location.href = '/admin/sign-in'}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Go to Admin Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
