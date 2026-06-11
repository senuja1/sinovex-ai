// ==========================
// siteNavbar.jsx
// Compact Apple-style Mega Navbar + Bigger Brand + Working Search
// ==========================

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Globe2,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  Search,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "94706857171";

const productMainLinks = [
  {
    title: "Sinexa AI Chat",
    desc: "Ask anything, read files and images",
    page: "sinexa-chat",
    icon: Sparkles,
    keywords: "sinexa ai chat assistant ask anything image file reader chatbot gpt grok",
  },
  {
    title: "AI WhatsApp Bot",
    desc: "Sinhala + English customer replies",
    page: "whatsapp-ai",
    icon: MessageCircle,
    keywords: "whatsapp bot ai sinhala english customer support chat automation",
  },
  {
    title: "Website AI Assistant",
    desc: "Smart chat for your website",
    page: "website-ai",
    icon: Bot,
    keywords: "website ai assistant chatbot visitor support sales lead capture",
  },
  {
    title: "AI Voice System",
    desc: "Call answering and booking AI",
    page: "voice-ai",
    icon: Mic,
    keywords: "voice ai call phone appointment booking agent",
  },
  {
    title: "Business Automation",
    desc: "CRM, reports, follow-ups, workflows",
    page: "automation-ai",
    icon: Workflow,
    keywords: "automation crm reports workflow follow ups business system",
  },
];

const startLinks = [
  { title: "Try Sinexa Chat", page: "sinexa-chat" },
  { title: "Book Free Demo", page: "contact" },
  { title: "View Pricing", page: "pricing" },
  { title: "Start WhatsApp Bot", page: "whatsapp-ai" },
  { title: "Build Custom AI System", page: "contact" },
  { title: "Talk to Sinovex AI", external: `https://wa.me/${WHATSAPP_NUMBER}` },
];

const moreLinks = [
  { title: "Sinexa AI Chat", page: "sinexa-chat" },
  { title: "WhatsApp AI Demo", page: "whatsapp-demo" },
  { title: "Website AI Demo", page: "website-demo" },
  { title: "Voice AI Demo", page: "voice-demo" },
  { title: "Automation Demo", page: "automation-demo" },
  { title: "How It Works", page: "process" },
  { title: "Contact Support", page: "contact" },
];

const searchItems = [
  ...productMainLinks.map((item) => ({
    ...item,
    type: "Product",
  })),
  {
    title: "Pricing",
    desc: "See SinovexAI packages",
    page: "pricing",
    type: "Page",
    icon: Sparkles,
    keywords: "pricing packages price cost",
  },
  {
    title: "Services",
    desc: "Explore all AI services",
    page: "services",
    type: "Section",
    icon: Globe2,
    keywords: "services ai systems",
  },
  {
    title: "Process",
    desc: "How we build your system",
    page: "process",
    type: "Section",
    icon: Workflow,
    keywords: "process how it works build launch",
  },
  {
    title: "Contact",
    desc: "Talk to SinovexAI",
    page: "contact",
    type: "Section",
    icon: Phone,
    keywords: "contact whatsapp email demo",
  },
  {
    title: "WhatsApp AI Demo",
    desc: "Test the WhatsApp bot demo",
    page: "whatsapp-demo",
    type: "Demo",
    icon: MessageCircle,
    keywords: "demo whatsapp bot test live",
  },
  {
    title: "Website AI Demo",
    desc: "Test the website assistant demo",
    page: "website-demo",
    type: "Demo",
    icon: Bot,
    keywords: "demo website chatbot assistant",
  },
  {
    title: "Voice AI Demo",
    desc: "Try the voice AI demo",
    page: "voice-demo",
    type: "Demo",
    icon: Mic,
    keywords: "demo voice call ai",
  },
  {
    title: "Automation Demo",
    desc: "Run the automation demo",
    page: "automation-demo",
    type: "Demo",
    icon: Workflow,
    keywords: "demo automation workflow crm",
  },
];

