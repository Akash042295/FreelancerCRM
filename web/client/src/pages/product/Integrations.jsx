// src/pages/Product/Integrations.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Plug, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import CtaBanner from "../../components/common/CtaBanner.jsx";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportOnce,
} from "../../components/common/motionVariants";

const categories = [
  "All",
  "Communication",
  "Marketing",
  "Payments",
  "Productivity",
  "Developer",
];

const integrations = [
  {
    name: "Slack",
    category: "Communication",
    desc: "Get deal alerts and pipeline updates right inside your channels.",
    initials: "SL",
    color: "#4A154B",
  },
  {
    name: "Gmail",
    category: "Communication",
    desc: "Two-way email sync with open and click tracking.",
    initials: "GM",
    color: "#EA4335",
  },
  {
    name: "Zoom",
    category: "Communication",
    desc: "Schedule and log calls automatically on contact records.",
    initials: "ZM",
    color: "#2D8CFF",
  },
  {
    name: "Mailchimp",
    category: "Marketing",
    desc: "Sync audiences and trigger campaigns from CRM segments.",
    initials: "MC",
    color: "#FFE01B",
  },
  {
    name: "HubSpot Forms",
    category: "Marketing",
    desc: "Capture every form submission as a tracked lead.",
    initials: "HS",
    color: "#FF7A59",
  },
  {
    name: "Meta Ads",
    category: "Marketing",
    desc: "Attribute ad spend to closed revenue automatically.",
    initials: "MA",
    color: "#0866FF",
  },
  {
    name: "Stripe",
    category: "Payments",
    desc: "See subscriptions and invoices directly on the customer card.",
    initials: "ST",
    color: "#635BFF",
  },
  {
    name: "PayPal",
    category: "Payments",
    desc: "Reconcile payments and refunds without leaving the CRM.",
    initials: "PP",
    color: "#003087",
  },
  {
    name: "Notion",
    category: "Productivity",
    desc: "Embed docs and meeting notes into any deal record.",
    initials: "NO",
    color: "#111111",
  },
  {
    name: "Google Calendar",
    category: "Productivity",
    desc: "Two-way calendar sync for tasks and meetings.",
    initials: "GC",
    color: "#4285F4",
  },
  {
    name: "Zapier",
    category: "Developer",
    desc: "Connect to 6,000+ apps with zero-code automations.",
    initials: "ZP",
    color: "#FF4F00",
  },
  {
    name: "REST API",
    category: "Developer",
    desc: "Full CRUD access with webhooks and generous rate limits.",
    initials: "API",
    color: "#f97316",
  },
];

const Integrations = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return integrations.filter((item) => {
      const matchCat = active === "All" || item.category === active;
      const matchQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, active]);

  return (
    <>
      <N />

      <PageHero
        badge="Integrations"
        title="Connect the tools you"
        highlight="already love"
        description="Over 100 native integrations plus a full REST API. Sync data both ways in minutes, not months."
      >
        {/* SEARCH */}
        <div className="relative max-w-xl mx-auto mt-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations..."
            className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-orange-500 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none transition-colors"
          />
        </div>
      </PageHero>

      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* FILTERS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={fadeInUp}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                  active === cat
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-[#181818] border-[#2a2a2a] text-gray-400 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* GRID */}
          {filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={staggerItem}
                  whileHover={{ y: -8, borderColor: "#f97316" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a] group"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-[#2a2a2a]"
                      style={{
                        backgroundColor: `${item.color}22`,
                        color: "#f97316",
                      }}
                    >
                      {item.initials}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-[#0f0f0f] border border-[#2a2a2a] px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-6 flex-1">
                    {item.desc}
                  </p>

                  <button
                    onClick={() => setSelectedIntegration(item)}
                    className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-semibold group-hover:gap-2.5 transition-all cursor-pointer"
                  >
                    Connect <ArrowUpRight size={15} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <Plug size={40} className="text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">
                No integrations match your search.
              </p>
            </div>
          )}

          {/* API STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-orange-500/30 bg-linear-to-r from-orange-500/15 to-transparent p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Can't find what you need?
              </h3>
              <p className="text-gray-400 mt-2">
                Build your own with our fully documented REST API and webhooks.
              </p>
              <div className="flex flex-wrap gap-5 mt-4 text-gray-400 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" /> REST &
                  Webhooks
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" /> 10k
                  req/min
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" /> SDKs
                  available
                </span>
              </div>
            </div>
            <button onClick={() => navigate('/integrations/api-docs')} className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Read API Docs
            </button>
          </motion.div>
        </div>
      </section>

      <CtaBanner
        tag="Ready?"
        title="Start connecting in minutes"
        description="Every integration is included on Professional and Enterprise plans."
        primaryLabel="Start Free Trial"
        secondaryLabel="Talk to Sales"
      />

      {/* modal for connection app */}

      {selectedIntegration && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setSelectedIntegration(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="integration-modal-title"
            className="w-full max-w-md rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  Integration Setup
                </p>
                <h2
                  id="integration-modal-title"
                  className="mt-1 text-2xl font-bold text-white"
                >
                  {selectedIntegration.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIntegration(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-gray-400 hover:bg-[#252525] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6 text-sm leading-6 text-gray-400">
              {selectedIntegration.desc}
            </p>

            <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="font-semibold text-white">Ready to configure?</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                The connection setup for {selectedIntegration.name} will be
                available here once its authentication and integration logic are
                implemented.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIntegration(null)}
              className="mt-6 w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <F />
    </>
  );
};

export default Integrations;
