// src/pages/Company/Partners.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Code2,
  Megaphone,
  Users,
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowUpRight,
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

const partnerTypes = [
  {
    icon: <Code2 size={24} />,
    title: "Technology Partners",
    desc: "Build integrations that connect your product to ours and reach thousands of mutual customers.",
    points: ["Full API & sandbox access", "Co-marketing opportunities", "Listing in our marketplace"],
  },
  {
    icon: <Users size={24} />,
    title: "Solution Partners",
    desc: "Implement, customize and support our platform for clients in your region or industry.",
    points: ["Certified implementation training", "Deal registration & protection", "Dedicated partner manager"],
  },
  {
    icon: <Megaphone size={24} />,
    title: "Affiliate Partners",
    desc: "Earn recurring commission for every customer you refer to our platform.",
    points: ["Up to 30% recurring commission", "Real-time tracking dashboard", "Custom promo assets"],
  },
];

const logos = ["Northwind", "Acme Corp", "Globex", "Initech", "Umbrella", "Soylent", "Hooli", "Vandelay"];

const tiers = [
  {
    name: "Registered",
    price: "Free",
    desc: "For agencies and consultants getting started.",
    features: ["Partner portal access", "20% revenue share", "Sales enablement kit", "Email support"],
    highlight: false,
  },
  {
    name: "Silver",
    price: "$0 / mo",
    desc: "For established partners with active pipeline.",
    features: ["25% revenue share", "Deal registration", "Co-marketing budget", "Priority support", "Partner badge"],
    highlight: true,
  },
  {
    name: "Gold",
    price: "Invite only",
    desc: "For strategic partners driving significant volume.",
    features: ["30% revenue share", "Named partner manager", "Joint roadmap sessions", "Joint webinars & events", "Executive sponsorship"],
    highlight: false,
  },
];

const Partners = () => {
  return (
    <>
      <N />

      <PageHero
        badge="Partners"
        title="Grow with us through"
        highlight="partnership"
        description="Whether you build, sell or refer — our partner program gives you the tools, margin and support to scale."
      >
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-gray-400 text-sm font-medium">
          <span className="flex items-center gap-2">
            <Globe size={18} className="text-orange-500" /> 300+ active partners
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-500" /> 30% max commission
          </span>
          <span className="flex items-center gap-2">
            <Handshake size={18} className="text-orange-500" /> Dedicated support
          </span>
        </div>
      </PageHero>

      {/* PARTNER TYPES */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto flex flex-col items-center gap-12"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Programs
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Choose your <span className="text-orange-500">path</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col gap-5 p-8 rounded-xl bg-[#181818]/90 border border-[#2a2a2a]"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{type.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{type.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {type.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-orange-500 mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button className="mt-auto self-start inline-flex items-center gap-2 text-orange-500 font-semibold text-sm cursor-pointer">
                  Apply Now <ArrowUpRight size={15} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* LOGOS */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto flex flex-col items-center gap-10"
        >
          <motion.p
            variants={fadeInUp}
            className="text-gray-500 text-sm font-semibold tracking-widest uppercase text-center"
          >
            Trusted by leading companies worldwide
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-center h-20 rounded-xl border border-[#2a2a2a] bg-[#181818]/60 text-gray-500 hover:text-orange-500 font-bold tracking-wide transition-colors"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* TIERS */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto flex flex-col items-center gap-12"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Tiers
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Partner <span className="text-orange-500">tiers</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl">
              Move up as your volume grows. All tiers include portal access and
              revenue share.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col p-8 rounded-2xl border ${
                  tier.highlight
                    ? "bg-linear-to-b from-orange-500/15 to-[#181818] border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                    : "bg-[#181818]/90 border-[#2a2a2a]"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide">
                    RECOMMENDED
                  </div>
                )}

                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <div className="text-3xl font-bold text-orange-500 mt-3">
                  {tier.price}
                </div>
                <p className="text-gray-400 text-sm mt-2">{tier.desc}</p>

                <ul className="flex flex-col gap-3 mt-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-orange-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                    tier.highlight
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  Apply to Join
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <CtaBanner
        tag="Let's Partner"
        title="Ready to grow together?"
        description="Tell us about your business and we'll find the right partnership model."
        primaryLabel="Apply Now"
        secondaryLabel="Talk to Partnerships"
      />

      <F />
    </>
  );
};

export default Partners;