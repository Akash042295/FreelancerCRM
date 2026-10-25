import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown, ArrowRightToLine } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext.jsx";


const Navbar = () => {
  const { t, lang, changeLanguage, languages } = useLanguage();
  const navigate = useNavigate();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full h-20 border-b flex items-center justify-between px-5 sm:px-8 lg:px-12 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f0f]/95 backdrop-blur-xl border-[#2a2a2a] shadow-lg shadow-black/40"
          : "bg-[#0f0f0f] border-[#2a2a2a] shadow-md shadow-white/5"
      }`}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => navigate('/home_page')}
        className="flex items-center gap-1.5 font-bold text-2xl text-white tracking-wider cursor-pointer select-none"
      >
        <div className="uppercase text-orange-500">Freelancer</div>
        <span>CRM</span>
      </motion.div>

      {/* Desktop Links */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
          },
        }}
        className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
      >
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowLangDropdown((v) => !v)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#181818] border border-[#2a2a2a] hover:border-orange-500/50 text-gray-300 text-sm font-medium transition-colors cursor-pointer"
          >
            <Globe size={16} className="text-orange-500" />
            <span className="hidden md:inline">{currentLang.flag}</span>
            <span className="hidden md:inline">{currentLang.label}</span>
            <motion.span
              animate={{ rotate: showLangDropdown ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center"
            >
              <ChevronDown size={14} />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-44 bg-[#181818] border border-[#2a2a2a] rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50"
              >
                {languages.map((l, i) => (
                  <motion.button
                    key={l.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      changeLanguage(l.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                      lang === l.code
                        ? "bg-orange-500/15 text-orange-500"
                        : "text-gray-300 hover:bg-[#222] hover:text-orange-500"
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span className="font-medium">{l.label}</span>
                    {lang === l.code && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Login */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/login')}
          className="hidden sm:flex items-center justify-center px-4 h-10 rounded-lg font-semibold bg-[#f5f5f5] text-orange-500 tracking-wide text-sm hover:bg-white transition-colors cursor-pointer"
        >
          {t.login}
        </motion.button>

        {/* Register */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/register')}
          className="hidden sm:flex items-center justify-center gap-2 px-4 h-10 rounded-lg font-semibold bg-orange-500 text-white tracking-wide text-sm hover:bg-orange-600 transition-colors cursor-pointer shadow-lg shadow-orange-500/25"
        >
          {t.register}
          <ArrowRightToLine size={16} />
        </motion.button>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden md:hidden sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#181818] border border-[#2a2a2a] text-orange-500 cursor-pointer"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-20 left-0 w-full bg-[#0f0f0f] border-b border-[#2a2a2a] overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                <div className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2 px-4">
                  {t.language}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        lang === l.code
                          ? "bg-orange-500/15 text-orange-500 border border-orange-500/30"
                          : "bg-[#181818] text-gray-300 border border-[#2a2a2a] hover:text-orange-500"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => navigate('/login')} className="flex-1 h-11 rounded-lg font-semibold bg-[#f5f5f5] text-orange-500 text-sm cursor-pointer">
                  {t.login}
                </button>
                <button onClick={() => navigate('/register')} className="flex-1 h-11 rounded-lg font-semibold bg-orange-500 text-white text-sm cursor-pointer">
                  {t.register}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;