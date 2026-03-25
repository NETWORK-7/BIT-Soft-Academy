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
    <div className="min-h-screen bg-linear-to-br from-background via-cyan-50/50 to-indigo-50/80 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">Welcome to CodeMaster</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">Your learning hub for modern web development</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card text-card-foreground rounded-2xl border border-border/60 shadow-md shadow-black/[0.04] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold">Total Courses</p>
                <p className="text-4xl font-bold text-primary mt-2 tabular-nums">{stats.courses}</p>
              </div>
              <BookOpenText className="h-12 w-12 text-primary/35" />
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-2xl border border-border/60 shadow-md shadow-black/[0.04] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold">Active Users</p>
                <p className="text-4xl font-bold text-brand-to mt-2 tabular-nums">{stats.users}</p>
              </div>
              <Users className="h-12 w-12 text-brand-to/40" />
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-2xl border border-border/60 shadow-md shadow-black/[0.04] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold">Completion Rate</p>
                <p className="text-4xl font-bold text-emerald-600 mt-2 tabular-nums">85%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl border border-border/60 shadow-md shadow-black/[0.04] p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">What You&apos;ll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-primary pl-4 rounded-r-lg">
              <h3 className="font-semibold text-lg text-foreground">Frontend Development</h3>
              <p className="text-muted-foreground mt-2">Master React, TypeScript, CSS, and modern frontend tools to build beautiful web applications.</p>
            </div>
            <div className="border-l-4 border-brand-to pl-4 rounded-r-lg">
              <h3 className="font-semibold text-lg text-foreground">Backend Development</h3>
              <p className="text-muted-foreground mt-2">Learn Node.js, Express, and database design to build scalable server applications.</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 rounded-r-lg">
              <h3 className="font-semibold text-lg text-foreground">Full Stack Skills</h3>
              <p className="text-muted-foreground mt-2">Combine frontend and backend knowledge to build complete web applications.</p>
            </div>
            <div className="border-l-4 border-violet-500 pl-4 rounded-r-lg">
              <h3 className="font-semibold text-lg text-foreground">Best Practices</h3>
              <p className="text-muted-foreground mt-2">Learn security, performance optimization, testing, and deployment strategies.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/courses"
            className="inline-block rounded-xl bg-linear-to-r from-brand-from to-brand-to text-primary-foreground px-8 py-4 font-semibold shadow-lg shadow-brand-glow/30 hover:brightness-110 transition"
          >
            Explore All Courses
          </a>
        </div>
      </div>
    </div>
  );
}
