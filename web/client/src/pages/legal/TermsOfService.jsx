
import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Users,
  Scale,
  LockKeyhole,
  CircleAlert,
} from "lucide-react";

const terms = [
  {
    icon: Users,
    title: "1. Eligibility and Accounts",
    paragraphs: [
      "You must provide accurate information when creating or managing an account.",
      "You are responsible for maintaining the confidentiality of your login credentials and for activity performed through your account, subject to applicable law.",
      "Administrators should assign roles and permissions only to authorized users.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "2. Acceptable Use",
    paragraphs: [
      "Use FreelancerCRM only for lawful purposes and in accordance with these terms.",
      "Do not attempt to access another user's account, bypass access controls, interfere with service security, or exploit vulnerabilities without authorization.",
      "Do not upload or distribute unlawful, malicious, or unauthorized content.",
      "Do not use the service to violate another person's privacy or applicable data protection laws.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "3. Business and Customer Data",
    paragraphs: [
      "Users must have appropriate authorization to enter, access, export, or share business and customer information.",
      "Organizations are responsible for configuring appropriate user permissions and handling personal information lawfully.",
      "Users should not upload sensitive information unless the service is appropriately configured and its use is authorized.",
    ],
  },
  {
    icon: FileText,
    title: "4. Intellectual Property",
    paragraphs: [
      "The FreelancerCRM name, branding, interface, and original software may be protected by applicable intellectual property laws.",
      "These terms do not transfer ownership of the service's intellectual property to users.",
      "Users retain whatever rights they have in information they lawfully submit, subject to the rights and permissions necessary to operate the service.",
    ],
  },
  {
    icon: CircleAlert,
    title: "5. Service Availability",
    paragraphs: [
      "The service may occasionally be unavailable because of maintenance, technical issues, or circumstances outside the operator's reasonable control.",
      "Features may change as the application develops. Where appropriate, material changes should be communicated to affected users.",
      "Users should maintain suitable backups of important business information where backup functionality is not guaranteed.",
    ],
  },
  {
    icon: Scale,
    title: "6. Suspension and Termination",
    paragraphs: [
      "Access may be restricted or suspended where reasonably necessary to address security risks, unlawful activity, or serious violations of these terms.",
      "Where appropriate and lawful, users should be informed of the reason for a suspension and any available review process.",
      "Data handling following account termination remains subject to the Privacy Policy and applicable law.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "7. Disclaimers and Liability",
    paragraphs: [
      "The service is provided subject to its documented features, limitations, and any separate agreement applicable to your account.",
      "To the extent permitted by law, the operator does not guarantee uninterrupted or error-free operation.",
      "Nothing in these terms excludes or limits liability or rights that cannot lawfully be excluded or limited.",
    ],
  },
  {
    icon: FileText,
    title: "8. Changes to These Terms",
    paragraphs: [
      "These terms may be updated to reflect changes to the service or applicable law.",
      "Material changes should be communicated where required. The latest version and effective date should be published on this page.",
    ],
  },
];

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative overflow-hidden border-b border-[#2a2a2a] px-6 py-20 sm:px-10 lg:px-20">
        <div className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
            <FileText size={30} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Legal Agreement
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Terms of <span className="text-orange-500">Service</span>
          </h1>

          <p className="max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            These terms describe the rules and responsibilities that apply
            when using FreelancerCRM.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Effective date: October 14, 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-8">
            <h2 className="mb-3 text-xl font-semibold">Using FreelancerCRM</h2>
            <p className="leading-7 text-gray-400">
              By accessing or using FreelancerCRM, you agree to comply with the
              applicable terms presented to you. If you do not agree, do not
              use the service. Any legally required notice or acceptance
              process must be implemented separately where necessary.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {terms.map((section) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 transition-colors hover:border-orange-500/30 sm:p-7"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Icon size={21} />
                    </div>
                    <h2 className="text-lg font-semibold">
                      {section.title}
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {section.paragraphs.map((paragraph, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-7 text-gray-400"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-semibold">Contact</h2>
            <p className="text-sm leading-7 text-gray-400">
              For questions about these terms, please visit our Contact page
              and use the official contact details provided there.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex font-medium text-orange-500 transition-colors hover:text-orange-400"
            >
              Contact FreelancerCRM →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
