// ==========================
// Pricing.jsx
// ==========================

import {
  ArrowRight,
  Bot,
  Check,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import SiteNavbar from "./siteNavbar";

const WHATSAPP_NUMBER = "94706857171";
const DISPLAY_PHONE = "070 6857171";
const EMAIL = "sinovexai@outlook.com";

const contactLinks = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: `mailto:${EMAIL}`,
  phone: `tel:${DISPLAY_PHONE.replace(/\s/g, "")}`,
};

const pricingCategories = [
  {
    icon: MessageCircle,
    title: "AI WhatsApp Bots",
    description:
      "Automated customer replies, Sinhala/English support, bookings, FAQs, lead capture, and human handoff.",
    plans: [
      {
        name: "Starter Bot",
        setup: "LKR 35,000+",
        monthly: "LKR 12,000/mo",
        tag: "For small businesses",
        features: [
          "FAQ chatbot setup",
          "Sinhala + English replies",
          "Basic business training",
          "Lead capture",
          "Manual human handoff",
          "Monthly improvements",
        ],
      },
      {
        name: "Business Bot",
        setup: "LKR 85,000+",
        monthly: "LKR 25,000/mo",
        tag: "Most popular",
        popular: true,
        features: [
          "Advanced WhatsApp AI bot",
          "Booking/order flow",
          "Customer tagging",
          "Google Sheets or CRM sync",
          "Auto follow-up messages",
          "Priority support",
        ],
      },
      {
        name: "Scale Bot",
        setup: "LKR 180,000+",
        monthly: "Custom",
        tag: "For high-volume teams",
        features: [
          "Custom AI workflows",
          "Multi-agent handoff",
          "API integrations",
          "Dashboard reporting",
          "Team training",
          "Dedicated support",
        ],
      },
    ],
  },
  {
    icon: Bot,
    title: "Website AI Assistants",
    description:
      "Smart AI assistants for websites that answer questions, collect leads, guide users, and improve conversions.",
    plans: [
      {
        name: "Web Starter",
        setup: "LKR 25,000+",
        monthly: "LKR 8,000/mo",
        tag: "For simple websites",
        features: [
          "Website chatbot widget",
          "Basic FAQ training",
          "Lead collection",
          "Contact form routing",
          "Mobile responsive UI",
          "Monthly updates",
        ],
      },
      {
        name: "Web Business",
        setup: "LKR 60,000+",
        monthly: "LKR 18,000/mo",
        tag: "For service brands",
        popular: true,
        features: [
          "Custom branded AI assistant",
          "Product/service training",
          "Lead qualification",
          "Analytics summary",
          "WhatsApp/email routing",
          "Priority optimization",
        ],
      },
      {
        name: "Web Enterprise",
        setup: "LKR 120,000+",
        monthly: "Custom",
        tag: "For serious companies",
        features: [
          "Advanced website AI assistant",
          "Multi-page knowledge base",
          "CRM integration",
          "Admin dashboard",
          "Custom prompts and flows",
          "Dedicated support",
        ],
      },
    ],
  },
  {
    icon: PhoneCall,
    title: "AI Voice Systems",
    description:
      "AI voice agents that answer calls, qualify leads, book appointments, and reduce missed customer inquiries.",
    plans: [
      {
        name: "Voice Starter",
        setup: "LKR 75,000+",
        monthly: "LKR 25,000/mo",
        tag: "For call handling",
        features: [
          "Basic AI voice agent",
          "Business info training",
          "Call answering script",
          "Lead note summary",
          "Call logs",
          "Monthly tuning",
        ],
      },
      {
        name: "Voice Business",
        setup: "LKR 180,000+",
        monthly: "LKR 55,000/mo",
        tag: "For active sales teams",
        popular: true,
        features: [
          "Advanced AI call agent",
          "Appointment booking",
          "Customer qualification",
          "Call summaries",
          "WhatsApp/email follow-up",
          "Priority support",
        ],
      },
      {
        name: "Voice Enterprise",
        setup: "LKR 350,000+",
        monthly: "Custom",
        tag: "For large operations",
        features: [
          "Custom voice workflows",
          "CRM/call-center integration",
          "Multiple voice agents",
          "Advanced reporting",
          "Custom call scripts",
          "Dedicated implementation",
        ],
      },
    ],
  },
  {
    icon: Workflow,
    title: "Business Automations",
    description:
      "Automate repetitive tasks like reports, CRM updates, notifications, staff workflows, and customer follow-ups.",
    plans: [
      {
        name: "Automation Starter",
        setup: "LKR 45,000+",
        monthly: "LKR 10,000/mo",
        tag: "For simple workflows",
        features: [
          "1 automation workflow",
          "Google Sheets integration",
          "Email/WhatsApp alerts",
          "Basic dashboard",
          "Error monitoring",
          "Monthly support",
        ],
      },
      {
        name: "Automation Pro",
        setup: "LKR 120,000+",
        monthly: "LKR 30,000/mo",
        tag: "For growing teams",
        popular: true,
        features: [
          "3–5 automation workflows",
          "CRM/task automation",
          "Report generation",
          "Customer follow-ups",
          "Admin dashboard",
          "Priority support",
        ],
      },
      {
        name: "Automation Enterprise",
        setup: "LKR 250,000+",
        monthly: "Custom",
        tag: "For full systems",
        features: [
          "Custom automation system",
          "Multiple integrations",
          "Role-based dashboard",
          "Advanced reporting",
          "Team training",
          "Dedicated maintenance",
        ],
      },
    ],
  },
];

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`relative flex h-full flex-col rounded-[2.5rem] p-8 shadow-xl transition hover:-translate-y-1 ${
        plan.popular ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {plan.popular && (
        <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
          POPULAR
        </span>
      )}

      <p
        className={`text-sm font-semibold ${
          plan.popular ? "text-neutral-300" : "text-neutral-500"
        }`}
      >
        {plan.tag}
      </p>

      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
        {plan.name}
      </h3>

      <div className="mt-7">
        <p className="text-sm font-medium opacity-70">Setup from</p>

        <p className="mt-2 text-4xl font-bold tracking-[-0.04em]">
          {plan.setup}
        </p>
      </div>

      <div className="mt-5 rounded-3xl border border-black/10 bg-neutral-100 p-4 text-black">
        <p className="text-sm font-medium text-neutral-500">
          Maintenance from
        </p>

        <p className="mt-1 text-2xl font-bold">{plan.monthly}</p>
      </div>

      <div className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0" />

            <span
              className={`text-sm leading-6 ${
                plan.popular ? "text-neutral-200" : "text-neutral-700"
              }`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <a
        href={contactLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
          plan.popular
            ? "bg-white text-black hover:bg-neutral-200"
            : "bg-black text-white hover:bg-neutral-800"
        }`}
      >
        Get Started <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

