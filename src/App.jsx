// ==========================
// App.jsx
// ==========================

import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import Pricing from "./Pricing";
import WhatsAppDemo from "./whatsappdemo";
import PlatformDemo from "./platformDemo";
import SiteNavbar from "./siteNavbar";
import WhatsAppAIProduct from "./WhatsAppAIProduct";
import WebsiteAIProduct from "./WebsiteAIProduct";
import VoiceAIProduct from "./VoiceAIProduct";
import AutomationAIProduct from "./AutomationAIProduct";
import SinexaChat from "./SinexaChat";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

const WHATSAPP_NUMBER = "94706857171";
const DISPLAY_PHONE = "070 6857171";
const EMAIL = "sinovexai@outlook.com";

const contactLinks = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: `mailto:${EMAIL}`,
  phone: `tel:${DISPLAY_PHONE.replace(/\s/g, "")}`,
};

const services = [
  {
    icon: MessageCircle,
    title: "AI WhatsApp Bots",
    text: "Automate customer replies, bookings, FAQs, lead capture, and follow-ups in Sinhala and English.",
    points: ["Sinhala + English replies", "Bookings & orders", "Human handoff"],
  },
  {
    icon: Bot,
    title: "Website AI Assistants",
    text: "Turn your website into a smart 24/7 sales and support assistant that helps visitors instantly.",
    points: ["Website chatbot", "Lead collection", "Product/service training"],
  },
  {
    icon: PhoneCall,
    title: "AI Voice Systems",
    text: "AI voice agents that answer calls, qualify customers, book appointments, and reduce missed inquiries.",
    points: ["Call answering", "Appointment booking", "Call summaries"],
  },
  {
    icon: Workflow,
    title: "Business Automations",
    text: "Automate repetitive business tasks, reports, notifications, CRM updates, and customer workflows.",
    points: ["Reports", "CRM workflows", "Auto notifications"],
  },
];

const process = [
  {
    title: "01. Discover",
    text: "We understand your business, customer journey, and the tasks you want to automate.",
  },
  {
    title: "02. Build",
    text: "We create your AI system with custom workflows, branded responses, and business data.",
  },
  {
    title: "03. Launch",
    text: "We connect the system to WhatsApp, your website, voice calls, or automation tools.",
  },
  {
    title: "04. Improve",
    text: "We monitor performance, improve replies, and optimize the system after launch.",
  },
];

const previewSystems = [
  {
    icon: MessageCircle,
    label: "AI WhatsApp Bot",
    tag: "WHATSAPP AI",
    title: "Automated WhatsApp customer chat",
    description:
      "AI replies instantly in Sinhala and English, handles bookings, answers FAQs, and captures leads.",
    points: ["Sinhala + English", "Bookings", "24/7 replies"],
  },
  {
    icon: Bot,
    label: "Website AI Assistant",
    tag: "WEBSITE AI",
    title: "Smart website assistant chat",
    description:
      "A website chatbot answers visitors, explains services, collects leads, and guides customers.",
    points: ["Visitor support", "Lead capture", "Product answers"],
  },
  {
    icon: PhoneCall,
    label: "AI Voice System",
    tag: "AI VOICE",
    title: "AI voice call system",
    description:
      "AI answers calls, speaks naturally, books appointments, and sends call summaries.",
    points: ["Call answering", "Voice replies", "Appointments"],
  },
  {
    icon: Workflow,
    label: "Business Automation",
    tag: "AUTOMATION",
    title: "Automated AI business workflow",
    description:
      "AI connects leads, CRM updates, reports, reminders, follow-ups, and daily business tasks.",
    points: ["CRM updates", "Auto reports", "Follow-ups"],
  },
];

