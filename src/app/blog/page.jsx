"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";

export default function BlogPage() {
  const { language } = useLanguageContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "10 JavaScript Tips That Will Make You a Better Developer",
      excerpt: "Master these essential JavaScript concepts to level up your coding skills and write cleaner, more efficient code.",
      category: "JavaScript",
      author: "Ahmed Karim",
      date: "Jan 5, 2026",
      readTime: "8 min read",
      image: "📝",
      content: "Learn the most important JavaScript concepts that every developer should know..."
    },
    {
      id: 2,
      title: "React Hooks Deep Dive: useEffect and useState",
      excerpt: "Understand how React hooks work under the hood and use them effectively in your projects.",
      category: "React",
      author: "Youssef Ali",
      date: "Jan 3, 2026",
      readTime: "12 min read",
      image: "⚛️",
      content: "React hooks have revolutionized how we write components. Let's explore them in detail..."
    },
    {
      id: 3,
      title: "Building Scalable Node.js Applications",
      excerpt: "Best practices for architecting Node.js applications that can handle growth and scale efficiently.",
      category: "Node.js",
      author: "Fatima Hassan",
      date: "Dec 28, 2025",
      readTime: "15 min read",
      image: "🚀",
      content: "Scalability is crucial for modern applications. Here's how to build Node.js apps that scale..."
    },
    {
      id: 4,
      title: "MongoDB Schema Design Best Practices",
      excerpt: "Learn how to design efficient MongoDB schemas that optimize query performance and data storage.",
      category: "MongoDB",
      author: "Fatima Hassan",
      date: "Dec 25, 2025",
      readTime: "10 min read",
      image: "🗄️",
      content: "Database design is fundamental to application performance. Here are the best practices..."
    },
    {
      id: 5,
      title: "TypeScript: From Zero to Hero",
      excerpt: "A comprehensive guide to learning TypeScript and leveraging its powerful type system in your projects.",
      category: "TypeScript",
      author: "Ahmed Karim",
      date: "Dec 20, 2025",
      readTime: "18 min read",
      image: "🔷",
      content: "TypeScript adds type safety to JavaScript. Learn how to use it effectively..."
    },
    {
      id: 6,
      title: "Web Security: Protecting Your Applications",
      excerpt: "Essential security practices to protect your web applications from common vulnerabilities.",
      category: "Security",
      author: "Youssef Ali",
      date: "Dec 15, 2025",
      readTime: "14 min read",
      image: "🔒",
      content: "Security should be a priority in every application. Here's how to implement it..."
    },
    {
      id: 7,
      title: "Modern CSS: Flexbox and Grid Mastery",
      excerpt: "Master Flexbox and CSS Grid to build responsive, beautiful layouts with ease.",
      category: "CSS",
      author: "Youssef Ali",
      date: "Dec 10, 2025",
      readTime: "11 min read",
      image: "🎨",
      content: "CSS has evolved significantly. Learn the modern layout techniques..."
    },
    {
      id: 8,
      title: "Next.js 14: The Future of React Development",
      excerpt: "Explore the latest features of Next.js and how they enhance the React development experience.",
      category: "Next.js",
      author: "Ahmed Karim",
      date: "Dec 5, 2025",
      readTime: "16 min read",
      image: "▲",
      content: "Next.js continues to evolve. Let's explore what's new in the latest version..."
    }
  ];

  const categories = ["All", "JavaScript", "React", "Node.js", "MongoDB", "TypeScript", "Security", "CSS", "Next.js"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-r from-brand-from to-brand-to text-primary-foreground py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            {language === 'tg' ? 'Блоги техникӣ ва олинҳо' : 
             language === 'ru' ? 'Технический блог и инсайты' : 
             language === 'uz' ? 'Texnika Blogi & Insightlar' : 
             'Tech Blog & Insights'}
          </h1>
          <p className="text-xl opacity-90">
            {language === 'tg' ? 'Аз мутахассисони соҳа ва навсозиҳоро дар рушди веб-ҳофарӣ омӯзед' : 
             language === 'ru' ? 'Учитесь у отраслевых экспертов и оставайтесь в курсе последних событий в веб-разработке' : 
             language === 'uz' ? 'Sanoat mutaxassislaridan o\'rganing va veb-sohada eng so\'ngi yangiliklar bilan tanishing' : 
             'Learn from industry experts and stay updated with the latest in web development'}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'tg' ? 'Ҷустуҷӯи блогҳо...' : 
                           language === 'ru' ? 'Поиск постов блога...' : 
                           language === 'uz' ? 'Blog postlarini qidirish...' : 
                           'Search blog posts...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer h-full flex flex-col">
                  <div className="bg-linear-to-br from-brand-from/15 to-brand-to/25 h-40 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>

              
                  <div className="p-6 flex flex-col flex-grow">
                   
                    <div className="mb-3">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>

               
                    <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
                    <div className="border-t border-gray-100 pt-4 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{post.readTime}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-semibold group">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No blog posts found matching your criteria.</p>
          </div>
        )}
      </div>

     
      <div className="bg-linear-to-r from-brand-from to-brand-to text-primary-foreground py-16 px-4 mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'tg' ? 'Мақолаҳои охирин' : 
             language === 'ru' ? 'Последние посты' : 
             language === 'uz' ? 'So\'nggi maqolalar' : 
             'Recent Posts'}
          </h2>
          <p className="text-lg opacity-90 mb-8">{language === 'tg' ? 'Охирин мақолаҳои техникӣ ва олиниҳоро бинед' : 
             language === 'ru' ? 'Последние технические посты и инсайты' : 
             language === 'uz' ? 'So\'nggi texnik maqolalar va tahlillarni ko\'ring' : 
             'Get the latest articles and tips delivered to your inbox'}</p>
          <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={language === 'tg' ? 'Почтаи электронии худро ворид кунед' : 
                           language === 'ru' ? 'Введите ваш email' : 
                           language === 'uz' ? 'Emailingizni kiriting' : 
                           'Enter your email'}
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition">
              {language === 'tg' ? 'Обуна шудан' : 
               language === 'ru' ? 'Подписаться' : 
               language === 'uz' ? 'Obuna bo\'lish' : 
               'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
