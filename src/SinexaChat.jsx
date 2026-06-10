// ==========================
// SinexaChat.jsx
// Full-page Sinexa AI Chatbot — Premium Dark UI
// ==========================

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  CheckCheck,
  Copy,
  Mic,
  MicOff,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import SiteNavbar from "./siteNavbar";

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "94706857171";
const API_BASE = import.meta.env.VITE_API_URL || "https://sinovexai.com";

const STARTER_MESSAGE =
  "Hi! I'm **Sinexa**, your Sinovex AI assistant. I can help you with:\n\n• AI WhatsApp bots for your business\n• Website AI assistants\n• AI voice call systems\n• Business automation workflows\n• Pricing and packages\n\nWhat would you like to know? 🚀";

const QUICK_PROMPTS = [
  "What AI products does SinovexAI offer?",
  "How does the WhatsApp AI bot work?",
  "Can you handle Sinhala messages?",
  "What's the pricing for AI bots?",
  "Book a free demo",
  "How does the AI voice system work?",
];

const BUSINESS_CONTEXT = `You are Sinexa, the AI assistant for SinovexAI — a Sri Lankan AI automation company.

SinovexAI products:
1. AI WhatsApp Bot — 24/7 customer replies in Sinhala + English, bookings, FAQs, lead capture, human handoff.
2. Website AI Assistant — smart chat on business websites for visitor support, lead collection, product answers.
3. AI Voice System — AI answers calls, books appointments, sends call summaries.
4. Business Automation — CRM updates, auto reports, follow-ups, workflow automation.

Pricing: Custom per business. Customers should book a free demo. Don't give fake prices.
Contact: WhatsApp 070 6857171, Email sinovexai@outlook.com
Best for: Restaurants, salons, clinics, shops, hotels, tourism, real estate, education, service businesses in Sri Lanka.

Respond naturally, be helpful and concise. You can reply in Sinhala or English based on what the user writes. Use emojis occasionally to be friendly.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function makeId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createMsg(role, text, extra = {}) {
  return { id: makeId(), role, text, time: nowTime(), ...extra };
}

function parseBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderText(text) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {parseBold(line)}
      {i < text.split("\n").length - 1 && <br />}
    </span>
  ));
}

// ─── Local fallback replies ───────────────────────────────────────────────────

function localReply(userText) {
  const msg = userText.toLowerCase();
  const hasSinhala = /[\u0D80-\u0DFF]/.test(userText);

  if (/(hi|hello|hey|ayubowan|ආයුබෝවන්|kohomada)/.test(msg)) {
    return "Hi there! 👋 I'm Sinexa, your AI assistant from SinovexAI. I'm here to help you explore our AI products — WhatsApp bots, website assistants, voice AI, and business automation. What can I help you with today?";
  }
  if (/(price|pricing|cost|package|aduma|ගාන|මිල)/.test(msg)) {
    return "Pricing at SinovexAI is custom-tailored to your business — it depends on which products you need, features, and the level of automation. The best way to get accurate pricing is to **book a free demo** so we can recommend the right package. Want me to help you schedule one? 📞";
  }
  if (/(whatsapp|whats app)/.test(msg)) {
    return "The **AI WhatsApp Bot** is our most popular product! 🔥 It replies to customer messages 24/7 in both **Sinhala and English** — answering FAQs, taking bookings, capturing leads, and even handing over to a human agent when needed. It's like having a full-time customer service agent on WhatsApp.";
  }
  if (/(website|site|chat widget)/.test(msg)) {
    return "The **Website AI Assistant** turns your website into a smart sales tool. It chats with visitors instantly, explains your services, recommends packages, captures leads, and guides people to WhatsApp or booking. Works 24/7 without any staff.";
  }
  if (/(voice|call|phone)/.test(msg)) {
    return "The **AI Voice System** answers customer phone calls automatically. It speaks naturally, handles common questions, books appointments, and sends your team a summary of each call. No more missed enquiries!";
  }
  if (/(automation|crm|workflow|report)/.test(msg)) {
    return "**Business Automation** connects all your customer touchpoints. When a lead comes in — from WhatsApp, website, or call — the AI logs it to your CRM, schedules a follow-up, sends reminders, and generates daily reports. All hands-free. ⚙️";
  }
  if (/(sinhala|singlish|sinhalen)/.test(msg) || hasSinhala) {
    return "ඔව්! 😊 අපේ AI systems Sinhala සහ Singlish දෙකෙන්ම naturally reply කරන්න පුළුවන්. ඔබේ customers Sinhala වලින් message කළාත් AI perfect replies දෙනවා. Sri Lankan businesses සඳහා specially designed කළ system එකක්.";
  }
  if (/(demo|book|contact|talk to|human|agent)/.test(msg)) {
    return "I'd love to set you up with a free demo! 🎯 You can reach the SinovexAI team directly:\n\n• **WhatsApp**: [070 6857171](https://wa.me/94706857171)\n• **Email**: sinovexai@outlook.com\n\nOr just tell me more about your business and I'll describe the best AI solution for you!";
  }
  if (/(service|product|offer|what do you do|what can)/.test(msg)) {
    return "SinovexAI offers **4 core AI systems** for Sri Lankan businesses:\n\n1. 🤖 **AI WhatsApp Bot** — 24/7 Sinhala/English customer chat\n2. 🌐 **Website AI Assistant** — smart chatbot for your site\n3. 📞 **AI Voice System** — AI that answers your calls\n4. ⚙️ **Business Automation** — CRM, reports, workflows\n\nWhich one interests you most?";
  }
  return "Great question! I'd love to help. SinovexAI builds AI systems for Sri Lankan businesses — WhatsApp bots, website assistants, voice AI, and automation. Tell me more about your business and I can recommend the best solution for you! 🚀";
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg, onCopy, onThumb }) {
  const isUser = msg.role === "user";
  const [copied, setCopied] = useState(false);
  const [thumbed, setThumbed] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).catch(() => {});
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/30">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={`flex max-w-[78%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Bubble */}
        <div
          className={`relative rounded-2xl px-4 py-3 text-[14px] leading-[1.65] shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-violet-500/20"
              : "rounded-tl-sm border border-white/10 bg-white/8 text-white/90 backdrop-blur-xl"
          }`}
          style={isUser ? {} : { background: "rgba(255,255,255,0.06)" }}
        >
          <div className="whitespace-pre-wrap break-words">{renderText(msg.text)}</div>
        </div>

        {/* Meta row */}
        <div
          className={`mt-1.5 flex items-center gap-2 text-[11px] text-white/35 ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span>{msg.time}</span>
          {isUser && (
            <CheckCheck className="h-3.5 w-3.5 text-violet-400" />
          )}
          {/* Action buttons (AI only) */}
          {!isUser && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={handleCopy}
                className="flex h-5 w-5 items-center justify-center rounded-md text-white/40 transition hover:text-white/80"
                title="Copy"
              >
                {copied ? <span className="text-[9px] font-bold text-green-400">✓</span> : <Copy className="h-3 w-3" />}
              </button>
              <button
                onClick={() => setThumbed("up")}
                className={`flex h-5 w-5 items-center justify-center rounded-md transition ${thumbed === "up" ? "text-green-400" : "text-white/40 hover:text-white/80"}`}
                title="Good response"
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => setThumbed("down")}
                className={`flex h-5 w-5 items-center justify-center rounded-md transition ${thumbed === "down" ? "text-red-400" : "text-white/40 hover:text-white/80"}`}
                title="Bad response"
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70 backdrop-blur-sm">
          <span className="text-xs font-bold">You</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="mb-6 flex items-start gap-3"
    >
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/30">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/10 px-4 py-3 backdrop-blur-xl"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
            className="h-2 w-2 rounded-full bg-violet-400"
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ sessions, activeId, onNew, onSelect, onDelete, onClose }) {
  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-y-0 left-0 z-[1100] flex w-72 flex-col border-r border-white/8 pt-11"
      style={{ background: "rgba(10,8,20,0.96)", backdropFilter: "blur(24px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-white">Sinexa AI</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* New chat button */}
      <div className="px-3 pb-3">
        <button
          onClick={onNew}
          className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Recent
        </p>
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
              session.id === activeId
                ? "bg-white/10 text-white"
                : "text-white/55 hover:bg-white/6 hover:text-white"
            }`}
          >
            <button
              onClick={() => onSelect(session.id)}
              className="min-w-0 flex-1 truncate text-left"
            >
              {session.title}
            </button>
            <button
              onClick={() => onDelete(session.id)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md opacity-0 text-white/30 transition hover:text-red-400 group-hover:opacity-100"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/8 px-4 py-4">
        <p className="text-[11px] text-white/30">
          Powered by SinovexAI · v2.0
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SinexaChat({ logo, setPage }) {
  const [sessions, setSessions] = useState([
    { id: "default", title: "Welcome to Sinexa" },
  ]);
  const [activeSessionId, setActiveSessionId] = useState("default");
  const [messageMap, setMessageMap] = useState({
    default: [createMsg("ai", STARTER_MESSAGE)],
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  const messages = messageMap[activeSessionId] || [];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  // Focus on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const appendMsg = (sessionId, msg) => {
    setMessageMap((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), msg],
    }));
  };

  const sendMessage = async (customText) => {
    const text = String(customText || input).trim();
    if (!text || typing) return;

    const sessionId = activeSessionId;
    setInput("");

    // Auto-title the session from first user message
    if (messages.filter((m) => m.role === "user").length === 0) {
      const title = text.length > 40 ? text.slice(0, 40) + "…" : text;
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, title } : s))
      );
    }

    const userMsg = createMsg("user", text);
    appendMsg(sessionId, userMsg);
    setTyping(true);

    const currentMessages = [...(messageMap[sessionId] || []), userMsg];

    try {
      const res = await fetch(`${API_BASE}/api/live-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demoType: "sinexa",
          message: text,
          businessInfo: BUSINESS_CONTEXT,
          history: currentMessages.slice(-12).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      const reply =
        res.ok && data.reply
          ? data.reply
          : localReply(text);

      // Slight delay so typing feels natural
      await new Promise((r) => setTimeout(r, 400));
      appendMsg(sessionId, createMsg("ai", reply));
    } catch {
      await new Promise((r) => setTimeout(r, 600));
      appendMsg(sessionId, createMsg("ai", localReply(text)));
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    const id = `chat-${Date.now()}`;
    setSessions((prev) => [{ id, title: "New conversation" }, ...prev]);
    setMessageMap((prev) => ({ ...prev, [id]: [createMsg("ai", STARTER_MESSAGE)] }));
    setActiveSessionId(id);
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const deleteSession = (id) => {
    if (sessions.length === 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setMessageMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeSessionId === id) {
      const remaining = sessions.filter((s) => s.id !== id);
      setActiveSessionId(remaining[0]?.id || "");
    }
  };

  const resetChat = () => {
    setMessageMap((prev) => ({
      ...prev,
      [activeSessionId]: [createMsg("ai", STARTER_MESSAGE)],
    }));
    setInput("");
  };

  const startDictation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      appendMsg(activeSessionId, createMsg("ai", "Voice input works best in Chrome or Edge. Please type your message instead."));
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setListening(true);
    recognition.onresult = (e) => {
      let final = "", interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript.trim();
        if (e.results[i].isFinal) final = `${final} ${t}`.trim();
        else interim = t;
      }
      if (interim) setInput(interim);
      if (final) { setInput(""); sendMessage(final); }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    try { recognition.start(); } catch { setListening(false); }
  };

  return (
    <div
      className="relative flex h-screen flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0814 0%, #0d0b1e 40%, #100b20 100%)" }}
    >
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.35) 0%, transparent 70%)", filter: "blur(70px)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* Navbar */}
      <SiteNavbar logo={logo} setPage={setPage} />

      {/* Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[1099] bg-black/60 backdrop-blur-sm"
            />
            <Sidebar
              sessions={sessions}
              activeId={activeSessionId}
              onNew={newChat}
              onSelect={(id) => { setActiveSessionId(id); setSidebarOpen(false); setShowPrompts(false); }}
              onDelete={deleteSession}
              onClose={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Chat container */}
      <div className="relative flex flex-1 flex-col overflow-hidden pt-11">
        {/* Top bar */}
        <div
          className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-3"
          style={{ background: "rgba(10,8,20,0.6)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-3">
            {/* Back */}
            <button
              onClick={() => setPage("home")}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-8 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Chats</span>
            </button>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/40">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Sinexa</p>
              <p className="text-[10px] text-violet-400 leading-none mt-0.5">by SinovexAI</p>
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400"
            >
              Online
            </motion.span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetChat}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
              title="Reset chat"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={newChat}
              className="flex h-8 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Welcome header (only on first load / first message) */}
            {messages.length <= 1 && messages[0]?.role === "ai" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-2xl shadow-violet-500/40">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Hello, I'm Sinexa ✨
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  Your AI assistant from SinovexAI
                </p>
              </motion.div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {typing && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>



        {/* Input bar */}
        <div
          className="shrink-0 border-t border-white/8 px-4 py-3 sm:px-8 sm:py-4"
          style={{ background: "rgba(10,8,20,0.85)", backdropFilter: "blur(24px)" }}
        >
          <div className="mx-auto max-w-3xl">
            <div
              className="flex items-end gap-3 rounded-2xl border border-white/10 px-4 py-3 transition focus-within:border-violet-500/50"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <textarea
                ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Sinexa anything…"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                style={{ maxHeight: 160, lineHeight: "1.55" }}
              />

              <div className="flex shrink-0 items-center gap-2">
                {/* Voice */}
                <button
                  onClick={startDictation}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    listening
                      ? "bg-red-500/20 text-red-400"
                      : "text-white/30 hover:bg-white/10 hover:text-white/70"
                  }`}
                  title={listening ? "Stop listening" : "Voice input"}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                {/* Send */}
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || typing}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    input.trim() && !typing
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40 hover:scale-105"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                  title="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-white/20">
              Sinexa can make mistakes. For business demos, contact SinovexAI on{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="text-violet-400 transition hover:text-violet-300 underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