function PricingCategory({ category }) {
  const Icon = category.icon;

  return (
    <section className="border-t border-neutral-200 py-20">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
            <Icon className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {category.title}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            {category.description}
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Included with every package
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Business consultation",
              "Professional setup",
              "Mobile-friendly experience",
              "Support & improvements",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="h-5 w-5" />

                <span className="text-sm font-medium text-neutral-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {category.plans.map((plan, index) => (
          <PlanCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}

export default function Pricing({ logo, setPage }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="pricing" />

      <section id="pricing" className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI pricing for real business growth
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
              Simple packages for powerful AI systems.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Choose a starting package for WhatsApp bots, website AI
              assistants, AI voice agents, and business automation systems.
              Every project can be customized after consultation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <Phone className="h-4 w-4" />
                WhatsApp {DISPLAY_PHONE}
              </a>

              <a
                href={contactLinks.email}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-100"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </motion.div>

          <div className="mt-20 rounded-[2.5rem] bg-black p-8 text-white shadow-2xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-4xl font-bold">4+</p>
                <p className="mt-2 text-sm text-neutral-300">
                  AI service categories
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">24/7</p>
                <p className="mt-2 text-sm text-neutral-300">
                  Customer automation support
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">Custom</p>
                <p className="mt-2 text-sm text-neutral-300">
                  Pricing for advanced systems
                </p>
              </div>
            </div>
          </div>

          {pricingCategories.map((category) => (
            <PricingCategory key={category.title} category={category} />
          ))}

          <section
            id="pricing-contact"
            className="mt-8 rounded-[3rem] bg-white p-8 text-center shadow-xl sm:p-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Start your AI project
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Need a custom AI system for your company?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Tell us your business type, customer flow, and the tasks you want
              to automate. We will recommend the best AI setup for your budget.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <Phone className="h-4 w-4" />
                WhatsApp {DISPLAY_PHONE}
              </a>

              <a
                href={contactLinks.email}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-100"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>

            <p className="mt-8 text-sm text-neutral-500">
              Note: API fees, WhatsApp provider charges, hosting, and
              third-party platform costs are not included in the setup price.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
