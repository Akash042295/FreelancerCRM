import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiLogOut } from 'react-icons/fi';
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { 
  HiOutlineViewGrid, HiOutlineUsers, HiOutlineClipboardList, 
  HiOutlineChartBar, HiOutlineChatAlt2, HiOutlineUserGroup,
  HiOutlineUser, HiOutlineTrendingUp,
} from 'react-icons/hi';
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../constant/roles';

const menuItems = {
  [ROLES.ADMIN]: [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: HiOutlineViewGrid,
    },
    {
      path: '/admin/customers',
      label: 'Clients',
      icon: HiOutlineUsers,
    },
    {
      path: '/admin/projects',
      label: 'Projects',
      icon: TbLayoutKanbanFilled,
    },
    {
      path: '/admin/tasks',
      label: 'Tasks',
      icon: HiOutlineClipboardList,
    },
    {
      path: '/admin/analytics',
      label: 'Reports',
      icon: HiOutlineChartBar,
    },
    {
      path: '/admin/chat',
      label: 'Messages',
      icon: HiOutlineChatAlt2,
    },
  ],

  [ROLES.CUSTOMER]: [
    {
      path: '/customer/dashboard',
      label: 'Dashboard',
      icon: HiOutlineViewGrid,
    },
    {
      path: '/customer/profile',
      label: 'My Profile',
      icon: HiOutlineUser,
    },
    {
      path: '/customer/tasks',
      label: 'My Tasks',
      icon: HiOutlineClipboardList,
    },
    {
      path: '/customer/chat',
      label: 'Messages',
      icon: HiOutlineChatAlt2,
    },
  ],
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || ROLES.ADMIN; //here we use pipe of customer in future
  const items = menuItems[role] || [];
  const profileImage = user?.profilePicture || user?.profileImage || user?.avatar || user?.image || '';
  const defaultProfileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=111111&color=f97316`;
  const avatarSrc = profileImage || defaultProfileImage;

  const handleLogout = () => {
    logout();
    navigate( '/home_page');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky left-0 top-0 h-screen bg-[#111111] border-r border-[#2a2a2a] flex flex-col z-30"
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[#2a2a2a]">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-bold text-lg">
  FreelancerCRM
</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
        >
          <FiChevronLeft
            size={18}
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-white bg-orange-500/10 border-r-2 border-orange-500 font-medium text-sm'
              :
               'flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all duration-200 font-medium text-sm'
            }
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User Info + Logout */}
      <div className="border-t border-[#2a2a2a] p-3">
        <div className={`flex items-center gap-3 px-2 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
            <img
              src={avatarSrc}
              alt={user?.name ? `${user.name} profile` : 'Profile'}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                if (e.currentTarget.src !== defaultProfileImage) {
                  e.currentTarget.src = defaultProfileImage;
                }
              }}
            />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-2 mt-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <FiLogOut size={18} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
