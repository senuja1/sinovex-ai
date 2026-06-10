import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  Database,
  FileCheck2,
  GitBranch,
  Send,
  Sparkles,
  TimerReset,
  Workflow,
  Zap,
} from "lucide-react";
import SiteNavbar from "./siteNavbar";

const WHATSAPP_NUMBER = "94706857171";
const contactLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const features = [
  {
    icon: Workflow,
    title: "Workflow automation",
    text: "Turn repeated tasks into automated steps that run after a message, form, call or lead arrives.",
  },
  {
    icon: Database,
    title: "CRM updates",
    text: "Save customer details, inquiry type, source, notes and follow-up status without manual copying.",
  },
  {
    icon: BellRing,
    title: "Team notifications",
    text: "Send clean summaries to WhatsApp, email or dashboard so your team knows what to do next.",
  },
  {
    icon: TimerReset,
    title: "Follow-up reminders",
    text: "Schedule reminders and automatic follow-ups so leads do not disappear after the first message.",
  },
  {
    icon: BarChart3,
    title: "Auto reports",
    text: "Generate daily or weekly summaries for leads, bookings, customer questions and team activity.",
  },
  {
    icon: GitBranch,
    title: "Custom logic",
    text: "Build rules for your business: urgent leads, VIP customers, product categories and staff assignment.",
  },
];

const automations = [
  ["New inquiry", "AI identifies the customer request and source."],
  ["Lead record", "Customer details are saved to your CRM or sheet."],
  ["Team alert", "A clean summary is sent to the right person."],
  ["Follow-up", "Reminder or next message is scheduled."],
  ["Report", "Daily business summary is generated."],
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

function AutomationMockup() {
  const steps = [
    ["Lead captured", "WhatsApp inquiry from customer"],
    ["CRM updated", "Name, phone and request stored"],
    ["Follow-up created", "Reminder set for tomorrow"],
    ["Report generated", "Daily summary ready"],
  ];

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-3 shadow-2xl shadow-neutral-300/40">
      <div className="overflow-hidden rounded-[1.6rem] bg-black p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-neutral-400">Automation AI Engine</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em]">Lead-to-action workflow</h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Running</span>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Incoming lead</p>
            <div className="mt-4 rounded-2xl bg-white p-4 text-black">
              <p className="text-sm font-bold">Amaya Silva</p>
              <p className="mt-1 text-xs text-neutral-500">Source: WhatsApp</p>
              <p className="mt-4 text-sm leading-6">Needs appointment and price details for skincare consultation.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">AI decision</p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">High intent lead. Create booking task and notify sales team.</p>
            </div>
          </div>

          <div className="space-y-3">
            {steps.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-4 rounded-[1.2rem] bg-white p-4 text-black"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs text-neutral-500">{text}</p>
                </div>
              </motion.div>
            ))}

            <div className="overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: ["15%", "100%", "15%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="h-2 rounded-full bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AutomationAIProduct({ logo, setPage }) {
  return (
    <main className="min-h-screen bg-surface text-foreground">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="automation-ai" />

      <section className="relative overflow-hidden bg-background px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold shadow-sm">
              <Sparkles className="h-4 w-4" />
              Business Automation
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
              Automate the boring work behind your business.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              Sinovex AI connects customer messages, leads, forms, CRM updates, reports and team notifications into one intelligent workflow that saves hours every week.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={() => setPage("automation-demo")}>
                Run automation demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button dark={false} href={contactLink}>
                Plan my workflow
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <AutomationMockup />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">What it automates</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Less copy-paste. More control.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Your team should not spend the whole day moving details from one place to another. Automation handles the repetitive steps and keeps humans focused on important decisions.
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">Workflow story</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Every inquiry becomes a clear next step.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-300">
              The automation engine does not just reply. It moves work through your business: save, notify, assign, follow up and report.
            </p>
          </div>

          <div className="space-y-3">
            {automations.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            { icon: FileCheck2, title: "Lead operations", text: "Perfect for teams handling many inquiries every day." },
            { icon: Send, title: "Notifications", text: "Send the right message to the right staff member instantly." },
            { icon: BarChart3, title: "Management reports", text: "Give owners simple visibility without manual spreadsheets." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] bg-surface p-8 shadow-sm">
                <Icon className="h-8 w-8" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-surface px-6 py-24 text-foreground">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-black p-10 text-center text-white shadow-2xl">
          <Zap className="mx-auto h-10 w-10 text-orange-300" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Let AI handle your repetitive business workflow.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
            Tell us your current process and we will design the automation path for your business.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setPage("automation-demo")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Run live demo
            </button>
            <Button dark={false} href={contactLink}>Contact Sinovex AI</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
