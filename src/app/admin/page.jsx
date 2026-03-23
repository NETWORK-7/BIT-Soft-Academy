
import React from "react";
import { BookOpenText, User, Layers, Home, PlusCircle, LogOut, Database } from "lucide-react";
import AdminLogout from "@/components/AdminLogout";
import Link from "next/link";

const adminLinks = [
  { href: "/admin/courses", label: "Courses", icon: BookOpenText },
  { href: "/admin/lessons", label: "Lessons", icon: Layers },
  { href: "/admin/users", label: "Users", icon: User },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <a href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              AD
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Admin Panel</h1>
          </a>
          <p className="text-sm text-blue-600 font-medium mt-1">Manage your platform</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-all"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-3">
          <a href="/dashboard" className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-medium">
            <Home className="h-5 w-5" />
            Back to User Dashboard
          </a>
          <AdminLogout />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-black text-blue-900 mb-2">Admin Dashboard</h1>
        <p className="text-blue-600 font-medium mb-8">Welcome back! Manage your platform content and users.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <BookOpenText className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-black text-blue-900">10</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Courses</h3>
            <p className="text-blue-600 font-medium mb-4">Active courses available</p>
            <a href="/admin/courses" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Manage Courses →
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <Layers className="h-10 w-10 text-purple-600" />
              <span className="text-3xl font-black text-purple-900">85</span>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Lessons</h3>
            <p className="text-purple-600 font-medium mb-4">Total lessons created</p>
            <a href="/admin/lessons" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
              Manage Lessons →
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <User className="h-10 w-10 text-green-600" />
              <span className="text-3xl font-black text-green-900">256</span>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-2">Users</h3>
            <p className="text-green-600 font-medium mb-4">Active users on platform</p>
            <a href="/admin/users" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
              View Users →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/admin/courses" 
              className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md hover:shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              Create New Course
            </a>
            <a 
              href="/admin/lessons" 
              className="flex items-center gap-3 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition font-semibold shadow-md hover:shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              Create New Lesson
            </a>
          </div>
        </div>

        {/* Database Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <Database className="h-6 w-6" />
            Database Management
          </h2>
          <p className="text-gray-600 mb-6">Populate your database with sample courses and lessons.</p>
          <Link
            href="/admin/courses/seed"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md hover:shadow-lg"
          >
            <Database className="h-5 w-5" />
            Seed Database
          </Link>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Platform Growth</h3>
            <p className="text-blue-100 mb-4">This month</p>
            <div className="text-4xl font-black mb-2">+42%</div>
            <p className="text-blue-100">User engagement increased</p>
          </div>

          <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Completion Rate</h3>
            <p className="text-purple-100 mb-4">Average across all courses</p>
            <div className="text-4xl font-black mb-2">78%</div>
            <p className="text-purple-100">Students completing courses</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
