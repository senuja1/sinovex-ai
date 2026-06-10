// ==========================
// Pricing.jsx
// ==========================

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Loader2,
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

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8787"
    : "https://sinovexai.com");

const contactLinks = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: `mailto:${EMAIL}`,
  phone: `tel:${DISPLAY_PHONE.replace(/\s/g, "")}`,
};

// Icon mapping from string names (from JSON) to Lucide components
const ICON_MAP = {
  MessageCircle,
  Bot,
  PhoneCall,
  Workflow,
};

// ─── Fallback pricing (used if API fails) ─────────────────────────────────────
const FALLBACK_CATEGORIES = [
  {
    icon: "MessageCircle",
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
    icon: "Bot",
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
    icon: "PhoneCall",
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
    icon: "Workflow",
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

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function PricingSkeleton() {
  return (
    <div className="space-y-16">
      {[1, 2].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-8">
            <div className="h-14 w-14 rounded-2xl bg-surface-dim" />
            <div className="mt-6 h-10 w-72 rounded-2xl bg-surface-dim" />
            <div className="mt-4 h-5 w-96 rounded-xl bg-surface-dim" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-96 rounded-[2.5rem] bg-surface-dim" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`relative flex h-full flex-col rounded-[2.5rem] p-8 shadow-xl transition hover:-translate-y-1 ${
        plan.popular
          ? "bg-foreground text-background"
          : "bg-surface text-foreground"
      }`}
    >
      {plan.popular && (
        <span className="absolute right-6 top-6 rounded-full bg-background px-3 py-1 text-xs font-bold text-foreground">
          POPULAR
        </span>
      )}

      <p
        className={`text-sm font-semibold ${
          plan.popular ? "text-muted" : "text-muted"
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

      <div className={`mt-5 rounded-3xl border p-4 ${
        plan.popular
          ? "border-white/20 bg-white/10 text-background"
          : "border-border bg-surface-dim text-foreground"
      }`}>
        <p className={`text-sm font-medium ${plan.popular ? "text-white/60" : "text-muted"}`}>
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
                plan.popular ? "text-muted-light" : "text-muted"
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
            ? "bg-background text-foreground hover:opacity-90"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        Get Started <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

function PricingCategory({ category }) {
  const Icon = ICON_MAP[category.icon] || Sparkles;

  return (
    <section className="border-t border-border py-20">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
            <Icon className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
            {category.title}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {category.description}
          </p>
        </div>

        <div className="rounded-[2rem] bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
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
                <Check className="h-5 w-5 text-foreground" />

                <span className="text-sm font-medium text-muted">
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
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchPricing() {
      try {
        const res = await fetch(`${API_BASE}/api/pricing`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!cancelled && data.categories) {
          setCategories(data.categories);
        }
      } catch {
        if (!cancelled) {
          setCategories(FALLBACK_CATEGORIES);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPricing();
    return () => { cancelled = true; };
  }, []);

  const pricingCategories = categories || FALLBACK_CATEGORIES;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="pricing" />

      <section id="pricing" className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI pricing for real business growth
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-7xl">
              Simple packages for powerful AI systems.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              Choose a starting package for WhatsApp bots, website AI
              assistants, AI voice agents, and business automation systems.
              Every project can be customized after consultation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                WhatsApp {DISPLAY_PHONE}
              </a>

              <a
                href={contactLinks.email}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </motion.div>

          <div className="mt-20 rounded-[2.5rem] bg-foreground p-8 text-background shadow-2xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-4xl font-bold">4+</p>
                <p className="mt-2 text-sm text-muted-light">
                  AI service categories
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">24/7</p>
                <p className="mt-2 text-sm text-muted-light">
                  Customer automation support
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">Custom</p>
                <p className="mt-2 text-sm text-muted-light">
                  Pricing for advanced systems
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="mt-20">
              <PricingSkeleton />
            </div>
          ) : (
            pricingCategories.map((category) => (
              <PricingCategory key={category.title} category={category} />
            ))
          )}

          <section
            id="pricing-contact"
            className="mt-8 rounded-[3rem] bg-surface p-8 text-center shadow-xl sm:p-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Start your AI project
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">
              Need a custom AI system for your company?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              Tell us your business type, customer flow, and the tasks you want
              to automate. We will recommend the best AI setup for your budget.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                WhatsApp {DISPLAY_PHONE}
              </a>

              <a
                href={contactLinks.email}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>

            <p className="mt-8 text-sm text-muted">
              Note: API fees, WhatsApp provider charges, hosting, and
              third-party platform costs are not included in the setup price.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
