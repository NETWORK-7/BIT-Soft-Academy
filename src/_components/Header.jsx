"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import AuthSection from "./AuthSection";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "tg", name: "Тоҷикӣ", flag: "🇹🇯" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { language, updateLanguage } = useLanguageContext();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setIsSignedIn(!!data.user))
      .catch(() => setIsSignedIn(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/90 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-card/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 group min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 border border-gray-200">
            <img 
              src="/bitsoft.jpg" 
              alt="BitSoft Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent truncate tracking-tight">
            BitSoft
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            href="/courses"
            className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t(language, "nav.courses")}
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t(language, "nav.about")}
          </Link>
          <Link
            href="/blog"
            className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t(language, "nav.blog")}
          </Link>
          <Link
            href="/dashboard"
            className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t(language, "nav.dashboard")}
          </Link>

          <div className="relative">
            <button
              onClick={() => setLanguageDropdown(!languageDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background/60 hover:border-primary/25 hover:bg-accent transition-colors"
            >
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {languages.find(l => l.code === language)?.flag}
              </span>
            </button>
            {languageDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg shadow-black/5 ring-1 ring-black/5 z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      updateLanguage(lang.code);
                      setLanguageDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-accent transition-colors ${
                      language === lang.code ? "bg-accent/80 border-l-4 border-primary" : ""
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-4">
            <AuthSection />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-accent transition shrink-0"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-7 w-7 text-foreground" /> : <Menu className="h-7 w-7 text-foreground" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card shadow-lg">
          <nav className="flex flex-col px-6 py-6 space-y-5">
            <Link
              href="/courses"
              className="text-lg font-medium text-muted-foreground hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.courses")}
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-muted-foreground hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.about")}
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium text-muted-foreground hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.blog")}
            </Link>
            <Link
              href="/dashboard"
              className="text-lg font-medium text-muted-foreground hover:text-primary transition pb-6 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(language, "nav.dashboard")}
            </Link>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
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
                    className={`w-full px-4 py-2 text-left flex items-center gap-3 rounded-xl transition-colors ${
                      language === lang.code 
                        ? "bg-accent border-l-4 border-primary" 
                        : "hover:bg-muted/80"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-foreground">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isSignedIn ? (
              <div className="pt-6 space-y-4">
                <Button asChild variant="outline" size="lg" className="w-full rounded-xl border-border">
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>{t(language, "nav.signIn")}</Link>
                </Button>
                <Button asChild size="lg" className="w-full rounded-xl bg-linear-to-r from-brand-from to-brand-to text-primary-foreground hover:brightness-110 shadow-md shadow-brand-glow/30">
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