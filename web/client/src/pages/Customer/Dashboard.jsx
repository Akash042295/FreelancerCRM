import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlineChatAlt2, HiOutlineUser, HiOutlineBell } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { formatDate, getStatusColor, getPriorityColor } from '../../utils/helpers';
import api from '../../lib/api.js';

//container & item for animation
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const myTasks = allTasks;

  //api call here
  useEffect(() => {
    const cD = async () => {
      try {
        const response = await api.get('/customer/dashboard');
        setAllTasks(response.data.data.tasks || [])
      } catch (error) {
        toast.error("Failed to load data!")
      }
    };
    cD();
  },[])

  const stats = [
    { label: 'My Tasks', value: myTasks.length, icon: HiOutlineClipboardList, color: 'primary', link: '/customer/tasks' },
    { label: 'Pending', value: myTasks.filter((t) => t.status === 'to do').length, icon: HiOutlineBell, color: 'amber', link: '/customer/tasks' },
    { label: 'Completed', value: myTasks.filter((t) => t.status === 'completed').length, icon: HiOutlineClipboardList, color: 'emerald', link: '/customer/tasks' },
    { label: 'Chat', value: 'Active', icon: HiOutlineChatAlt2, color: 'blue', link: '/customer/chat' },
  ];

  const colorMap = {
    primary: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className='space-y-6'>
      {/* Welcome card! */}
      <motion.div variants={item} className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-sm text-gray-400 mt-1">Here's an overview of your account activity.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Link to={stat.link} className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-5 flex flex-col gap-2 group hover:border-orange-500/20 transition-all duration-300">
              <div className={`p-2.5 rounded-lg ${colorMap[stat.color].bg} w-fit`}>
                <stat.icon size={20} className={colorMap[stat.color].text} />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks */}
      <motion.div variants={item} className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">My Recent Tasks</h3>
          <Link to="/customer/tasks" className="text-orange-500 hover:text-orange-400 text-sm flex items-center gap-1">
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {myTasks.slice(0, 5).length > 0 ? myTasks.slice(0, 5).map((task) => (
            <div key={task._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1a1a]/50 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-white truncate">{task.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">Due: {formatDate(task.dueDate)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                <span className={getStatusColor(task.status)}>{task.status.replace('_', ' ')}</span>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500 text-center py-4">No tasks assigned yet.</p>
          )}
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/customer/chat" className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-orange-500/10">
            <HiOutlineChatAlt2 size={24} className="text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Chat with Support</p>
            <p className="text-xs text-gray-500">Get help from our team</p>
          </div>
          <FiArrowRight className="ml-auto text-gray-500" />
        </Link>
        <Link to="/customer/profile" className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <HiOutlineUser size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Edit Profile</p>
            <p className="text-xs text-gray-500">Update your information</p>
          </div>
          <FiArrowRight className="ml-auto text-gray-500" />
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default CustomerDashboard
