import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import {
  ArrowRightToLine,
  Play,
  UserCog,
  CircleUserRound,
  UserGroup,
  CheckCircle2,
  BarChart3,
  Users,
  CheckSquare,
  Star,
  ShieldCheck,
  Zap,
  MousePointerClick,
} from "lucide-react";
import adminPage from "../../assets/admin-dashboard.png";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import { useLanguage } from "../../Context/LanguageContext.jsx";

// ---------------- VARIANTS ----------------
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ---------------- COUNT UP ----------------
const CountUp = ({ to, decimals = 0, suffix = "" }) => {
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

  const formatted =
    decimals === 0 ? Math.round(val).toLocaleString() : val.toFixed(decimals);

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
};

// ---------------- MAIN ----------------
const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <N />

      {/* ---------------- HERO ---------------- */}
      <section
        id="home"
        className="w-full bg-[#0f0f0f] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 px-6 sm:px-10 lg:px-20 py-16 lg:py-24 overflow-hidden"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col gap-6 w-full lg:max-w-xl text-center lg:text-left items-center lg:items-start"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm font-semibold tracking-wide"
          >
            {t.heroBadge}
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wider leading-tight sm:leading-[1.15] text-white"
          >
            {t.heroTitle1} <br />
            <span className="text-orange-500">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 text-lg sm:text-xl font-medium tracking-wide leading-7 sm:leading-9"
          >
            {t.heroDesc}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center lg:justify-start mt-2"
          >
            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onClick={() => navigate("/register")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 cursor-pointer"
            >
              {t.getStarted}
              <ArrowRightToLine
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-6 py-3 text-base font-semibold text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
            >
              <Play
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {t.viewDemo}
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-4 text-gray-400 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-500" /> {t.secure}
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-orange-500" /> {t.fast}
            </div>
            <div className="flex items-center gap-2">
              <MousePointerClick size={18} className="text-orange-500" />{" "}
              {t.easyToUse}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex w-full lg:w-auto justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 lg:w-xl lg:h-144"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto w-full h-full rounded-full bg-orange-500/20 blur-xl shadow-[0_0_100px_35px_rgba(249,115,22,0.25)]"
            />
            <img
              src={adminPage}
              alt="CRM Landing"
              loading="eager"
              className="relative w-[92%] sm:w-[50vw] lg:w-[70vw] max-h-[70vh] lg:max-h-[60vh] object-contain rounded border border-[#2a2a2a]"
            />
          </motion.div>
        </motion.div>
      </section>

      <div className="flex w-full items-center justify-center border-t border-[#2a2a2a]"></div>

      {/* ---------------- FEATURES ---------------- */}
      <section
        id="features"
        className="w-full bg-[#0f0f0f] flex flex-col items-center justify-between gap-12 px-6 sm:px-10 lg:px-20 py-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center flex flex-col items-center gap-3"
        >
          <motion.div
            variants={fadeInUp}
            className="text-orange-500 text-sm font-bold tracking-widest uppercase"
          >
            {t.featuresTag}
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
          >
            {t.featuresTitle1}{" "}
            <span className="text-orange-500">{t.featuresTitle2}</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 max-w-2xl text-center"
          >
            {t.featuresDesc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
        >
          {[
            {
              icon: <Users size={24} />,
              title: t.feature1Title,
              desc: t.feature1Desc,
            },
            {
              icon: <UserGroup size={24} />,
              title: t.feature2Title,
              desc: t.feature2Desc,
            },
            {
              icon: <BarChart3 size={24} />,
              title: t.feature3Title,
              desc: t.feature3Desc,
            },
            {
              icon: <CheckSquare size={24} />,
              title: t.feature4Title,
              desc: t.feature4Desc,
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8, borderColor: "#f97316" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col bg-[#181818]/90 gap-4 justify-between p-6 rounded-xl border border-[#2a2a2a] group"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
              <button className="self-end text-orange-500 group-hover:translate-x-1 transition-transform">
                <ArrowRightToLine size={20} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="flex w-full items-center justify-center border-t border-[#2a2a2a]"></div>

      {/* ---------------- DASHBOARD ---------------- */}
      <section
        id="how-it-works"
        className="w-full bg-[#0f0f0f] flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-10 lg:px-20 py-20 overflow-hidden"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col gap-6 w-full lg:w-1/2"
        >
          <motion.div
            variants={fadeInLeft}
            className="text-orange-500 text-sm font-bold tracking-widest uppercase"
          >
            {t.dashTag}
          </motion.div>
          <motion.h2
            variants={fadeInLeft}
            className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
          >
            {t.dashTitle1} <br /> {t.dashTitle2}{" "}
            <span className="text-orange-500">{t.dashTitle3}</span>
          </motion.h2>
          <motion.p variants={fadeInLeft} className="text-gray-400 text-lg">
            {t.dashDesc}
          </motion.p>
          <motion.ul
            variants={staggerContainer}
            className="flex flex-col gap-4 mt-2"
          >
            {[t.dashPoint1, t.dashPoint2, t.dashPoint3, t.dashPoint4].map(
              (item, i) => (
                <motion.li
                  key={i}
                  variants={fadeInLeft}
                  className="flex items-center gap-3 text-gray-300 font-medium"
                >
                  <CheckCircle2 size={20} className="text-orange-500" />
                  {item}
                </motion.li>
              ),
            )}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            src={adminPage}
            alt="Dashboard Preview"
            className="w-full max-w-2xl object-cover rounded-xl border border-[#2a2a2a] shadow-[0_0_30px_rgba(249,115,22,0.15)]"
          />
        </motion.div>
      </section>

      <div className="flex w-full items-center justify-center border-t border-[#2a2a2a]"></div>

      {/* ---------------- ROLES ---------------- */}
      <section
        id="roles"
        className="w-full bg-[#0f0f0f] flex flex-col items-center gap-12 px-6 sm:px-10 lg:px-20 py-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center flex flex-col items-center gap-3"
        >
          <motion.div
            variants={fadeInUp}
            className="text-orange-500 text-sm font-bold tracking-widest uppercase"
          >
            {t.rolesTag}
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
          >
            {t.rolesTitle1}{" "}
            <span className="text-orange-500">{t.rolesTitle2}</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 max-w-2xl text-center"
          >
            {t.rolesDesc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {[
            {
              icon: <UserCog size={24} />,
              title: t.adminTitle,
              subtitle: t.adminSubtitle,
              items: [t.adminPoint1, t.adminPoint2, t.adminPoint3],
              cta: t.adminCta,
            },
            {
              icon: <CircleUserRound size={24} />,
              title: t.empTitle,
              subtitle: t.empSubtitle,
              items: [t.empPoint1, t.empPoint2, t.empPoint3],
              cta: t.empCta,
            },
            {
              icon: <UserGroup size={24} />,
              title: t.custTitle,
              subtitle: t.custSubtitle,
              items: [t.custPoint1, t.custPoint2, t.custPoint3],
              cta: t.custCta,
            },
          ].map((role, i) => (
            <motion.div
              key={i}
              variants={zoomIn}
              whileHover={{ y: -8, borderColor: "#f97316" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col bg-[#181818]/90 p-8 rounded-xl border border-[#2a2a2a]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{role.title}</h3>
              </div>
              <p className="text-gray-400 mb-6 font-medium">{role.subtitle}</p>
              <ul className="flex flex-col gap-3 mb-8 text-gray-300">
                {role.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-orange-500 shrink-0"
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                className="mt-auto text-orange-500 font-semibold flex items-center gap-2 transition-all"
              >
                {role.cta} <ArrowRightToLine size={16} />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="w-full bg-[#0f0f0f] border-y border-[#2a2a2a] py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
        >
          {[
            {
              icon: <UserGroup size={32} className="text-orange-500 mb-2" />,
              to: 1248,
              suffix: "+",
              label: t.stat1Label,
            },
            {
              icon: (
                <CircleUserRound size={32} className="text-orange-500 mb-2" />
              ),
              to: 48,
              suffix: "+",
              label: t.stat2Label,
            },
            {
              icon: <CheckSquare size={32} className="text-orange-500 mb-2" />,
              to: 86,
              suffix: "+",
              label: t.stat3Label,
            },
            {
              icon: <ShieldCheck size={32} className="text-orange-500 mb-2" />,
              to: 99.9,
              decimals: 1,
              suffix: "%",
              label: t.stat4Label,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              {stat.icon}
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp
                  to={stat.to}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-gray-400 font-medium text-sm sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="w-full bg-[#0f0f0f] flex flex-col items-center gap-12 px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center flex flex-col items-center gap-3"
        >
          <motion.div
            variants={fadeInUp}
            className="text-orange-500 text-sm font-bold tracking-widest uppercase"
          >
            {t.testiTag}
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-white tracking-wide"
          >
            {t.testiTitle1}{" "}
            <span className="text-orange-500">{t.testiTitle2}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          {[
            {
              quote: t.testi1,
              img: "https://randomuser.me/api/portraits/men/32.jpg",
              name: t.testi1Name,
              role: t.testi1Role,
            },
            {
              quote: t.testi2,
              img: "https://randomuser.me/api/portraits/women/44.jpg",
              name: t.testi2Name,
              role: t.testi2Role,
            },
            {
              quote: t.testi3,
              img: "https://randomuser.me/api/portraits/men/75.jpg",
              name: t.testi3Name,
              role: t.testi3Role,
            },
          ].map((testi, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8, borderColor: "#f97316" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col bg-[#181818]/90 p-6 rounded-xl border border-[#2a2a2a]"
            >
              <p className="text-gray-300 italic mb-6">"{testi.quote}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={testi.img}
                    alt={testi.name}
                  />
                  <div>
                    <div className="text-white font-bold text-sm">
                      {testi.name}
                    </div>
                    <div className="text-gray-500 text-xs">{testi.role}</div>
                  </div>
                </div>
                <div className="flex text-orange-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section
        id="about"
        className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 pb-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-linear-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
              {t.ctaTag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {t.ctaTitle}
            </h2>
            <p className="text-gray-400 mt-2">{t.ctaDesc}</p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onClick={() => navigate("/register")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t.ctaBtn1}
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t.ctaBtn2}
            </motion.button>
          </div>
        </motion.div>
      </section>

      <F />
    </>
  );
};

export default HomePage;
