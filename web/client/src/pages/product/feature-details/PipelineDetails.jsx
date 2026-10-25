
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Layers3,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Layers3,
    title: "Custom Sales Pipelines",
    description:
      "Create pipelines and stages that reflect your sales process, from initial contact to closing a deal.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Forecasting",
    description:
      "Track deal values, sales progress, and potential revenue to support better business decisions.",
  },
  {
    icon: Target,
    title: "Stage-Based Follow-Ups",
    description:
      "Organize next steps for every opportunity and help your team focus on the right deals.",
  },
  {
    icon: Clock3,
    title: "Deal Inactivity Alerts",
    description:
      "Identify opportunities that need attention before they become forgotten or stalled deals.",
  },
];

const PipelineDetails = () => {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="border-b border-[#2a2a2a] px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/features"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-orange-500"
          >
            <ArrowLeft size={17} />
            Back to Features
          </Link>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
            Sales Pipeline
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            A sales pipeline that matches{" "}
            <span className="text-orange-500">how you sell.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Manage opportunities, organize sales stages, monitor deal
            progress, and keep your team focused on closing more deals.
          </p>

          <a
            href="/register"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get Started <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Pipeline Features
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Every deal, clearly organized.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-7 transition-colors hover:border-orange-500/40 sm:p-8"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Icon size={24} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-gray-400">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={17} className="text-orange-500" />
                    Designed for organized sales workflows
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col justify-between gap-6 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-7 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-bold">
                Make every opportunity count.
              </h2>
              <p className="mt-3 text-gray-400">
                Explore how FreelancerCRM can organize your sales process.
              </p>
            </div>

            <Link
              to="/features/automation"
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-orange-500 hover:text-orange-400"
            >
              Explore Automation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PipelineDetails;
