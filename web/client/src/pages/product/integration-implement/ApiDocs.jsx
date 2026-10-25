
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  KeyRound,
  Code2,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

import N from "../../../components/parts/Navbar.jsx";
import F from "../../../components/parts/Footer.jsx";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/contacts",
    title: "List Contacts",
    description: "Retrieve contacts available to the authenticated user.",
    sample: `fetch("/api/v1/contacts", {
  headers: {
    Authorization: "Bearer YOUR_API_TOKEN"
  }
});`,
  },
  {
    method: "POST",
    path: "/api/v1/contacts",
    title: "Create Contact",
    description: "Create a contact by sending its details in JSON format.",
    sample: `fetch("/api/v1/contacts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_API_TOKEN"
  },
  body: JSON.stringify({
    name: "Alex Morgan",
    email: "alex@example.com"
  })
});`,
  },
  {
    method: "GET",
    path: "/api/v1/deals",
    title: "List Deals",
    description: "Retrieve sales deals and their current pipeline status.",
    sample: `fetch("/api/v1/deals", {
  headers: {
    Authorization: "Bearer YOUR_API_TOKEN"
  }
});`,
  },
];

const methodStyles = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/20",
};

const ApiDocs = () => {
  const [copied, setCopied] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const copyText = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  const sections = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "authentication", label: "Authentication", icon: KeyRound },
    { id: "endpoints", label: "Endpoints", icon: Code2 },
    { id: "errors", label: "Errors", icon: ShieldCheck },
  ];

  return (
    <>
      <N />

      <main className="min-h-screen bg-[#0f0f0f] text-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#2a2a2a] px-6 py-20 sm:px-10 lg:px-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Link
              to="/integrations"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Integrations
            </Link>

            <div className=" ml-5 mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
              <Terminal size={16} />
              Developer Documentation
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Build with the{" "}
              <span className="text-orange-500">FreelancerCRM API.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Explore API concepts, authentication patterns and example
              requests to help you integrate CRM data into your own
              applications.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#endpoints"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Explore Endpoints
                <ExternalLink size={17} />
              </a>

              <a
                href="#authentication"
                className="inline-flex items-center gap-2 rounded-lg border border-[#333] px-6 py-3 font-semibold text-gray-200 transition-colors hover:border-orange-500"
              >
                Authentication Guide
              </a>
            </div>
          </div>
        </section>

        {/* DOCUMENTATION CONTENT */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-20">
          <aside className="h-fit lg:sticky lg:top-25">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Documentation
            </p>

            <nav className="flex flex-wrap gap-2 lg:flex-col">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:bg-[#181818] hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    {section.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 rounded-xl border border-[#2a2a2a] bg-[#181818] p-5">
              <ShieldCheck className="mb-3 text-orange-500" size={23} />
              <h3 className="font-semibold">Secure by design</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Keep credentials private and validate access on your server.
              </p>
            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            {/* OVERVIEW */}
            <motion.section
              id="overview"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="scroll-mt-8"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                Getting Started
              </p>

              <h2 className="text-3xl font-bold">API Overview</h2>

              <p className="mt-4 leading-8 text-gray-400">
                The FreelancerCRM API can provide a programmatic way to work
                with contacts, deals and other CRM resources. The available
                operations, base URL and authentication method depend on
                the API implemented by your backend.
              </p>

              <div className="mt-6 rounded-xl border border-[#2a2a2a] bg-[#181818] p-5 sm:p-6">
                <p className="mb-3 text-sm text-gray-400">Base URL</p>

                <div className="flex items-center justify-between gap-3">
                  <code className="break-all text-sm text-orange-400">
                    YOUR_API_BASE_URL
                  </code>

                  <button
                    onClick={() =>
                      copyText("YOUR_API_BASE_URL", "base")
                    }
                    aria-label="Copy API base URL placeholder"
                    className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-[#252525] hover:text-white"
                  >
                    {copied === "base" ? (
                      <Check size={17} />
                    ) : (
                      <Copy size={17} />
                    )}
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  Replace this placeholder with your actual deployed API
                  base URL.
                </p>
              </div>
            </motion.section>

            {/* AUTH */}
            <section id="authentication" className="scroll-mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                Security
              </p>

              <h2 className="text-3xl font-bold">Authentication</h2>

              <p className="mt-4 leading-8 text-gray-400">
                If your backend supports bearer-token authentication,
                include a valid token in the Authorization header.
                Never expose private API credentials in public frontend
                code.
              </p>

              <div className="relative mt-6 overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#141414]">
                <div className="flex items-center justify-between border-b border-[#2a2a2a] px-5 py-3">
                  <span className="text-sm text-gray-400">
                    Example request header
                  </span>

                  <button
                    onClick={() =>
                      copyText(
                        'Authorization: Bearer YOUR_API_TOKEN',
                        "auth"
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-orange-500"
                  >
                    {copied === "auth" ? <Check size={15} /> : <Copy size={15} />}
                    {copied === "auth" ? "Copied" : "Copy"}
                  </button>
                </div>

                <pre className="overflow-x-auto p-5 text-sm leading-7 text-gray-300">
                  <code>
                    Authorization: Bearer YOUR_API_TOKEN
                  </code>
                </pre>
              </div>
            </section>

            {/* ENDPOINTS */}
            <section id="endpoints" className="scroll-mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                Reference
              </p>

              <h2 className="text-3xl font-bold">API Endpoints</h2>

              <p className="mt-4 leading-8 text-gray-400">
                These are illustrative endpoint examples. Confirm the paths,
                fields and HTTP methods against your actual backend routes
                before using them.
              </p>

              <div className="mt-7 space-y-6">
                {endpoints.map((endpoint) => (
                  <article
                    key={endpoint.path + endpoint.method}
                    className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#181818]"
                  >
                    <div className="border-b border-[#2a2a2a] p-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-md border px-2.5 py-1 text-xs font-bold ${methodStyles[endpoint.method]}`}
                        >
                          {endpoint.method}
                        </span>

                        <code className="break-all text-sm text-gray-200">
                          {endpoint.path}
                        </code>
                      </div>

                      <h3 className="mt-4 text-lg font-bold">
                        {endpoint.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {endpoint.description}
                      </p>
                    </div>

                    <div className="bg-[#121212]">
                      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-5 py-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          JavaScript Example
                        </span>

                        <button
                          onClick={() =>
                            copyText(endpoint.sample, endpoint.path)
                          }
                          className="inline-flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-orange-500"
                        >
                          {copied === endpoint.path ? (
                            <Check size={15} />
                          ) : (
                            <Copy size={15} />
                          )}
                          {copied === endpoint.path ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <pre className="overflow-x-auto p-5 text-xs leading-6 text-gray-300 sm:text-sm">
                        <code>{endpoint.sample}</code>
                      </pre>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ERRORS */}
            <section id="errors" className="scroll-mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                Troubleshooting
              </p>

              <h2 className="text-3xl font-bold">Error Handling</h2>

              <p className="mt-4 leading-8 text-gray-400">
                Your API may return standard HTTP error statuses. The exact
                response body and error format depend on your backend.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-[#2a2a2a]">
                <table className="w-full min-w-100 text-left text-sm">
                  <thead className="bg-[#181818] text-gray-300">
                    <tr>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Meaning</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#2a2a2a] bg-[#141414] text-gray-400">
                    <tr>
                      <td className="px-5 py-4 font-mono text-orange-400">400</td>
                      <td className="px-5 py-4">Invalid request data</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-mono text-orange-400">401</td>
                      <td className="px-5 py-4">Authentication required or invalid</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-mono text-orange-400">403</td>
                      <td className="px-5 py-4">Insufficient permissions</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-mono text-orange-400">404</td>
                      <td className="px-5 py-4">Resource not found</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-mono text-orange-400">500</td>
                      <td className="px-5 py-4">Unexpected server error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-8">
              <h3 className="text-xl font-bold">
                Ready to connect your application?
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Verify the endpoints and authentication rules in your
                backend, then adapt the examples to your application.
              </p>

              <Link
                to="/integrations"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-500 hover:text-orange-400"
              >
                Explore Integrations
                <ArrowLeft className="rotate-180" size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <F />
    </>
  );
};

export default ApiDocs;
