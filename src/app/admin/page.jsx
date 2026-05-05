"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpenText, User, Layers, Shield, MessageCircle } from "lucide-react";

const adminCards = [
  {
    href: "/admin/courses",
    label: "Manage Courses",
    icon: BookOpenText,
    color: "bg-blue-100 text-blue-700",
    hover: "hover:bg-blue-200",
  },
  {
    href: "/admin/users",
    label: "View Users",
    icon: User,
    color: "bg-green-100 text-green-700",
    hover: "hover:bg-green-200",
  },
  {
    href: "/admin/lessons",
    label: "Manage Lessons",
    icon: Layers,
    color: "bg-purple-100 text-purple-700",
    hover: "hover:bg-purple-200",
  },
  {
    href: "/admin/comments",
    label: "Manage Comments",
    icon: MessageCircle,
    color: "bg-orange-100 text-orange-700",
    hover: "hover:bg-orange-200",
  },
];

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const response = await fetch("/api/admin-status");
      const data = await response.json();
      
      if (!data.adminAuthenticated) {
        router.push("/admin/sign-in");
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/sign-in");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to sign-in
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Home</h1>
          <p className="text-gray-600">Manage your educational platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.href}
                href={card.href}
                className={`flex flex-col items-center justify-center rounded-xl p-8 transition-all duration-200 shadow-md ${card.color} ${card.hover}`}
              >
                <Icon className="h-12 w-12 mb-4" />
                <span className="text-xl font-semibold text-center">{card.label}</span>
              </a>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/admin/sign-in" 
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
