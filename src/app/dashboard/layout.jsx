"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpenText, 
  Home,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpenText },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300">
        {/* Logo */}
        <div className="p-8 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              CM
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bit Soft IT Academy</h1>
          </Link>
          <p className="text-sm text-gray-500 mt-1">Master coding, one lesson at a time</p>
        </div>

        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 group
                      ${isActive
                        ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 transition-colors
                      ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}
                    `} />
                    <span>{link.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full border-2 border-purple-200" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Welcome back!</p>
              <p className="text-sm text-gray-500">Level 12 • 1,240 points</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-5 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </aside>

     
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}