// ─── Use Cases data ────────────────────────────────────────────────────────────
const useCases = [
  {
    emoji: "🍽️",
    industry: "Restaurants",
    headline: "Take orders, not calls",
    description:
      "AI handles table reservations, takeaway orders, menu questions, and daily specials — automatically.",
    wins: ["Booking automation", "Menu Q&A", "Order confirmations"],
    color: "bg-orange-50",
    accent: "text-orange-600",
    border: "border-orange-100",
  },
  {
    emoji: "✂️",
    industry: "Salons & Spas",
    headline: "Book while you're with clients",
    description:
      "Never miss a booking again. AI handles appointment slots, cancellations, and service pricing 24/7.",
    wins: ["Slot booking", "Cancellations", "Price enquiries"],
    color: "bg-pink-50",
    accent: "text-pink-600",
    border: "border-pink-100",
  },
  {
    emoji: "🏥",
    industry: "Clinics & Hospitals",
    headline: "Patient intake on autopilot",
    description:
      "AI books appointments, answers common health questions, and sends reminders — so staff can focus on care.",
    wins: ["Appointment booking", "Patient reminders", "FAQ handling"],
    color: "bg-blue-50",
    accent: "text-blue-600",
    border: "border-blue-100",
  },
  {
    emoji: "🏨",
    industry: "Hotels & Guesthouses",
    headline: "Check-ins that check themselves",
    description:
      "AI answers room availability, pricing, check-in details, and local recommendations instantly.",
    wins: ["Room enquiries", "Pricing replies", "Local tips"],
    color: "bg-amber-50",
    accent: "text-amber-600",
    border: "border-amber-100",
  },
  {
    emoji: "🚚",
    industry: "Delivery & Logistics",
    headline: "Track, update, confirm — hands-free",
    description:
      "AI sends order updates, handles delivery queries, and confirms addresses without human input.",
    wins: ["Order tracking", "Delivery updates", "Address confirm"],
    color: "bg-green-50",
    accent: "text-green-600",
    border: "border-green-100",
  },
];

// ─── How It Works flow steps ───────────────────────────────────────────────────
const flowSteps = [
  {
    icon: MessageCircle,
    label: "Customer message",
    sub: "WhatsApp / Website / Call",
    color: "bg-[#25D366]",
  },
  {
    icon: Sparkles,
    label: "AI understands",
    sub: "Sinhala or English",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    label: "Action taken",
    sub: "Reply / Book / Save lead",
    color: "bg-purple-500",
  },
  {
    icon: Workflow,
    label: "CRM updated",
    sub: "Notifications sent",
    color: "bg-orange-500",
  },
  {
    icon: Check,
    label: "Business notified",
    sub: "You stay in control",
    color: "bg-black",
  },
];

// ─── Results stats ─────────────────────────────────────────────────────────────
const results = [
  {
    icon: Clock,
    stat: "90%",
    label: "Faster reply time",
    detail: "vs. manual WhatsApp replies",
  },
  {
    icon: Users,
    stat: "24/7",
    label: "Customer support",
    detail: "No staff needed after hours",
  },
  {
    icon: TrendingUp,
    stat: "3×",
    label: "More leads captured",
    detail: "Every enquiry gets a response",
  },
  {
    icon: MessageCircle,
    stat: "100%",
    label: "Bilingual coverage",
    detail: "Sinhala + English automation",
  },
];

// ──────────────────────────────────────────────────────────────────────────────

function Button({ children, dark = true, onClick, href, target }) {
  const styles = dark
    ? "bg-foreground text-background hover:opacity-90"
    : "bg-surface text-foreground border border-border hover:opacity-90";

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </button>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-surface px-3 py-2 shadow-sm">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-muted"
        />
      ))}
    </div>
  );
}

