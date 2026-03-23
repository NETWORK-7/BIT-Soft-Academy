"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import AuthSection from "./AuthSection";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { language, updateLanguage } = useLanguageContext();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-black">BA</span>
          </div>
          <h1 className="text-3xl font-black bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Bit-Soft IT Academy
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            href="/courses"
            className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            {t(language, "nav.courses")}
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            {t(language, "nav.about")}
          </Link>
          // ...existing code...
          <Link
            href="/blog"
            className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            {t(language, "nav.blog")}
          </Link>
          <Link
            href="/dashboard"
            className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            {t(language, "nav.dashboard")}
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdown(!languageDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {languages.find(l => l.code === language)?.flag}
              </span>
            </button>
            {languageDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      updateLanguage(lang.code);
                      setLanguageDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-purple-50 transition-colors ${
                      language === lang.code ? "bg-purple-50 border-l-4 border-purple-600" : ""
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-gray-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-5">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <AuthSection />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X className="h-7 w-7 text-gray-700" /> : <Menu className="h-7 w-7 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col px-6 py-6 space-y-5">
            <Link
              href="/courses"
              className="text-lg font-medium text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.courses")}
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.about")}
            </Link>
            // ...existing code...
            <Link
              href="/blog"
              className="text-lg font-medium text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.blog")}
            </Link>
            <Link
              href="/dashboard"
              className="text-lg font-medium text-gray-700 hover:text-purple-600 transition pb-6 border-b border-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.dashboard")}
            </Link>

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" /> {t(language, "languageSettings.title")}
              </p>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      updateLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left flex items-center gap-3 rounded-lg transition-colors ${
                      language === lang.code 
                        ? "bg-purple-100 border-l-4 border-purple-600" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-gray-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isSignedIn ? (
              <div className="pt-6 space-y-4">
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>{t(language, "nav.signIn")}</Link>
                </Button>
                <Button asChild size="lg" className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>{t(language, "nav.startFreeTrial")}</Link>
                </Button>
              </div>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}