"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
export default function Page() {
  const { language } = useLanguageContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Sign in failed");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kirish
          </h1>
          <p className="text-gray-600 mb-8">Hisobingizga kirish</p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-cyan-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-cyan-500"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition">Sign In</button>
          </form>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Hisobingiz yo'qmi? {" "}
          <a href="/sign-up" className="text-gray-900 hover:text-gray-700 font-medium">
            Ro'yxatdan o'tish
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}