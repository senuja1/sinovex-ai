import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Camera,
  Check,
  CheckCheck,
  FileText,
  Globe,
  MessageCircle,
  Mic,
  Mic2,
  MoreVertical,
  Paperclip,
  Phone,
  PhoneCall,
  Play,
  RotateCcw,
  Search,
  Send,
  Smile,
  Sparkles,
  Upload,
  Video,
  Volume2,
  Workflow,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import SiteNavbar from "./siteNavbar";

const platformDetails = {
  whatsapp: {
    page: "whatsapp-demo",
    eyebrow: "Live customer demo",
    title: "Test the AI WhatsApp bot live.",
    description:
      "A WhatsApp-style AI bot that answers services, pricing, Sinhala/Singlish support, bookings, lead capture, and handoff questions instantly.",
    bg: "bg-[#eaf7ee]",
    accent: "bg-[#25D366]",
    icon: MessageCircle,
    features: [
      "Real WhatsApp-style UI",
      "Sinhala + English replies",
      "Booking + lead capture",
      "Human handoff actions",
    ],
  },
  website: {
    page: "website-demo",
    eyebrow: "Website assistant demo",
    title: "Try the AI website assistant.",
    description:
      "A smart website chat assistant that explains services, qualifies visitors, recommends packages, and captures leads.",
    bg: "bg-[#f5f7ff]",
    accent: "bg-black",
    icon: Globe,
    features: [
      "Instant visitor answers",
      "Package recommendations",
      "Lead qualification",
      "Sales handoff",
    ],
  },
  voice: {
    page: "voice-demo",
    eyebrow: "Voice agent demo",
    title: "Simulate an AI phone call.",
    description:
      "A call handling demo that answers customer questions, understands intent, books appointments, and writes a summary.",
    bg: "bg-[#f7f4ee]",
    accent: "bg-black",
    icon: Mic,
    features: [
      "Live call flow",
      "Voice-style transcript",
      "Booking handling",
      "Call summary",
    ],
  },
  automation: {
    page: "automation-demo",
    eyebrow: "Workflow automation demo",
    title: "Run an AI business workflow.",
    description:
      "An automation engine demo that captures a lead, updates CRM steps, schedules follow-up, and produces a report.",
    bg: "bg-[#f4fbf8]",
    accent: "bg-black",
    icon: Workflow,
    features: [
      "Lead processing",
      "CRM workflow",
      "Follow-up tasks",
      "Auto reporting",
    ],
  },
};

const DEFAULT_BUSINESS_INFO = `Business name: SinovexAI

Main products:
1. AI WhatsApp Bot
- Replies to customer WhatsApp messages 24/7
- Understands Sinhala, Singlish, and English
- Answers FAQs, prices, bookings, product questions, and service questions
- Collects customer name, phone number, business type, and requirement
- Can hand over serious leads to a human

2. Website AI Assistant
- Live AI chat for business websites
- Explains services and products
- Recommends packages
- Captures visitor leads
- Sends customers to WhatsApp or email

3. AI Voice System
- AI voice assistant for customer calls
- Answers common questions
- Handles appointment booking
- Creates call summaries

4. Business Automation
- Automates lead capture, CRM updates, reports, follow-ups, and team notifications

Pricing:
Pricing depends on features, integrations, and business requirements. Customers should book a free demo for the best package recommendation. Do not give fake exact prices.

Contact:
WhatsApp: 070 6857171
Email: sinovexai@outlook.com

Best for:
Restaurants, salons, clinics, shops, hotels, tuition classes, tourism companies, real estate businesses, and service businesses.`;

const chatPrompts = {
  whatsapp: [
    "Hi, what services do you offer?",
    "Mata aduma price eka kiyanna",
    "Can I make a booking?",
    "Can I talk to a human?",
  ],
  website: [
    "Recommend the best AI product",
    "Can you collect leads?",
    "සිංහලෙන් explain කරන්න",
    "Show pricing options",
  ],
};

const starterText = {
  whatsapp:
    "Hi! 👋 Welcome to the SinovexAI WhatsApp demo. I can talk naturally, answer prices, bookings, services, Sinhala/Singlish, and hand over to a human when needed.",
  website:
    "Welcome to SinovexAI. I can explain our AI WhatsApp Bot, Website AI Assistant, Voice AI, and Business Automation systems. What do you want to automate?",
};

const emojis = ["😀", "🔥", "❤️", "👍", "🙏", "✅", "💬", "📞", "✨", "🚀"];

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createMessage(role, text, extra = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    time: nowTime(),
    status: role === "user" ? "read" : "delivered",
    ...extra,
  };
}

function extractBusinessName(info) {
  const text = String(info || "");
  const match =
    text.match(/business name\s*:\s*(.+)/i) ||
    text.match(/company name\s*:\s*(.+)/i) ||
    text.match(/brand name\s*:\s*(.+)/i) ||
    text.match(/shop name\s*:\s*(.+)/i);

  return match?.[1]?.split(/\n|,/)[0]?.trim() || "SinovexAI";
}

