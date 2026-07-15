import React, { useState, useEffect } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut, Car, Footprints, Bike, Compass, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StartLocation {
  id: string;
  name: string;
  distance: string;
  timeCar: string;
  timeWalk: string;
  timeBike: string;
  coordinates: { x: number; y: number };
  pathPoints: string; // SVG path points
  instructions: string[];
}

export default function InteractiveMap() {
  const [zoomScale, setZoomScale] = useState(1);
  const [selectedStart, setSelectedStart] = useState<string>("sheraton");
  const [travelMode, setTravelMode] = useState<"car" | "walk" | "bike">("car");
  const [isNavigating, setIsNavigating] = useState(false);
  const [navStep, setNavStep] = useState(0);
  const [mapMessage, setMapMessage] = useState("مطعم سفرة بانتظارك - شارع التراث الشرقي");

  const startLocations: StartLocation[] = [
    {
      id: "sheraton",
      name: "فندق الشيراتون الدولي",
      distance: "٣.٥ كم",
      timeCar: "٨ دقائق",
      timeWalk: "٣٥ دقيقة",
      timeBike: "١٥ دقيقة",
      coordinates: { x: 50, y: 80 },
      pathPoints: "M 50 80 L 120 80 L 120 180 L 220 180 L 220 220",
      instructions: [
        "انطلق شرقاً نحو شارع التراث لمسافة 1.2 كم.",
        "عند الدوار الكبير، اتجه نحو المخرج الثاني.",
        "استمر لمسافة 800 متر ثم انعطف يساراً عند إشارة برج الساعة.",
        "ستجد مطعم سفرة على يمينك، أهلاً بك!"
      ]
    },
    {
      id: "airport",
      name: "مطار الملك خالد الدولي",
      distance: "١٢ كم",
      timeCar: "١٨ دقيقة",
      timeWalk: "٢.٥ ساعة",
      timeBike: "٥٠ دقيقة",
      coordinates: { x: 450, y: 50 },
      pathPoints: "M 450 50 L 350 50 L 350 150 L 220 150 L 220 220",
      instructions: [
        "اسلك طريق المطار السريع متجهاً نحو وسط المدينة.",
        "خذ مخرج طريق الإمام الغزالي بعد 8 كم.",
        "انعطف يميناً عند المربع التراثي التاريخي.",
        "مطعم سفرة يقع مباشرة بجانب ساحة النافورة الموسيقية."
      ]
    },
    {
      id: "mall",
      name: "مجمع الأفنيوز التجاري",
      distance: "٥.٨ كم",
      timeCar: "١٢ دقيقة",
      timeWalk: "١.١ ساعة",
      timeBike: "٢٢ دقيقة",
      coordinates: { x: 400, y: 320 },
      pathPoints: "M 400 320 L 300 320 L 300 220 L 220 220",
      instructions: [
        "اخرج من البوابة الرئيسية لمجمع الأفنيوز.",
        "اتجه غرباً على جادة النخيل لمسافة 3 كم.",
        "تابع السير مستقيماً حتى تصل لتقاطع الحمراء.",
        "مطعم سفرة يظهر بوضوح بواجهته الزجاجية الفاخرة."
      ]
    }
  ];

  const currentStart = startLocations.find(l => l.id === selectedStart) || startLocations[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isNavigating) {
      setNavStep(0);
      interval = setInterval(() => {
        setNavStep((prev) => {
          if (prev >= currentStart.instructions.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isNavigating, selectedStart]);

  const handleStartNav = () => {
    setIsNavigating(true);
    setMapMessage("جاري الملاحة النشطة نحو مطعم سفرة...");
  };

  const handleStopNav = () => {
    setIsNavigating(false);
    setNavStep(0);
    setMapMessage("مطعم سفرة بانتظارك - شارع التراث الشرقي");
  };

  const getETA = () => {
    if (travelMode === "car") return currentStart.timeCar;
    if (travelMode === "walk") return currentStart.timeWalk;
    return currentStart.timeBike;
  };

  return (
    <section id="location" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#c5a880] text-sm font-bold tracking-widest uppercase mb-2 block">
          أهلاً بكم في واحتنا
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#201a15] mb-4">
          الموقع وكيفية الوصول
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          يقع مطعمنا في قلب المربع التراثي التاريخي، ويسهل الوصول إلينا من شتى معالم العاصمة.
        </p>
        <div className="w-24 h-1 bg-[#c5a880] mx-auto mt-4 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Navigation Control Panel (Left column - 5 spans) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#201a15] mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#c5a880] animate-spin-[spin_10s_linear_infinite]" />
              مخطط الطريق التفاعلي
            </h3>

            {/* Choose Starting location */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold text-gray-400 block">اختر نقطة الانطلاق:</label>
              <div className="space-y-2">
                {startLocations.map((loc) => (
                  <button
                    id={`start-loc-${loc.id}`}
                    key={loc.id}
                    onClick={() => {
                      setSelectedStart(loc.id);
                      handleStopNav();
                    }}
                    className={`w-full p-3.5 rounded-xl border text-right text-sm transition-all flex items-center justify-between cursor-pointer ${
                      selectedStart === loc.id
                        ? "bg-[#gold-50] border-[#c5a880] text-[#75593c] font-bold"
                        : "bg-white border-gray-100 hover:border-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4.5 h-4.5 text-[#c5a880]" />
                      {loc.name}
                    </span>
                    <span className="text-xs text-gray-400 font-mono font-medium">{loc.distance}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Mode selector */}
            <div className="space-y-3 mb-8">
              <label className="text-xs font-bold text-gray-400 block">وسيلة النقل:</label>
              <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                {[
                  { id: "car", icon: Car, label: "سيارة" },
                  { id: "walk", icon: Footprints, label: "مشي" },
                  { id: "bike", icon: Bike, label: "دراجة" },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      id={`mode-btn-${mode.id}`}
                      key={mode.id}
                      onClick={() => {
                        setTravelMode(mode.id as any);
                        handleStopNav();
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        travelMode === mode.id
                          ? "bg-white text-[#201a15] shadow-sm border border-gray-100 font-bold"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Action Area */}
          <div className="space-y-4">
            <div className="p-4 bg-[#FCFAF7] rounded-2xl border border-[#c5a880]/10 flex justify-between items-center text-sm">
              <div>
                <div className="text-xs text-gray-400">الوقت المتوقع للوصول</div>
                <div className="font-serif font-bold text-lg text-[#201a15] mt-0.5">{getETA()}</div>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">المسافة</div>
                <div className="font-mono font-bold text-[#75593c] text-lg mt-0.5">{currentStart.distance}</div>
              </div>
            </div>

            {!isNavigating ? (
              <button
                id="start-nav-btn"
                onClick={handleStartNav}
                className="w-full bg-[#201a15] hover:bg-[#3a3027] text-white py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none text-sm"
              >
                <Navigation className="w-4.5 h-4.5 text-[#c5a880]" />
                البدء بالملاحة الحية
              </button>
            ) : (
              <div className="space-y-3">
                {/* Live navigation instruction card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={navStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-800 text-sm"
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                      الخطوة {navStep + 1} من {currentStart.instructions.length}:
                    </div>
                    <p className="leading-relaxed font-medium">{currentStart.instructions[navStep]}</p>
                  </motion.div>
                </AnimatePresence>

                <button
                  id="stop-nav-btn"
                  onClick={handleStopNav}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 py-3 rounded-xl font-bold transition-all text-xs focus:outline-none"
                >
                  إنهاء الملاحة
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Vector Map Simulation Canvas (Right column - 7 spans) */}
        <div className="lg:col-span-7 bg-[#FCFAF7] border border-gray-100 rounded-3xl shadow-xl overflow-hidden relative min-h-[400px] flex flex-col justify-between">
          
          {/* Map Header Status bar */}
          <div className="bg-white/80 backdrop-blur-sm px-4 py-3 border-b border-gray-100 flex items-center justify-between z-10">
            <span className="text-xs font-bold text-[#201a15] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {mapMessage}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setZoomScale(Math.min(1.5, zoomScale + 0.1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#201a15] shadow-sm transition-all focus:outline-none"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomScale(Math.max(0.7, zoomScale - 0.1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#201a15] shadow-sm transition-all focus:outline-none"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-[#F4EFEA] overflow-hidden flex items-center justify-center select-none">
            {/* Simulated streets / paths layout SVG */}
            <motion.svg
              animate={{ scale: zoomScale }}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 500 400"
            >
              {/* Rivers / Lakes */}
              <path d="M 0 350 Q 150 320 200 400 L 0 400 Z" fill="#D2E8F9" opacity="0.8" />
              <circle cx="220" cy="220" r="45" fill="#C4E1F6" opacity="0.6" /> {/* Fountain Pond */}

              {/* Grid Roads */}
              <path d="M 50 0 L 50 400 M 120 0 L 120 400 M 220 0 L 220 400 M 320 0 L 320 400 M 420 0 L 420 400" stroke="#E6DFD5" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 0 50 L 500 50 M 0 150 L 500 150 M 0 250 L 500 250 M 0 350 L 500 350" stroke="#E6DFD5" strokeWidth="18" fill="none" strokeLinecap="round" />

              <path d="M 50 0 L 50 400 M 120 0 L 120 400 M 220 0 L 220 400 M 320 0 L 320 400 M 420 0 L 420 400" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 0 50 L 500 50 M 0 150 L 500 150 M 0 250 L 500 250 M 0 350 L 500 350" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" />

              {/* Market Blocks / Buildings (Aesthetic rectangles) */}
              <rect x="75" y="75" width="30" height="50" rx="4" fill="#DFD6C9" />
              <rect x="150" y="75" width="45" height="50" rx="4" fill="#DFD6C9" />
              <rect x="250" y="75" width="45" height="50" rx="4" fill="#DFD6C9" />
              <rect x="75" y="175" width="30" height="50" rx="4" fill="#DFD6C9" />
              
              <rect x="260" y="175" width="40" height="40" rx="4" fill="#DFD6C9" />

              <rect x="350" y="180" width="45" height="50" rx="4" fill="#DFD6C9" />
              <rect x="350" y="75" width="40" height="50" rx="4" fill="#DFD6C9" />

              {/* Fountain center decoration */}
              <circle cx="220" cy="220" r="15" fill="#3D82C4" />
              <circle cx="220" cy="220" r="5" fill="#FFFFFF" />

              {/* Landmark text labels */}
              <text x="220" y="195" textAnchor="middle" fill="#201a15" fontSize="10" fontWeight="bold">ساحة النافورة</text>
              <text x="110" y="110" textAnchor="middle" fill="#75593c" fontSize="8">سوق المباركية</text>
              <text x="375" y="110" textAnchor="middle" fill="#75593c" fontSize="8">برج الفهد</text>

              {/* Interactive Navigation Line Drawing */}
              {isNavigating && (
                <motion.path
                  d={currentStart.pathPoints}
                  stroke="#c5a880"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="10, 8"
                  animate={{ strokeDashoffset: [-100, 0] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
                />
              )}

              {/* Start Pin Marker */}
              <g transform={`translate(${currentStart.coordinates.x}, ${currentStart.coordinates.y})`}>
                <circle cx="0" cy="0" r="8" fill="#75593c" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="5" fill="#75593c" />
                <text x="0" y="-12" textAnchor="middle" fill="#75593c" fontSize="8" fontWeight="bold">
                  {currentStart.name.substring(0, 8)}...
                </text>
              </g>

              {/* Sofra Restaurant Pin Marker (The Target - 220, 220) */}
              <g transform="translate(220, 220)">
                <circle cx="0" cy="0" r="15" fill="#201a15" opacity="0.2" className="animate-pulse" />
                <path d="M 0 -18 C -6 -18 -10 -14 -10 -8 C -10 2 0 10 0 10 C 0 10 10 2 10 -8 C 10 -14 6 -18 0 -18 Z" fill="#201a15" stroke="#c5a880" strokeWidth="1.5" />
                <circle cx="0" cy="-8" r="4.5" fill="#c5a880" />
              </g>
            </motion.svg>

            {/* Sofra Floating Tag on top of Map */}
            <div className="absolute top-[52%] left-[44%] -translate-x-1/2 -translate-y-1/2 bg-[#201a15] text-[#c5a880] border border-[#c5a880]/30 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 text-xs pointer-events-none">
              <span>🍽️</span>
              <span className="font-serif font-bold">مطعم سفرة</span>
            </div>
          </div>

          {/* Quick Real Address footer card */}
          <div className="bg-white p-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-bold text-[#201a15]">العنوان بالكامل:</div>
              <div className="text-gray-500 mt-1">المربع التراثي التاريخي، بجوار ساحة النافورة، الرياض</div>
            </div>
            <div>
              <div className="font-bold text-[#201a15]">ساعات العمل:</div>
              <div className="text-gray-500 mt-1">يومياً من الساعة ١٢:٠٠ ظهراً حتى ١٢:٠٠ منتصف الليل</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
