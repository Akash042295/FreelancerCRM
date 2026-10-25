import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const Unauthorized = () => {
    const { isAuthenticated, getDashboardPath } = useAuth();

  return (
    <div className='min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShield size={36} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          You don't have permission to access this page. Contact your administrator if you believe this is an error.
        </p>
        <Link
          to={isAuthenticated ? getDashboardPath() : '/login'}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 inline-flex items-center gap-2"
        >
          Go to {isAuthenticated ? 'Dashboard' : 'Login'}
        </Link>
      </motion.div>
    </div>
  )
}

export default Unauthorized
