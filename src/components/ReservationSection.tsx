import React, { useState, useEffect } from "react";
import { Reservation } from "../types";
import { Calendar, Users, Phone, User, Clock, Check, Trash2, ShieldCheck, Mail, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ReservationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<Reservation["area"]>("main_hall");
  const [notes, setNotes] = useState("");
  const [savedReservations, setSavedReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<"book" | "my_bookings">("book");
  const [newBooking, setNewBooking] = useState<Reservation | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sofra_reservations");
    if (saved) {
      try {
        setSavedReservations(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading reservations:", e);
      }
    }
  }, []);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) return;

    const receiptCode = `SF-${Math.floor(1000 + Math.random() * 9000)}`;
    const booking: Reservation = {
      id: String(Date.now()),
      customerName: name,
      phone,
      email,
      date,
      time,
      guests,
      area,
      notes,
      status: "confirmed",
      receiptCode,
      createdAt: new Date().toLocaleDateString("ar-SA"),
    };

    const updated = [booking, ...savedReservations];
    setSavedReservations(updated);
    localStorage.setItem("sofra_reservations", JSON.stringify(updated));
    setNewBooking(booking);

    // Clear Form
    setName("");
    setPhone("");
    setEmail("");
    setDate("");
    setTime("");
    setGuests(2);
    setNotes("");
  };

  const handleCancelBooking = (id: string) => {
    const updated = savedReservations.filter((res) => res.id !== id);
    setSavedReservations(updated);
    localStorage.setItem("sofra_reservations", JSON.stringify(updated));
  };

  const getAreaName = (areaVal: Reservation["area"]) => {
    switch (areaVal) {
      case "main_hall":
        return "الصالة الرئيسية الفاخرة";
      case "outdoor_terrace":
        return "الشرفة الخارجية المطلة";
      case "family_section":
        return "القسم العائلي الهادئ";
      default:
        return "";
    }
  };

  return (
    <section id="reservations" className="py-20 bg-gradient-to-b from-white to-[#gold-50]/30 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase mb-2 block">
            طاولتك بانتظارك
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] mb-4">
            حجز طاولة مسبق
          </h2>
          <div className="w-24 h-1 bg-[#c5a880] mx-auto rounded"></div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              setActiveTab("book");
              setNewBooking(null);
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "book"
                ? "bg-[#201a15] text-[#FCFAF7] shadow-lg shadow-[#201a15]/10"
                : "bg-white text-[#2C2621]/60 border border-gray-100 hover:text-[#201a15]"
            }`}
          >
            <Calendar className="w-4 h-4 text-[#c5a880]" />
            حجز جديد
          </button>
          <button
            onClick={() => {
              setActiveTab("my_bookings");
              setNewBooking(null);
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 relative cursor-pointer ${
              activeTab === "my_bookings"
                ? "bg-[#201a15] text-[#FCFAF7] shadow-lg shadow-[#201a15]/10"
                : "bg-white text-[#2C2621]/60 border border-gray-100 hover:text-[#201a15]"
            }`}
          >
            <ClipboardList className="w-4 h-4 text-[#c5a880]" />
            حجوزاتي
            {savedReservations.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold">
                {savedReservations.length}
              </span>
            )}
          </button>
        </div>

        {/* Content Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "book" && !newBooking && (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl"
            >
              <form onSubmit={handleBookTable} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <User className="w-4 h-4 text-[#c5a880]" />
                      الاسم الكامل
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="أحمد علي"
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#c5a880]" />
                      رقم الجوال
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#c5a880]" />
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#c5a880]" />
                      عدد الضيوف
                    </label>
                    <select
                      id="res-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-[#2C2621]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num === 1 ? "شخص واحد" : num === 2 ? "شخصين" : `${num} أشخاص`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reservation Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#c5a880]" />
                      تاريخ الحجز
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-[#2C2621]"
                    />
                  </div>

                  {/* Reservation Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#201a15] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#c5a880]" />
                      وقت الحجز
                    </label>
                    <select
                      id="res-time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-[#2C2621]"
                    >
                      <option value="">اختر الوقت المناسب</option>
                      {["01:00 م", "02:00 م", "03:30 م", "05:00 م", "07:00 م", "08:30 م", "10:00 م", "11:30 م"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Area Section Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#201a15] block">الجلسة المفضلة</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "main_hall", title: "الصالة الداخلية", desc: "أجواء فخمة وموسيقى شرقية هادئة" },
                      { id: "outdoor_terrace", title: "الشرفة الخارجية", desc: "هواء طلق وإطلالة على بركة المياه" },
                      { id: "family_section", title: "القسم العائلي", desc: "مساحات خاصة وعائلية دافئة" },
                    ].map((item) => (
                      <button
                        id={`area-btn-${item.id}`}
                        key={item.id}
                        type="button"
                        onClick={() => setArea(item.id as any)}
                        className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                          area === item.id
                            ? "bg-[#gold-50] border-[#c5a880] shadow-sm"
                            : "bg-white border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="font-bold text-sm text-[#201a15]">{item.title}</div>
                        <div className="text-[11px] text-gray-500 mt-1">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#201a15]">ملاحظات أو طلبات خاصة</label>
                  <textarea
                    id="res-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="هل تحتفل بمناسبة خاصة؟ أو هل تفضل طاولة قريبة من النافذة؟"
                    rows={3}
                    className="w-full bg-[#FCFAF7] border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="submit-reservation"
                  type="submit"
                  className="w-full bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#201a15]/10 cursor-pointer focus:outline-none"
                >
                  تأكيد حجز الطاولة
                </button>
              </form>
            </motion.div>
          )}

          {/* New Booking Ticket Success Screen */}
          {newBooking && (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border border-[#c5a880]/30 shadow-2xl relative text-center max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6 border border-green-200">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#201a15] mb-2">تم تأكيد حجزك بنجاح!</h3>
              <p className="text-sm text-gray-500 mb-8">شرفنا حجزك ونتطلع لخدمتك وتقديم أرقى الأطباق لك.</p>

              {/* Glowing Golden Voucher Ticket */}
              <div className="border-2 border-dashed border-[#c5a880]/40 rounded-2xl p-6 bg-[#FCFAF7] relative overflow-hidden text-right shadow-sm">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-[#c5a880]/20 z-10" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-[#c5a880]/20 z-10" />

                <div className="flex justify-between items-center pb-4 border-b border-[#c5a880]/20 mb-4">
                  <div className="font-serif font-bold text-lg text-[#201a15]">بطاقة دعوة سفرة</div>
                  <div className="font-mono font-bold bg-[#201a15] text-[#c5a880] px-3 py-1 rounded text-sm tracking-wider">
                    {newBooking.receiptCode}
                  </div>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الاسم:</span>
                    <span className="font-bold text-[#201a15]">{newBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">التاريخ والوقت:</span>
                    <span className="font-bold text-[#201a15]">{newBooking.date} في {newBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">عدد الحضور:</span>
                    <span className="font-bold text-[#201a15]">{newBooking.guests === 1 ? "شخص واحد" : `${newBooking.guests} أشخاص`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">منطقة الجلوس:</span>
                    <span className="font-bold text-[#201a15]">{getAreaName(newBooking.area)}</span>
                  </div>
                </div>

                {/* Footer Assurance */}
                <div className="flex items-center gap-1.5 justify-center mt-6 pt-4 border-t border-[#c5a880]/10 text-xs text-green-600 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  حجز مؤكد مع الشيف سعيد
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setNewBooking(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#201a15] font-bold py-3.5 rounded-xl transition-all cursor-pointer focus:outline-none text-sm"
                >
                  حجز آخر
                </button>
                <button
                  onClick={() => setActiveTab("my_bookings")}
                  className="flex-1 bg-[#201a15] hover:bg-[#3a3027] text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer focus:outline-none text-sm"
                >
                  عرض كافة حجوزاتي
                </button>
              </div>
            </motion.div>
          )}

          {/* Saved Bookings List Tab */}
          {activeTab === "my_bookings" && (
            <motion.div
              key="my-bookings-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {savedReservations.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                  <ClipboardList className="w-12 h-12 text-[#c5a880] mx-auto mb-4" />
                  <p className="text-[#201a15] font-bold text-lg mb-1">لا توجد حجوزات سابقة</p>
                  <p className="text-gray-400 text-sm mb-6">لم تقم بحجز طاولات بعد في هذا المتصفح.</p>
                  <button
                    onClick={() => setActiveTab("book")}
                    className="bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus:outline-none"
                  >
                    حجز طاولة الآن
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedReservations.map((res) => (
                    <motion.div
                      layout
                      key={res.id}
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs text-gray-400">حجز رقم:</span>
                          <span className="font-mono font-bold bg-[#gold-50] text-[#75593c] px-2.5 py-0.5 rounded text-xs">
                            {res.receiptCode}
                          </span>
                        </div>

                        <div className="space-y-3 text-sm border-b border-gray-50 pb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400">الاسم:</span>
                            <span className="font-bold text-[#201a15]">{res.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">التاريخ والوقت:</span>
                            <span className="font-bold text-[#201a15]">{res.date} - {res.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">عدد الضيوف:</span>
                            <span className="font-bold text-[#201a15]">{res.guests} ضيوف</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">الجلسة:</span>
                            <span className="font-bold text-[#201a15]">{getAreaName(res.area)}</span>
                          </div>
                          {res.notes && (
                            <div className="text-xs text-gray-500 bg-[#FCFAF7] p-2.5 rounded-xl border border-gray-50 mt-1">
                              <strong>ملاحظتك:</strong> {res.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          مؤكد
                        </div>

                        <button
                          onClick={() => handleCancelBooking(res.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold focus:outline-none"
                        >
                          <Trash2 className="w-4 h-4" />
                          إلغاء الحجز
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