function compactInfo(info, limit = 190) {
  return String(info || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function isWhatsAppAction(action) {
  return action?.type === "open_whatsapp" || action?.type === "handoff";
}

function canUseSpeechRecognition() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

function detectFrontendIntent(text = "") {
  const msg = String(text || "").toLowerCase();
  const hasSinhala = /[\u0D80-\u0DFF]/.test(String(text || ""));

  if (
    msg.includes("human") ||
    msg.includes("agent") ||
    msg.includes("real person") ||
    msg.includes("manager") ||
    msg.includes("owner") ||
    msg.includes("call me") ||
    msg.includes("කතා") ||
    msg.includes("මනුස්ස")
  ) {
    return "human_handoff";
  }

  if (
    msg.includes("price") ||
    msg.includes("pricing") ||
    msg.includes("cost") ||
    msg.includes("package") ||
    msg.includes("aduma") ||
    msg.includes("cheapest") ||
    msg.includes("ගාන") ||
    msg.includes("මිල") ||
    msg.includes("අඩුම")
  ) {
    return "price_question";
  }

  if (
    msg.includes("book") ||
    msg.includes("booking") ||
    msg.includes("appointment") ||
    msg.includes("schedule") ||
    msg.includes("reserve") ||
    msg.includes("වෙන්") ||
    msg.includes("දාන්න")
  ) {
    return "booking_request";
  }

  if (
    msg.includes("location") ||
    msg.includes("address") ||
    msg.includes("branch") ||
    msg.includes("map") ||
    msg.includes("කොහෙද")
  ) {
    return "location_question";
  }

  if (
    msg.includes("service") ||
    msg.includes("services") ||
    msg.includes("product") ||
    msg.includes("products") ||
    msg.includes("offer") ||
    msg.includes("bot") ||
    msg.includes("website") ||
    msg.includes("voice") ||
    msg.includes("automation") ||
    msg.includes("whatsapp")
  ) {
    return "service_question";
  }

  if (
    msg === "hi" ||
    msg === "hello" ||
    msg === "hey" ||
    msg.includes("kohomada") ||
    msg.includes("komada") ||
    msg.includes("how are you") ||
    msg.includes("ආයුබෝවන්")
  ) {
    return "greeting";
  }

  if (hasSinhala) return "sinhala_general";
  return "general";
}

function isSinhlishText(text = "") {
  const msg = String(text || "").toLowerCase();
  return (
    /[\u0D80-\u0DFF]/.test(String(text || "")) ||
    [
      "kohomada",
      "komada",
      "mata",
      "kiyanna",
      "puluwanda",
      "puluwan",
      "oyata",
      "mama",
      "aduma",
      "eka",
      "mokakda",
      "denawada",
      "karanna",
      "one",
      "ona",
      "ගාන",
      "මිල",
      "අඩුම",
    ].some((word) => msg.includes(word))
  );
}

function makeHumanLikeLocalReply(text, businessInfo, type = "whatsapp") {
  const intent = detectFrontendIntent(text);
  const businessName = extractBusinessName(businessInfo);
  const preview = compactInfo(businessInfo, 180);
  const sinhlish = isSinhlishText(text);

  if (intent === "human_handoff") {
    return sinhlish
      ? "Sure, human team එකට connect කරන්න පුළුවන්. Oyගේ name, phone number, and requirement එක send කරන්න. Team එක WhatsApp හරහා reply කරයි."
      : "Sure, I can connect you with a human. Please send your name, phone number, and what you need help with. Our team can continue on WhatsApp.";
  }

  if (intent === "greeting") {
    return sinhlish
      ? `Hondin innawa 😊 ${businessName} assistant මෙතන. Prices, services, bookings, Sinhala/English support, or human handoff ගැන අහන්න පුළුවන්. Oyata mokakda danaganna one?`
      : `Hi! I’m here and ready to help with ${businessName}. You can ask about services, prices, bookings, Sinhala/English support, or talk to a human. What would you like to do?`;
  }

  if (intent === "price_question") {
    return sinhlish
      ? "Aduma starter option eka usually basic setup/service එකකින් start wenawa. Exact price eka features, duration/service type, integrations, and requirements anuwa wenas wenawa. Oyata one product/service eka mokakda kiyanna, mama best option eka suggest කරන්නම්."
      : "The lowest starter option usually starts with a basic setup/service. Exact pricing depends on features, service type, integrations, and requirements. Tell me what you need and I’ll suggest the best option.";
  }

  if (intent === "booking_request") {
    return sinhlish
      ? "Yes, booking/lead capture handle කරන්න පුළුවන්. Name, phone number, service/product, preferred date and time send කරන්න. Then team එකට clean summary එකක් යවන්න පුළුවන්."
      : "Yes, I can help with a booking. Please send your name, phone number, service/product, preferred date, and time. Then I can prepare a clean summary for the team.";
  }

  if (intent === "location_question") {
    return sinhlish
      ? "Location eka confirm කරන්න branch/city details අවශ්‍යයි. Oyata one branch eka or city eka kiyanna, team එකට map/location link එක confirm කරන්න පුළුවන්."
      : "Please share the branch or city you mean. Then the team can confirm the exact location or Google Maps link.";
  }

  if (intent === "service_question") {
    return sinhlish
      ? `Loaded business info අනුව services/products explain කරන්න පුළුවන්. Info preview: ${preview || businessName}. Oyata prices, booking, services, or human support වලින් mokakda one?`
      : `I can explain the services/products using the loaded business info. Info preview: ${preview || businessName}. Do you want services, prices, booking, or human support?`;
  }

  if (intent === "sinhala_general") {
    return `ඔව්, මට Sinhala/Singlish වලින් natural විදිහට chat කරන්න පුළුවන්. ${businessName} ගැන prices, services, bookings, FAQs, complaints, location, and human handoff handle කරන්න පුළුවන්. Oyata mokakda help one?`;
  }

  if (sinhlish) {
    return `ඔව් sure 😊 මට Sinhala/Singlish වලින් chat කරන්න පුළුවන්. ${businessName} ගැන service, price, booking, location, complaint, or human support වගේ ඕනම normal customer question එකක් අහන්න. මම business info අනුව answer කරන්නම්.`;
  }

  if (type === "whatsapp") {
    return "Yes, I can handle normal customer conversations too — greetings, services, prices, bookings, complaints, location questions, follow-ups, Sinhala/English replies, and human handoff. What is the customer asking?";
  }

  return "I can help with that. Tell me the customer question and I’ll answer using the loaded business information.";
}

function looksWeakAiReply(userText, aiText = "") {
  const reply = String(aiText || "").trim();
  const userIntent = detectFrontendIntent(userText);
  const lowerReply = reply.toLowerCase();

  if (reply.includes("```")) return false;

  if (!reply || reply.length < 28) return true;

  const genericSinovexReply =
    lowerReply.includes("sinovexai whatsapp bot can reply to customers 24/7") ||
    lowerReply.includes("what business do you want to automate") ||
    lowerReply.includes("reply to customers 24/7, answer faqs") ||
    lowerReply.includes("collect leads, and support sinhala + english");

  if (genericSinovexReply && userIntent !== "service_question") return true;

  if (
    userIntent === "human_handoff" &&
    !/(human|team|agent|manager|connect|handoff|person|owner)/i.test(reply)
  ) {
    return true;
  }

  if (
    userIntent === "greeting" &&
    (genericSinovexReply || lowerReply.includes("reply to customers"))
  ) {
    return true;
  }

  if (
    isSinhlishText(userText) &&
    !/[\u0D80-\u0DFF]|(eka|oyata|mata|puluwan|kiyanna|karanna|hondin|mokakda)/i.test(reply)
  ) {
    return true;
  }

  return false;
}

function improveAiReply(userText, aiText, businessInfo, type) {
  if (looksWeakAiReply(userText, aiText)) {
    return makeHumanLikeLocalReply(userText, businessInfo, type);
  }

  return aiText;
}

function WhatsAppTypingBubble() {
  return (
    <div className="mb-2 flex justify-start">
      <div className="relative rounded-[0.62rem] bg-white px-3 py-2 shadow-sm">
        <span className="absolute -left-2 top-0 h-0 w-0 border-r-[10px] border-r-white border-b-[10px] border-b-transparent" />
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
              className="h-1.5 w-1.5 rounded-full bg-neutral-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, isWhatsApp, onAction }) {
  const isUser = msg.role === "user";
  const bubbleColor = isUser
    ? isWhatsApp
      ? "bg-[#d9fdd3] text-[#111b21]"
      : "bg-black text-white"
    : "bg-white text-[#111b21]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative rounded-[0.7rem] px-2.5 py-1.5 text-[13.5px] leading-[19px] shadow-sm ${bubbleColor}`}
        >
          {isWhatsApp && isUser && (
            <span className="absolute -right-2 top-0 h-0 w-0 border-l-[10px] border-l-[#d9fdd3] border-b-[10px] border-b-transparent" />
          )}
          {isWhatsApp && !isUser && (
            <span className="absolute -left-2 top-0 h-0 w-0 border-r-[10px] border-r-white border-b-[10px] border-b-transparent" />
          )}

          <p className="whitespace-pre-wrap break-words pr-14">{msg.text}</p>

          <div
            className={`-mt-1 flex items-center justify-end gap-1 text-[10px] ${
              isUser ? "text-black/45" : "text-neutral-400"
            }`}
          >
            <span>{msg.time}</span>
            {isUser && (
              <CheckCheck
                className={`h-3.5 w-3.5 ${
                  msg.status === "read" ? "text-[#53bdeb]" : "text-black/35"
                }`}
              />
            )}
          </div>
        </div>

        {!isUser && Array.isArray(msg.actions) && msg.actions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {msg.actions.slice(0, 3).map((action, index) => (
              <button
                key={`${action.type}-${index}`}
                onClick={() => onAction(action)}
                className={`rounded-full border px-3 py-1 text-[11px] font-bold shadow-sm transition ${
                  isWhatsAppAction(action)
                    ? "border-[#1daa61] bg-[#25D366] text-white hover:bg-[#1daa61]"
                    : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {action.label || "Action"}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function IPhoneStatusBar() {
  return (
    <div className="relative z-20 flex h-[44px] shrink-0 items-center justify-between px-8 pt-1 text-[12px] font-bold text-white">
      <span>9:41</span>
      <div className="absolute left-1/2 top-2 h-[28px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="tracking-[0.16em]">LTE</span>
        <span className="flex gap-0.5">
          <i className="h-2.5 w-1 rounded-sm bg-white/95" />
          <i className="h-2.5 w-1 rounded-sm bg-white/95" />
          <i className="h-2.5 w-1 rounded-sm bg-white/95" />
          <i className="h-2.5 w-1 rounded-sm bg-white/60" />
        </span>
        <span className="h-3 w-5 rounded-[3px] border border-white/80 after:ml-[19px] after:mt-[3px] after:block after:h-1.5 after:w-0.5 after:rounded-r after:bg-white/80">
          <span className="m-[2px] block h-[7px] w-[13px] rounded-[2px] bg-[#9ce67d]" />
        </span>
      </div>
    </div>
  );
}

function ChatDemoPanel({ type, businessInfo, onBusinessInfoChange }) {
  const isWhatsApp = type === "whatsapp";
  const businessName = extractBusinessName(businessInfo);
  const [messages, setMessages] = useState(() => [
    createMessage("ai", starterText[type] || starterText.whatsapp),
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [quickReplies, setQuickReplies] = useState(
    chatPrompts[type] || chatPrompts.whatsapp
  );
  const messagesEndRef = useRef(null);
  const attachInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const initialMessages = [
      createMessage("ai", starterText[type] || starterText.whatsapp),
    ];
    const initialQuickReplies = chatPrompts[type] || chatPrompts.whatsapp;

    const timer = setTimeout(() => {
      setMessages(initialMessages);
      setQuickReplies(initialQuickReplies);
    }, 0);

    return () => clearTimeout(timer);
  }, [type]);

  const appendAiMessage = (text, extra = {}) => {
    setMessages((prev) => [...prev, createMessage("ai", text, extra)]);
  };

  const sendMessage = async (customText) => {
    const text = String(customText || input).trim();
    if (!text || typing) return;

    const userMessage = createMessage("user", text);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setEmojiOpen(false);
    setTyping(true);

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_URL ||
        (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
          ? "http://localhost:8787"
          : "https://sinovexai.com");

      const res = await fetch(`${apiBaseUrl}/api/live-demo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          demoType: type,
          message: text,
          businessInfo,
          history: nextMessages.slice(-12).map((item) => ({
            role: item.role,
            text: item.text,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.reply || "Live AI demo failed");
      }

      const rawReply =
        data.reply ||
        "I can help with services, prices, bookings, lead capture, and human handoff. What do you want to do next?";

      const finalReply = improveAiReply(text, rawReply, businessInfo, type);

      setMessages((prev) => [
        ...prev,
        createMessage("ai", finalReply, {
          actions: data.actions || [],
          intent: data.intent || detectFrontendIntent(text),
          meta: data.meta || null,
        }),
      ]);

      if (Array.isArray(data.suggestedReplies) && data.suggestedReplies.length) {
        setQuickReplies(data.suggestedReplies.slice(0, 4));
      } else {
        const intent = detectFrontendIntent(text);
        if (intent === "human_handoff") setQuickReplies(["Open WhatsApp", "Send my number", "Book demo"]);
        else if (intent === "greeting") setQuickReplies(["Show services", "Pricing", "Can I book?", "Talk to human"]);
        else setQuickReplies(chatPrompts[type] || chatPrompts.whatsapp);
      }
    } catch (error) {
      console.error("Live demo error:", error);

      appendAiMessage(makeHumanLikeLocalReply(text, businessInfo, type), {
        actions: [
          {
            type: "show_services",
            label: "Show services",
          },
          {
            type: "open_whatsapp",
            label: "Talk on WhatsApp",
            url: "https://wa.me/94706857171?text=Hi%20SinovexAI%2C%20I%20want%20to%20book%20a%20free%20AI%20demo.",
          },
        ],
      });
    } finally {
      setTyping(false);
    }
  };

  const handleAction = (action) => {
    if (!action) return;

    if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.type === "collect_lead") {
      const fields = Array.isArray(action.fields) ? action.fields : [];
      const readable = fields.length
        ? fields
            .map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase())
            .join(", ")
        : "name, phone number, service, date, and time";

      appendAiMessage(
        `Sure. Please send these details: ${readable}. I’ll prepare the booking/lead summary for the team.`
      );
      return;
    }

    if (action.type === "show_pricing_note") {
      appendAiMessage(
        "Pricing depends on the selected service, features, duration, integrations, and setup level. Tell me what you need and I’ll guide you to the best starter option."
      );
      return;
    }

    if (action.type === "show_services") {
      sendMessage("Show me the services");
      return;
    }

    appendAiMessage("Done. What would you like to do next?");
  };

  const handleAttachFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const clipped = text.slice(0, 6000);

      if (onBusinessInfoChange) {
        onBusinessInfoChange(clipped);
      }

      appendAiMessage(
        `Business info file uploaded: ${file.name}. I’ll now answer using this updated business knowledge.`
      );
    } catch {
      appendAiMessage(
        "I could not read that file. Please upload a .txt, .md, .csv, or .json file, or paste the details into the training box."
      );
    } finally {
      event.target.value = "";
    }
  };

  const startDictation = () => {
    if (!canUseSpeechRecognition()) {
      appendAiMessage(
        "Voice typing works best in Chrome or Edge. You can still type the message normally."
      );
      return;
    }

    if (listening) return;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript.trim();
        if (event.results[i].isFinal) finalText = `${finalText} ${transcript}`.trim();
        else interimText = `${interimText} ${transcript}`.trim();
      }

      if (interimText) setInput(interimText);
      if (finalText) {
        setInput("");
        sendMessage(finalText);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      appendAiMessage(
        "I could not hear clearly. Please try again or type the customer message."
      );
    };

    recognition.onend = () => setListening(false);

    try {
      recognition.start();
    } catch {
      setListening(false);
    }
  };

  const resetChat = () => {
    setMessages([createMessage("ai", starterText[type] || starterText.whatsapp)]);
    setQuickReplies(chatPrompts[type] || chatPrompts.whatsapp);
    setInput("");
    setEmojiOpen(false);
  };

  const inputPlaceholder = isWhatsApp ? "Message" : "Type a visitor question...";

  if (!isWhatsApp) {
    return (
      <div className="mx-auto w-full max-w-[520px] rounded-[2rem] bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
        <div className="flex h-[680px] max-h-[calc(100vh-7rem)] min-h-[560px] flex-col overflow-hidden rounded-[1.6rem] border border-neutral-200 bg-[#f8fafc]">
          <div className="flex shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-5 py-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22c55e]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-black">
                Website AI Assistant
              </p>
              <p className="truncate text-xs font-medium text-neutral-500">
                {typing ? "typing..." : listening ? "listening..." : "Online · Website sales assistant"}
              </p>
            </div>

            <button
              onClick={resetChat}
              className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-700 transition hover:bg-neutral-200"
            >
              Reset
            </button>
          </div>

          <div className="border-b border-neutral-200 bg-white px-5 py-3">
            <div className="rounded-2xl bg-[#f1f5f9] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                Live website widget
              </p>
              <p className="mt-1 text-sm leading-5 text-neutral-700">
                Ask about services, pricing, packages, Sinhala support, bookings, or lead capture.
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-[#f8fafc] to-white px-4 py-5">
            <div className="space-y-3">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[86%] ${isUser ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-[1.15rem] px-4 py-3 text-sm leading-6 shadow-sm ${
                          isUser
                            ? "rounded-br-md bg-black text-white"
                            : "rounded-bl-md border border-neutral-200 bg-white text-neutral-900"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        <div
                          className={`mt-1 text-right text-[10px] ${
                            isUser ? "text-white/55" : "text-neutral-400"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>

                      {!isUser && Array.isArray(msg.actions) && msg.actions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.actions.slice(0, 3).map((action, index) => (
                            <button
                              key={`${action.type}-${index}`}
                              onClick={() => handleAction(action)}
                              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold shadow-sm transition ${
                                isWhatsAppAction(action)
                                  ? "border-black bg-black text-white hover:bg-neutral-800"
                                  : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100"
                              }`}
                            >
                              {action.label || "Action"}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-[1.15rem] rounded-bl-md border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                          className="h-1.5 w-1.5 rounded-full bg-neutral-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="shrink-0 border-t border-neutral-200 bg-white px-3 py-3">
            {quickReplies.length > 0 && (
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {quickReplies.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={typing}
                    className="shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition hover:bg-neutral-100 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {emojiOpen && (
              <div className="mb-3 flex flex-wrap gap-1.5 rounded-2xl bg-neutral-50 p-2 shadow-sm">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setInput((prev) => `${prev}${emoji}`)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  onClick={() => setEmojiOpen(false)}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-[#f8fafc] px-3 py-2 shadow-sm">
              <button
                onClick={() => setEmojiOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-white"
                title="Emoji"
              >
                <Smile className="h-5 w-5" />
              </button>

              <input
                ref={attachInputRef}
                type="file"
                accept=".txt,.md,.csv,.json"
                onChange={handleAttachFile}
                className="hidden"
              />

              <button
                onClick={() => attachInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-white"
                title="Attach business info"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) sendMessage();
                }}
                placeholder="Ask the website assistant..."
                className="h-10 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-neutral-400"
              />

              <button
                onClick={() => {
                  if (input.trim()) sendMessage();
                  else startDictation();
                }}
                disabled={typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm transition hover:scale-105 disabled:opacity-50"
                title={input.trim() ? "Send" : "Voice typing"}
              >
                {input.trim() ? (
                  <Send className="h-4 w-4" />
                ) : listening ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <Mic2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[2.85rem] bg-[#0b141a] p-[8px] shadow-[0_30px_80px_rgba(0,0,0,0.28)] lg:h-[720px]">
      <div className="relative flex h-[690px] max-h-[calc(100vh-7rem)] min-h-[560px] flex-col overflow-hidden rounded-[2.35rem] bg-[#111b21] lg:h-full">
        <div className={`${isWhatsApp ? "bg-[#075E54]" : "bg-black"}`}>
          {isWhatsApp && <IPhoneStatusBar />}

          <div className="relative z-10 flex shrink-0 items-center gap-2.5 px-3 pb-2.5 pt-1 text-white">
            {isWhatsApp && <ArrowLeft className="h-5 w-5 shrink-0" />}

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d9fdd3] text-[#075E54] ring-1 ring-white/15">
              <span className="text-sm font-black">
                {businessName.slice(0, 1).toUpperCase()}
              </span>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-semibold leading-5">
                {isWhatsApp ? `${businessName} AI Bot` : "Website AI Assistant"}
              </p>
              <p className="truncate text-[11px] text-white/85">
                {typing ? "typing..." : listening ? "listening..." : "online"}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 text-white/95">
              <Video className="h-5 w-5" />
              <PhoneCall className="h-5 w-5" />
              <Search className="h-5 w-5" />
              <button onClick={resetChat} title="Reset chat">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto px-3 py-3"
          style={{
            backgroundColor: "#efeae2",
            backgroundImage:
              "radial-gradient(circle at 12px 18px, rgba(0,0,0,0.04) 1.4px, transparent 1.5px), radial-gradient(circle at 44px 38px, rgba(0,0,0,0.03) 1.2px, transparent 1.3px), linear-gradient(45deg, rgba(0,0,0,0.012) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.012) 75%)",
            backgroundSize: "54px 54px, 54px 54px, 32px 32px",
          }}
        >
          <div className="mx-auto mb-3 w-fit rounded-lg bg-[#fff3c4] px-3 py-1.5 text-center text-[11px] leading-4 text-[#5f5430] shadow-sm">
            🔒 Messages and calls are end-to-end encrypted. Demo preview only.
          </div>
          <div className="mx-auto mb-3 w-fit rounded-lg bg-white/80 px-3 py-1 text-[11px] font-semibold text-neutral-500 shadow-sm">
            TODAY
          </div>

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isWhatsApp={isWhatsApp}
              onAction={handleAction}
            />
          ))}

          {typing && <WhatsAppTypingBubble />}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-[#f0f2f5] px-2 pb-2 pt-2">
          {quickReplies.length > 0 && (
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickReplies.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-[#d1d7db] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#075E54] shadow-sm hover:bg-[#e7ffef] disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {emojiOpen && (
            <div className="mb-2 flex flex-wrap gap-1.5 rounded-2xl bg-white p-2 shadow-sm">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setInput((prev) => `${prev}${emoji}`)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={() => setEmojiOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-2">
            <div className="flex min-h-[44px] flex-1 items-center gap-1 rounded-full bg-white px-2 shadow-sm">
              <button
                onClick={() => setEmojiOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#54656f] hover:bg-neutral-100"
                title="Emoji"
              >
                <Smile className="h-5 w-5" />
              </button>

              <input
                ref={attachInputRef}
                type="file"
                accept=".txt,.md,.csv,.json"
                onChange={handleAttachFile}
                className="hidden"
              />

              <button
                onClick={() => attachInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#54656f] hover:bg-neutral-100"
                title="Attach business info"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) sendMessage();
                }}
                placeholder={inputPlaceholder}
                className="h-10 flex-1 bg-transparent px-1 text-[15px] outline-none placeholder:text-[#667781]"
              />

              <button
                onClick={() =>
                  appendAiMessage(
                    "Camera demo: upload business info with the attachment button, or send a customer message to test the AI."
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#54656f] hover:bg-neutral-100"
                title="Camera demo"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => {
                if (input.trim()) sendMessage();
                else startDictation();
              }}
              disabled={typing}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white shadow-sm transition hover:bg-[#029b7a] disabled:opacity-60"
              title={input.trim() ? "Send" : "Voice typing"}
            >
              {input.trim() ? (
                <Send className="h-5 w-5" />
              ) : listening ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <Mic2 className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex h-5 items-end justify-center pb-1">
            <span className="h-1 w-28 rounded-full bg-black/35" />
          </div>
        </div>
      </div>
    </div>
  );
}

function getVoiceReply(text, businessInfo) {
  const msg = String(text || "").toLowerCase();
  const business = extractBusinessName(businessInfo);
  const context = compactInfo(businessInfo, 180);

  if (msg.includes("book") || msg.includes("appointment")) {
    return `I can book that for ${business}. What day and time should I reserve, and which product or service do you need?`;
  }

  if (msg.includes("price") || msg.includes("cost") || msg.includes("pricing")) {
    return `I can answer using the loaded business details: ${context}. If an exact price is missing, I will collect the caller details for your team.`;
  }

  if (msg.includes("human") || msg.includes("agent") || msg.includes("manager")) {
    return "No problem. I can collect the caller name, phone number, question, and urgency, then hand the conversation to your team with a clean summary.";
  }

  return `Hello! This is the ${business} AI voice assistant. I can answer questions, collect booking details, and create a call summary for your team.`;
}

function VoiceDemoPanel({ businessInfo }) {
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([
    {
      role: "ai",
      text: `Call ready. Ask about bookings, pricing, products, or human handoff.`,
    },
  ]);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ block: "end" });
  }, [transcript]);

  const speak = (text) => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.08;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const sendLine = (customText) => {
    const text = String(customText || input).trim();
    if (!text) return;

    setTranscript((prev) => [...prev, { role: "caller", text }]);
    setInput("");

    setTimeout(() => {
      const reply = getVoiceReply(text, businessInfo);
      setTranscript((prev) => [...prev, { role: "ai", text: reply }]);
      speak(reply);
    }, 350);
  };

  return (
    <div className="h-[620px] rounded-[1.6rem] bg-white p-2 shadow-2xl lg:h-[calc(100vh-9.5rem)] lg:min-h-[560px]">
      <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-neutral-950 text-white">
        <div className="flex shrink-0 items-center justify-between bg-black px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">AI Voice Agent</p>
              <p className="text-[10px] text-white/70">
                {speaking ? "Speaking..." : "Ready"}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              speak(
                `Hello, this is the ${extractBusinessName(
                  businessInfo
                )} AI voice assistant. How can I help you today?`
              )
            }
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black"
          >
            Start Call
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex min-h-0 flex-col rounded-[1.35rem] bg-white/5 p-3">
            <motion.div
              animate={speaking ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black"
            >
              <Volume2 className="h-7 w-7" />
            </motion.div>
            <div className="mt-5 grid gap-2">
              {[
                "I want to book an appointment",
                "What are your prices?",
                "Can I speak to a human?",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendLine(prompt)}
                  className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <p className="mt-auto pt-3 text-[10px] leading-4 text-white/50">
              Demo voice uses browser speech synthesis.
            </p>
          </div>

          <div className="flex min-h-0 flex-col rounded-[1.35rem] bg-white text-black">
            <div className="border-b border-neutral-200 p-3">
              <p className="text-sm font-bold">Live transcript</p>
              <p className="text-[10px] text-neutral-500">
                Customer intent and AI replies update in real time.
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {transcript.map((line, idx) => (
                <motion.div
                  key={`${line.text}-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-2.5 flex ${
                    line.role === "caller" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-5 ${
                      line.role === "caller"
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-black"
                    }`}
                  >
                    {line.text}
                  </div>
                </motion.div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
            <div className="flex shrink-0 gap-2 border-t border-neutral-200 p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendLine()}
                placeholder="Type what the caller says..."
                className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-black"
              />
              <button
                onClick={() => sendLine()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const automationSteps = [
  "Capture lead details",
  "Score customer intent",
  "Create CRM record",
  "Schedule follow-up",
  "Send team summary",
];

const automationScenarios = [
  {
    name: "Restaurant booking",
    lead: "Nimal Perera",
    source: "WhatsApp",
    request: "Book a table for 6 people tomorrow at 7 PM",
  },
  {
    name: "Spa booking",
    lead: "Amaya Silva",
    source: "Website",
    request: "Needs full body massage price and appointment time",
  },
  {
    name: "Real estate lead",
    lead: "Ravi Fernando",
    source: "Facebook",
    request: "Wants apartment listings under 30 million LKR",
  },
];

function AutomationDemoPanel({ businessInfo }) {
  const [scenario, setScenario] = useState(automationScenarios[0]);
  const [completed, setCompleted] = useState(0);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState(["Choose a scenario and run the workflow."]);

  useEffect(() => {
    if (!running) return undefined;

    const timers = automationSteps.map((_, idx) =>
      setTimeout(() => {
        setCompleted(idx + 1);
        setLogs((prev) => [...prev, `${automationSteps[idx]} completed`]);

        if (idx === automationSteps.length - 1) {
          setRunning(false);
          setLogs((prev) => [
            ...prev,
            "Workflow finished. Team summary is ready.",
          ]);
        }
      }, 600 * (idx + 1))
    );

    return () => timers.forEach(clearTimeout);
  }, [running]);

  const runWorkflow = () => {
    setCompleted(0);
    setRunning(true);
    setLogs([
      `New lead: ${scenario.lead}`,
      `Source: ${scenario.source}`,
      `Request: ${scenario.request}`,
      `Business data loaded: ${compactInfo(businessInfo, 120)}`,
    ]);
  };

  const resetWorkflow = () => {
    setCompleted(0);
    setRunning(false);
    setLogs(["Workflow reset. Choose a scenario and run again."]);
  };

  return (
    <div className="h-[620px] rounded-[1.6rem] bg-white p-2 shadow-2xl lg:h-[calc(100vh-9.5rem)] lg:min-h-[560px]">
      <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-black text-white">
        <div className="flex shrink-0 items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
              <Workflow className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold">Automation AI Engine</p>
              <p className="text-xs text-white/70">
                lead to CRM workflow demo
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetWorkflow}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={runWorkflow}
              disabled={running}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
            >
              <Play className="h-4 w-4" />
              {running ? "Running" : "Run"}
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 p-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="overflow-y-auto rounded-[1.35rem] bg-white p-4 text-black">
            <p className="text-sm font-bold">Live customer scenario</p>
            <div className="mt-3 grid gap-2">
              {automationScenarios.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setScenario(item);
                    setCompleted(0);
                    setRunning(false);
                    setLogs([`${item.name} selected.`]);
                  }}
                  className={`rounded-2xl border p-3 text-left transition ${
                    scenario.name === item.name
                      ? "border-black bg-neutral-100"
                      : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <p className="font-bold">{item.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.source} - {item.lead}
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-neutral-100 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Request + product data
              </p>
              <p className="mt-2 text-sm leading-6">{scenario.request}</p>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                {compactInfo(businessInfo, 170)}
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-col rounded-[1.35rem] bg-white p-4 text-black">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Workflow progress</p>
                <p className="text-xs text-neutral-500">
                  Every step updates automatically.
                </p>
              </div>
              <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                {completed}/{automationSteps.length}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {automationSteps.map((step, idx) => (
                <motion.div
                  key={step}
                  animate={{ opacity: completed > idx ? 1 : 0.55 }}
                  className="flex items-center gap-3 rounded-2xl bg-neutral-100 p-3"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      completed > idx
                        ? "bg-black text-white"
                        : "bg-white text-neutral-400"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold">{step}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-2xl bg-black p-4 text-xs leading-6 text-white">
              {logs.map((log, i) => (
                <p key={`${log}-${i}`}>- {log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessTrainingCard({
  businessInfo,
  fileName,
  onInfoChange,
  onFileUpload,
}) {
  return (
    <div className="rounded-[1.6rem] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold">Train with your products</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Paste or upload product, price, delivery, FAQ, and booking details.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
          <FileText className="h-5 w-5" />
        </div>
      </div>

      <textarea
        value={businessInfo}
        onChange={(e) => onInfoChange(e.target.value)}
        className="mt-3 h-28 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-xs leading-5 outline-none focus:border-black"
        placeholder="Business name, products, prices, delivery, FAQs..."
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800">
          <Upload className="h-4 w-4" />
          Upload info
          <input
            type="file"
            accept=".txt,.md,.csv,.json"
            onChange={onFileUpload}
            className="hidden"
          />
        </label>

        <p className="truncate text-xs text-neutral-500">
          {fileName || `${businessInfo.length} chars loaded`}
        </p>
      </div>

      <p className="mt-3 rounded-2xl bg-yellow-50 px-4 py-3 text-xs font-semibold leading-5 text-yellow-800">
        Demo preview. In real setup, SinovexAI connects WhatsApp, CRM/database,
        backend APIs, notifications, and custom business automation.
      </p>
    </div>
  );
}

export default function PlatformDemo({ platform, logo, setPage }) {
  const details = platformDetails[platform] || platformDetails.whatsapp;
  const Icon = details.icon;
  const [businessInfo, setBusinessInfo] = useState(DEFAULT_BUSINESS_INFO);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setBusinessInfo(text.slice(0, 6000));
    setFileName(file.name);
    e.target.value = "";
  };

  const renderPanel = () => {
    if (platform === "voice") {
      return <VoiceDemoPanel businessInfo={businessInfo} />;
    }

    if (platform === "automation") {
      return <AutomationDemoPanel businessInfo={businessInfo} />;
    }

    return (
      <ChatDemoPanel
        type={platform === "website" ? "website" : "whatsapp"}
        businessInfo={businessInfo}
        onBusinessInfoChange={(text) => {
          setBusinessInfo(text);
          setFileName("Uploaded from chat attachment");
        }}
      />
    );
  };

  return (
    <main className={`min-h-screen ${details.bg} text-black`}>
      <SiteNavbar logo={logo} setPage={setPage} currentPage={details.page} />

      <section className="px-4 pb-12 pt-32 sm:px-6 lg:pt-36">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_0.82fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
              <Sparkles className="h-4 w-4" />
              {details.eyebrow}
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl xl:text-[3.4rem]">
              {details.title}
            </h1>

            <p className="max-w-xl text-base leading-7 text-neutral-600">
              {details.description}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {details.features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <BusinessTrainingCard
              businessInfo={businessInfo}
              fileName={fileName}
              onInfoChange={setBusinessInfo}
              onFileUpload={handleFileUpload}
            />

            <div className="flex items-center gap-3 rounded-[1.6rem] bg-white p-4 shadow-sm">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white ${details.accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-neutral-700">
                Live tester uses your uploaded information, chat history, action buttons, and backend AI replies.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">{renderPanel()}</div>
        </div>
      </section>
    </main>
  );
}
