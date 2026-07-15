import React, { useState, useEffect } from "react";
import { Dish } from "./types";
import MenuSection from "./components/MenuSection";
import ReservationSection from "./components/ReservationSection";
import SpecialOffersSection from "./components/SpecialOffersSection";
import InteractiveMap from "./components/InteractiveMap";
import ReviewsSection from "./components/ReviewsSection";
import ChefSaeedAssistant from "./components/ChefSaeedAssistant";
import { 
  Phone, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  Award, 
  Flame, 
  UtensilsCrossed, 
  Sparkles,
  MapPin,
  Clock,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import heroBg from "./assets/images/hero_restaurant_1783594919079.jpg";

interface OrderedItem {
  dish: Dish;
  quantity: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confCode, setConfCode] = useState("");

  // Track scrolling to style navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToOrder = (dish: Dish, quantity: number) => {
    setOrderedItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { dish, quantity }];
    });
    // Visual indicator of adding
    setCartOpen(true);
  };

  const handleUpdateQty = (dishId: string, delta: number) => {
    setOrderedItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setOrderedItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleToggleFavorite = (dishId: string) => {
    setFavorites((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  const handleClearCart = () => {
    setOrderedItems([]);
  };

  const calculateTotal = () => {
    return orderedItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  };

  const handleCheckoutWhatsApp = () => {
    if (orderedItems.length === 0) return;

    // Build formatted message
    let message = `مرحباً مطعم سفرة الشرق، أود تقديم طلب طعام جديد:\n\n`;
    orderedItems.forEach((item) => {
      message += `• ${item.dish.name} (الكمية: ${item.quantity}) - السعر: ${item.dish.price * item.quantity} ر.س\n`;
    });
    message += `\n💵 المجموع الكلي: ${calculateTotal()} ر.س\n`;
    message += `📍 يرجى تأكيد الطلب لتحديد تفاصيل التوصيل أو الاستلام. شكراً لكم!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/966500000000?text=${encodedMessage}`;
    
    // Open in new window safely
    window.open(whatsappUrl, "_blank");

    // Show simulated confirmation
    setConfCode(`SF-ORD-${Math.floor(10000 + Math.random() * 90000)}`);
    setOrderConfirmed(true);
    handleClearCart();
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2C2621] relative flex flex-col justify-between">
      
      {/* 1. Frosted Navigation Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#201a15] flex items-center justify-center text-xl shadow-lg border border-[#c5a880]/20 group-hover:scale-105 transition-transform">
              🍽️
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-[#201a15] group-hover:text-[#75593c] transition-colors">
                سُفرة الشرق
              </span>
              <span className="text-[10px] text-[#c5a880] font-bold block leading-none">مذاق يتوارثه الأجيال</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "الرئيسية", href: "#" },
              { label: "قصتنا", href: "#story" },
              { label: "قائمة الطعام", href: "#menu" },
              { label: "العروض الحالية", href: "#offers" },
              { label: "حجز الطاولات", href: "#reservations" },
              { label: "موقعنا", href: "#location" },
              { label: "الآراء والتقييمات", href: "#reviews" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm font-bold text-[#2C2621]/80 hover:text-[#75593c] transition-colors relative after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-[2px] after:bg-[#c5a880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {/* Direct Dial Hotline */}
            <a
              href="tel:0500000000"
              className="hidden sm:flex items-center gap-2 bg-[#FCFAF7] border border-[#c5a880]/30 hover:border-[#c5a880] px-4 py-2 rounded-xl text-xs font-bold text-[#201a15] transition-all"
            >
              <Phone className="w-4 h-4 text-[#c5a880]" />
              966500000000+
            </a>

            {/* Shopping Cart button trigger */}
            <button
              id="open-cart-btn"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:border-[#c5a880]/30 text-[#201a15] shadow-sm transition-all cursor-pointer focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 text-[#75593c]" />
              {orderedItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">
                  {orderedItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-gray-100 text-[#201a15] cursor-pointer focus:outline-none"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white p-6 shadow-2xl border-l border-gray-100 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="font-serif font-bold text-lg text-[#201a15]">بوابة الملاحة</span>
                  <button
                    id="close-mobile-menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {[
                    { label: "الرئيسية", href: "#" },
                    { label: "قصتنا", href: "#story" },
                    { label: "قائمة الطعام", href: "#menu" },
                    { label: "العروض الحالية", href: "#offers" },
                    { label: "حجز الطاولات", href: "#reservations" },
                    { label: "موقعنا", href: "#location" },
                    { label: "الآراء والتقييمات", href: "#reviews" },
                  ].map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-bold text-[#2C2621]/80 hover:text-[#75593c] py-2 border-b border-gray-50 transition-colors block"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:0500000000"
                  className="w-full bg-[#201a15] hover:bg-[#3a3027] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  اتصل بنا الآن
                </a>
                <p className="text-[10px] text-gray-400 text-center font-mono">مطعم سفرة الشرق - الرياض © ٢٠٢٦</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-center px-4 overflow-hidden pt-24">
        {/* Generated Restaurant Background image with nice atmospheric dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Interior of Sofra Restaurant"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-102 filter brightness-[0.38] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-transparent to-black/30 z-10" />
        </div>

        {/* Content with motion entry */}
        <div className="relative z-20 max-w-3xl space-y-6 md:space-y-8 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#FCFAF7]/10 backdrop-blur-md text-[#c5a880] border border-[#c5a880]/30 px-4 py-1.5 rounded-full text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>تجربة طهي شرقية ملوكية وفريدة</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-[1.25] tracking-tight"
          >
            حيث تلتقي عراقة <span className="text-[#c5a880]">الماضي</span> <br />
            بفخامة <span className="text-[#c5a880]">الحاضر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#FCFAF7]/90 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            في مطعم سفرة الشرق، نقدم لكم أشهى الكبسات الملكية، واللحوم المشوية ببطء، والحلويات الشرقية المحضرة يدوياً على الحطب بأيدي أمهر الطهاة المحترفين.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              id="hero-reserve-btn"
              href="#reservations"
              className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#b09168] text-[#201a15] px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm text-center"
            >
              احجز طاولتك الفاخرة
            </a>
            <a
              id="hero-menu-btn"
              href="#menu"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] text-sm text-center"
            >
              استكشف المنيو الكامل
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Heritage / About Section */}
      <section id="story" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Descriptive columns */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase block">
              حكاية سُفرة
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] leading-tight">
              أسرار الطهي على الفحم والحطب الموروث
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              بدأت قصة مطعم سفرة من شغف عميق بتقديم المذاق الأصيل غير المستنسخ. نحن نرفض المكونات المصنعة والآلات الحديثة المعقمة في طهي لحومنا؛ بل نثق بروح الحطب البري وبهاراتنا العائلية التي نقوم بطحنها يدوياً كل صباح.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              كل طبق يخرج من مطبخنا هو لوحة فنية تعبر عن حكاية ضيافة كرم الضيافة العربية العريقة، مطبوخ بعناية فائقة لضمان طراوة اللحم وامتزاج البهارات مع حبات الأرز الفاخرة.
            </p>

            {/* Micro Badges Bento */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
                <Award className="w-6 h-6 text-[#c5a880] mx-auto mb-2" />
                <div className="font-bold text-xs text-[#201a15]">جودة ممتازة</div>
                <div className="text-[9px] text-gray-400 mt-0.5">مكونات طازجة بلدي</div>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
                <Flame className="w-6 h-6 text-[#c5a880] mx-auto mb-2" />
                <div className="font-bold text-xs text-[#201a15]">طهي تقليدي</div>
                <div className="text-[9px] text-gray-400 mt-0.5">فرن طين وحطب</div>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
                <UtensilsCrossed className="w-6 h-6 text-[#c5a880] mx-auto mb-2" />
                <div className="font-bold text-xs text-[#201a15]">أمهر الطهاة</div>
                <div className="text-[9px] text-gray-400 mt-0.5">وصفات موروثة</div>
              </div>
            </div>
          </div>

          {/* Aesthetic Images Bento grid */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-stretch min-h-[400px]">
            {/* Main large image */}
            <div className="col-span-7 rounded-3xl overflow-hidden shadow-md relative min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop"
                alt="Woodfire Cooking"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 text-white text-xs font-bold font-serif">
                نكهة الحطب الحقيقية 🔥
              </div>
            </div>

            {/* Dual smaller images stacked */}
            <div className="col-span-5 flex flex-col gap-4">
              <div className="flex-1 rounded-3xl overflow-hidden shadow-sm relative">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop"
                  alt="Traditional spices"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden shadow-sm bg-[#201a15] p-6 border border-[#c5a880]/20 flex flex-col justify-between text-right">
                <div className="text-[#c5a880] text-3xl font-serif font-black">١٠٠٪</div>
                <div className="text-white text-xs font-bold">مكونات طازجة ومحلية يومياً، خالية تماماً من المواد الحافظة والمصنعة.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Menu Section Panel */}
      <div className="border-t border-gray-100">
        <MenuSection
          onAddToOrder={handleAddToOrder}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

      {/* 5. Special Offers section */}
      <SpecialOffersSection />

      {/* 6. Table Reservation Desk */}
      <ReservationSection />

      {/* 7. Maps Location Widget */}
      <InteractiveMap />

      {/* 8. Testimonials Section */}
      <ReviewsSection />

      {/* 9. Elegant Unified Footer */}
      <footer className="bg-[#201a15] text-[#FCFAF7] pt-16 pb-8 border-t border-[#c5a880]/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo Brand info */}
          <div className="space-y-4 text-right">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-lg border border-[#c5a880]/20">
                🍽️
              </div>
              <div>
                <span className="font-serif font-black text-lg tracking-tight text-white block">
                  سُفرة الشرق
                </span>
                <span className="text-[10px] text-[#c5a880] font-bold block leading-none">مذاق يتوارثه الأجيال</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              نحن نقدم لضيوفنا تجربة طعام شرقية غنية وأصلية، نحافظ فيها على أعلى معايير الجودة وموروث الآباء والأجداد في إكرام الضيف.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-[#c5a880] text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">قصة المطعم</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">قائمة المأكولات</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">حجز الطاولات</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-[#c5a880] text-sm">ساعات العمل والتواصل</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c5a880]" />
                يومياً: ١٢:٠٠ ظهراً - ١٢:٠٠ منتصف الليل
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a880]" />
                الهاتف: 966500000000+
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                المربع التراثي، شارع التراث الشرقي، الرياض
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Call out */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-[#c5a880] text-sm">خدمة التوصيل والطلب السريع</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              يمكنكم طلب مأكولاتكم وسنبسطها على مائدتكم وهي تفور حرارة. اطلب مباشرة عبر الواتساب.
            </p>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md focus:outline-none"
            >
              💬 راسلنا عبر الواتساب للطلب
            </a>
          </div>

        </div>

        {/* Deep copyright and signature */}
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
          © ٢٠٢٦ مطعم سفرة الشرق. كافة الحقوق محفوظة. تم تصميمه بكل حب وتجربة مستخدم فاخرة.
        </div>
      </footer>

      {/* 10. Floating Interactive Chef AI Companion */}
      <ChefSaeedAssistant />

      {/* 11. Shopping Cart Slide Out Side Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Slide drawer container */}
            <div className="absolute inset-y-0 left-0 max-w-full flex">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#FCFAF7] shadow-2xl flex flex-col justify-between border-r border-[#c5a880]/10 text-right"
              >
                {/* Header */}
                <div className="bg-[#201a15] text-[#FCFAF7] px-6 py-5 border-b border-[#c5a880]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
                    <span className="font-serif font-bold text-lg">سلة مأكولاتك</span>
                    {orderedItems.length > 0 && (
                      <span className="bg-[#c5a880] text-[#201a15] text-xs font-bold px-2 py-0.5 rounded-full font-mono">
                        {orderedItems.reduce((acc, i) => acc + i.quantity, 0)}
                      </span>
                    )}
                  </div>
                  
                  <button
                    id="close-cart-drawer"
                    onClick={() => setCartOpen(false)}
                    className="p-1.5 text-[#c5a880] hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {orderedItems.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingBag className="w-16 h-16 text-[#c5a880]/40 mx-auto mb-4" />
                      <h4 className="font-bold text-[#201a15] text-lg mb-1">سلتك فارغة تماماً</h4>
                      <p className="text-xs text-gray-400">تصفح قائمتنا الفاخرة وأضف وجباتك المفضلة وسنعدها لك بأسرع وقت.</p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          const menuEl = document.getElementById("menu");
                          if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-6 bg-[#201a15] hover:bg-[#3a3027] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all focus:outline-none"
                      >
                        استكشف قائمة الطعام
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderedItems.map((item) => (
                        <div
                          key={item.dish.id}
                          className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm"
                        >
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-[#201a15] truncate">{item.dish.name}</h4>
                            <div className="text-xs text-[#75593c] font-bold mt-1">{item.dish.price} ر.س</div>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-3.5 mt-2.5">
                              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-1.5 py-0.5">
                                <button
                                  onClick={() => handleUpdateQty(item.dish.id, -1)}
                                  className="w-6 h-6 hover:bg-white rounded flex items-center justify-center text-gray-500 hover:text-red-500 focus:outline-none"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold font-mono text-[#201a15] w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQty(item.dish.id, 1)}
                                  className="w-6 h-6 hover:bg-white rounded flex items-center justify-center text-gray-500 hover:text-green-500 focus:outline-none"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item.dish.id)}
                                className="text-xs text-red-400 hover:text-red-600 font-bold flex items-center gap-1 focus:outline-none"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Footer Drawer Action Checkout */}
                {orderedItems.length > 0 && (
                  <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-[#201a15]">المجموع الفرعي:</span>
                      <span className="font-serif font-black text-lg text-[#75593c]">{calculateTotal()} ر.س</span>
                    </div>
                    <div className="text-[10px] text-gray-400">شامل ضريبة القيمة المضافة ومستلزمات التغليف الفاخر.</div>
                    
                    <button
                      id="whatsapp-checkout-btn"
                      onClick={handleCheckoutWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md focus:outline-none cursor-pointer"
                    >
                      <span>💬 إرسال الطلب عبر الواتساب</span>
                    </button>

                    <button
                      id="clear-cart-btn"
                      onClick={handleClearCart}
                      className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                    >
                      تفريغ السلة تماماً
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Simulated Alert */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderConfirmed(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl z-10 text-center border border-[#c5a880]/30"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-serif font-bold text-[#201a15] mb-2">تم تجهيز طلبك في المطبخ!</h3>
              <p className="text-xs text-gray-500 mb-6">لقد قمنا بتوصيل طلبك لطاقم الطبخ وتوليد رقم طلب فريد.</p>

              <div className="bg-[#FCFAF7] border border-dashed border-[#c5a880]/30 p-4 rounded-xl mb-6">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">رقم الطلب لتتبع التوصيل</span>
                <span className="font-mono font-bold text-base text-[#201a15] tracking-wider block mt-1">{confCode}</span>
              </div>

              <button
                onClick={() => setOrderConfirmed(false)}
                className="w-full bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] py-3 rounded-xl font-bold transition-all focus:outline-none text-xs"
              >
                حسناً، فهمت
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
