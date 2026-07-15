import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function ChefSaeedAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "chef",
      text: "يا ميت أهلاً وسهلاً بك في مطعم سفرة! أنا الشيف سعيد، مساعدك الشخصي ومستشارك في عالم الطهي والمذاق الأصيل. 👨‍🍳✨\n\nكيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الأطباق الأكثر شعبية، المكونات، أو طلب توصيات لوجبة تناسب ذوقك أو حميتك الغذائية!",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "أقترح عليّ وجبة عشاء كيتو 🥩",
    "ما هي الأطباق الأكثر مبيعاً؟ 🔥",
    "هل لديكم حلى خالي من الجلوتين؟ 🍮",
    "ما هي مكونات كبسة الدجاج؟ 🍚",
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Map history to format requested by backend
      const historyPayload = messages.slice(1).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        text: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("فشل الاتصال بالشيف سعيد.");
      }

      const data = await response.json();
      
      const chefMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "chef",
        text: data.reply || "عذراً يا صديقي، عجزت عن التعبير لثوانٍ. ماذا كنت تقول؟",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, chefMsg]);
    } catch (err: any) {
      console.error(err);
      setError("حدث خطأ أثناء التواصل مع الشيف. يبدو أنه منشغل جداً في تحضير وليمة!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          id="chef-assistant-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#201a15] hover:bg-[#3a3027] text-[#FCFAF7] border border-[#c5a880]/30 hover:border-[#c5a880] p-4 rounded-full shadow-2xl transition-all duration-300 group focus:outline-none"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-[#c5a880] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a880]"></span>
            </span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-32 transition-all duration-500 ease-in-out whitespace-nowrap font-medium text-sm">
            اسأل الشيف سعيد
          </span>
        </button>
      </div>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chef-assistant-drawer"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-[#FCFAF7] border border-[#c5a880]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#201a15] p-4 text-[#FCFAF7] border-b border-[#c5a880]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3a3027] border border-[#c5a880] flex items-center justify-center text-xl">
                  👨‍🍳
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#FCFAF7] flex items-center gap-1.5">
                    الشيف سعيد
                    <span className="flex items-center gap-1 bg-[#c5a880]/20 text-[#c5a880] px-1.5 py-0.5 rounded text-[10px] font-normal font-mono">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      ذكاء اصطناعي
                    </span>
                  </h3>
                  <p className="text-xs text-[#c5a880]/80">مستشارك لطهي سفرة الملوكي</p>
                </div>
              </div>
              <button
                id="close-chef-assistant"
                onClick={() => setIsOpen(false)}
                className="text-[#c5a880]/80 hover:text-[#FCFAF7] hover:bg-[#3a3027] p-2 rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#gold-50]/20 to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${
                    msg.sender === "user" ? "mr-auto flex-row-reverse" : "ml-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs ${
                      msg.sender === "user"
                        ? "bg-[#c5a880] text-[#201a15] border-[#c5a880]/20"
                        : "bg-[#201a15] text-[#FCFAF7] border-[#c5a880]/30"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#c5a880]" />}
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#c5a880] text-[#201a15] rounded-tl-none font-medium"
                          : "bg-white text-[#2C2621] border border-[#c5a880]/10 rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-[10px] text-gray-400 font-mono ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 max-w-[85%] ml-auto">
                  <div className="w-8 h-8 rounded-full bg-[#201a15] border border-[#c5a880]/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#c5a880] animate-pulse" />
                  </div>
                  <div className="p-4 bg-white border border-[#c5a880]/10 rounded-2xl rounded-tr-none shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 bg-[#c5a880] rounded-full animate-bounce"></span>
                      <span className="w-2.5 h-2.5 bg-[#c5a880] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2.5 h-2.5 bg-[#c5a880] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex gap-2 items-center bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Prompts (Horizontal Scrollable) */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-[#c5a880]/10 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.substring(0, sug.length - 2))}
                    className="inline-block text-xs text-[#201a15] bg-white border border-[#c5a880]/20 hover:border-[#c5a880] px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap hover:bg-[#gold-50]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white border-t border-[#c5a880]/20 flex gap-2 items-center"
            >
              <input
                id="chef-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اسأل الشيف عن مكونات طبق، أو حمية غذائية..."
                className="flex-1 bg-[#FCFAF7] border border-gray-200 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                id="send-chef-message"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-[#201a15] hover:bg-[#3a3027] text-white disabled:bg-gray-200 disabled:text-gray-400 p-2.5 rounded-xl transition-colors shrink-0 focus:outline-none"
              >
                <Send className="w-5 h-5 -rotate-90 transform" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
