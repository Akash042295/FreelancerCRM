import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Send } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext.jsx";

const Footer = () => {
  const { t, lang, changeLanguage, languages } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
    {
      name: "Github",
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="w-full bg-[#0f0f0f] border-t border-[#2a2a2a] pt-16 pb-8 px-6 sm:px-10 lg:px-20 relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <div className="flex items-center gap-1.5 font-bold text-2xl text-white tracking-wider">
            <div className="uppercase text-orange-500">Freelancer</div>
            <span>CRM</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="flex items-center gap-4 mt-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.name}
                whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-colors duration-300"
              >
                {social.svg}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Product */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 lg:pl-8"
        >
          <h4 className="text-white font-bold text-lg tracking-wide mb-2">
            {t.product}
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              t.features,
              t.pricing,
              t.integrations,
              t.changelog,
              t.roadmap,
            ].map((item, index) => (
              <li key={index}>
                <motion.a
                  href={`/${item.toLowerCase()}`}
                  whileHover={{ x: 6, color: "#f97316" }}
                  className="text-gray-400 text-sm transition-colors duration-200 flex items-center gap-2 group w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/0 group-hover:bg-orange-500 transition-all duration-300"></span>
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg tracking-wide mb-2">
            {t.company}
          </h4>
          <ul className="flex flex-col gap-3">
            {[t.aboutUs, t.careers, t.blog, t.contact, t.partners].map(
              (item, index) => (
                <li key={index}>
                  <motion.a
                    href={`/${item.toLowerCase()}`}
                    whileHover={{ x: 6, color: "#f97316" }}
                    className="text-gray-400 text-sm transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/0 group-hover:bg-orange-500 transition-all duration-300"></span>
                    {item}
                  </motion.a>
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg tracking-wide mb-2">
            {t.stayUpdated}
          </h4>
          <p className="text-gray-400 text-sm">{t.newsDesc}</p>
          <form className="flex bg-[#181818] border border-[#2a2a2a] rounded-lg overflow-hidden focus-within:border-orange-500 transition-colors mt-2">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              required
              className="bg-transparent px-4 py-3 text-sm text-white outline-none w-full placeholder-gray-500"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 px-4 flex items-center justify-center text-white cursor-pointer"
            >
              <Send size={18} />
            </motion.button>
          </form>
          <p className="text-gray-500 text-xs mt-1">{t.privacyNote}</p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto border-t border-[#2a2a2a] mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500"
      >
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} FreelancerCRM. {t.rights}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: t.privacy, href: "/privacy-policy" },
            { label: t.terms, href: "/terms" },
            { label: t.cookies, href: "/cookie-settings" },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2, color: "#f97316" }}
              className="transition-colors cursor-pointer"
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{
          y: -5,
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 z-50 cursor-pointer"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
