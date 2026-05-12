// ==========================
// App.jsx
// ==========================

import React, { useState } from "react";
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
  Play,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const WHATSAPP_NUMBER = "94706857171";
const DISPLAY_PHONE = "070 6857171";
const EMAIL = "hello@sinovexai.com";
const COMPANY_VIDEO = "/company-preview.mp4";

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

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);

  const goHome = () => {
    setPage("home");
    setOpen(false);
  };

  const goPricing = () => {
    setPage("pricing");
    setOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={goHome} className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center overflow-visible rounded-3xl bg-transparent">
            <img
              src={logo}
              alt="Sinovex AI"
              className="h-[90%] w-[90%] object-contain scale-125 drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-150"
            />
          </div>

          <div className="text-left">
            <p className="text-xl font-bold tracking-tight text-neutral-950">
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

            <button
              onClick={goPricing}
              className="text-left text-neutral-700"
            >
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

function Hero({ onWatchDemo, setPage }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f5f5f7] px-6 pt-40 text-black"
    >
      <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-10 top-72 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI systems for modern businesses
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Build smarter customer support, sales, and automation with AI.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Sinovex AI builds premium AI WhatsApp bots, website AI assistants,
            AI voice systems, and business automations for companies that want
            to save time, reply faster, and grow smarter.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={contactLinks.whatsapp} target="_blank">
              Start on WhatsApp <ArrowRight className="h-4 w-4" />
            </Button>

            <Button dark={false} onClick={() => setPage("pricing")}>
              View Pricing
            </Button>

            <Button dark={false} onClick={onWatchDemo}>
              <Play className="h-4 w-4" /> Watch Demo
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              "Sinhala + English AI",
              "Business-ready systems",
              "Custom automation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-700 shadow-sm"
              >
                <Check className="mb-2 h-5 w-5" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.8rem] bg-white p-4 shadow-2xl shadow-neutral-300/40"
        >
          <div className="overflow-hidden rounded-[2.2rem] bg-black">
            <div className="flex items-center justify-between px-6 py-5 text-white">
              <div>
                <p className="text-sm text-neutral-400">Company Preview</p>
                <h2 className="text-2xl font-semibold">
                  See Sinovex AI in action
                </h2>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                PREVIEW
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden bg-neutral-950">
              <video
                className="h-full w-full object-cover"
                src={COMPANY_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                controls
                poster="/company-preview-poster.jpg"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-300">
                    AI Automation Demo
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    WhatsApp bots • Voice agents • Business workflows
                  </p>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl sm:flex">
                  <Play className="h-5 w-5 fill-black" />
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-3">
              {["24/7 AI replies", "Lead capture", "Smart automation"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-neutral-300"
                  >
                    <Check className="mb-2 h-4 w-4 text-white" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
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

                <h3 className="mt-8 text-xl font-semibold">
                  {service.title}
                </h3>

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
            {
              title: "Email",
              value: EMAIL,
              href: contactLinks.email,
            },
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

function DemoPage({ onBack }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-8 text-black">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-neutral-100"
        >
          ← Back
        </button>

        <section className="py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl"
          >
            Sinovex AI Demo
          </motion.h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Showcase your AI WhatsApp bots, website assistants, voice systems,
            and automations here.
          </p>
        </section>

        <div className="rounded-[2.5rem] bg-white p-4 shadow-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-black">
            <video
              className="aspect-video w-full object-cover"
              src={COMPANY_VIDEO}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={contactLinks.whatsapp} target="_blank">
            Contact on WhatsApp
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "pricing") {
    return <Pricing logo={logo} setPage={setPage} />;
  }

  if (page === "demo") {
    return <DemoPage onBack={() => setPage("home")} />;
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar setPage={setPage} />
      <Hero onWatchDemo={() => setPage("demo")} setPage={setPage} />
      <Services />
      <WhyChoose />
      <Process />
      <Contact setPage={setPage} />
    </main>
  );
}