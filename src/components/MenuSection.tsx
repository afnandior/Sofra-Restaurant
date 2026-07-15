import React, { useState } from "react";
import { INITIAL_DISHES } from "../data";
import { Dish } from "../types";
import { Search, Clock, Flame, ShoppingBag, Plus, Minus, X, Check, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  onAddToOrder: (dish: Dish, quantity: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function MenuSection({ onAddToOrder, favorites, onToggleFavorite }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [modalQty, setModalQty] = useState(1);

  const categories = [
    { id: "all", name: "الكل" },
    { id: "main", name: "الأطباق الرئيسية" },
    { id: "appetizer", name: "المقبلات والشوربات" },
    { id: "dessert", name: "الحلويات الشرقية" },
    { id: "beverage", name: "المشروبات المنعشة" },
  ];

  const filteredDishes = INITIAL_DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (dish: Dish) => {
    setSelectedDish(dish);
    setModalQty(1);
  };

  const handleModalAdd = () => {
    if (selectedDish) {
      onAddToOrder(selectedDish, modalQty);
      setSelectedDish(null);
    }
  };

  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase mb-2 block">
          قائمتنا الفاخرة
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] mb-4">
          استكشف المذاق الشرقي النادر
        </h2>
        <div className="w-24 h-1 bg-[#c5a880] mx-auto rounded"></div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
          {categories.map((cat) => (
            <button
              id={`cat-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#201a15] text-[#FCFAF7] shadow-lg shadow-[#201a15]/10 border border-[#201a15]"
                  : "bg-white text-[#2C2621]/80 hover:text-[#201a15] border border-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            id="dish-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن طبقك المفضل..."
            className="w-full bg-white border border-gray-100 hover:border-gray-200 focus:border-[#c5a880] rounded-full px-5 py-3 pr-11 text-sm focus:outline-none shadow-sm transition-all text-[#2C2621]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" />
        </div>
      </div>

      {/* Dishes Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredDishes.map((dish) => {
            const isFavorite = favorites.includes(dish.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#c5a880]/30 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Tags */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {dish.isBestSeller && (
                      <span className="bg-[#201a15] text-[#c5a880] text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-[#c5a880]/20">
                        الأكثر مبيعاً 🔥
                      </span>
                    )}
                    {dish.dietaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FCFAF7]/95 backdrop-blur-sm text-[#75593c] text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-[#c5a880]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={() => onToggleFavorite(dish.id)}
                    className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-md border border-gray-100 focus:outline-none"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform ${
                        isFavorite ? "fill-red-500 text-red-500 scale-110" : "hover:scale-110"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg text-[#201a15] group-hover:text-[#c5a880] transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-serif font-bold text-lg text-[#75593c] whitespace-nowrap">
                        {dish.price} ر.س
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* Item Footer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {dish.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {dish.calories} سعرة
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenModal(dish)}
                      className="bg-gray-50 hover:bg-[#201a15] text-[#201a15] hover:text-[#FCFAF7] p-2 rounded-xl transition-all duration-300 border border-gray-100 hover:border-[#201a15] flex items-center gap-1 text-xs font-semibold focus:outline-none"
                    >
                      <Plus className="w-4 h-4" />
                      تفاصيل
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* No results */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 font-medium">لم نجد أي طبق يطابق خيارات بحثك.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-sm text-[#c5a880] hover:underline"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[250px] relative">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Modal Content */}
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedDish.dietaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FCFAF7] text-[#75593c] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#c5a880]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#201a15] mb-2">
                    {selectedDish.name}
                  </h3>
                  
                  <div className="text-xl font-bold font-serif text-[#75593c] mb-4">
                    {selectedDish.price} ر.س
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {selectedDish.description}
                  </p>

                  {/* Food Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[#FCFAF7] rounded-2xl border border-gray-100 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4 text-[#c5a880]" />
                      <div>
                        <div className="font-semibold text-[#201a15]">زمن التحضير</div>
                        <div>{selectedDish.prepTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Flame className="w-4 h-4 text-[#c5a880]" />
                      <div>
                        <div className="font-semibold text-[#201a15]">السعرات الحرارية</div>
                        <div>{selectedDish.calories} سعرة</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500">الكمية</span>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-2 py-1">
                      <button
                        onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                        className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-sm w-6 text-center font-mono text-[#201a15]">{modalQty}</span>
                      <button
                        onClick={() => setModalQty(modalQty + 1)}
                        className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-gray-500 hover:text-green-500 transition-colors focus:outline-none"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleModalAdd}
                    className="w-full bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#201a15]/10 cursor-pointer focus:outline-none text-sm"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
                    إضافة للطلب ({(selectedDish.price * modalQty).toFixed(0)} ر.س)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
