"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Zap, 
  Code, 
  BookOpen, 
  MessageCircle,
  Sparkles,
  Brain
} from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";

export default function AIAgentPage() {
  const { language } = useLanguageContext();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const translations = {
    en: {
      title: "Bit-Soft AI Agent",
      subtitle: "Your intelligent programming assistant",
      welcome: "Hello! I'm Bit-Soft AI, your personal programming assistant. How can I help you today?",
      placeholder: "Ask me anything about programming, courses, or Bit-Soft...",
      send: "Send Message",
      typing: "AI is typing...",
      quickActions: {
        courses: "Tell me about your courses",
        programming: "Help with JavaScript",
        career: "Career advice",
        trends: "Latest tech trends"
      }
    },
    uz: {
      title: "Bit-Soft AI Agent",
      subtitle: "Aqlli dasturlash yordamchingiz",
      welcome: "Salom! Men Bit-Soft AI, shaxsiy dasturlash yordamchingizman. Bugun sizga qanday yordam bera olaman?",
      placeholder: "Dasturlash, kurslar yoki Bit-Soft haqida har qanday savol bering...",
      send: "Xabar yuborish",
      typing: "AI yozmoqda...",
      quickActions: {
        courses: "Kurslaringiz haqida ayting",
        programming: "JavaScript bilan yordam bering",
        career: "Karyera maslahati",
        trends: "So'nggi texnologik trendlar"
      }
    },
    ru: {
      title: "Bit-Soft AI Agent",
      subtitle: "Ваш интеллектуальный помощник по программированию",
      welcome: "Привет! Я Bit-Soft AI, ваш персональный помощник по программированию. Чем я могу вам помочь сегодня?",
      placeholder: "Спросите меня о программировании, курсах или Bit-Soft...",
      send: "Отправить сообщение",
      typing: "AI печатает...",
      quickActions: {
        courses: "Расскажите о ваших курсах",
        programming: "Помощь с JavaScript",
        career: "Советы по карьере",
        trends: "Последние технологические тренды"
      }
    },
    tg: {
      title: "Bit-Soft AI Agent",
      subtitle: "Ёвари ақлии барномасозии шумо",
      welcome: "Салом! Ман Bit-Soft AI, ёвари шахсии барномасозии шумо. Имрӯз ба шумо чӣ тавр кумак карда метавонам?",
      placeholder: "Дар бораи барномасозӣ, курсҳо ё Bit-Soft ҳар гуна савал пурсед...",
      send: "Фиристодани хабар",
      typing: "AI менависад...",
      quickActions: {
        courses: "Дар бораи курсҳои шумо нақл кунед",
        programming: "Кумак бо JavaScript",
        career: "Маслиҳати карера",
        trends: "Трендҳои нави технологӣ"
      }
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add welcome message on mount
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: t.welcome,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          language: language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      const aiMessage = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = {
        role: "assistant",
        content: language === 'uz' ? "Afsuski, xatolik yuz berdi. Iltimos, qayta urinib ko'ring." :
                  language === 'ru' ? "К сожалению, произошла ошибка. Пожалуйста, попробуйте снова." :
                  language === 'tg' ? "Мутаассифам, хатогӣ рӯй дод. Лутфан, дубора кӯшиш кунед." :
                  "Sorry, an error occurred. Please try again.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : language === 'tg' ? 'tg-TJ' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      {/* Header */}
      <div className="relative bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-4 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-transform duration-300">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">{t.title}</h1>
              <p className="text-purple-100 text-lg mt-1">{t.subtitle}</p>
            </div>
            <div className="ml-auto flex items-center gap-3 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-green-300 text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl shadow-purple-500/20">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-2">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg">Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleQuickAction(t.quickActions.courses)}
                  className="w-full text-left px-5 py-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 rounded-2xl text-white transition-all duration-300 flex items-center gap-4 border border-blue-400/20 hover:border-blue-400/40 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg p-2">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{t.quickActions.courses}</span>
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.programming)}
                  className="w-full text-left px-5 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-2xl text-white transition-all duration-300 flex items-center gap-4 border border-green-400/20 hover:border-green-400/40 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg p-2">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{t.quickActions.programming}</span>
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.career)}
                  className="w-full text-left px-5 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-2xl text-white transition-all duration-300 flex items-center gap-4 border border-purple-400/20 hover:border-purple-400/40 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-2">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{t.quickActions.career}</span>
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.trends)}
                  className="w-full text-left px-5 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 rounded-2xl text-white transition-all duration-300 flex items-center gap-4 border border-orange-400/20 hover:border-orange-400/40 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-lg p-2">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{t.quickActions.trends}</span>
                </button>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl shadow-purple-500/20">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg">AI Capabilities</span>
              </h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-1.5 shrink-0 shadow-lg shadow-blue-400/50"></div>
                  <span className="font-medium">Programming assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-1.5 shrink-0 shadow-lg shadow-green-400/50"></div>
                  <span className="font-medium">Course information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1.5 shrink-0 shadow-lg shadow-purple-400/50"></div>
                  <span className="font-medium">Career guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-1.5 shrink-0 shadow-lg shadow-orange-400/50"></div>
                  <span className="font-medium">Tech trends & news</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-3xl border border-purple-400/20 shadow-2xl shadow-purple-500/10 flex-1 flex flex-col min-h-0">
              {/* Messages */}
              <div ref={messagesEndRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30 transform hover:scale-110 transition-transform duration-300">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-3xl p-5 shadow-xl ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30"
                          : "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-white backdrop-blur-xl border border-purple-400/20 shadow-purple-500/20"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-3 ${
                        message.role === "user" ? "text-blue-100" : "text-purple-200"
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-white backdrop-blur-xl rounded-3xl p-5 border border-purple-400/20 shadow-xl shadow-purple-500/20">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-purple-300" />
                        <span className="text-sm font-medium">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 px-5 py-4 bg-gradient-to-r from-white/20 to-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 backdrop-blur-sm transition-all duration-300 font-medium"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-700 disabled:to-pink-700 disabled:opacity-60 text-white rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transform font-medium"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {t.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
