// ==========================
// App.jsx
// ==========================

import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import Pricing from "./Pricing";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
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

function Button({ children, dark = true, onClick, href, target }) {
  const styles = dark
    ? "bg-black text-white hover:bg-neutral-800"
    : "bg-white text-black border border-neutral-200 hover:bg-neutral-100";

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
    <div className="flex items-center gap-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
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
          className="h-1.5 w-1.5 rounded-full bg-neutral-500"
        />
      ))}
    </div>
  );
}

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);

  const goHome = () => {
    setPage("home");
    setOpen(false);
    window.history.replaceState(null, "", window.location.pathname);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const goPricing = () => {
    setPage("pricing");
    setOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <button onClick={goHome} className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-visible rounded-3xl bg-transparent">
            <img
              src={logo}
              alt="Sinovex AI"
              className="h-[90%] w-[90%] object-contain scale-125 drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-150"
            />
          </div>

          <div className="text-left">
            <p className="text-lg font-bold tracking-tight text-neutral-950">
              Sinovex AI
            </p>
            <p className="text-sm text-neutral-500">
              AI Solutions & Automation
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={goHome}
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            Home
          </button>
          <a
            href="#services"
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            Services
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            Process
          </a>
          <button
            onClick={goPricing}
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            Pricing
          </button>
          <a
            href="#contact"
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            Contact
          </a>
        </nav>

        <div className="hidden md:block">
          <Button href={contactLinks.whatsapp} target="_blank">
            contact us
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <button onClick={goHome} className="text-left text-neutral-700">
              Home
            </button>
            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="text-neutral-700"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={() => setOpen(false)}
              className="text-neutral-700"
            >
              Process
            </a>
            <button onClick={goPricing} className="text-left text-neutral-700">
              Pricing
            </button>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-neutral-700"
            >
              Contact
            </a>
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
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
                className={`mt-2 flex ${
                  role === "ai" ? "justify-end" : "justify-start"
                }`}
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

              <p className="text-[10px] font-bold text-neutral-500">
                businesswebsite.com
              </p>

              <span className="rounded-full bg-black px-2 py-1 text-[10px] text-white">
                AI Chat
              </span>
            </div>

            <div className="flex flex-1 flex-col rounded-2xl bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-neutral-500">
                  Website Assistant
                </p>

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
                    className={`mt-2 flex ${
                      role === "ai" ? "justify-end" : "justify-start"
                    }`}
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

            <p className="mt-3 text-xs text-neutral-400">
              Incoming customer call
            </p>
            <h3 className="mt-1 text-xl font-bold">AI Voice Agent</h3>
          </div>

          <div className="mt-5 flex items-end justify-center gap-2">
            {[25, 42, 62, 35, 54, 72, 38, 58, 30].map((height, index) => (
              <motion.div
                key={index}
                animate={{ height: [height, height + 22, height] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  delay: index * 0.07,
                  ease: "easeInOut",
                }}
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
            “Hello, this is Sinovex AI assistant. I can help with bookings,
            services, and customer support.”
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
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.2,
                }}
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

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {item.title}
            </h3>

            <p className="mt-3 text-xs leading-5 text-neutral-300">
              {item.description}
            </p>

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
                  <span className="text-xs font-medium text-neutral-200">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                System status
              </p>
              <p className="mt-1 text-xs font-semibold text-white">
                Running smoothly
              </p>
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
              <p className="text-[10px] font-bold leading-tight">
                {system.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Hero({ setPage }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f5f5f7] px-6 pt-24 text-black"
    >
      <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-10 top-72 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI systems for modern businesses
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.06em] sm:text-6xl lg:text-[4.6rem]">
            Build smarter customer support, sales, and automation with AI.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">
            Sinovex AI builds premium AI WhatsApp bots, website AI assistants,
            AI voice systems, and business automations for companies that want
            to save time, reply faster, and grow smarter.
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
            {[
              "Sinhala + English AI",
              "Business-ready systems",
              "Custom automation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 bg-white p-3 text-sm font-semibold text-neutral-700 shadow-sm"
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
          className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-neutral-300/40"
        >
          <AutoCompanyPreview />
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Services
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Business-ready AI systems for real companies.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            We design AI tools that help businesses reply faster, reduce manual
            work, capture more leads, and deliver better customer experiences.
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
                className="rounded-[2rem] bg-[#f5f5f7] p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-8 text-xl font-semibold">{service.title}</h3>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {service.text}
                </p>

                <div className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium text-neutral-700">
                        {point}
                      </span>
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
    <section className="bg-[#f5f5f7] px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Why Sinovex AI
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Not just chatbots. Complete AI business systems.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            We focus on practical AI systems that connect with your real
            business process: customer messages, bookings, orders, calls,
            reports, follow-ups, and internal workflows.
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
            {
              icon: ShieldCheck,
              title: "Professional setup",
              text: "Clean, branded, and business-ready systems.",
            },
            {
              icon: MessageCircle,
              title: "Local language support",
              text: "Sinhala and English customer communication.",
            },
            {
              icon: Workflow,
              title: "Workflow automation",
              text: "Connect AI with your real business tasks.",
            },
            {
              icon: Zap,
              title: "Fast launch",
              text: "Start small, then scale with advanced features.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] bg-white p-7 shadow-sm"
              >
                <Icon className="h-7 w-7" />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.text}
                </p>
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
    <section id="process" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Process
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            From idea to working AI system.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            We build in clear steps, so your AI system is not random. It is
            planned, tested, launched, and improved.
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
              className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-5 text-sm leading-6 text-neutral-600">
                {step.text}
              </p>
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
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Contact
        </p>

        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Build your next AI system with Sinovex AI.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Tell us what your business does and what you want to automate. We’ll
          help you choose the right AI system and package.
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
            {
              title: "WhatsApp",
              value: DISPLAY_PHONE,
              href: contactLinks.whatsapp,
            },
            { title: "Email", value: EMAIL, href: contactLinks.email },
            {
              title: "Services",
              value: "AI bots, voice agents, automations",
              href: "#services",
            },
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

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "pricing") {
    return <Pricing logo={logo} setPage={setPage} />;
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar setPage={setPage} />
      <Hero setPage={setPage} />
      <Services />
      <WhyChoose />
      <Process />
      <Contact setPage={setPage} />
    </main>
  );
}