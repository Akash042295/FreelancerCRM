import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ChartCard from "../../components/charts/ChartCard";
import api from "../../lib/api.js";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [customers, setCustomers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);

  //api call here
  useEffect(() => {
    const aC = async () => {
      try {
        const { data } = await api.get("/admin/analytics");
        setAnalytics(data.data);
      } catch (error) {
        toast.error("Failed to fetch the data!");
      }
    };
    aC();
  }, []);

  //api call for leadsBySource
  const leadsChart = analytics?.leadsChart;

  const leadsBySource = {
    labels: ["Website", "Referral", "LinkedIn", "Cold Call", "Email", "Other"],
    datasets: [
      {
        label: "Leads by Source",
        data: [
          leadsChart?.website || 0,
          leadsChart?.referral || 0,
          leadsChart?.linkedIn || 0,
          leadsChart?.coldCall || 0,
          leadsChart?.email || 0,
          leadsChart?.other || 0,
        ],
        backgroundColor: [
          "#F97316",
          "#3B82F6",
          "#0EA5E9",
          "#10B981",
          "#8B5CF6",
          "#6B7280",
        ],
        borderWidth: 0,
      },
    ],
  };


  //api call for tasksByStatus
  const taskChart = analytics?.taskChart;
  const tasksByStatus = {
    labels: ["To Do", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        label: "Tasks",
        data: [
          taskChart?.todo || 0,
          taskChart?.inProgress || 0,
          taskChart?.completed || 0,
          taskChart?.cancelled || 0,
        ],
        backgroundColor: [
          "rgba(251, 191, 36, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  //api call for customerGrowth
  const customerChart = analytics?.customerChart;
  const customerGrowth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Customers",
        data: [
          customerChart?.jan || 0,
        customerChart?.feb || 0,
        customerChart?.mar || 0,
        customerChart?.apr || 0,
        customerChart?.may || 0,
        customerChart?.jun || 0,
        customerChart?.jul || 0,
        customerChart?.aug || 0,
        customerChart?.sep || 0,
        customerChart?.oct || 0,
        customerChart?.nov || 0,
        customerChart?.dec || 0,
        ],
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#F97316",
        pointRadius: 4,
      },
    ],
  };

  //revenue by customer chart
  const customerRevenueChart = analytics?.customerRevenueChart;
  const revenueByCustomer = {
    labels: customerRevenueChart?.labels || [],
    datasets: [
      {
        label: "Revenue (₨)",
        data: customerRevenueChart?.revenue || [],
        backgroundColor: "rgba(249, 115, 22, 0.7)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const stats = [
  {
    label: "Total Revenue",
    value: `${analytics?.revenue || 0}`,
    color: "text-orange-500",
  },
  {
    label: "Total Customers",
    value: `${analytics?.totalCustomers || 0}`,
    color: "text-emerald-400",
  },
  {
    label: "Conversion Rate",
    value: `${analytics?.conversionRate || 0}%`,
    color: "text-blue-400",
  },
  {
    label: "Total Tasks",
    value: analytics?.totalTasks || 0,
    color: "text-amber-400",
  },
];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/*main div*/}
      <div>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              Analytics <span className="text-orange-500">Overview</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              insights & analytics metrics
            </p>
          </div>
      {/*summary stats*/}
      <motion.div
        variants={item}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] rounded-xl p-4 text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <ChartCard
            title="Leads by Source"
            subtitle="Distribution across channels"
            type="doughnut"
            data={leadsBySource}
          />
        </motion.div>
        <motion.div variants={item}>
          <ChartCard
            title="Tasks by Status"
            subtitle="Current task distribution"
            type="bar"
            data={tasksByStatus}
          />
        </motion.div>
        <motion.div variants={item}>
          <ChartCard
            title="Customer Growth"
            subtitle="Monthly customer acquisition"
            type="line"
            data={customerGrowth}
          />
        </motion.div>
        <motion.div variants={item}>
          <ChartCard
            title="Revenue by Customer"
            subtitle="Top customers by spend"
            type="bar"
            data={revenueByCustomer}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
