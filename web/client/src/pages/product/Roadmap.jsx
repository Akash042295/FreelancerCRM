// src/pages/Product/Roadmap.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Loader, CheckCircle2, ArrowUpRight } from "lucide-react";
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

const columns = [
  {
    key: "planned",
    label: "Planned",
    icon: <Lightbulb size={16} />,
    accent: "text-sky-400",
    badge: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    items: [
      { title: "AI Lead Scoring", desc: "Predict which deals are most likely to close using historical signals.", tag: "Q3 2025" },
      { title: "Custom Objects", desc: "Model any business entity beyond contacts and deals.", tag: "Q3 2025" },
      { title: "WhatsApp Channel", desc: "Two-way WhatsApp conversations logged on the contact timeline.", tag: "Q4 2025" },
    ],
  },
  {
    key: "progress",
    label: "In Progress",
    icon: <Loader size={16} />,
    accent: "text-orange-500",
    badge: "bg-orange-500/10 border-orange-500/30 text-orange-500",
    items: [
      { title: "Visual Report Builder", desc: "Drag-and-drop custom reports with saved views and sharing.", tag: "Shipping soon" },
      { title: "Multi-currency Deals", desc: "Per-deal currency with automatic FX conversion in reports.", tag: "Shipping soon" },
      { title: "SMS Sequences", desc: "Add SMS steps inside existing email automation workflows.", tag: "Beta" },
    ],
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: <CheckCircle2 size={16} />,
    accent: "text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    items: [
      { title: "Workflow Automation 2.0", desc: "Branching logic, delays and webhook triggers.", tag: "v3.4.0" },
      { title: "Revenue Forecasting", desc: "Weighted pipeline forecast widget for managers.", tag: "v3.3.2" },
      { title: "Mobile Offline Mode", desc: "Access contacts and notes without a connection.", tag: "v3.3.0" },
    ],
  },
];

const Roadmap = () => {
  const navigate = useNavigate();
  return (
    <>
      <N />

      <PageHero
        badge="Roadmap"
        title="Where we're"
        highlight="heading next"
        description="Our public roadmap. Priorities shift with customer feedback — vote on what matters most to your team."
      />

      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {columns.map((col) => (
            <motion.div key={col.key} variants={staggerItem} className="flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#2a2a2a]">
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${col.badge}`}
                >
                  {col.icon}
                </span>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  {col.label}
                </h2>
                <span className="ml-auto text-xs font-bold text-gray-500 bg-[#181818] border border-[#2a2a2a] px-2.5 py-1 rounded-full">
                  {col.items.length}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {col.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, borderColor: "#f97316" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col gap-3 p-5 rounded-xl bg-[#181818]/90 border border-[#2a2a2a] group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="text-gray-600 group-hover:text-orange-500 transition-colors shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="text-gray-400 text-sm leading-6">
                      {item.desc}
                    </p>
                    <span
                      className={`self-start text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${col.badge}`}
                    >
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="max-w-6xl mx-auto mt-14 rounded-2xl border border-[#2a2a2a] bg-[#181818]/60 p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white">
            Have an idea or feature request?
          </h3>
          <p className="text-gray-400 mt-2">
            We build with our customers. Submit a request and track its progress.
          </p>
          <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer">
            Submit Feedback
          </button>
        </motion.div>
      </section>

      <CtaBanner
        tag="Get Started"
        title="Try what we've already shipped"
        description="Every released feature is live for all trial accounts today."
        primaryLabel="Start Free Trial"
        secondaryLabel="View Changelog"
        onSecondary={() => navigate("/changelog")}
      />

      <F />
    </>
  );
};

export default Roadmap;