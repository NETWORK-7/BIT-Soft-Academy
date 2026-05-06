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
  }, [messages]);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 shadow-lg shadow-blue-500/25">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t.title}</h1>
              <p className="text-blue-200">{t.subtitle}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleQuickAction(t.quickActions.courses)}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors flex items-center gap-3"
                >
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  {t.quickActions.courses}
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.programming)}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors flex items-center gap-3"
                >
                  <Code className="h-4 w-4 text-green-400" />
                  {t.quickActions.programming}
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.career)}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors flex items-center gap-3"
                >
                  <Brain className="h-4 w-4 text-purple-400" />
                  {t.quickActions.career}
                </button>
                <button
                  onClick={() => handleQuickAction(t.quickActions.trends)}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors flex items-center gap-3"
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  {t.quickActions.trends}
                </button>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                AI Capabilities
              </h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Programming assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Course information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Career guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Tech trends & news</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white/20 text-white backdrop-blur-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.role === "user" ? "text-blue-100" : "text-white/60"
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/20 text-white backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/20">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
