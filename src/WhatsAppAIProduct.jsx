import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  FileText,
  MessageCircle,
  Mic,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import SiteNavbar from "./siteNavbar";

const WHATSAPP_NUMBER = "94706857171";
const contactLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const features = [
  {
    icon: MessageCircle,
    title: "Sinhala + English replies",
    text: "Customers can message in Sinhala, Singlish or English. The bot replies clearly using your business information.",
  },
  {
    icon: Clock,
    title: "24/7 customer support",
    text: "Answer prices, services, delivery, availability, bookings and FAQs even after your team is offline.",
  },
  {
    icon: Users,
    title: "Lead capture flow",
    text: "Collect name, phone number, business type, requirement, budget and send a clean summary to your team.",
  },
  {
    icon: Mic,
    title: "Voice message ready",
    text: "Upgrade the bot to understand customer voice notes and reply using text or generated voice messages.",
  },
  {
    icon: FileText,
    title: "Product data training",
    text: "Train your bot with product lists, prices, delivery rules, FAQs, documents and service details.",
  },
  {
    icon: ShieldCheck,
    title: "Human handoff",
    text: "When a customer needs a real person, the bot transfers the conversation with context and summary.",
  },
];

const industries = [
  "Restaurants",
  "Salons",
  "Clinics",
  "Online shops",
  "Education institutes",
  "Hotels & tourism",
];

const flow = [
  "Customer sends WhatsApp message",
  "AI understands language and intent",
  "Bot checks your business data",
  "Customer gets instant answer",
  "Lead/order/booking summary goes to team",
];

function Button({ children, onClick, href, dark = true }) {
  const className = dark
    ? "bg-white text-black hover:bg-neutral-200"
    : "border border-white/20 bg-white/5 text-white hover:bg-white/10";

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

function WhatsAppMockup() {
  const chats = [
    ["customer", "Hi, delivery thiyenawada?"],
    ["ai", "ඔව් 👋 Colombo same-day delivery සහ islandwide delivery තියෙනවා."],
    ["customer", "Vitamin C serum price?"],
    ["ai", "Vitamin C serum එක LKR 3,500. Order කරන්නද, නැත්නම් consultation booking එකක් දාන්නද?"],
    ["customer", "Book consultation tomorrow"],
    ["ai", "Sure. Name, phone number, and preferred time එක කියන්න. I will reserve it for you."],
  ];

  return (
    <div className="relative rounded-[2.2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
      <div className="overflow-hidden rounded-[1.8rem] bg-[#0b141a]">
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Sinovex WhatsApp AI</p>
            <p className="text-[11px] text-white/75">online • replies instantly</p>
          </div>
          <Bot className="ml-auto h-5 w-5" />
        </div>

        <div className="min-h-[430px] bg-[#e5ddd5] p-4">
          {chats.map(([role, text], index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.16 }}
              className={`mb-3 flex ${role === "ai" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm ${
                  role === "ai" ? "bg-[#dcf8c6] text-black" : "bg-white text-black"
                }`}
              >
                {text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white p-3">
          <div className="flex-1 rounded-full bg-neutral-100 px-4 py-3 text-sm text-neutral-400">
            Type a customer message...
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
            <Send className="h-5 w-5" />
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -right-5 top-20 hidden rounded-2xl bg-white p-4 text-black shadow-xl lg:block"
      >
        <p className="text-xs font-bold">Lead captured</p>
        <p className="mt-1 text-[11px] text-neutral-500">Name • phone • requirement</p>
      </motion.div>
    </div>
  );
}

export default function WhatsAppAIProduct({ logo, setPage }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="whatsapp-ai" />

      <section className="relative overflow-hidden px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute left-1/2 top-20 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#25D366]/20 blur-3xl" />
        <div className="absolute right-10 top-72 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#25D366]" />
              AI WhatsApp Bot
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
              Your AI employee for WhatsApp.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
              Sinovex AI turns your WhatsApp into a 24/7 sales and support assistant that replies in Sinhala and English, answers customer questions, captures leads, books appointments and hands over serious conversations to your team.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={contactLink}>
                Get free demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button dark={false} onClick={() => setPage("whatsapp-demo")}>
                Try live bot
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Sinhala + English", "24/7 replies", "Lead capture"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <Check className="mb-3 h-5 w-5 text-[#25D366]" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <WhatsAppMockup />
          </motion.div>
        </div>
      </section>

      <section className="bg-surface px-6 py-24 text-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">The pitch</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Stop losing customers because of late replies.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted">
              Most businesses do not lose customers because the product is bad. They lose them because replies are slow. The WhatsApp AI bot answers instantly, collects the right details and keeps the customer moving toward a booking, order or inquiry.
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground p-3 text-background">
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

      <section className="bg-background px-6 py-24 text-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-black p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Message comes in. AI handles the next move.</h2>
            <div className="mt-8 space-y-3">
              {flow.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-surface p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">Perfect for</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Local businesses that get many WhatsApp messages.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry} className="rounded-2xl border border-border bg-background p-4">
                  <Check className="mb-3 h-5 w-5" />
                  <p className="text-sm font-semibold">{industry}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-[#eaf7ee] p-5">
              <p className="text-sm font-semibold text-[#128C7E]">Example result</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Customer asks for price → bot answers → customer asks delivery → bot confirms → customer gives details → team receives order summary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <Zap className="mx-auto h-10 w-10 text-[#25D366]" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Want this on your business WhatsApp?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
            Send your business type and we will show how your AI WhatsApp bot can reply, book, sell and capture leads.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={contactLink}>Message Sinovex AI</Button>
            <Button dark={false} onClick={() => setPage("pricing")}>View pricing</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
