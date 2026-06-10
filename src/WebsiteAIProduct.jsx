import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  LayoutDashboard,
  MessageSquareText,
  MousePointerClick,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import SiteNavbar from "./siteNavbar";

const WHATSAPP_NUMBER = "94706857171";
const contactLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const features = [
  {
    icon: MessageSquareText,
    title: "Instant website answers",
    text: "Visitors ask about services, pricing, packages, availability or process and the assistant replies immediately.",
  },
  {
    icon: Search,
    title: "Product/service guidance",
    text: "The assistant recommends the right service by asking useful questions instead of dumping random information.",
  },
  {
    icon: Users,
    title: "Lead qualification",
    text: "Collect name, phone, company, budget, project goal and urgency before sending the lead to your team.",
  },
  {
    icon: MousePointerClick,
    title: "CTA direction",
    text: "Push serious visitors toward WhatsApp, email, pricing, booking pages or a consultation request.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard ready",
    text: "Upgrade with analytics for visitor questions, popular products, lead sources and conversion data.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled answers",
    text: "The assistant follows your business data, tone and rules so it does not invent offers or wrong details.",
  },
];

const journey = [
  ["Visitor lands", "AI greets them with helpful guidance."],
  ["Visitor asks", "Assistant understands the requirement."],
  ["AI recommends", "Best product or service is suggested."],
  ["Lead captured", "Contact details are saved and sent."],
];

function Button({ children, onClick, href, dark = true }) {
  const className = dark
    ? "bg-foreground text-background hover:opacity-90"
    : "border border-border bg-surface text-foreground hover:opacity-90";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}

function WebsiteMockup() {
  const messages = [
    ["visitor", "What AI service is best for my shop?"],
    ["ai", "For a shop, I recommend WhatsApp AI first. It can answer prices, stock, delivery and orders."],
    ["visitor", "Can I see a package?"],
    ["ai", "Sure. I can explain the starter package and collect your details for a free demo."],
  ];

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-3 shadow-2xl shadow-neutral-300/40">
      <div className="overflow-hidden rounded-[1.6rem] border border-neutral-200 bg-[#f5f5f7]">
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <div className="ml-4 rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-semibold text-neutral-500">
            sinovexai.com
          </div>
        </div>

        <div className="grid min-h-[460px] gap-4 p-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.4rem] bg-black p-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-neutral-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI active
            </div>
            <h3 className="mt-8 text-4xl font-semibold tracking-[-0.06em]">
              Website that sells while you sleep.
            </h3>
            <p className="mt-4 text-sm leading-6 text-neutral-300">
              The assistant explains your product, qualifies leads and sends warm customers to WhatsApp.
            </p>
            <div className="mt-8 grid gap-3">
              {["Answer services", "Recommend package", "Capture lead"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <Check className="h-4 w-4" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-[1.4rem] bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Website AI Assistant</p>
                <p className="text-[11px] text-neutral-500">online • sales mode</p>
              </div>
            </div>

            <div className="flex-1 py-3">
              {messages.map(([role, text], index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.18 }}
                  className={`mb-3 flex ${role === "ai" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      role === "ai" ? "bg-black text-white" : "bg-neutral-100 text-black"
                    }`}
                  >
                    {text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-400">
              Ask about services...
              <Send className="ml-auto h-4 w-4 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebsiteAIProduct({ logo, setPage }) {
  return (
    <main className="min-h-screen bg-surface text-foreground">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="website-ai" />

      <section className="relative overflow-hidden bg-background px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold shadow-sm">
              <Globe className="h-4 w-4" />
              Website AI Assistant
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
              Turn your website into a smart sales assistant.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              A premium AI chat experience for your website. It explains your services, recommends the best package, answers questions, collects leads and guides visitors to WhatsApp or email.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={() => setPage("website-demo")}>
                Try website demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button dark={false} href={contactLink}>
                Book free setup call
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <WebsiteMockup />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">Why it works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Your best salesperson should be on every page.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              People leave websites when they cannot find answers fast. Website AI keeps them engaged, helps them choose and turns curiosity into leads.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[2rem] bg-background p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">Visitor journey</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              From landing page to qualified lead.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-300">
              Instead of a static website, give every visitor a guided conversation that feels alive and helpful.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {journey.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-surface p-10 text-center shadow-sm">
          <TrendingUp className="mx-auto h-10 w-10" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Make your website feel premium and intelligent.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Add Website AI to capture more leads from the traffic you already have.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => setPage("website-demo")}>Open live demo</Button>
            <Button dark={false} href={contactLink}>Contact us</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
