import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import {
  translations,
  languages,
  DEFAULT_LANGUAGE,
} from "../locales/translation.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "FreelancerCRM-lang";

const getInitialLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    const isSupported = languages.some(
      (language) => language.code === savedLanguage
    );

    return isSupported ? savedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLanguage);

  const changeLanguage = useCallback((languageCode) => {
    const isSupported = languages.some(
      (language) => language.code === languageCode
    );

    if (!isSupported) return;

    setLang(languageCode);

    try {
      localStorage.setItem(STORAGE_KEY, languageCode);
    } catch {
      // Language can still change if storage is unavailable.
    }
  }, []);

  const t = translations[lang] ?? translations[DEFAULT_LANGUAGE];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: changeLanguage,
      changeLanguage,
      t,
      languages,
    }),
    [lang, changeLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};