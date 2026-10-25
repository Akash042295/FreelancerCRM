
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, LockKeyhole, Database, UserRound } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: [
      "Account information such as your name, email address, and profile details that you provide when registering or using FreelancerCRM.",
      "Customer, contact, task, and task information entered by authorized users into the CRM.",
      "Technical information such as browser type, device information, application logs, and usage information where collected by the application.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "2. How We Use Information",
    content: [
      "To create and manage accounts and authenticate users.",
      "To provide CRM functionality, including customer management, Tasks Management.",
      "To maintain application security, troubleshoot errors, and prevent unauthorized access.",
      "To respond to support requests and communicate important service updates.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "3. Data Security",
    content: [
      "FreelancerCRM should use appropriate technical and organizational safeguards to protect information against unauthorized access, alteration, disclosure, or loss.",
      "Access to business and customer information should be limited according to user roles and permissions.",
      "No internet-based service can guarantee absolute security. Actual safeguards depend on the application's deployed configuration.",
    ],
  },
  {
    icon: UserRound,
    title: "4. Data Sharing and Access",
    content: [
      "Information may be accessible to authorized administrators and users according to their roles and permissions.",
      "Information may be processed by hosting, database, email, or other service providers when those services are actually used.",
      "Information may be disclosed when required by applicable law or to protect legitimate security and legal interests.",
      "FreelancerCRM should not claim that data is never shared unless this has been verified against its actual operations.",
    ],
  },
  {
    icon: Database,
    title: "5. Data Retention and Deletion",
    content: [
      "Information should be retained only for as long as necessary for the purposes for which it was collected, subject to applicable legal obligations.",
      "Users may contact the application operator to request access, correction, or deletion of their information, subject to applicable law and legitimate retention requirements.",
      "Deleting an account does not necessarily remove information from backups immediately.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "6. Cookies and Local Storage",
    content: [
      "FreelancerCRM may use browser storage to maintain authentication state, remember preferences, or support essential application functionality.",
      "Browser localStorage and cookies are different technologies. Their actual use depends on the application's implementation.",
      "Optional analytics or advertising technologies should only be used when configured and, where required, after obtaining valid consent.",
    ],
  },
  {
    icon: UserRound,
    title: "7. Your Privacy Choices",
    content: [
      "Depending on applicable law, you may have rights to access, correct, delete, or request a copy of personal information.",
      "You may also be entitled to object to or restrict certain processing.",
      "To submit a privacy request, contact the operator using the official contact details published on the FreelancerCRM website.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "8. Changes to This Policy",
    content: [
      "This policy may be updated when the service, data practices, or applicable legal requirements change.",
      "The latest version should be published on this page with an updated effective date.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative overflow-hidden border-b border-[#2a2a2a] px-6 py-20 sm:px-10 lg:px-20">
        <div className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
            <ShieldCheck size={30} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Legal & Privacy
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>

          <p className="max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Learn how FreelancerCRM handles information used to provide and
            maintain its customer relationship management services.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Effective date: October 14, 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-[#2a2a2a] bg-[#141414] p-5 lg:sticky lg:top-8">
            <h2 className="mb-4 font-semibold">On this page</h2>
            <nav className="flex flex-col gap-3">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#privacy-section-${index}`}
                  className="text-sm text-gray-400 transition-colors hover:text-orange-500"
                >
                  {section.title.replace(/^\d+\.\s/, "")}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-5">
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-8">
              <h2 className="mb-3 text-xl font-semibold">
                Your privacy matters
              </h2>
              <p className="leading-7 text-gray-400">
                This policy explains the information practices intended for
                FreelancerCRM. The final published policy must accurately reflect
                the data actually collected, the services used, and the
                controls available in the deployed application.
              </p>
            </div>

            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
                  id={`privacy-section-${index}`}
                  className="scroll-mt-8 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 sm:p-8"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Icon size={21} />
                    </div>
                    <h2 className="text-lg font-semibold sm:text-xl">
                      {section.title}
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <li
                        key={paragraphIndex}
                        className="flex gap-3 text-sm leading-7 text-gray-400 sm:text-base"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            <div className="rounded-2xl border border-[#2a2a2a] p-6">
              <h2 className="mb-3 text-lg font-semibold">Privacy questions?</h2>
              <p className="text-sm leading-7 text-gray-400">
                Please use the official contact information available on the
                FreelancerCRM Contact page to submit a privacy request or question.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex font-medium text-orange-500 transition-colors hover:text-orange-400"
              >
                Contact FreelancerCRM →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
