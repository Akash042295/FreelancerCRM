// src/pages/Company/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Headphones,
  Building2,
  Clock,
} from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportOnce,
} from "../../components/common/motionVariants.js";

const contactCards = [
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    lines: ["hello@yourcrm.com", "support@yourcrm.com"],
  },
  {
    icon: <Phone size={22} />,
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "Mon–Fri, 9am – 6pm EST"],
  },
  {
    icon: <MapPin size={22} />,
    title: "Visit Us",
    lines: ["Office 402, Business Bay", "Dubai, United Arab Emirates"],
  },
];

const reasons = [
  { icon: <MessageSquare size={20} />, title: "General Inquiry", desc: "Questions about the product or company." },
  { icon: <Headphones size={20} />, title: "Technical Support", desc: "Existing customers needing help." },
  { icon: <Building2 size={20} />, title: "Sales & Enterprise", desc: "Custom plans, security reviews and demos." },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "General Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  const inputClass =
    "w-full bg-[#0f0f0f] border border-[#2a2a2a] focus:border-orange-500 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors";

  return (
    <>
      <N />

      <PageHero
        badge="Contact"
        title="Let's talk about"
        highlight="your team"
        description="Questions, demos or support — pick the channel that suits you. We reply within one business day."
      />

      {/* CONTACT CARDS */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8, borderColor: "#f97316" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col gap-4 p-6 rounded-xl bg-[#181818]/90 border border-[#2a2a2a]"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <div className="flex flex-col gap-1">
                {card.lines.map((line, j) => (
                  <span
                    key={j}
                    className={
                      j === 0
                        ? "text-gray-300 text-sm font-medium"
                        : "text-gray-500 text-xs"
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="w-full bg-[#0f0f0f] border-t border-[#2a2a2a] px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-3 rounded-2xl border border-[#2a2a2a] bg-[#181818]/90 p-8 sm:p-10"
          >
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Send us a message
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Fill in the form and our team will get back to you shortly.
            </p>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Message sent successfully!
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Thanks for reaching out. We'll get back to you within one
                  business day.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      company: "",
                      subject: "General Inquiry",
                      message: "",
                    });
                  }}
                  className="mt-2 text-orange-500 font-semibold cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Full Name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company Inc."
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Sales & Enterprise</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="self-start inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  <Send size={18} />
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* SIDEBAR */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <motion.div variants={staggerItem}>
              <h3 className="text-lg font-bold text-white mb-4">
                What can we help with?
              </h3>
              <div className="flex flex-col gap-4">
                {reasons.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#181818]/90 border border-[#2a2a2a]"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                      {r.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        {r.title}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {r.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="rounded-xl bg-[#181818]/90 border border-[#2a2a2a] p-6"
            >
              <div className="flex items-center gap-2 text-orange-500 mb-3">
                <Clock size={18} />
                <span className="font-bold text-sm tracking-wide">
                  Support Hours
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday – Friday</span>
                  <span className="text-gray-300 font-medium">9am – 6pm EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-gray-300 font-medium">10am – 4pm EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-gray-500 font-medium">Closed</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-6"
            >
              <h4 className="text-white font-bold">Need urgent help?</h4>
              <p className="text-gray-400 text-sm mt-1.5">
                Enterprise customers get 24/7 phone support with a 1-hour SLA.
              </p>
              <button className="mt-4 text-orange-500 font-semibold text-sm cursor-pointer">
                Upgrade to Enterprise →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <F />
    </>
  );
};

export default Contact;