export default function SiteNavbar({ logo, setPage }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const goToPage = (page) => {
    setMegaOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setSearchText("");

    if (page === "contact" || page === "services" || page === "process") {
      setPage("home");

      setTimeout(() => {
        const section = document.getElementById(page);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);

      return;
    }

    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSearch = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    if (!q) return searchItems.slice(0, 7);

    return searchItems.filter((item) => {
      const text = `${item.title} ${item.desc} ${item.type} ${item.keywords}`.toLowerCase();
      return text.includes(q);
    });
  }, [searchText]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMegaOpen(false);
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const navItemClass =
    "text-[13px] font-semibold text-muted transition hover:text-foreground";

  return (
    <>
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className="fixed left-0 top-0 z-[999] w-full border-b border-border bg-surface/80 backdrop-blur-2xl"
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => goToPage("home")}
            className="flex items-center gap-3"
          >
            {logo ? (
              <img
                src={logo}
                alt="Sinovex AI"
                className="h-12 w-12 object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            <span className="text-[17px] font-extrabold tracking-[-0.045em] text-foreground sm:block">
              SinovexAI
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            <button onClick={() => goToPage("home")} className={navItemClass}>
              Home
            </button>

            <button
              onMouseEnter={() => {
                setSearchOpen(false);
                setMegaOpen(true);
              }}
              onClick={() => {
                setSearchOpen(false);
                setMegaOpen((v) => !v);
              }}
              className={`${navItemClass} inline-flex items-center gap-1`}
            >
              Products
              <ChevronDown
                className={`h-3.5 w-3.5 transition ${
                  megaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => goToPage("services")}
              className={navItemClass}
            >
              Services
            </button>

            <button
              onClick={() => goToPage("pricing")}
              className={navItemClass}
            >
              Pricing
            </button>

            <button
              onClick={() => goToPage("process")}
              className={navItemClass}
            >
              Process
            </button>

            <button
              onClick={() => goToPage("contact")}
              className={navItemClass}
            >
              Contact
            </button>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={() => goToPage("sinexa-chat")}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-4 py-2 text-xs font-extrabold text-white shadow-[0_0_28px_rgba(99,102,241,0.55)] ring-1 ring-white/20 transition hover:scale-[1.03]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-90 transition group-hover:opacity-100" />
              <span className="absolute -left-8 top-0 h-full w-8 rotate-12 bg-white/40 blur-sm transition group-hover:left-full group-hover:duration-700" />
              <Sparkles className="relative h-3.5 w-3.5" />
              <span className="relative">Sinexa</span>
            </button>

            <button
              onClick={() => {
                setMegaOpen(false);
                setSearchOpen(true);
              }}
              className="text-muted transition hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background transition hover:opacity-90"
            >
              <Phone className="h-3.5 w-3.5" />
              Demo
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>

        {/* Compact Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              onMouseEnter={() => setMegaOpen(true)}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.23, ease: "easeOut" }}
              className="hidden max-h-[calc(100vh-56px)] overflow-y-auto border-t border-border bg-background shadow-2xl shadow-black/10 lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1.45fr_1fr_1fr] gap-12 px-6 py-5">
                <div>
                  <p className="mb-3 text-xs font-semibold text-muted">
                    Explore Products
                  </p>

                  <div className="space-y-3">
                    {productMainLinks.map((product) => {
                      const Icon = product.icon;

                      return (
                        <button
                          key={product.title}
                          onClick={() => goToPage(product.page)}
                          className="group block text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-foreground shadow-sm transition group-hover:scale-105 group-hover:bg-foreground group-hover:text-background">
                              <Icon className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-[23px] font-semibold leading-none tracking-[-0.055em] text-foreground">
                                {product.title}
                              </p>
                              <p className="mt-1.5 text-xs text-muted">
                                {product.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-muted">
                    Start with Sinovex
                  </p>

                  <div className="space-y-2.5">
                    {startLinks.map((link) =>
                      link.external ? (
                        <a
                          key={link.title}
                          href={link.external}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-[16px] font-semibold leading-tight tracking-[-0.04em] text-foreground transition hover:text-muted"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <button
                          key={link.title}
                          onClick={() => goToPage(link.page)}
                          className="block text-left text-[16px] font-semibold leading-tight tracking-[-0.04em] text-foreground transition hover:text-muted"
                        >
                          {link.title}
                        </button>
                      )
                    )}
                  </div>

                  <div className="mt-5 rounded-[1.25rem] bg-surface p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted">
                      Best for Sri Lanka
                    </p>

                    <p className="mt-2 text-base font-semibold tracking-[-0.04em] text-foreground">
                      Sinhala + English AI customer support.
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      Built for restaurants, salons, shops, clinics, education,
                      tourism and service businesses.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-muted">
                    More from Sinovex AI
                  </p>

                  <div className="space-y-2.5">
                    {moreLinks.map((link) => (
                      <button
                        key={link.title}
                        onClick={() => goToPage(link.page)}
                        className="block text-left text-[16px] font-semibold leading-tight tracking-[-0.04em] text-foreground transition hover:text-muted"
                      >
                        {link.title}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => goToPage("sinexa-chat")}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 px-5 py-2.5 text-xs font-extrabold text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] transition hover:scale-[1.02]"
                  >
                    Launch Sinexa AI
                    <Sparkles className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => goToPage("whatsapp-ai")}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition hover:opacity-90"
                  >
                    Explore AI WhatsApp Bot
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Background blur when mega menu opens */}
      <AnimatePresence>
        {megaOpen && (
          <motion.button
            type="button"
            aria-label="Close products menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setMegaOpen(false)}
            onClick={() => setMegaOpen(false)}
            className="fixed inset-0 top-14 z-[998] hidden bg-black/10 backdrop-blur-[2px] lg:block"
          />
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] bg-black/30 px-4 pt-20 backdrop-blur-md"
            onMouseDown={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseDown={(e) => e.stopPropagation()}
              className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-surface shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Search className="h-5 w-5 text-muted" />

                <input
                  autoFocus
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search SinovexAI products, demos, pricing..."
                  className="flex-1 bg-transparent text-lg font-medium text-foreground outline-none placeholder:text-muted"
                />

                <button
                  onClick={() => setSearchOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim text-foreground hover:opacity-80"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto p-3">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={`${item.type}-${item.title}`}
                        onClick={() => goToPage(item.page)}
                        className="group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition hover:bg-card-hover"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-base font-bold text-foreground">
                              {item.title}
                            </p>

                            <span className="rounded-full bg-surface-dim px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted group-hover:bg-surface">
                              {item.type}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-muted">
                            {item.desc}
                          </p>
                        </div>

                        <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-foreground" />
                      </button>
                    );
                  })
                ) : (
                  <div className="px-5 py-12 text-center">
                    <p className="text-lg font-bold text-foreground">
                      No results found
                    </p>

                    <p className="mt-2 text-sm text-muted">
                      Try searching WhatsApp, Voice, Website, Automation,
                      Pricing, or Demo.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-border bg-surface-dim px-5 py-3 text-xs text-muted">
                Tip: press{" "}
                <span className="font-bold text-foreground">Ctrl + K</span> to open
                search, and <span className="font-bold text-foreground">Esc</span>{" "}
                to close.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] overflow-y-auto bg-surface px-5 py-4 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => goToPage("home")}
                className="flex items-center gap-3"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt="Sinovex AI"
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <span className="text-[18px] font-extrabold tracking-[-0.045em] text-foreground">
                  SinovexAI
                </span>
              </button>

              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dim"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 space-y-1">
              <button
                onClick={() => goToPage("home")}
                className="block w-full rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Home
              </button>

              <button
                onClick={() => goToPage("sinexa-chat")}
                className="mb-2 flex w-full items-center justify-between rounded-[1.4rem] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 px-4 py-4 text-left text-2xl font-extrabold tracking-[-0.05em] text-white shadow-[0_0_30px_rgba(99,102,241,0.42)]"
              >
                <span className="inline-flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  Sinexa
                </span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Products
                <ChevronDown
                  className={`h-5 w-5 transition ${
                    mobileProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {mobileProductsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3"
                  >
                    <div className="space-y-2 pb-4">
                      {productMainLinks.map((product) => {
                        const Icon = product.icon;

                        return (
                          <button
                            key={product.title}
                            onClick={() => goToPage(product.page)}
                            className="flex w-full items-center gap-3 rounded-2xl bg-surface-dim p-4 text-left"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-bold text-foreground">
                                {product.title}
                              </p>
                              <p className="text-xs text-muted">
                                {product.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => goToPage("services")}
                className="block w-full rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Services
              </button>

              <button
                onClick={() => goToPage("pricing")}
                className="block w-full rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Pricing
              </button>

              <button
                onClick={() => goToPage("process")}
                className="block w-full rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Process
              </button>

              <button
                onClick={() => goToPage("contact")}
                className="block w-full rounded-2xl px-3 py-4 text-left text-2xl font-semibold tracking-[-0.04em] text-foreground hover:bg-card-hover"
              >
                Contact
              </button>
            </div>

            <button
              onClick={() => goToPage("sinexa-chat")}
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 px-6 py-4 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(99,102,241,0.45)]"
            >
              <Sparkles className="h-4 w-4" />
              Open Sinexa AI
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" />
              Book Free Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}