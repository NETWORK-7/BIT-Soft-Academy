"use client";

import React, { useState, useEffect } from "react";
import { Star, Send, MessageCircle, User, ThumbsUp, Loader2 } from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";

export default function CommentSection() {
  const { language } = useLanguageContext();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    rating: 5,
  });
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [hoverRating, setHoverRating] = useState(0);

  const translations = {
    en: {
      title: "What Our Students Say",
      subtitle: "Read reviews from our community of learners",
      writeReview: "Write a Review",
      yourName: "Your Name",
      yourEmail: "Your Email (optional)",
      yourReview: "Share your experience...",
      rating: "Rating",
      submit: "Submit Review",
      submitting: "Submitting...",
      thankYou: "Thank you! Your review has been submitted.",
      error: "Something went wrong. Please try again.",
      noReviews: "No reviews yet. Be the first to share your experience!",
      anonymous: "Anonymous",
      verified: "Verified Student",
    },
    uz: {
      title: "O'quvchilarimiz nima deydi",
      subtitle: "O'quvchilarimizning fikrlarini o'qing",
      writeReview: "Fikr yozing",
      yourName: "Ismingiz",
      yourEmail: "Email (ixtiyoriy)",
      yourReview: "Tajribangizni baham ko'ring...",
      rating: "Baholash",
      submit: "Fikr yuborish",
      submitting: "Yuborilmoqda...",
      thankYou: "Rahmat! Fikringiz qabul qilindi.",
      error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      noReviews: "Hozircha fikrlar yo'q. Birinchi bo'lib tajribangizni ulashing!",
      anonymous: "Anonim",
      verified: "Tasdiqlangan o'quvchi",
    },
    ru: {
      title: "Что говорят наши студенты",
      subtitle: "Читайте отзывы нашего сообщества учеников",
      writeReview: "Написать отзыв",
      yourName: "Ваше имя",
      yourEmail: "Email (необязательно)",
      yourReview: "Поделитесь своим опытом...",
      rating: "Оценка",
      submit: "Отправить отзыв",
      submitting: "Отправка...",
      thankYou: "Спасибо! Ваш отзыв отправлен.",
      error: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
      noReviews: "Пока нет отзывов. Будьте первым, кто поделится опытом!",
      anonymous: "Аноним",
      verified: "Подтвержденный студент",
    },
    tg: {
      title: "Донишҷӯёни мо чӣ мегӯянд",
      subtitle: "Фикрҳои ҷамъияти донишҷӯёни моро мутолиа кунед",
      writeReview: "Фикр нависед",
      yourName: "Номи шумо",
      yourEmail: "Email (ихтирорӣ)",
      yourReview: "Таҷрибаи худро мубодила кунед...",
      rating: "Баҳогузорӣ",
      submit: "Фикр фиристодан",
      submitting: "Фиристодан...",
      thankYou: "Ташаккур! Фикри шумо фиристода шуд.",
      error: "Хатогӣ рӯй дод. Лутфан, дубора кӯшиш кунед.",
      noReviews: "Ҳоло фикрҳо нест. Якумин касе таҷрибаи худро мубодила кунед!",
      anonymous: "Номаълум",
      verified: "Донишҷӯи тасдиқшуда",
    },
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      if (data.success) {
        // Only show public comments on the landing page
        const publicComments = data.comments.filter((c) => c.isPublic !== false);
        setComments(publicComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.text.trim()) {
      setSubmitMessage({ type: "error", text: t.error });
      return;
    }

    setSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: "success", text: t.thankYou });
        setFormData({ name: "", email: "", text: "", rating: 5 });
        // Refresh comments list
        fetchComments();
      } else {
        setSubmitMessage({ type: "error", text: data.error || t.error });
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: t.error });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : language === "tg" ? "tg-TJ" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (interactive ? hoverRating || formData.rating : rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">{t.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comments List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t.noReviews}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-gray-900">
                            {comment.name || t.anonymous}
                          </h4>
                          {comment.email && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {t.verified}
                            </span>
                          )}
                          <span className="text-gray-400 text-sm ml-auto">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        {comment.rating > 0 && (
                          <div className="mt-1">
                            {renderStars(comment.rating)}
                          </div>
                        )}
                        <p className="mt-3 text-gray-700 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                {t.writeReview}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder={t.yourName}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourEmail}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.rating}
                  </label>
                  {renderStars(formData.rating, true)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourReview} *
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    placeholder={t.yourReview}
                    required
                  />
                </div>

                {submitMessage.text && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      submitMessage.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
