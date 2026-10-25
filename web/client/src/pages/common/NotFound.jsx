import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';


const NotFound = () => {
    const { isAuthenticated, getDashboardPath } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-8xl font-bold text-orange-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
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

export default NotFound
