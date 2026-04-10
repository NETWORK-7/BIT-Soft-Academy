"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
];

function SignUpPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { language, updateLanguage } = useLanguageContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) router.push("/dashboard");
      }
    );
  }, [router]);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    updateLanguage(lang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          language: selectedLanguage,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Sign up failed");
        setIsLoading(false);
        return;
      }
      
      // Use server-provided redirect or default to dashboard
      const redirectTo = data.redirectTo || "/dashboard";
      console.log("Registration successful, redirecting to:", redirectTo);
      router.push(redirectTo);
    } catch (err) {
      setError(err.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-gray-600 mb-8">Hisob yaratish va o'rganishni boshlash</p>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Til tanlang</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => handleLanguageSelect(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 disabled:opacity-50"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                required
                minLength={6}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Hisobingiz bormi? {" "}
          <a href="/sign-in" className="text-gray-900 hover:text-gray-700 font-medium">
            Kirish
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

export default SignUpPage;