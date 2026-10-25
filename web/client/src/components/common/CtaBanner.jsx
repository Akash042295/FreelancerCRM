// src/components/common/CtaBanner.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CtaBanner = ({
  tag = "Get Started",
  title = "Ready to get started?",
  description,
  primaryLabel = "Start Free Trial",
  secondaryLabel = "Book a Demo",
  onSecondary,
  onPrimary,
}) => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full bg-linear-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-center md:text-left">
          <div className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
            {tag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            {title}
          </h2>
          {description && <p className="text-gray-400 mt-2">{description}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            onClick={onPrimary}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            {primaryLabel}
          </motion.button>
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            onClick={onSecondary}
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            {secondaryLabel}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaBanner;