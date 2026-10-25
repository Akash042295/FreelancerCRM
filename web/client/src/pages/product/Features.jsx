// src/pages/Product/Features.jsx
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  Users,
  UserGroup,
  BarChart3,
  CheckSquare,
  ShieldCheck,
  Bell,
  Workflow,
  Layers,
  Globe,
  ArrowRightToLine,
  CheckCircle2,
  Zap,
} from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import CtaBanner from "../../components/common/CtaBanner.jsx";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
} from "../../components/common/motionVariants";

const coreFeatures = [
  {
    icon: <Users size={24} />,
    title: "Contact Management",
    desc: "Keep every lead, customer and conversation in one clean, searchable timeline.",
  },
  {
    icon: <UserGroup size={24} />,
    title: "Team Collaboration",
    desc: "Assign owners, mention teammates and keep everyone aligned on the same record.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Advanced Analytics",
    desc: "Real-time dashboards for pipeline value, conversion rate and team performance.",
  },
  {
    icon: <CheckSquare size={24} />,
    title: "Task Automation",
    desc: "Automate follow-ups, reminders and stage changes with zero-code workflows.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Role Permissions",
    desc: "Granular access control for admins, managers and agents out of the box.",
  },
  {
    icon: <Bell size={24} />,
    title: "Smart Notifications",
    desc: "Never miss a deal again with intelligent alerts across email and in-app.",
  },
  {
    icon: <Workflow size={24} />,
    title: "Pipeline Builder",
    desc: "Design custom sales stages that mirror exactly how your team actually sells.",
  },
  {
    icon: <Globe size={24} />,
    title: "Multi-language",
    desc: "Serve global teams with built-in localization and region-aware formatting.",
  },
];

const deepDives = [
  {
    tag: "Pipeline",
    title: "A sales pipeline that matches",
    highlight: "how you sell",
    desc: "Drag, drop and close. Build unlimited pipelines, set automations per stage and get a live forecast that actually updates itself.",
    points: [
      "Unlimited custom pipelines and stages",
      "Automatic stage-based follow-ups",
      "Weighted forecasting and revenue targets",
      "Deal rotting alerts and inactivity rules",
    ],
  },
  {
    tag: "Automation",
    title: "Put your busywork on",
    highlight: "autopilot",
    desc: "From lead capture to handoff, automate the repetitive parts so your team can focus on conversations that convert.",
    points: [
      "Zero-code workflow builder",
      "Email sequences and templates",
      "Webhook and API triggers",
      "Round-robin lead distribution",
    ],
  },
];

const Features = () => {
  const navigate = useNavigate();
  return (
    <>
      <N />

      <PageHero
        badge="Features"
        title="Everything your team needs to"
        highlight="close faster"
        description="One connected platform for contacts, pipelines, tasks and reporting — built for teams that outgrow spreadsheets."
      >
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-orange-500" /> No credit card
          </div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-orange-500" /> Setup in 5 minutes
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-orange-500" /> SOC 2 ready
          </div>
        </div>
      </PageHero>

      {/* CORE FEATURES GRID */}
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
              Core Capabilities
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Built for <span className="text-orange-500">real workflows</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a] group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* DEEP DIVES */}
      {deepDives.map((block, idx) => (
        <section
          key={idx}
          className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20"
        >
          <div
            className={`max-w-6xl mx-auto flex flex-col ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 lg:gap-16`}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="flex flex-col gap-5 w-full lg:w-1/2"
            >
              <motion.div
                variants={idx % 2 === 1 ? fadeInRight : fadeInLeft}
                className="text-orange-500 text-sm font-bold tracking-widest uppercase"
              >
                {block.tag}
              </motion.div>
              <motion.h2
                variants={idx % 2 === 1 ? fadeInRight : fadeInLeft}
                className="text-3xl sm:text-4xl font-bold text-white tracking-wide leading-snug"
              >
                {block.title}{" "}
                <span className="text-orange-500">{block.highlight}</span>
              </motion.h2>
              <motion.p
                variants={idx % 2 === 1 ? fadeInRight : fadeInLeft}
                className="text-gray-400 text-lg leading-8"
              >
                {block.desc}
              </motion.p>

              <motion.ul variants={staggerContainer} className="flex flex-col gap-4 mt-2">
                {block.points.map((point, j) => (
                  <motion.li
                    key={j}
                    variants={idx % 2 === 1 ? fadeInRight : fadeInLeft}
                    className="flex items-center gap-3 text-gray-300 font-medium"
                  >
                    <CheckCircle2 size={20} className="text-orange-500 shrink-0" />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                onClick={() => {
                  const targetPath = block.tag.toLowerCase();
                  navigate(`/features/${targetPath}`);
                }}
                className="self-start mt-2 inline-flex items-center gap-2 text-orange-500 font-semibold cursor-pointer"
              >
                Learn more <ArrowRightToLine size={18} />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <div className="relative rounded-2xl border border-[#2a2a2a] bg-[#181818]/90 p-8 overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange-500/15 blur-3xl"
                />
                <div className="relative flex flex-col gap-4">
                  {block.points.map((p, k) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-4 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-500">
                          <Layers size={16} />
                        </div>
                        <span className="text-gray-300 text-sm font-medium">
                          {p}
                        </span>
                      </div>
                      <CheckCircle2 size={16} className="text-orange-500" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <CtaBanner
        tag="Get Started"
        title="See every feature in action"
        description="Start your 14-day free trial. No credit card required."
        primaryLabel="Start Free Trial"
        secondaryLabel="Book a Demo"
      />

      <F />
    </>
  );
};

export default Features;