// src/pages/Product/Changelog.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Wrench, Bug, ChevronDown } from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../../components/common/motionVariants";

const typeMeta = {
  new: { label: "New", icon: <Rocket size={14} />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  improved: { label: "Improved", icon: <Wrench size={14} />, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
  fixed: { label: "Fixed", icon: <Bug size={14} />, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/30" },
};

const releases = [
  {
    version: "v3.4.0",
    date: "March 14, 2025",
    title: "Workflow Automation 2.0",
    summary: "A completely rebuilt automation engine with branching logic, delays and webhook triggers.",
    changes: [
      { type: "new", text: "Branching conditions inside workflow steps" },
      { type: "new", text: "Native webhook trigger and response actions" },
      { type: "improved", text: "Automation runs up to 4x faster" },
      { type: "fixed", text: "Duplicate emails on rapid stage changes" },
    ],
  },
  {
    version: "v3.3.2",
    date: "February 27, 2025",
    title: "Reporting Performance Update",
    summary: "Faster dashboards and a new revenue forecasting widget for managers.",
    changes: [
      { type: "new", text: "Weighted revenue forecast widget" },
      { type: "improved", text: "Dashboard load time reduced by 60%" },
      { type: "fixed", text: "Timezone offset in activity reports" },
    ],
  },
  {
    version: "v3.3.0",
    date: "February 08, 2025",
    title: "Mobile Experience Refresh",
    summary: "A redesigned mobile app with offline mode and quick-add actions.",
    changes: [
      { type: "new", text: "Offline mode for contacts and notes" },
      { type: "new", text: "Quick-add floating action button" },
      { type: "improved", text: "Biometric login on iOS and Android" },
      { type: "fixed", text: "Push notifications not clearing on read" },
    ],
  },
  {
    version: "v3.2.1",
    date: "January 19, 2025",
    title: "Security & Compliance",
    summary: "Hardening pass ahead of our SOC 2 Type II audit.",
    changes: [
      { type: "new", text: "SAML single sign-on for Enterprise" },
      { type: "improved", text: "Session timeout is now configurable" },
      { type: "fixed", text: "Audit log missing permission changes" },
    ],
  },
];

const ChangeRow = ({ change }) => {
  const meta = typeMeta[change.type];
  return (
    <li className="flex items-start gap-3 text-gray-300 text-sm leading-6">
      <span
        className={`inline-flex items-center gap-1.5 shrink-0 mt-0.5 px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wide ${meta.bg} ${meta.color}`}
      >
        {meta.icon}
        {meta.label}
      </span>
      <span>{change.text}</span>
    </li>
  );
};

const Changelog = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <N />

      <PageHero
        badge="Changelog"
        title="What's new in"
        highlight="our product"
        description="Every improvement, fix and new feature — shipped and documented. We release updates every two weeks."
      />

      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col gap-6"
        >
          {releases.map((release, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={release.version}
                variants={staggerItem}
                className="relative rounded-2xl border border-[#2a2a2a] bg-[#181818]/90 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 sm:p-7 text-left cursor-pointer"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-500 text-sm font-bold tracking-wide">
                        {release.version}
                      </span>
                      <span className="text-gray-500 text-sm font-medium">
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {release.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-6">
                      {release.summary}
                    </p>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 mt-1 text-orange-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-[#2a2a2a] px-6 sm:px-7 py-6"
                  >
                    <ul className="flex flex-col gap-3">
                      {release.changes.map((c, j) => (
                        <ChangeRow key={j} change={c} />
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <F />
    </>
  );
};

export default Changelog;