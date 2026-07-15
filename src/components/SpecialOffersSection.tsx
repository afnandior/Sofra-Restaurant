import React, { useState, useEffect } from "react";
import { SPECIAL_OFFERS } from "../data";
import { Ticket, Percent, Copy, Check, Clock, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SpecialOffersSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<typeof SPECIAL_OFFERS[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 44,
    seconds: 52
  });

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getCouponCode = (id: string) => {
    return id === "o1" ? "ROYAL20" : "BREAKFAST55";
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section id="offers" className="py-20 px-4 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase mb-2 block">
            المذاق والسعر الأفضل
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] mb-4">
            العروض الخاصة المحدودة
          </h2>
          <div className="w-24 h-1 bg-[#c5a880] mx-auto rounded mb-6"></div>

          {/* Countdown Clock Panel */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#c5a880]/20 px-6 py-3 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#c5a880]" />
              تنتهي العروض الحالية بعد:
            </span>
            <div className="flex gap-1.5 font-mono text-sm font-bold text-[#201a15]">
              <span className="bg-[#201a15] text-[#FCFAF7] px-2.5 py-1 rounded-lg">
                {formatNumber(timeLeft.hours)}
              </span>
              <span>:</span>
              <span className="bg-[#201a15] text-[#FCFAF7] px-2.5 py-1 rounded-lg">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span>:</span>
              <span className="bg-[#201a15] text-[#FCFAF7] px-2.5 py-1 rounded-lg">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white border border-gray-100 rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#201a15] text-[#c5a880] text-[10px] font-bold px-3 py-1 rounded-full border border-[#c5a880]/20 uppercase tracking-wider">
                {offer.badge}
              </div>

              {/* Offer Info */}
              <div>
                <div className="flex items-center gap-2 text-red-500 font-bold text-xs mb-3">
                  <Percent className="w-4.5 h-4.5" />
                  {offer.discount}
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#201a15] group-hover:text-[#c5a880] transition-colors mb-3">
                  {offer.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Offer Pricing / Action */}
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-4">
                <div>
                  <div className="text-xs text-gray-400 line-through">السعر الأصلي: {offer.originalPrice} ر.س</div>
                  <div className="text-2xl font-serif font-bold text-[#75593c] mt-0.5">
                    {offer.newPrice} ر.س
                  </div>
                </div>

                <button
                  id={`redeem-btn-${offer.id}`}
                  onClick={() => setSelectedOffer(offer)}
                  className="bg-[#201a15] hover:bg-[#3a3027] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  احصل على العرض
                  <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Modal Drawer */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOffer(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl z-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#gold-50] text-[#75593c] flex items-center justify-center mx-auto mb-6 border border-[#c5a880]/30">
                <Ticket className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-serif font-bold text-[#201a15] mb-2">كوبون العرض الحصري</h3>
              <p className="text-sm text-gray-500 mb-6">انسخ الرمز التالي واستخدمه عند الطلب أو الحجز للحصول على الخصم المباشر.</p>

              {/* Coupon Box */}
              <div className="bg-[#FCFAF7] border-2 border-dashed border-[#c5a880]/30 rounded-2xl p-5 mb-6 flex justify-between items-center text-right relative">
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r border-[#c5a880]/20" />
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l border-[#c5a880]/20" />

                <div>
                  <div className="text-[11px] text-gray-400">رمز الخصم:</div>
                  <div className="font-mono font-bold text-lg text-[#201a15] tracking-wider mt-0.5">
                    {getCouponCode(selectedOffer.id)}
                  </div>
                </div>

                <button
                  id="copy-coupon-btn"
                  onClick={() => handleCopyCode(getCouponCode(selectedOffer.id))}
                  className="bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] p-2.5 rounded-xl transition-all focus:outline-none"
                >
                  {copiedCode === getCouponCode(selectedOffer.id) ? (
                    <Check className="w-4.5 h-4.5 text-green-400" />
                  ) : (
                    <Copy className="w-4.5 h-4.5 text-[#c5a880]" />
                  )}
                </button>
              </div>

              {/* Redemption Directions */}
              <div className="text-right space-y-3.5 mb-8">
                <h4 className="text-xs font-bold text-[#201a15]">طريقة الاستخدام:</h4>
                <ul className="text-xs text-gray-500 space-y-2.5 list-disc list-inside">
                  <li>أظهر هذا الكوبون للنادل عند زيارتك للمطعم.</li>
                  <li>أو اذكره لموظف الحجز عند الاتصال الهاتفي.</li>
                  <li>العرض صالح لفترة محدودة ولا يمكن دمجه مع عروض أخرى.</li>
                </ul>
              </div>

              {/* Call or reservation action */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#201a15] font-bold py-3.5 rounded-xl transition-all cursor-pointer focus:outline-none text-xs"
                >
                  إغلاق
                </button>
                <a
                  href="tel:0500000000"
                  className="flex-1 bg-[#201a15] hover:bg-[#3a3027] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none text-xs"
                >
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  اتصل لحجز طلبك
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </section>
    );
}
