import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Helper to get natural-language Arabic fallback responses when the Gemini API is down/overloaded
function getChefSaeedFallbackReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("كيتو") || msg.includes("keto") || msg.includes("حمية") || msg.includes("دايت")) {
    return "يا ميت أهلاً وسهلاً بك! بالنسبة للحمية الكيتونية، أنصحك بشدة بطلب 'كتف خروف مشوي بالفرن' (120 ريال) المطهو ببطء والمبهر ببهاراتنا الخاصة، أو 'سمك قاروص مشوي بالملح' (95 ريال) مع 'سلطة فتوش بدبس الرمان' بدون خبز مقرمش. وجبة غنية بالدهون المفيدة والبروتين وصفر كربوهيدرات! بالهناء والشفاء! 🥩🥗";
  }
  
  if (msg.includes("مبيع") || msg.includes("شعبية") || msg.includes("أكثر") || msg.includes("أفضل") || msg.includes("مفضل") || msg.includes("ينصح")) {
    return "أهلاً بك يا غالي! الأطباق الأكثر طلباً وشهرة في 'سفرة' هي:\n" +
           "1. 🍚 كبسة دجاج ملكية (65 ريال) - طعمها لا يُنسى مع الأرز البسمتي الفاخر والمطهي على الحطب.\n" +
           "2. 🥩 كتف خروف مشوي بالفرن (120 ريال) - يذوب في الفم طراوة وغني بالنكهات.\n" +
           "3. 🍮 كنافة نابلسية بالجبن الفاخر (35 ريال) - نقوم بتحضيرها بالجبن البلدي المحلى يدوياً.\n\nشرفنا بزيارتك أو اطلبها الآن لتذوق السحر بنفسك!";
  }
  
  if (msg.includes("حلى") || msg.includes("حلويات") || msg.includes("جلوتين") || msg.includes("gluten") || msg.includes("أم علي") || msg.includes("بقلاوة")) {
    return "يا هلا بضيافتنا الحلوة! لدينا تشكيلة حلويات تسر الخاطر:\n" +
           "- 🍮 أم علي بالمكسرات والقشطة البلدي (30 ريال) - وهي الآن محدثة بصورتها الحقيقية والشهية في الموقع!\n" +
           "- 🥮 بقلاوة بالفستق الحلبي الفاخر (32 ريال) - مقرمشة ومسقية بقطر ماء الزهر الأصيل.\n" +
           "- 🧀 كنافة نابلسية دافئة بالجبن الفاخر (35 ريال).\n\nبخصوص خيارات الجلوتين، الكنافة تحتوي على دقيق، لكن يمكننا تحضير حلى أم علي خاص خالي من الجلوتين عند الطلب المسبق! 👨‍🍳✨";
  }
  
  if (msg.includes("مكون") || msg.includes("طريقة") || msg.includes("كبسة")) {
    return "أهلاً بك يا محب الأسرار! كبسة الدجاج الملكية في 'سفرة' تُحضر من:\n" +
           "- دجاج بلدي طازج متبل بخلطتنا السرية المكونة من لومي، قرفة، هيل، وقرنفل.\n" +
           "- أرز بسمتي طويل الحبة ذو جودة ملوكية.\n" +
           "- سمن بلدي طبيعي ومطبوخ على نار هادئة على الحطب.\n" +
           "- تُزين بالمكسرات المقرمشة (لوز وفستق حلبي) وزبيب ذهبي.\n\nالنكهة مدخنة ومميزة بفضل طهيها على الحطب البري! 🔥🍚";
  }

  if (msg.includes("موقع") || msg.includes("عنوان") || msg.includes("أين") || msg.includes("طريق") || msg.includes("وصل")) {
    return "يا ميت أهلاً بك! يقع مطعمنا في قلب 'المربع التراثي التاريخي'، بجانب ساحة النافورة الموسيقية في شارع التراث الشرقي بالرياض. يمكنك استخدام مخطط الطريق التفاعلي الموجود في صفحة الموقع لتحديد نقطة انطلاقك وسيرشدك فوراً بالخطوات الحية! بانتظار تشريفك! 🗺️📍";
  }

  if (msg.includes("حجز") || msg.includes("طاولة") || msg.includes("اتصال") || msg.includes("رقم")) {
    return "تشريفك لنا يسعدنا جداً! لحجز طاولتك الفاخرة، يمكنك استخدام نموذج 'حجز الطاولات' المتوفر مباشرة على الموقع، أو الاتصال بنا هاتفياً على الرقم: 966500000000+ وسيقوم فريق الضيافة بترتيب كل شيء لك ولضيوفك الكرام. 📞✨";
  }

  return "يا ميت أهلاً وسهلاً بك في 'سفرة' مع الشيف سعيد! 👨‍🍳✨\n" +
         "المطبخ مزدحم جداً بالطلبيات والولائم الفاخرة اليوم، لكني هنا دائماً لخدمتك! يمكنك سؤالي عن أطباقنا (كبسة الدجاج الملكية، كتف الخروف المشوي)، أو حلوياتنا الشهية (أم علي والبقلاوة)، أو تقديم توصيات مناسبة لحميتك الغذائية وسأجيبك فوراً!";
}

