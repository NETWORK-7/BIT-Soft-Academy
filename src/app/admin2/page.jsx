import React from "react";
import { BookOpenText, User, Layers } from "lucide-react";

const adminCards = [
  {
    href: "/admin2/courses",
    label: "Manage Courses",
    icon: BookOpenText,
    color: "bg-blue-100 text-blue-700",
    hover: "hover:bg-blue-200",
  },
  {
    href: "/admin2/users",
    label: "View Users",
    icon: User,
    color: "bg-green-100 text-green-700",
    hover: "hover:bg-green-200",
  },
  {
    href: "/admin2/lessons",
    label: "Manage Lessons",
    icon: Layers,
    color: "bg-purple-100 text-purple-700",
    hover: "hover:bg-purple-200",
  },
];

const AdminPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 py-12">
    <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Admin Home</h1>
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
    </div>
  </div>
);

export default AdminPage;
