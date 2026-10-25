// src/pages/Company/Careers.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowUpRight,
  Heart,
  Globe,
  GraduationCap,
  Coffee,
  Wallet,
  Laptop,
} from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportOnce,
} from "../../components/common/motionVariants";

const perks = [
  { icon: <Globe size={22} />, title: "Remote First", desc: "Work from anywhere. We hire across 20+ countries." },
  { icon: <Wallet size={22} />, title: "Competitive Pay", desc: "Top-of-market salaries reviewed twice a year." },
  { icon: <Heart size={22} />, title: "Health Coverage", desc: "Medical, dental and vision for you and your family." },
  { icon: <GraduationCap size={22} />, title: "Learning Budget", desc: "$1,500 per year for courses, books and conferences." },
  { icon: <Laptop size={22} />, title: "Equipment Stipend", desc: "Your ideal setup, funded by us on day one." },
  { icon: <Coffee size={22} />, title: "Flexible Time Off", desc: "Unlimited PTO with a mandatory 15-day minimum." },
];

const departments = ["All", "Engineering", "Design", "Sales", "Marketing", "Support"];

const jobs = [
  { title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Backend Engineer (Node.js)", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "DevOps Engineer", dept: "Engineering", location: "Dubai, UAE", type: "Full-time" },
  { title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time" },
  { title: "UX Researcher", dept: "Design", location: "Remote", type: "Contract" },
  { title: "Account Executive", dept: "Sales", location: "London, UK", type: "Full-time" },
  { title: "Sales Development Rep", dept: "Sales", location: "Remote", type: "Full-time" },
  { title: "Content Marketing Manager", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Growth Analyst", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Customer Success Manager", dept: "Support", location: "Remote", type: "Full-time" },
  { title: "Technical Support Specialist", dept: "Support", location: "Remote", type: "Part-time" },
];

const Careers = () => {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? jobs : jobs.filter((j) => j.dept === active)),
    [active]
  );

  return (
    <>
      <N />

      <PageHero
        badge="Careers"
        title="Do the best work of your career"
        highlight="with us"
        description="We're a remote-first team of 85+ builders shipping software used by 12,000+ companies. Come build with us."
      >
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-gray-400 text-sm font-medium">
          <span className="flex items-center gap-2">
            <Globe size={18} className="text-orange-500" /> Remote-first
          </span>
          <span className="flex items-center gap-2">
            <Briefcase size={18} className="text-orange-500" /> {jobs.length} open roles
          </span>
          <span className="flex items-center gap-2">
            <Heart size={18} className="text-orange-500" /> Great benefits
          </span>
        </div>
      </PageHero>

      {/* PERKS */}
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
              Benefits
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Why people <span className="text-orange-500">stay</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a]"
              >
                <div className="w-12 h-12 shrink-0 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{perk.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 leading-6">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* OPEN ROLES */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-5xl mx-auto flex flex-col gap-10"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Open Positions
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Find your <span className="text-orange-500">next role</span>
            </motion.h2>
          </div>

          {/* FILTER */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActive(dept)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                  active === dept
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-[#181818] border-[#2a2a2a] text-gray-400 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {dept}
              </button>
            ))}
          </motion.div>

          {/* LIST */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {filtered.map((job, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ x: 6, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a] group cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-orange-500" />
                      {job.dept}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-orange-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-orange-500" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm shrink-0">
                  Apply Now <ArrowUpRight size={16} />
                </span>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-12">
                No openings in this department right now.
              </p>
            )}
          </motion.div>
        </motion.div>
      </section>

      <F />
    </>
  );
};

export default Careers;