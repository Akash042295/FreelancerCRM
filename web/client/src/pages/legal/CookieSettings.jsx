
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  ChartNoAxesCombined,
  Megaphone,
  Check,
  RotateCcw,
} from "lucide-react";

const STORAGE_KEY = "FreelancerCRM-cookie-preferences";

const DEFAULT_PREFERENCES = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const categories = [
  {
    key: "necessary",
    title: "Strictly Necessary",
    description:
      "Supports essential security and application functions. This category cannot be disabled here.",
    icon: ShieldCheck,
    required: true,
  },
  {
    key: "functional",
    title: "Functional Preferences",
    description:
      "Can remember optional preferences, such as language or personalization settings, when implemented using cookies or similar technologies.",
    icon: Settings2,
    required: false,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Can help measure traffic and understand how visitors use the website through analytics technologies, if configured.",
    icon: ChartNoAxesCombined,
    required: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Can support advertising measurement or marketing-related tracking, if these services are used.",
    icon: Megaphone,
    required: false,
  },
];

const readPreferences = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_PREFERENCES;

    const parsed = JSON.parse(saved);

    return {
      necessary: true,
      functional: parsed.functional === true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const CookieSettings = () => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  const updatePreference = (key, value) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
      necessary: true,
    }));
    setSaved(false);
  };

  const savePreferences = (nextPreferences = preferences) => {
    const normalized = {
      necessary: true,
      functional: nextPreferences.functional === true,
      analytics: nextPreferences.analytics === true,
      marketing: nextPreferences.marketing === true,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      setPreferences(normalized);
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectOptional = () => {
    savePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    setSaved(false);
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative overflow-hidden border-b border-[#2a2a2a] px-6 py-20 sm:px-10 lg:px-20">
        <div className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
            <Cookie size={30} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Privacy Controls
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Cookie <span className="text-orange-500">Settings</span>
          </h1>

          <p className="max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Choose which optional cookie categories you want to allow.
            You can revisit this page to update your preferences.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-orange-500" size={24} />
              <h2 className="text-xl font-semibold">
                Manage your preferences
              </h2>
            </div>

            <p className="text-sm leading-7 text-gray-400 sm:text-base">
              Necessary storage supports core website functions. Optional
              categories can be enabled or disabled below. Your choices are
              saved in this browser and can be changed later.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Accept All
              </button>

              <button
                type="button"
                onClick={rejectOptional}
                className="rounded-lg border border-[#383838] px-5 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-orange-500 hover:text-orange-500"
              >
                Reject Optional
              </button>

              <button
                type="button"
                onClick={resetPreferences}
                className="inline-flex items-center gap-2 rounded-lg border border-[#383838] px-5 py-3 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
              >
                <RotateCcw size={16} />
                Reset Form
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const enabled = preferences[category.key];

              return (
                <motion.article
                  key={category.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-5 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {category.title}
                        </h3>

                        {category.required && (
                          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-500">
                            Always Active
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-7 text-gray-400">
                        {category.description}
                      </p>
                    </div>

                    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={enabled}
                        disabled={category.required}
                        onChange={(event) =>
                          updatePreference(
                            category.key,
                            event.target.checked
                          )
                        }
                        aria-label={`Enable ${category.title}`}
                      />

                      <span className="h-6 w-11 rounded-full bg-[#383838] transition-colors peer-checked:bg-orange-500 peer-focus-visible:outline peer-focus-visible:outline-offset-4 peer-focus-visible:outline-orange-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <span className="block h-5 w-5 translate-x-0.5 translate-y-0.5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                      </span>
                    </label>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#2a2a2a] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-semibold">Save your preferences</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Your selection will be saved in this browser.
              </p>

              {saved && (
                <p
                  role="status"
                  className="mt-3 flex items-center gap-2 text-sm text-green-400"
                >
                  <Check size={17} />
                  Preferences saved successfully.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => savePreferences()}
              className="shrink-0 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Save Preferences
            </button>
          </div>

          <p className="mt-6 text-xs leading-6 text-gray-500">
            Important: Saving these preferences records your selection. It
            does not automatically block third-party scripts or cookies.
            Any optional analytics or marketing integrations must be connected
            to these preferences before this page can enforce consent.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CookieSettings;