function AutoCompanyPreview() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % previewSystems.length);
    }, 4300);
    return () => clearInterval(timer);
  }, []);

  const item = previewSystems[active];
  const Icon = item.icon;

  const renderMainPreview = () => {
    if (active === 0) {
      const chats = [
        ["customer", "Hi, mata booking ekak danna puluwanda?"],
        ["ai", "ඔව්, පුළුවන්. දිනය සහ වේලාව කියන්න."],
        ["customer", "Can you explain your services?"],
        ["ai", "Yes. We provide AI WhatsApp bots and automation."],
      ];

      return (
        <div className="flex h-full flex-col rounded-[1.3rem] bg-[#eaf7ee] p-3 text-black shadow-inner">
          <div className="flex items-center gap-3 border-b border-black/10 pb-2">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Sinovex AI Bot</p>
              <p className="text-[11px] text-neutral-600">WhatsApp Business</p>
            </div>
            <span className="ml-auto rounded-full bg-white px-2 py-1 text-[9px] font-bold text-[#128C7E]">
              online
            </span>
          </div>
          <div className="flex-1">
            {chats.map(([role, text], index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.25, duration: 0.35 }}
                className={`mt-2 flex ${role === "ai" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-3 py-2 text-xs leading-5 shadow-sm ${
                    role === "ai" ? "bg-[#dcf8c6]" : "bg-white"
                  }`}
                >
                  {text}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-3 flex justify-start"
            >
              <TypingDots />
            </motion.div>
          </div>
          <div className="mt-3 rounded-full bg-white px-3 py-2 text-[11px] text-neutral-500">
            Type a message...
          </div>
        </div>
      );
    }

    if (active === 1) {
      const chats = [
        ["visitor", "What services do you offer?"],
        ["ai", "We build AI chatbots, voice agents, and automations."],
        ["visitor", "Can I get pricing?"],
        ["ai", "Sure. I can guide you to the best package."],
      ];

      return (
        <div className="flex h-full flex-col rounded-[1.3rem] bg-white p-3 text-black">
          <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-[#f5f5f7] p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <p className="text-[10px] font-bold text-neutral-500">businesswebsite.com</p>
              <span className="rounded-full bg-black px-2 py-1 text-[10px] text-white">AI Chat</span>
            </div>
            <div className="flex flex-1 flex-col rounded-2xl bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-neutral-500">Website Assistant</p>
                <motion.span
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-bold text-green-700"
                >
                  live
                </motion.span>
              </div>
              <div className="flex-1">
                {chats.map(([role, text], index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: role === "ai" ? 14 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.23, duration: 0.35 }}
                    className={`mt-2 flex ${role === "ai" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[86%] rounded-2xl px-3 py-2 text-xs leading-5 ${
                        role === "ai" ? "bg-black text-white" : "bg-neutral-100"
                      }`}
                    >
                      {text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-3 rounded-full border border-neutral-200 bg-white px-3 py-2 text-[11px] text-neutral-400"
              >
                Ask something about services...
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    if (active === 2) {
      return (
        <div className="flex h-full flex-col justify-center rounded-[1.3rem] bg-neutral-900 p-4 text-white">
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 0 rgba(255,255,255,0.18)",
                  "0 0 0 14px rgba(255,255,255,0)",
                  "0 0 0 0 rgba(255,255,255,0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"
            >
              <PhoneCall className="h-7 w-7" />
            </motion.div>
            <p className="mt-3 text-xs text-neutral-400">Incoming customer call</p>
            <h3 className="mt-1 text-xl font-bold">AI Voice Agent</h3>
          </div>
          <div className="mt-5 flex items-end justify-center gap-2">
            {[25, 42, 62, 35, 54, 72, 38, 58, 30].map((height, index) => (
              <motion.div
                key={index}
                animate={{ height: [height, height + 22, height] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: index * 0.07, ease: "easeInOut" }}
                className="w-2 rounded-full bg-white"
                style={{ height }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl bg-white/10 p-3 text-xs leading-5 text-neutral-200"
          >
            "Hello, this is Sinovex AI assistant. I can help with bookings, services, and customer support."
          </motion.div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Listen", "Reply", "Summarize"].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="rounded-xl bg-white/10 px-2 py-2 text-center text-[10px] text-neutral-300"
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col justify-center rounded-[1.3rem] bg-white p-4 text-black">
        <div className="space-y-3">
          {[
            ["New lead received", "WhatsApp / Website"],
            ["Save lead to CRM", "Customer details stored"],
            ["Create follow-up", "Reminder scheduled"],
            ["Generate report", "Daily summary sent"],
          ].map(([title, sub], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.22, duration: 0.35 }}
              className="relative flex items-center gap-3 rounded-2xl bg-[#f5f5f7] p-3"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
              >
                <Check className="h-4 w-4" />
              </motion.div>
              <div>
                <p className="text-xs font-bold">{title}</p>
                <p className="text-[11px] text-neutral-500">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-full bg-neutral-200">
          <motion.div
            animate={{ width: ["15%", "100%", "15%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="h-2 rounded-full bg-black"
          />
        </div>
        <p className="mt-3 text-center text-[11px] font-semibold text-neutral-500">
          Automation running...
        </p>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-[1.7rem] bg-black">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div>
          <p className="text-[11px] text-neutral-400">Company Preview</p>
          <h2 className="text-lg font-semibold">See Sinovex AI in action</h2>
        </div>
        <motion.span
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-black"
        >
          LIVE
        </motion.span>
      </div>

      <div className="relative h-[430px] overflow-hidden bg-neutral-950 p-3">
        <motion.div
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute left-8 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5.5 }}
          className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl"
        />

        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 grid h-full gap-3 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="h-full rounded-[1.5rem] border border-white/10 bg-white p-2">
            {renderMainPreview()}
          </div>

          <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-white backdrop-blur-xl">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"
            >
              <Icon className="h-5 w-5" />
            </motion.div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">
              {item.tag}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">{item.title}</h3>
            <p className="mt-3 text-xs leading-5 text-neutral-300">{item.description}</p>

            <div className="mt-4 space-y-2">
              {item.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium text-neutral-200">{point}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">System status</p>
              <p className="mt-1 text-xs font-semibold text-white">Running smoothly</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-4">
        {previewSystems.map((system, index) => {
          const SystemIcon = system.icon;
          return (
            <button
              key={system.label}
              onClick={() => setActive(index)}
              className={`rounded-xl border p-2 text-left transition ${
                active === index
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
              }`}
            >
              <SystemIcon className="mb-1 h-4 w-4" />
              <p className="text-[10px] font-bold leading-tight">{system.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── NEW: How It Works ─────────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="overflow-hidden bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            How It Works
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            From message to action in seconds.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Every customer touchpoint flows through a single intelligent pipeline —
            no missed enquiries, no manual steps.
          </p>
        </div>

        {/* Flow diagram */}
        <div ref={ref} className="mt-16 flex flex-col items-center gap-0 lg:flex-row lg:items-stretch lg:justify-center">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.label} className="flex flex-col items-center lg:flex-row lg:items-center">
                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: index * 0.14, ease: "easeOut" }}
                  className="group relative flex w-44 flex-col items-center rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
                >
                  {/* Step number */}
                  <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                    Step {index + 1}
                  </span>

                  {/* Icon circle */}
                  <motion.div
                    animate={inView ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2.2, delay: index * 0.3 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color} text-white shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  <p className="mt-4 text-sm font-semibold leading-tight">{step.label}</p>
                  <p className="mt-1.5 text-[11px] leading-4 text-neutral-400">{step.sub}</p>

                  {/* Animated pulse dot */}
                  <motion.div
                    animate={inView ? { opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.4 }}
                    className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-white"
                  />
                </motion.div>

                {/* Connector arrow */}
                {!isLast && (
                  <div className="flex flex-col items-center lg:flex-row">
                    {/* Vertical connector (mobile) */}
                    <div className="flex flex-col items-center lg:hidden">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.14 + 0.3 }}
                        style={{ transformOrigin: "top" }}
                        className="h-8 w-0.5 bg-gradient-to-b from-white/30 to-white/5"
                      />
                      <motion.div
                        animate={inView ? { y: [0, 4, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.2 }}
                        className="text-neutral-500"
                      >
                        ↓
                      </motion.div>
                      <div className="h-8 w-0.5 bg-gradient-to-b from-white/5 to-white/30" />
                    </div>

                    {/* Horizontal connector (desktop) */}
                    <div className="hidden lg:flex lg:items-center">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.14 + 0.3 }}
                        style={{ transformOrigin: "left" }}
                        className="h-0.5 w-6 bg-gradient-to-r from-white/30 to-white/5"
                      />
                      <motion.div
                        animate={inView ? { x: [0, 3, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.2 }}
                        className="text-xs text-neutral-500"
                      >
                        →
                      </motion.div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.14 + 0.3 }}
                        style={{ transformOrigin: "right" }}
                        className="h-0.5 w-6 bg-gradient-to-r from-white/5 to-white/30"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            End result
          </p>
          <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
            Your business runs smarter — even while you sleep.
          </p>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            AI handles the repetitive work. You focus on what matters.
          </p>
          <div className="mt-6">
            <Button href={contactLinks.whatsapp} target="_blank">
              See it live <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEW: Use Cases ────────────────────────────────────────────────────────────
function UseCases() {
  const [active, setActive] = useState(0);
  const activeCase = useCases[active];

  return (
    <section className="bg-background px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            Industries
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Built for businesses like yours.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            People buy faster when they see themselves. Here's how Sinovex AI
            works inside real industries every day.
          </p>
        </div>

        {/* Industry tab pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {useCases.map((uc, index) => (
            <button
              key={uc.industry}
              onClick={() => setActive(index)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                active === index
                  ? "border-foreground bg-foreground text-background shadow-lg"
                  : "border-border bg-surface text-muted hover:border-muted-light"
              }`}
            >
              <span>{uc.emoji}</span>
              {uc.industry}
            </button>
          ))}
        </div>

        {/* Active case detail */}
        <motion.div
          key={activeCase.industry}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]"
        >
          {/* Main card */}
          <div className={`rounded-[2rem] border ${activeCase.border} ${activeCase.color} p-10`}>
            <span className="text-5xl">{activeCase.emoji}</span>
            <p className={`mt-4 text-sm font-bold uppercase tracking-[0.2em] ${activeCase.accent}`}>
              {activeCase.industry}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl">
              {activeCase.headline}
            </h3>
            <p className="mt-5 text-base leading-7 text-muted">{activeCase.description}</p>

            <div className="mt-8 space-y-3">
              {activeCase.wins.map((win, i) => (
                <motion.div
                  key={win}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{win}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <Button href={contactLinks.whatsapp} target="_blank">
                Talk to us about {activeCase.industry} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Side panel — all industries */}
          <div className="flex flex-col gap-3">
            {useCases.map((uc, index) => (
              <button
                key={uc.industry}
                onClick={() => setActive(index)}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  active === index
                    ? `${uc.border} ${uc.color} shadow-md`
                    : "border-border bg-surface hover:border-muted-light hover:bg-card-hover"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{uc.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{uc.industry}</p>
                    <p className="text-xs text-muted">{uc.headline}</p>
                  </div>
                  {active === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"
                    >
                      <Check className="h-3 w-3" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEW: Results ──────────────────────────────────────────────────────────────
function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-surface px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            Results
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            What changes when AI runs your business.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Real outcomes. Not just features.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
                className="group rounded-[2rem] bg-black p-8 text-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:bg-white group-hover:text-black">
                  <Icon className="h-6 w-6" />
                </div>

                <motion.p
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.25, ease: "backOut" }}
                  className="mt-6 text-5xl font-bold tracking-[-0.06em]"
                >
                  {result.stat}
                </motion.p>

                <p className="mt-3 text-base font-semibold">{result.label}</p>
                <p className="mt-2 text-sm leading-5 text-neutral-400">{result.detail}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-border bg-background p-10 text-center"
        >
          <p className="text-xl font-semibold leading-8 tracking-[-0.03em] text-foreground">
            "Never miss a lead again. Never lose a booking. Never leave a customer
            waiting." — That's what Sinovex AI makes possible.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={contactLinks.whatsapp} target="_blank">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button dark={false} href={contactLinks.email}>
              Email us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Existing sections (unchanged) ────────────────────────────────────────────

function Hero({ setPage }) {
  return (
    <section id="home" className="relative overflow-hidden bg-background px-6 pt-24 text-foreground">
      <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-10 top-72 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI systems for modern businesses
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.06em] sm:text-6xl lg:text-[4.6rem]">
            Build smarter customer support, sales, and automation with AI.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            Sinovex AI builds premium AI WhatsApp bots, website AI assistants, AI voice systems,
            and business automations for companies that want to save time, reply faster, and grow smarter.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Button href={contactLinks.whatsapp} target="_blank">
              Start on WhatsApp <ArrowRight className="h-4 w-4" />
            </Button>
            <Button dark={false} onClick={() => setPage("pricing")}>
              View Pricing
            </Button>
          </div>

          <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
            {["Sinhala + English AI", "Business-ready systems", "Custom automation"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-surface p-3 text-sm font-semibold text-muted shadow-sm"
              >
                <Check className="mb-2 h-4 w-4" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] bg-surface p-3 shadow-2xl shadow-neutral-300/20"
        >
          <AutoCompanyPreview />
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-surface px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Services</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Business-ready AI systems for real companies.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            We design AI tools that help businesses reply faster, reduce manual work, capture more
            leads, and deliver better customer experiences.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[2rem] bg-background p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{service.text}</p>
                <div className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium text-muted">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-background px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            Why Sinovex AI
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Not just chatbots. Complete AI business systems.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            We focus on practical AI systems that connect with your real business process: customer
            messages, bookings, orders, calls, reports, follow-ups, and internal workflows.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={contactLinks.whatsapp} target="_blank">
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button dark={false} href={contactLinks.email}>
              Email Us
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { icon: ShieldCheck, title: "Professional setup", text: "Clean, branded, and business-ready systems." },
            { icon: MessageCircle, title: "Local language support", text: "Sinhala and English customer communication." },
            { icon: Workflow, title: "Workflow automation", text: "Connect AI with your real business tasks." },
            { icon: Zap, title: "Fast launch", text: "Start small, then scale with advanced features." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] bg-surface p-7 shadow-sm">
                <Icon className="h-7 w-7" />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-surface px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Process</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            From idea to working AI system.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            We build in clear steps, so your AI system is not random. It is planned, tested,
            launched, and improved.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-[2rem] border border-border bg-surface p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-5 text-sm leading-6 text-muted">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ setPage }) {
  return (
    <section id="contact" className="bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Contact</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Build your next AI system with Sinovex AI.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Tell us what your business does and what you want to automate. We'll help you choose
          the right AI system and package.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            <Phone className="h-4 w-4" />
            WhatsApp {DISPLAY_PHONE}
          </a>
          <a
            href={contactLinks.email}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
          <button
            onClick={() => setPage("pricing")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Pricing
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-14 grid gap-5 text-left md:grid-cols-3">
          {[
            { title: "WhatsApp", value: DISPLAY_PHONE, href: contactLinks.whatsapp },
            { title: "Email", value: EMAIL, href: contactLinks.email },
            { title: "Services", value: "AI bots, voice agents, automations", href: "#services" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <p className="text-sm text-neutral-400">{item.title}</p>
              <p className="mt-3 text-lg font-semibold">{item.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Apple-style Footer ─────────────────────────────────────────────────────
function SiteFooter({ setPage }) {
  const footerNav = [
    {
      heading: "Products",
      links: [
        { label: "AI WhatsApp Bot", page: "whatsapp-ai" },
        { label: "Website AI Assistant", page: "website-ai" },
        { label: "AI Voice System", page: "voice-ai" },
        { label: "Business Automation", page: "automation-ai" },
        { label: "SinexaChat", page: "sinexa-chat" },
      ],
    },
    {
      heading: "Demos",
      links: [
        { label: "WhatsApp Demo", page: "whatsapp-demo" },
        { label: "Website Demo", page: "website-demo" },
        { label: "Voice Demo", page: "voice-demo" },
        { label: "Automation Demo", page: "automation-demo" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Services", page: "services" },
        { label: "Pricing", page: "pricing" },
        { label: "Process", page: "process" },
        { label: "Contact", page: "contact" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "WhatsApp", href: contactLinks.whatsapp },
        { label: "Email", href: contactLinks.email },
        { label: `Call ${DISPLAY_PHONE}`, href: contactLinks.phone },
      ],
    },
  ];

  const legalLinks = ["Privacy Policy", "Terms of Use", "Cookie Policy"];

  return (
    <footer className="border-t border-border bg-background px-6 pt-10 pb-6 text-sm text-muted">
      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl">
        <p className="text-xs leading-5 text-muted">
          Sinovex AI provides AI-powered systems for customer support, lead management, and business automation.
          Features, availability, and pricing may vary depending on your plan and region. All AI systems are
          custom-configured for each business.
        </p>

        <hr className="my-6 border-border" />

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.heading}>
              <p className="mb-3 text-xs font-semibold text-foreground">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="transition hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <button
                        onClick={() => setPage(link.page)}
                        className="text-left transition hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-6 border-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-muted">
            Copyright © {new Date().getFullYear()} Sinovex AI. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {legalLinks.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <button className="transition hover:text-foreground">{item}</button>
                {i < legalLinks.length - 1 && (
                  <span className="text-border">|</span>
                )}
              </span>
            ))}
            <span className="text-border">|</span>
            <span className="text-muted">Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  if (page === "sinexa-chat") return <SinexaChat logo={logo} setPage={setPage} />;
  if (page === "pricing") return <Pricing logo={logo} setPage={setPage} />;
  if (page === "whatsapp-ai") return <WhatsAppAIProduct logo={logo} setPage={setPage} />;
  if (page === "website-ai") return <WebsiteAIProduct logo={logo} setPage={setPage} />;
  if (page === "voice-ai") return <VoiceAIProduct logo={logo} setPage={setPage} />;
  if (page === "automation-ai") return <AutomationAIProduct logo={logo} setPage={setPage} />;
  if (page === "whatsapp-demo") return <WhatsAppDemo logo={logo} setPage={setPage} />;
  if (page === "website-demo") return <PlatformDemo platform="website" logo={logo} setPage={setPage} />;
  if (page === "voice-demo") return <PlatformDemo platform="voice" logo={logo} setPage={setPage} />;
  if (page === "automation-demo") return <PlatformDemo platform="automation" logo={logo} setPage={setPage} />;

  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="home" />
      <Hero setPage={setPage} />
      <Services />
      <HowItWorks />
      <UseCases />
      <WhyChoose />
      <Results />
      <Process />
      <Contact setPage={setPage} />
      <SiteFooter setPage={setPage} />
    </main>
  );
}