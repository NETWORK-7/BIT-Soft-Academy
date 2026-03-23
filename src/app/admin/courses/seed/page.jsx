"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

export default function AdminCoursesSeed() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSeedCourses = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/courses/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to seed courses");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seed Database with Courses
          </h1>
          <p className="text-gray-600 mb-8">
            This will populate your MongoDB database with sample courses. All existing courses will be replaced.
          </p>

          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-600 p-4 flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-8 bg-green-50 border-l-4 border-green-600 p-4 flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-green-800">Success!</h3>
                <p className="text-green-700">Courses have been seeded successfully. Redirecting...</p>
              </div>
            </div>
          )}

          <button
            onClick={handleSeedCourses}
            disabled={loading || success}
            className={`px-8 py-4 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 mx-auto ${
              loading || success
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:scale-95"
            }`}
          >
            {loading && <Loader className="h-5 w-5 animate-spin" />}
            {loading ? "Seeding..." : success ? "Success!" : "Seed Courses"}
          </button>

          <p className="text-gray-500 text-sm mt-8">
            4 courses will be added to the database
          </p>
        </div>
      </div>
    </div>
  );
}