// Chef Saeed AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "الرجاء كتابة رسالة." });
  }

  // Define Persona & System Instructions
  const systemInstruction = 
    "أنت 'الشيف سعيد'، المساعد الذكي والمضيف الودود لمطعم 'سفرة'. " +
    "ترحب بالعملاء بأسلوب شرقي دافئ ومهذب (مثل: 'أهلاً بك في سفرة'، 'يا ميت أهلاً وسهلاً'، 'شرفت بحضورك'). " +
    "تساعد العملاء على اختيار الوجبات المثالية من قائمة مطعم سفرة التي تشمل: " +
    "1. أطباق رئيسية: كبسة دجاج ملكية (65 ريال)، كتف خروف مشوي بالفرن (120 ريال)، برياني لحم فاخر (75 ريال)، سمك قاروص مشوي بالملح والأعشاب (95 ريال). " +
    "2. مقبلات: حمص بيروتي بالصنوبر (25 ريال)، ورق عنب بالزيت والليمون (28 ريال)، كبة شامية مقرمشة (30 ريال)، سلطة فتوش بدبس الرمان (24 ريال). " +
    "3. حلويات: كنافة نابلسية بالجبن الفاخر (35 ريال)، أم علي بالمكسرات والقشطة (30 ريال)، بقلاوة بالفستق الحلبي (32 ريال). " +
    "4. مشروبات: عصير ليمون بالنعناع المنعش (18 ريال)، قهوة عربية بالهيل (15 ريال)، شاي مغربي بالنعناع (15 ريال). " +
    "تستطيع تقديم اقتراحات وتوصيات غذائية تناسب الحميات المختلفة (كيتو، نباتي، خالي من الجلوتين) من القائمة أو تعديلات عليها. " +
    "أجب باختصار وبطريقة مشوقة وجذابة تدفع العميل لطلب الطعام وتجربته. تحدث باللغة العربية الفصحى أو بلهجة شامية/خليجية بيضاء محببة.";

  const formattedHistory = (history || []).map((chat: any) => ({
    role: chat.role === "user" ? "user" : "model",
    parts: [{ text: chat.text }],
  }));

  // Primary attempt: try gemini-3.5-flash
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    if (response && response.text) {
      return res.json({ reply: response.text });
    }
  } catch (primaryError: any) {
    console.warn("Primary model (gemini-3.5-flash) failed, trying secondary fallback model...", primaryError.message);
    
    // Secondary attempt: try gemini-flash-latest
    try {
      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        return res.json({ reply: response.text });
      }
    } catch (secondaryError: any) {
      console.error("Secondary fallback model also failed, serving custom Chef Saeed rule-based reply.", secondaryError.message);
    }
  }

  // Safe Rule-based fallback if all API calls failed due to high demand (503)
  const fallbackReply = getChefSaeedFallbackReply(message);
  return res.json({ reply: fallbackReply });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Setup Vite Dev server or Serve build static assets
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

bootstrap();
