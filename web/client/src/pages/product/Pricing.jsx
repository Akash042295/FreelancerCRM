// src/pages/Product/Pricing.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Minus,
  Star,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
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

const plans = [
  {
    name: "Starter",
    tagline: "For solo founders and small teams",
    monthly: 19,
    yearly: 15,
    highlight: false,
    cta: "Start Free Trial",
    features: [
      "Up to 3 users",
      "1,000 contacts",
      "2 pipelines",
      "Email integration",
      "Basic reporting",
      "Community support",
    ],
  },
  {
    name: "Professional",
    tagline: "For growing sales teams",
    monthly: 49,
    yearly: 39,
    highlight: true,
    cta: "Start Free Trial",
    features: [
      "Up to 25 users",
      "50,000 contacts",
      "Unlimited pipelines",
      "Workflow automation",
      "Advanced analytics",
      "Role permissions",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large organizations",
    monthly: 99,
    yearly: 79,
    highlight: false,
    cta: "Contact Sales",
    features: [
      "Unlimited users",
      "Unlimited contacts",
      "SSO & SAML",
      "Custom integrations",
      "Dedicated success manager",
      "99.9% uptime SLA",
      "24/7 phone support",
    ],
  },
];

const comparison = [
  { label: "Users", starter: "3", pro: "25", ent: "Unlimited" },
  { label: "Contacts", starter: "1,000", pro: "50,000", ent: "Unlimited" },
  { label: "Pipelines", starter: "2", pro: "Unlimited", ent: "Unlimited" },
  { label: "Automation", starter: false, pro: true, ent: true },
  { label: "Advanced Analytics", starter: false, pro: true, ent: true },
  { label: "Role Permissions", starter: false, pro: true, ent: true },
  { label: "SSO / SAML", starter: false, pro: false, ent: true },
  { label: "API Access", starter: false, pro: true, ent: true },
  { label: "Dedicated Manager", starter: false, pro: false, ent: true },
];

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Absolutely. You can upgrade, downgrade or cancel at any time from your billing settings. Changes are prorated automatically.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every paid plan comes with a 14-day free trial. No credit card required to get started.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, plus bank transfer and purchase orders for annual Enterprise plans.",
  },
  {
    q: "Do you offer discounts?",
    a: "We offer 20% off on annual billing and special pricing for non-profits, startups and educational institutions.",
  },
];

const Cell = ({ value }) => {
  if (value === true)
    return <Check size={18} className="text-orange-500 mx-auto" />;
  if (value === false)
    return <Minus size={18} className="text-gray-600 mx-auto" />;
  return <span className="text-gray-300 text-sm font-medium">{value}</span>;
};

const Pricing = () => {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <N />

      <PageHero
        badge="Pricing"
        title="Simple pricing that"
        highlight="scales with you"
        description="Start free, upgrade when you're ready. Every plan includes unlimited deals and no setup fees."
      >
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span
            className={`text-sm font-semibold ${
              !yearly ? "text-white" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly((v) => !v)}
            className="relative w-14 h-7 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] cursor-pointer"
            aria-label="Toggle billing period"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-orange-500 ${
                yearly ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
          <span
            className={`text-sm font-semibold ${
              yearly ? "text-white" : "text-gray-500"
            }`}
          >
            Yearly
          </span>
          <span className="text-xs font-bold text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 rounded-full">
            Save 20%
          </span>
        </div>
      </PageHero>

      {/* PLANS */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                plan.highlight
                  ? "bg-linear-to-b from-orange-500/15 to-[#181818] border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                  : "bg-[#181818]/90 border-[#2a2a2a]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide">
                  <Star size={12} fill="currentColor" /> MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{plan.tagline}</p>

              <div className="flex items-end gap-1.5 mt-6">
                <span className="text-4xl font-bold text-white">
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-gray-500 text-sm mb-1.5">/ user / mo</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {yearly ? "Billed annually" : "Billed monthly"}
              </p>

              <button
                className={`mt-6 w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                  plan.highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="flex flex-col gap-3 mt-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={16} className="text-orange-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-6xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-orange-500" /> 14-day free trial
          </div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-orange-500" /> Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check size={18} className="text-orange-500" /> No setup fees
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="w-full bg-[#0f0f0f] border-y border-[#2a2a2a] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-5xl mx-auto flex flex-col items-center gap-10"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Compare
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Plan <span className="text-orange-500">comparison</span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeInUp}
            className="w-full overflow-x-auto rounded-2xl border border-[#2a2a2a] bg-[#181818]/60"
          >
            <table className="w-full min-w-160 border-collapse">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  <th className="text-left text-gray-400 text-sm font-semibold px-6 py-4">
                    Feature
                  </th>
                  <th className="text-center text-gray-300 text-sm font-bold px-6 py-4">
                    Starter
                  </th>
                  <th className="text-center text-orange-500 text-sm font-bold px-6 py-4">
                    Professional
                  </th>
                  <th className="text-center text-gray-300 text-sm font-bold px-6 py-4">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#1f1f1f]/50 transition-colors"
                  >
                    <td className="text-left text-gray-300 text-sm font-medium px-6 py-4">
                      {row.label}
                    </td>
                    <td className="text-center px-6 py-4">
                      <Cell value={row.starter} />
                    </td>
                    <td className="text-center px-6 py-4 bg-orange-500/5">
                      <Cell value={row.pro} />
                    </td>
                    <td className="text-center px-6 py-4">
                      <Cell value={row.ent} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto flex flex-col items-center gap-10"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              FAQ
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Questions? <span className="text-orange-500">Answered.</span>
            </motion.h2>
          </div>

          <div className="w-full flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-xl border border-[#2a2a2a] bg-[#181818]/90 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3 text-white font-semibold">
                    <HelpCircle size={18} className="text-orange-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-orange-500 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pl-15 text-gray-400 text-sm leading-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <CtaBanner
        tag="Still deciding?"
        title="Talk to our sales team"
        description="We'll help you pick the right plan for your team size and workflow."
        primaryLabel="Start Free Trial"
        secondaryLabel="Contact Sales"
      />

      <F />
    </>
  );
};

export default Pricing;