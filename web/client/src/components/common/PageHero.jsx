// src/components/common/PageHero.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motionVariants";

const PageHero = ({ badge, title, highlight, description, children }) => {
  return (
    <section className="w-full bg-[#0f0f0f] border-b border-[#2a2a2a] px-6 sm:px-10 lg:px-20 pt-20 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5"
      >
        {badge && (
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm font-semibold tracking-wide"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          variants={fadeInUp}
          className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wider leading-tight sm:leading-[1.15] text-white"
        >
          {title} {highlight && <span className="text-orange-500">{highlight}</span>}
        </motion.h1>

        {description && (
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-base sm:text-lg leading-7 sm:leading-9 max-w-2xl"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div variants={fadeInUp} className="w-full">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;