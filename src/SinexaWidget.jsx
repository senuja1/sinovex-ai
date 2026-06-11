import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUp, ChevronDown, Check } from "lucide-react";

const countries = [
  { code: "LK", prefix: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "US", prefix: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", prefix: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "IN", prefix: "+91", flag: "🇮🇳", name: "India" },
  { code: "AU", prefix: "+61", flag: "🇦🇺", name: "Australia" },
];

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8787"
    : "https://sinovexai.com");

export default function SinexaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(() => {
    const saved = localStorage.getItem("sinexa_started_chat");
    return saved === "true";
  });
  const [leadInfo, setLeadInfo] = useState(() => {
    const saved = localStorage.getItem("sinexa_lead_info");
    return saved ? JSON.parse(saved) : { name: "", phone: "", prefix: "+94", country: "LK" };
  });

  const [activeCountry, setActiveCountry] = useState(() => {
    return countries.find((c) => c.code === leadInfo.country) || countries[0];
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const countryDropdownRef = useRef(null);

  // Load saved chat history from session state
  useEffect(() => {
    if (hasStartedChat && leadInfo.name) {
      const savedHistory = localStorage.getItem("sinexa_chat_history");
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      } else {
        const welcome = {
          id: "welcome",
          role: "assistant",
          text: `Hi **${leadInfo.name}**! 👋 I'm **Sinexa**, your AI assistant.\n\nThank you for sharing your details! I can guide you through our **AI WhatsApp bots**, **Website sales chatbots**, **AI Voice systems**, and **Business automations**.\n\nHow can I help you grow your business today? ✨`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([welcome]);
        localStorage.setItem("sinexa_chat_history", JSON.stringify([welcome]));
      }
    }
  }, [hasStartedChat, leadInfo.name]);

  // Save messages to local storage whenever history changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("sinexa_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle closing country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (c) => {
    setActiveCountry(c);
    setLeadInfo((prev) => ({ ...prev, prefix: c.prefix, country: c.code }));
    setIsCountryOpen(false);
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (!leadInfo.name.trim() || leadInfo.phone.trim().length < 9 || !agreed) return;

    localStorage.setItem("sinexa_started_chat", "true");
    localStorage.setItem("sinexa_lead_info", JSON.stringify(leadInfo));
    setHasStartedChat(true);
  };

  const localReply = (text) => {
    const msg = text.toLowerCase();
    const name = leadInfo.name;
    const sinhala = /[\u0D80-\u0DFF]/.test(text) || msg.includes("kohomada");

    if (/(hi|hello|hey|ayubowan|ආයුබෝවන්)/.test(msg)) {
      return sinhala
        ? `Kohomada ${name} 😊 මම Sinexa. Sinovex AI bots, packages, pricing ගැන විස්තර කියන්න පුළුවන්.`
        : `Hi ${name}! 👋 I'm Sinexa, your website AI assistant. I can explain our custom AI products, pricing packages, or transition you to a human agent. What would you like to build?`;
    }
    if (/(price|pricing|cost|package|මිල|ගාන|aduma)/.test(msg)) {
      return sinhala
        ? `Pricing රඳා පවතින්නේ ඔබේ අවශ්‍යතා මතයි 😊 Free live demo එකක් book කරන්න අපේ WhatsApp එකට message කරන්න: 070 6857171.`
        : `Pricing for Sinovex AI automation suites depends on integrations and features. You can book a free demo/consultation by contacting us on WhatsApp (070 6857171) or viewing our pricing page!`;
    }
    if (/(human|agent|call|whatsapp|contact|මනුස්ස|agent)/.test(msg)) {
      return sinhala
        ? `ඔබට අපේ team එක සමඟ WhatsApp ඔස්සේ සම්බන්ධ විය හැක: https://wa.me/94706857171`
        : `Sure! You can instantly start a conversation with a human representative on WhatsApp here: https://wa.me/94706857171`;
    }
    return sinhala
      ? `මට තේරුණා ${name} 😊 ඒ ගැන තව විස්තර ටිකක් කියන්න පුළුවන්ද? නැතහොත් අපේ WhatsApp support එකෙන් විමසන්න.`
      : `I understand! 😊 That sounds interesting. Since I am in local offline mode, for detailed answers or to book a free setup, please message us on WhatsApp (070 6857171) or email sinovexai@outlook.com!`;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    const userMsg = {
      id: `msg-${Date.now()}`,
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/api/live-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demoType: "website",
          message: text,
          businessInfo: `Customer Details:\n- Name: ${leadInfo.name}\n- Phone: ${leadInfo.prefix} ${leadInfo.phone}\n\nYou are Sinexa, Sinovex AI's smart website agent. Always greet the user by name (${leadInfo.name}) and reply in Sinhala/Singlish if they write in it. Keep replies helpful and direct them to WhatsApp (070 6857171) for custom bookings.`,
          history: newMessages.slice(-10).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const replyText = response.ok && data.reply ? data.reply : localReply(text);

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      console.error("Sinexa Chat failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          text: localReply(text),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const parseTextBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderBubbleContent = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i} className="block min-h-[1.2em]">
        {parseTextBold(line)}
      </span>
    ));
  };

  const isFormValid = leadInfo.name.trim().length > 1 && leadInfo.phone.trim().length >= 9 && agreed;

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans antialiased text-foreground">
      
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden relative cursor-pointer group"
      >
        <motion.div
          animate={isOpen ? { rotate: 90, scale: 0 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <img
            src="/sinexa_avatar.png"
            alt="Sinexa Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = "none";
            }}
          />
          {/* Active Status Ring */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </motion.div>

        <motion.div
          initial={{ rotate: -90, scale: 0 }}
          animate={isOpen ? { rotate: 0, scale: 1 } : { rotate: -90, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute text-neutral-600"
        >
          <X className="h-6 w-6" />
        </motion.div>
      </button>

      {/* Slide-out Widget Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] h-[550px] rounded-[2rem] bg-surface border border-border shadow-2xl overflow-hidden flex flex-col z-[1000] transition-colors duration-200"
          >
            
            {/* ─── Widget Header ─── */}
            <div className="relative flex items-center gap-3 p-4 border-b border-border bg-surface shrink-0 z-20">
              <div className="relative w-10 h-10 rounded-full border border-border overflow-hidden">
                <img src="/sinexa_avatar.png" alt="Sinexa" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Sinexa</p>
                <p className="text-[10px] text-muted font-medium">online • sales assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-accent-bg text-muted hover:bg-card-hover hover:text-foreground transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ─── Widget Body ─── */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-surface">
              
              {!hasStartedChat ? (
                /* Onboarding Lead-Capture Form */
                <form
                  onSubmit={handleStartChat}
                  className="flex-1 flex flex-col justify-between p-6 overflow-y-auto"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 rounded-full border-2 border-white shadow-lg overflow-hidden mb-3">
                      <img src="/sinexa_avatar.png" alt="Sinexa" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0.5 right-0.5 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-foreground">
                      Hi, I'm <span className="text-blue-500 font-extrabold">Sinexa</span>
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted px-4">
                      Your intelligent AI assistant. Share your details to start our conversation!
                    </p>
                  </div>

                  {/* Form Inputs */}
                  <div className="my-6 space-y-4 text-left">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-foreground block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-accent-bg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors placeholder:text-muted/60"
                      />
                    </div>

                    {/* Mobile Number Field */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-foreground block">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        {/* Custom Prefix Selector */}
                        <div ref={countryDropdownRef} className="relative">
                          <button
                            type="button"
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            className="h-full flex items-center justify-between gap-1.5 rounded-xl border border-border bg-accent-bg px-3 text-sm text-foreground font-semibold hover:bg-card-hover transition cursor-pointer select-none"
                          >
                            <span>{activeCountry.flag} {activeCountry.prefix}</span>
                            <ChevronDown className="h-3 w-3 text-muted" />
                          </button>

                          <AnimatePresence>
                            {isCountryOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-12 left-0 w-[160px] rounded-xl border border-border bg-surface shadow-2xl p-1 z-50 overflow-hidden"
                              >
                                {countries.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(c)}
                                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-foreground hover:bg-card-hover transition cursor-pointer"
                                  >
                                    <span>{c.flag}</span>
                                    <span className="font-semibold">{c.prefix}</span>
                                    <span className="text-[10px] text-muted truncate ml-auto">{c.name}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Phone Number Input */}
                        <input
                          type="tel"
                          required
                          placeholder="7XXXXXXXX"
                          value={leadInfo.phone}
                          onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value.replace(/\D/g, "") })}
                          className="flex-1 rounded-xl border border-border bg-accent-bg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors placeholder:text-muted/60"
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none pt-2">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 rounded border-border text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-[11px] leading-relaxed text-muted">
                        I agree to the <span className="hover:text-foreground underline">Terms of Service</span> and <span className="hover:text-foreground underline">Privacy Policy</span>
                      </span>
                    </label>
                  </div>

                  {/* Start Button */}
                  <div className="space-y-3 shrink-0">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full rounded-2xl py-3.5 text-sm font-bold text-white transition-all cursor-pointer shadow-md ${
                        isFormValid
                          ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                          : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                      }`}
                    >
                      Start Chat
                    </button>
                    
                    <p className="text-[10px] text-center text-muted font-medium">
                      Powered by <strong className="font-bold text-foreground">Sinexa</strong> from <a href="https://sinovexai.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">sinovexai.com</a>
                    </p>
                  </div>
                </form>
              ) : (
                /* Chat Conversation View */
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  
                  {/* Messages list */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.map((m) => {
                      const isUser = m.role === "user";
                      return (
                        <div
                          key={m.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex flex-col max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-3.5 py-2.5 text-xs leading-[1.6] rounded-2xl shadow-sm break-words whitespace-pre-wrap ${
                                isUser
                                  ? "rounded-tr-none bg-blue-600 text-white"
                                  : "rounded-tl-none border border-border bg-accent-bg text-foreground"
                              }`}
                            >
                              {renderBubbleContent(m.text)}
                            </div>
                            <span className="text-[9px] text-muted-light font-bold mt-1 px-1">{m.time}</span>
                          </div>
                        </div>
                      );
                    })}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-border bg-accent-bg px-4 py-3 shadow-sm">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                              className="h-2.5 w-2.5 rounded-full bg-blue-500/80"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input field area */}
                  <div className="p-3 border-t border-border bg-surface shrink-0 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 rounded-full border border-border bg-accent-bg px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-blue-500 transition-colors placeholder:text-muted/60"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isTyping}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-all cursor-pointer ${
                        input.trim() && !isTyping
                          ? "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md shadow-blue-500/10"
                          : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
