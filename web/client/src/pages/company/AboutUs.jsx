// src/pages/Company/About.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Heart,
  Lightbulb,
  ShieldCheck,
  Users,
  Globe,
  Rocket,
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

const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 2019, suffix: "", label: "Founded" },
  { value: 12000, suffix: "+", label: "Active teams" },
  { value: 48, suffix: "+", label: "Countries served" },
  { value: 94, suffix: "%", label: "Retention rate" },
];

const values = [
  {
    icon: <Target size={22} />,
    title: "Customer Obsession",
    desc: "Every roadmap decision starts with a real customer problem, not a competitor's feature list.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Simplicity First",
    desc: "Powerful doesn't have to mean complicated. We remove friction before we add features.",
  },
  {
    icon: <Heart size={22} />,
    title: "Build With Empathy",
    desc: "We're humans building for humans. Support is treated as a product, not a cost center.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Earn Trust Daily",
    desc: "Your data is yours. We ship security and transparency, not dark patterns.",
  },
];

const milestones = [
  { year: "2019", title: "The beginning", desc: "Founded by three engineers frustrated with bloated CRMs." },
  { year: "2021", title: "First 1,000 teams", desc: "Crossed 1,000 paying teams and launched workflow automation." },
  { year: "2023", title: "Going global", desc: "Opened offices in Dubai and London, added 12 languages." },
  { year: "2025", title: "12,000+ teams", desc: "Launched Automation 2.0 and hit 99.9% uptime SLA." },
];

const team = [
  { name: "Akash Sahu", role: "Co-founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Prem Malakar", role: "Co-founder & CTO", img: "https://randomuser.me/api/portraits/men/44.jpg" },
  { name: "Rahul Hemla", role: "VP of Product", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Salvam Kanna", role: "Head of Design", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <N />

      <PageHero
        badge="About Us"
        title="We build software that helps teams"
        highlight="sell better"
        description="Since 2019 we've been on a mission to replace bloated, overpriced CRMs with something fast, human and genuinely useful."
      />

      {/* STORY */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Our Story
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide leading-snug"
            >
              Started by engineers who{" "}
              <span className="text-orange-500">hated their CRM</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 leading-8">
              In 2019, our founders were running a small sales team and spending
              more time fighting their CRM than talking to customers. Every tool
              was either too simple to scale or too complex to actually use.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-400 leading-8">
              So they built the tool they wished existed — fast, focused and
              priced fairly. Six years later, that same product powers sales
              teams in 48 countries, and we still ship every two weeks.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-5 mt-2 text-gray-300 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Users size={18} className="text-orange-500" /> 85+ teammates
              </span>
              <span className="flex items-center gap-2">
                <Globe size={18} className="text-orange-500" /> Fully remote
              </span>
              <span className="flex items-center gap-2">
                <Rocket size={18} className="text-orange-500" /> Shipping weekly
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 p-8 rounded-2xl border border-[#2a2a2a] bg-[#181818]/90"
              >
                <div className="text-3xl font-bold text-orange-500">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-gray-400 text-sm font-medium text-center">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* VALUES */}
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
              Our Values
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              What we <span className="text-orange-500">stand for</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a]"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* TIMELINE */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col gap-12"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="text-orange-500 text-sm font-bold tracking-widest uppercase"
            >
              Milestones
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Our <span className="text-orange-500">journey</span>
            </motion.h2>
          </div>

          <div className="relative pl-8 border-l border-[#2a2a2a] flex flex-col gap-10">
            {milestones.map((m, i) => (
              <motion.div key={i} variants={staggerItem} className="relative">
                <span className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#0f0f0f]" />
                <div className="text-orange-500 font-bold text-sm tracking-widest">
                  {m.year}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{m.title}</h3>
                <p className="text-gray-400 text-sm mt-1 leading-6">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="w-full border-t border-[#2a2a2a]" />

      {/* TEAM */}
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
              Leadership
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
            >
              Meet the <span className="text-orange-500">team</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {team.map((person, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a] text-center"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-orange-500/40"
                />
                <div>
                  <div className="text-white font-bold">{person.name}</div>
                  <div className="text-gray-500 text-xs mt-1">{person.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <CtaBanner
        tag="Join Us"
        title="Want to build with us?"
        description="We're hiring across engineering, design and customer success."
        primaryLabel="View Open Roles"
        onPrimary={() => navigate("/careers")}
        onSecondary={() => navigate("/contact")}
        secondaryLabel="Contact Us"
      />

      <F />
    </>
  );
};

export default About;