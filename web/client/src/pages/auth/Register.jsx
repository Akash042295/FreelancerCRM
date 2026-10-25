import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { ROLE_DASHBOARD } from '../../constant/roles';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthContext } from '../../Context/AuthContext';

const Register = () => {

  const navigate = useNavigate();
  const { registerUser, loading, error } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  }) ;

  //handleChange
  const handleChange = (e) =>  {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    registerUser(form);
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('crm_user'));
      if (user) {
        toast.success('Account created successfully!');
        navigate(ROLE_DASHBOARD[user.role]);
      }
    }, 1000);
  };

  return (
    <div className="w-full my-5">
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
          <p className="text-xs text-gray-500">Create your account</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-8"
      >
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-white">Register</h2>
          <p className="text-sm text-gray-400 mt-1">Fill in the details below</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            icon={<FiUser size={16} />}
            required
          />
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
            label="Phone"
            name="phone"
            placeholder="+91 XXX XXXXXXX"
            value={form.phone}
            onChange={handleChange}
            icon={<FiPhone size={16} />}
          />

          {/* Role Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Account Type</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            icon={<FiLock size={16} />}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={handleChange}
            icon={<FiLock size={16} />}
            required
          />

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create Account <FiArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
