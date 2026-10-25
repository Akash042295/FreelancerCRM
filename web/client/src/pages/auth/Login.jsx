import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import toast from "react-hot-toast";
import { ROLE_DASHBOARD } from "../../constant/roles";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuthContext } from '../../Context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, loading, error } = useAuthContext();
    const [form, setForm] = useState({ email: '', password: '' });

    //handleChange
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handleSubmit
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!form.email || !form.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      loginUser(form);
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('crm_user'));
        if(user) {
          toast.success('Logged in successfully!');
          navigate(ROLE_DASHBOARD[user.role]);
        }
      }, 1000)
    }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0f0f0f]">
        {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          <HiOutlineViewGrid className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wide"><span className='text-orange-500'>FreelancerCRM</span></h1>
          <p className="text-xs text-gray-500">
            Customer Relationship Management
          </p>
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md mx-auto bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-8"
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white leading-snug">Welcome Back</h2>
          <p className="text-sm text-gray-400 leading-relaxed mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4"> {/**/}
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            icon={<FiMail size={16} />}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            icon={<FiLock size={16} />}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            Sign In <FiArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-400 font-medium">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
