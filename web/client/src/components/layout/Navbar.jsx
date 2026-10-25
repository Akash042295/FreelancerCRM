// src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMenu, 
  FiSearch, 
  FiPlus, 
  FiChevronDown, 
  FiBriefcase,
  FiUsers,
  FiCheckSquare,
  FiCommand,
  FiActivity,
  FiSettings,
  FiUser,
  FiLogOut,
  FiZap
} from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false); // Added workspace state
  
  const profileRef = useRef(null);
  const createRef = useRef(null);
  const workspaceRef = useRef(null);

  // Close all dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (createRef.current && !createRef.current.contains(event.target)) setIsCreateOpen(false);
      if (workspaceRef.current && !workspaceRef.current.contains(event.target)) setIsWorkspaceOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#111111]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 transition-all">
      
      {/* ================= LEFT: Workspace Context ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        
        {/* Enhanced Workspace Switcher */}
        <div className="relative" ref={workspaceRef}>
          <button 
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="hidden sm:flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#1A1A1A] border border-transparent hover:border-[#2a2a2a] transition-all group focus:outline-none"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <FiBriefcase size={16} />
              </div>
              {/* Live Workspace Indicator */}
              {/* <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full"></span> */}
            </div>
            <div className="flex flex-col items-start pr-2">
              <span className="text-sm font-bold text-gray-100 leading-tight group-hover:text-white uppercase">crm</span>
              <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Workspace</span>
            </div>
            <FiChevronDown size={14} className={`text-gray-500 group-hover:text-gray-300 transition-transform duration-200 ${isWorkspaceOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Workspace Dropdown (Optional logic to switch) */}
          {isWorkspaceOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-[#2a2a2a] mb-1">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Switch Workspace</p>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-500 bg-orange-500/10 border-l-2 border-orange-500">
                <FiBriefcase size={16} /> FreelancerCRM
                <span className="absolute right-2 w-2 h-2 bg-emerald-500/70 border border-emerald-400/60 rounded-full"></span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors border-l-2 border-transparent">
                <FiUsers size={16} /> Customer Support
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= CENTER: Enhanced Command Bar ================= */}
      <div className="hidden md:flex flex-1 max-w-xl mx-6">
        <button className="w-full flex items-center justify-between bg-[#111111] border border-[#2a2a2a] hover:border-orange-500/40 hover:bg-[#1A1A1A] rounded-xl px-3 py-2 transition-all group shadow-sm hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <div className="flex items-center gap-2.5 text-gray-500 group-hover:text-gray-300 transition-colors">
            <FiSearch size={16} className="group-hover:text-orange-500 transition-colors" />
            <span className="text-sm font-medium">Search deals, contacts, or run a command...</span>
          </div>
          <div className="flex items-center gap-1 bg-[#0a0a0a] px-2 py-1 rounded-md border border-[#333] text-gray-500 group-hover:border-orange-500/30 transition-colors">
            <FiCommand size={12} />
            <span className="text-[11px] font-bold">K</span>
          </div>
        </button>
      </div>

      {/* ================= RIGHT: Actions & Profile ================= */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Quick Create Dropdown */}
        <div className="relative" ref={createRef}>
          <button 
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="flex items-center justify-center gap-1.5 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 focus:outline-none"
          >
            <FiPlus size={16} />
            <span className="hidden sm:block">Create</span>
          </button>

          {isCreateOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/pipeline" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2A2A2A]/60 transition-colors">
                <div className="p-1.5 bg-orange-500/10 rounded-md text-orange-400"><FiBriefcase size={14} /></div> New Deal
              </Link>
              <Link to="/contacts" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2A2A2A]/60 transition-colors">
                <div className="p-1.5 bg-blue-500/10 rounded-md text-blue-400"><FiUsers size={14} /></div> New Contact
              </Link>
              <Link to="/tasks" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2A2A2A]/60 transition-colors">
                <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-400"><FiCheckSquare size={14} /></div> New Task
              </Link>
            </div>
          )}
        </div>

        {/* Activity / Notifications with Tooltip */}
        <button className="relative group p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors">
          <FiActivity size={20} />
          <span className="absolute top-1.5 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          {/* Simple Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] text-xs text-white px-2 py-1 rounded border border-[#2a2a2a] whitespace-nowrap pointer-events-none">
            Activity Feed
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-[#2a2a2a] hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#1a1a1a] transition-colors focus:outline-none border border-transparent hover:border-[#2a2a2a]"
          >
            {/* Avatar with Gradient Ring & Status */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A] p-0.5 ring ring-[#1a1a1a] transition-all">
                <div className="w-full h-full rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#111]">
                  <span className="text-gray-200 text-xs font-bold">
                    {getInitials(user?.name || 'User')}
                  </span>
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full shadow-sm"></span>
            </div>
            
            <div className="hidden sm:block text-left mr-1">
              <p className="text-sm font-bold text-white leading-tight">{user?.name || 'User'}</p>
              <p className="text-[11px] text-gray-500 capitalize">{user?.role || 'Member'}</p>
            </div>
            <FiChevronDown size={14} className={`text-gray-500 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Menu (Enhanced) */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#2a2a2a] mb-1 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@crm.com'}</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Online</span>
              </div>
              
              {/* Quick Status Toggle (CRM specific) */}
              <div className="px-4 py-2 flex gap-2 border-b border-[#2a2a2a]">
                 <button className="flex-1 text-xs bg-[#2A2A2A] text-white py-1 rounded">Available</button>
                 <button className="flex-1 text-xs text-gray-500 hover:bg-[#2A2A2A] hover:text-gray-300 py-1 rounded transition-colors">Busy</button>
              </div>

              <div className="py-1">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A]/50 hover:text-white transition-colors">
                  <FiUser size={16} className="text-gray-400" /> My Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A]/50 hover:text-white transition-colors">
                  <FiSettings size={16} className="text-gray-400" /> Account Settings
                </Link>
              </div>
              
              <div className="h-px bg-[#2a2a2a] my-1"></div>
              
              <div className="py-1">
                <button 
                  onClick={logout} 
                  className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <FiLogOut size={16} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;