"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Globe, CheckCircle } from "lucide-react";
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkAuth();
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
      // Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, language: selectedLanguage },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      // If user was created with session, save to DB and redirect
      if (data.user && data.session) {
        // Save user info to database
        const { error: dbError } = await supabase
          .from("users")
          .insert([
            {
              id: data.user.id,
              name,
              email,
              language: selectedLanguage,
            },
          ]);
        
        if (dbError) {
          console.error("Error saving user to database:", dbError);
        }
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Email confirmation required
        setShowConfirmation(true);
      }
    } catch (err) {
      setError(err.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-800/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-cyan-700/30 via-transparent to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-md">
        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mb-6 p-6 bg-green-50/10 backdrop-blur-md border border-green-400/30 rounded-2xl text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-400 mb-2">Check Your Email!</h3>
            <p className="text-gray-300 text-sm">
              We've sent a confirmation link to <strong>{email}</strong>. Please click it to activate your account.
            </p>
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {t(language, "auth.joinCodeMaster")}
          </h1>
          <p className="text-gray-400 mt-4 text-lg">{t(language, "auth.startLearningFree")}</p>
        </div>

        {/* Language Selection */}
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-cyan-400" />
            <label className="text-white font-semibold">{t(language, "auth.selectLanguage")}</label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                disabled={showConfirmation || isLoading}
                className={`p-3 rounded-lg font-medium transition-all ${
                  selectedLanguage === lang.code
                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20"
                } ${showConfirmation || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-xl mb-1">{lang.flag}</div>
                <div className="text-sm">{lang.name}</div>
              </button>
            ))}
          </div>
          <input type="hidden" id="language" value={selectedLanguage} />
        </div>

        <div className="glass p-8 rounded-3xl shadow-2xl">
          {!showConfirmation ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none disabled:opacity-50"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none disabled:opacity-50"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none disabled:opacity-50"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-300 mb-6">
                Once you confirm your email, you can sign in with your credentials.
              </p>
              <a href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
                Back to Sign In
              </a>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-gray-500">
          {t(language, "auth.alreadyHaveAccount")}{" "}
          <a href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
            {t(language, "auth.signInHere")}
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