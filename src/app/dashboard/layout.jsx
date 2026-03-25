"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpenText, Home } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/courses",
    label: "Courses",
    icon: BookOpenText,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/sign-in");
        }
      })
      .catch(() => router.replace("/sign-in"))
      .finally(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-72 bg-card shadow-xl border-r border-border flex-col transition-all duration-300">
        <div className="p-8 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-brand-from to-brand-to rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md shadow-brand-glow/25">
              CM
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Bit Soft IT Academy
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            Master coding, one lesson at a time
          </p>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-linear-to-r from-brand-from to-brand-to text-primary-foreground shadow-lg shadow-brand-glow/20"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                    `}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors
                      ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }
                    `}
                    />
                    <span>{link.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-6 border-t border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-linear-to-br from-brand-from to-brand-to rounded-full border-2 border-primary/25" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Welcome back!</p>
              <p className="text-sm text-muted-foreground">Level 12 • 1,240 points</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-5 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-sm font-medium"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="p-4 sm:p-6 lg:p-12">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm z-40">
        <ul className="grid grid-cols-3">
          <li>
            <Link
              href="/"
              className={`flex flex-col items-center justify-center py-3 text-xs font-medium ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="h-5 w-5 mb-1" />
              Home
            </Link>
          </li>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex flex-col items-center justify-center py-3 text-xs font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
