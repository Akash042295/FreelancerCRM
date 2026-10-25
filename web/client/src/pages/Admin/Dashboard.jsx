import React, { useEffect, useState } from 'react'
import api from '../../lib/api';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineTrendingUp, HiOutlineClipboardList, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { motion } from 'framer-motion';
import ChartCard from '../../components/charts/ChartCard';
import axios from 'axios';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [leadChart, setLeadChart] = useState(Array(12).fill(0)); // Initialize with 12 months of data
  const [revenueChart, setRevenueChart] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/admin/dashboard', {
          withCredentials: true
        });
        setDashboardData(response.data.data);
        

        //lead chart
        setLeadChart(response.data.data.leadChart || Array(12).fill(0));
        setRevenueChart(response.data.data.revenueChart || Array(12).fill(0));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      label: 'Total Customers',
      value: dashboardData?.customers?.value ?? '—',
      change: dashboardData?.customers?.change ?? '0%',
      trend: dashboardData?.customers?.trend ?? 'up',
      icon: HiOutlineUsers,
      color: 'primary',
    },
    {
      label: 'Active Leads',
      value: dashboardData?.leads?.value ?? '—',
      change: dashboardData?.leads?.change ?? '0%',
      trend: dashboardData?.leads?.trend ?? 'up',
      icon: HiOutlineTrendingUp,
      color: 'emerald',
    },
    {
      label: 'Pending Tasks',
      value: dashboardData?.tasks?.value ?? '—',
      change: dashboardData?.tasks?.change ?? '0%',
      trend: dashboardData?.tasks?.trend ?? 'up',
      icon: HiOutlineClipboardList,
      color: 'amber',
    },
    {
      label: 'Revenue',
      value: dashboardData?.revenue?.value ?? '—',
      change: dashboardData?.revenue?.change ?? '0%',
      trend: dashboardData?.revenue?.trend ?? 'up',
      icon: HiOutlineCurrencyDollar,
      color: 'blue',
    },
  ];

  const colorMap = {
    primary: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  };

// Sample chart data and here also lead api
  const leadChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Leads',
        data: leadChart,
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: '#F97316',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#F97316',
        pointBorderColor: '#F97316',
        pointRadius: 3,
      },
    ],
  };

  const revenueChartData = {
    labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
    datasets: [
      {
        label: 'Revenue (₨)',
        data: revenueChart,
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const taskChartData = {
    labels: ['To Do', 'In Progress', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [
          dashboardData?.taskChart?.todo ?? 0,
        dashboardData?.taskChart?.inProgress ?? 0,
        dashboardData?.taskChart?.completed ?? 0,
        dashboardData?.taskChart?.cancelled ?? 0,
        ],
        backgroundColor: ['#FBBF24', '#3B82F6', '#10B981', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const recentActivity =  dashboardData?.recentActivity || [];
  
  if (loading) {
    return <p className="text-gray-400">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className='space-y-6'>

      <div>
            {/* <div className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Sales
            </div> */}
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              Dash <span className="text-orange-500">Board</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Manage Your Customers, Leads, Task & Pipelines.
            </p>
          </div>

      {/*here are the stat card*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item} className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/50 rounded-xl p-5 flex flex-col gap-2 group hover:border-orange-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg ${colorMap[stat.color].bg} ${colorMap[stat.color].border} border`}>
                <stat.icon size={20} className={colorMap[stat.color].text} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/*here we make the chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <ChartCard title="Lead Trends" subtitle="Monthly lead acquisition" type="line" data={leadChartData} />
        </motion.div>
        <motion.div variants={item}>
          <ChartCard title="Revenue" subtitle="Monthly revenue in PKR" type="bar" data={revenueChartData} />
        </motion.div>
      </div>
      {/*Bottom row*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <ChartCard title="Tasks Overview" subtitle="Status distribution" type="doughnut" data={taskChartData} />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-2">
          <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/50 rounded-xl p-5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
            <h3 className="text-base font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2A2A]/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    activity.type === 'lead' ? 'bg-orange-500' :
                    activity.type === 'task' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{activity.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{new Date(activity.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  )
}

export default Dashboard
