import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Headphones,
  Mic,
  PhoneCall,
  Sparkles,
  UserCheck,
  Volume2,
  Zap,
} from "lucide-react";
import SiteNavbar from "./siteNavbar";

const WHATSAPP_NUMBER = "94706857171";
const contactLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const features = [
  {
    icon: PhoneCall,
    title: "Call answering",
    text: "Your AI voice agent answers missed calls, greets customers and understands what they need.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment booking",
    text: "Collect date, time, service type and customer details before creating a booking summary.",
  },
  {
    icon: UserCheck,
    title: "Lead qualification",
    text: "Ask the right questions and separate serious customers from casual inquiries.",
  },
  {
    icon: Headphones,
    title: "Human handoff",
    text: "Escalate complex or urgent calls to your team with a clear conversation summary.",
  },
  {
    icon: Clock,
    title: "After-hours support",
    text: "Keep answering customer calls even when your staff is busy, closed or unavailable.",
  },
  {
    icon: Volume2,
    title: "Branded voice flow",
    text: "Design a call style that matches your business: friendly, professional, local and clear.",
  },
];

const callFlow = [
  "Customer calls your business number",
  "AI greets and listens to the request",
  "AI checks service, price or booking rules",
  "AI confirms details with the customer",
  "Your team receives a clean call summary",
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

function VoiceMockup() {
  return (
    <div className="relative rounded-[2.2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
      <div className="rounded-[1.8rem] bg-neutral-950 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-neutral-300">Incoming customer call</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em]">AI Voice Agent</h3>
          </div>
          <span className="rounded-full bg-green-400 px-3 py-1 text-xs font-bold text-black">Live</span>
        </div>

        <div className="my-12 text-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0.18)",
                "0 0 0 22px rgba(255,255,255,0)",
                "0 0 0 0 rgba(255,255,255,0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-black"
          >
            <Mic className="h-10 w-10" />
          </motion.div>
          <p className="mt-5 text-sm font-semibold text-neutral-300">Listening and responding...</p>
        </div>

        <div className="flex h-24 items-end justify-center gap-2">
          {[34, 56, 78, 46, 92, 62, 84, 44, 68, 38, 72].map((height, index) => (
            <motion.div
              key={index}
              animate={{ height: [height, height + 28, height] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: index * 0.06, ease: "easeInOut" }}
              className="w-2 rounded-full bg-white"
              style={{ height }}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-3">
          {[
            ["Customer", "I want to book an appointment tomorrow."],
            ["AI", "Sure. What time works best for you?"],
            ["Summary", "Booking intent captured. Follow-up needed."],
          ].map(([role, text], index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">{role}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-200">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VoiceAIProduct({ logo, setPage }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteNavbar logo={logo} setPage={setPage} currentPage="voice-ai" />

      <section className="relative overflow-hidden px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-purple-300" />
              AI Voice System
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
              An AI phone agent that never misses a call.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
              Sinovex AI voice systems answer customer calls, understand requests, explain services, book appointments and send your team a clean call summary.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={() => setPage("voice-demo")}>
                Simulate voice call <ArrowRight className="h-4 w-4" />
              </Button>
              <Button dark={false} href={contactLink}>
                Talk to us
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Call answering", "Booking flow", "Call summaries"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <Check className="mb-3 h-5 w-5 text-purple-300" />
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
            <VoiceMockup />
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-500">The problem</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Missed calls are missed money.
              </h2>
            </div>
            <p className="text-lg leading-8 text-neutral-600">
              Customers call when they are ready to act. If nobody answers, many will move to another business. AI voice keeps your front desk active even when your team is busy.
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
                  className="rounded-[2rem] bg-[#f5f5f7] p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] px-6 py-24 text-black">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-500">Call workflow</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">From ringing phone to team summary.</h2>
            <div className="mt-8 space-y-3">
              {callFlow.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl bg-[#f5f5f7] p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-black p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">Best fit</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Businesses where every call matters.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Clinics", "Salons", "Real estate", "Hotels", "Repair services", "Education"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Check className="mb-3 h-5 w-5 text-purple-300" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <Zap className="mx-auto h-10 w-10 text-purple-300" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Give your business a voice that always answers.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
            Start with a demo call flow and we will design the best voice assistant for your business.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => setPage("voice-demo")}>Open voice demo</Button>
            <Button dark={false} href={contactLink}>Contact Sinovex AI</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
