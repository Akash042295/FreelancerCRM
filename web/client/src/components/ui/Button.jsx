import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const variants = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20',
  secondary: 'bg-[#1a1a1a] hover:bg-[#1f1f1f] text-white border border-[#2a2a2a]',
  outline: 'bg-transparent hover:bg-orange-500/10 text-orange-500 border border-orange-500/50 hover:border-orange-500',
  ghost: 'bg-transparent hover:bg-dark-200 text-gray-300 hover:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin" size={16} />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
