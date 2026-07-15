import { Dish, Review } from "./types";

// Import local images so Vite can bundle them correctly for production
import kabsaImg from "./assets/images/kabsa_dish_1783594935077.jpg";
import lambImg from "./assets/images/lamb_dish_1783594950477.jpg";
import hummusImg from "./assets/images/hummus_beiruti_meat_1783612383802.jpg";
import grapeLeavesImg from "./assets/images/stuffed_grape_leaves_1783612399505.jpg";
import kibbehImg from "./assets/images/kibbeh_shamiya_appetizer_1783612158562.jpg";
import knafehImg from "./assets/images/knafeh_dessert_1783594963203.jpg";
import umAliImg from "./assets/images/um_ali_dessert_1783601224762.jpg";
import baklavaImg from "./assets/images/baklava_dessert_1783601246342.jpg";

export const INITIAL_DISHES: Dish[] = [
  {
    id: "1",
    name: "كبسة دجاج ملكية",
    description: "أرز بسمتي طويل الحبة مطبوخ بخلطة بهارات سفرة الخاصة، يعلوه دجاج مشوي متبل بعناية، ومزين باللوز المقرمش والصنوبر والزبيب.",
    price: 65,
    category: "main",
    image: kabsaImg,
    isBestSeller: true,
    calories: 720,
    prepTime: "٢٥ دقيقة",
    dietaryTags: ["خالي من الجلوتين"]
  },
  {
    id: "2",
    name: "كتف خروف مشوي بالفرن",
    description: "كتف خروف محلي مطهو ببطء على نار هادئة لعدة ساعات حتى تمام النضج والنعومة، يقدم مع أرز شرقي فاخر متبل ومزين بالمكسرات المحمصة.",
    price: 120,
    category: "main",
    image: lambImg,
    isBestSeller: true,
    calories: 950,
    prepTime: "٤٠ دقيقة",
    dietaryTags: ["كيتو", "خالي من الجلوتين"]
  },
  {
    id: "3",
    name: "برياني لحم فاخر",
    description: "قطع لحم غنم طرية مطبوخة في طبقات من الأرز البسمتي المعطر بالزعفران، الهيل، وماء الورد، مع الكزبرة الطازجة والنعناع واللحم المدخن.",
    price: 75,
    category: "main",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    isBestSeller: false,
    calories: 840,
    prepTime: "٣٠ دقيقة",
    dietaryTags: []
  },
  {
    id: "4",
    name: "سمك قاروص مشوي بالملح والأعشاب",
    description: "سمكة قاروص طازجة متبلة بزيت الزيتون البكر، الثوم، الأعشاب البرية والليمون، مشوية ببطء على الفحم لتظل طرية وغنية بالنكهة.",
    price: 95,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    isBestSeller: false,
    calories: 480,
    prepTime: "٢٠ دقيقة",
    dietaryTags: ["كيتو", "خالي من الجلوتين"]
  },
  {
    id: "5",
    name: "حمص بيروتي بالصنوبر واللحم",
    description: "حمص ناعم ومخملي محضر بالطريقة البيروتية التقليدية بخلطة الطحينة والليمون، مغطى بزيت الزيتون الفاخر، الصنوبر الذهبي واللحم المفروم المقلي.",
    price: 25,
    category: "appetizer",
    image: hummusImg,
    isBestSeller: true,
    calories: 280,
    prepTime: "١٠ دقائق",
    dietaryTags: ["نباتي", "خالي من الجلوتين"]
  },
  {
    id: "6",
    name: "ورق عنب بالزيت والليمون",
    description: "ورق عنب طازج محشو بالأرز المصري الفاخر، الطماطم، النعناع، والبقدونس المفروم، مطهو بعناية بدبس الرمان الفاخر وزيت الزيتون الأصلي.",
    price: 28,
    category: "appetizer",
    image: grapeLeavesImg,
    isBestSeller: false,
    calories: 190,
    prepTime: "١٢ دقيقة",
    dietaryTags: ["نباتي"]
  },
  {
    id: "7",
    name: "كبة شامية مقرمشة",
    description: "كبة مقلية بالبرغل الفاخر محشوة باللحم المفروم البلدي والبصل والصنوبر، ومتبلة ببهارات الشام السبعة الخاصة.",
    price: 30,
    category: "appetizer",
    image: kibbehImg,
    isBestSeller: false,
    calories: 340,
    prepTime: "١٥ دقيقة",
    dietaryTags: []
  },
  {
    id: "8",
    name: "سلطة فتوش بدبس الرمان",
    description: "أوراق الخس الطازجة مع الخيار، الطماطم، الفجل، والنعناع، مخلوطة بصوص زيت الزيتون والليمون وسماق المدينة، يعلوها خبز مقرمش ودبس الرمان.",
    price: 24,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    isBestSeller: false,
    calories: 150,
    prepTime: "١٠ دقائق",
    dietaryTags: ["نباتي"]
  },
  {
    id: "9",
    name: "كنافة نابلسية بالجبن الفاخر",
    description: "كنافة نابلسية ذهبية ومقرمشة محشوة بجبن العكاوي الغني المعتدل الملوحة، تسقى بالقطر الساخن وتزين بفتات الفستق الحلبي الأخضر المميز.",
    price: 35,
    category: "dessert",
    image: knafehImg,
    isBestSeller: true,
    calories: 520,
    prepTime: "١٥ دقيقة",
    dietaryTags: []
  },
  {
    id: "10",
    name: "أم علي بالمكسرات والقشطة",
    description: "رقائق ميل فوي الهشة المخبوزة بالحليب الطازج المكثف، مغطاة بالقشطة البلدي الطازجة وجوز الهند والزبيب واللوز المقشور والفستق.",
    price: 30,
    category: "dessert",
    image: umAliImg,
    isBestSeller: false,
    calories: 480,
    prepTime: "١٥ دقيقة",
    dietaryTags: []
  },
  {
    id: "11",
    name: "بقلاوة بالفستق الحلبي",
    description: "طبقات رقيقة جداً من عجين الفيلو المورق والمقرمش، محشو بالفستق الحلبي المطحون الفاخر ومسقي بالقطر العطري بماء الزهر.",
    price: 32,
    category: "dessert",
    image: baklavaImg,
    isBestSeller: false,
    calories: 420,
    prepTime: "١٠ دقائق",
    dietaryTags: ["نباتي"]
  },
  {
    id: "12",
    name: "عصير ليمون بالنعناع المنعش",
    description: "عصير الليمون الأخضر الطازج المعصور بارداً والمخلوط مع أوراق النعناع البلدي النضرة ومكعبات الثلج لتقديم أفضل تجربة انتعاش.",
    price: 18,
    category: "beverage",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    isBestSeller: true,
    calories: 110,
    prepTime: "٥ دقائق",
    dietaryTags: ["نباتي", "خالي من الجلوتين"]
  },
  {
    id: "13",
    name: "قهوة عربية بالهيل والزعفران",
    description: "قهوة شقراء ممتازة محضرة من أجود أنواع البن الهرري، تغلى ببطء وتُعطر بالهيل والزعفران الفاخر، تقدم في دلة عربية تقليدية.",
    price: 15,
    category: "beverage",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    isBestSeller: false,
    calories: 5,
    prepTime: "٨ دقائق",
    dietaryTags: ["نباتي", "كيتو", "خالي من الجلوتين"]
  },
  {
    id: "14",
    name: "شاي مغربي بالنعناع",
    description: "أوراق الشاي الأخضر والنعناع الفلفلي الطازج يطهى في براد معدني تقليدي مع سكر القالب، يصب من الأعلى ليصنع رغوة مميزة.",
    price: 15,
    category: "beverage",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    isBestSeller: false,
    calories: 40,
    prepTime: "٧ دقائق",
    dietaryTags: ["نباتي", "خالي من الجلوتين"]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    author: "أحمد بن عبد الله",
    rating: 5,
    comment: "من أفضل المطاعم التي تقدم الكبسة واللحوم المشوية ببطء. الخدمة ممتازة، والأكل يأتي ساخناً ومليئاً بالنكهات الأصيلة. شكر خاص لطاقم العمل اللطيف.",
    date: "٢ يوليو ٢٠٢٦",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "2",
    author: "نورة القحطاني",
    rating: 5,
    comment: "المكان أنيق جداً وراقي، الديكورات تعبر عن الثقافة الشرقية بروح عصرية. الكنافة النابلسية خيالية والجبن مطاطي ولذيذ جداً، والقهوة العربية لا تُفوت!",
    date: "٢٥ يونيو ٢٠٢٦",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "3",
    author: "محمد الشمري",
    rating: 4,
    comment: "جربت كتف الخروف وكان ممتازاً جداً ودايب، اللحم ينفصل عن العظم بسهولة. حمص بيروتي بالصنوبر رائع وموزون. سأكرر الزيارة بالتأكيد مع العائلة.",
    date: "١٨ يونيو ٢٠٢٦",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

export const SPECIAL_OFFERS = [
  {
    id: "o1",
    title: "عرض الغداء الملكي العائلي",
    description: "كتف خروف مشوي كامل يقدم مع أرز شرقي فاخر لـ ٤ أشخاص، حمص بيروتي، ورق عنب، فتوش، وصحن كنافة عائلي كبير مع المشروبات.",
    discount: "وفر ٢٠٪",
    originalPrice: 320,
    newPrice: 250,
    badge: "الأكثر طلباً",
    endsInHours: 6,
  },
  {
    id: "o2",
    title: "عرض الفطور الشرقي المبارك",
    description: "طبق فول بلدي بالزيت الحار، شكشوكة بالبيض العضوي، لبنة بالنعناع وزيت الزيتون، حمص، جبن فيتا بالعسل والمكسرات، خبز طازج مع دلة شاي بالنعناع مجانية.",
    discount: "فقط ٥٥ ريال",
    originalPrice: 85,
    newPrice: 55,
    badge: "كل صباح",
    endsInHours: 12,
  }
];
