import React, { useState } from "react";
import { INITIAL_REVIEWS } from "../data";
import { Review } from "../types";
import { Star, MessageSquarePlus, Calendar, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: Review = {
      id: String(Date.now()),
      author: name,
      rating,
      comment,
      date: "اليوم",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" // fallback avatar
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setRating(5);
    setComment("");
    setIsFormOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const calculateAverageRating = () => {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-[#gold-50]/20 to-white px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase mb-2 block">
            شهادات نعتز بها
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] mb-4">
            آراء روّاد مطعم سفرة
          </h2>
          <div className="w-24 h-1 bg-[#c5a880] mx-auto rounded"></div>
        </div>

        {/* Overview Stats Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-12">
          <div className="text-center md:border-l border-gray-100 py-4">
            <div className="text-5xl font-serif font-bold text-[#75593c]">{calculateAverageRating()}</div>
            <div className="flex justify-center gap-1.5 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(Number(calculateAverageRating()))
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-400">متوسط تقييم الضيوف ({reviews.length} تقييم)</div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4">
            <div className="text-right">
              <h4 className="font-bold text-sm text-[#201a15]">مشاركة تجربتك تهمنا</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                هل زرتنا مؤخراً؟ نتشرف بسماع رأيك وتقييمك للأطباق والخدمة لتطوير خدماتنا دائماً.
              </p>
            </div>
            
            <button
              id="open-review-form-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#201a15] hover:bg-[#3a3027] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 focus:outline-none"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#c5a880]" />
              اكتب مراجعتك الآن
            </button>
          </div>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border border-green-100 text-green-800 p-4 rounded-2xl flex items-center gap-2 mb-8 text-sm font-semibold"
            >
              <Check className="w-5 h-5 text-green-600 shrink-0" />
              <span>شكراً جزيلاً لتقييمك! تم نشر مراجعتك بنجاح في القائمة أدناه.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Review Dropdown Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleSubmitReview} className="bg-white rounded-3xl p-8 border border-[#c5a880]/30 shadow-lg space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#201a15]">إضافة تقييم جديد</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-bold text-gray-500 block">الاسم الكريم:</label>
                    <input
                      id="rev-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: يوسف خالد"
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Stars field */}
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-bold text-gray-500 block">التقييم العام:</label>
                    <div className="flex gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          id={`star-btn-${star}`}
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= (hoverRating ?? rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment field */}
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-500 block">تفاصيل مراجعتك:</label>
                  <textarea
                    id="rev-comment"
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب هنا تجربتك مع المذاق والخدمة والأجواء..."
                    className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    id="submit-review-btn"
                    type="submit"
                    className="flex-1 bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] py-3.5 rounded-xl font-bold transition-all text-xs focus:outline-none cursor-pointer"
                  >
                    نشر التقييم
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-50 hover:bg-gray-100 text-[#201a15] px-6 py-3.5 rounded-xl font-bold transition-all text-xs focus:outline-none cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                key={rev.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rev.rating ? "text-amber-400 fill-amber-400" : "text-gray-100"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                {/* Author Card Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50 shrink-0">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a880]/20"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#201a15]">{rev.author}</h4>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {rev.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
