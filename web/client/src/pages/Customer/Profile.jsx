import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { getInitials } from '../../utils/helpers';
import api from '../../lib/api.js';
import axios from 'axios';


const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || 'Lahore, Pakistan',
    bio: user?.bio || 'CRM Customer',
  });

  //APi call here (i'm using short word like cp, which mean customer profile)
  useEffect(() => {
    const cP = async () => {
      try {
        const response = await api.get('/customer/profile');
        setForm(response.data.data);
      } catch (error) {
        toast.error('Failed to load data!');
      }
    };
    cP();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
    const response = await api.put(`/customer/profile/${user?.id}`, form);
    setForm(response.data.data);
    toast.success("Profile Updated Successfully!");
    setEditing(false);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update profile!"
    );
  }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='max-w-2xl mx-auto space-y-6'>
      {/* Profile Header */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-orange-400 text-2xl font-bold">{getInitials(user?.name)}</span>
        </div>
        <h2 className="text-xl font-bold text-white">{user?.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
        <span className="inline-block mt-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 capitalize">{user?.role}</span>
      </div>
      {/* Profile Form */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
          )}
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={form.name || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            icon={<FiUser size={16} />}
            disabled={!editing}
          />
          <Input
            label="Email"
            type="email"
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            icon={<FiMail size={16} />}
            disabled={!editing}
          />
          <Input
            label="Phone"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            icon={<FiPhone size={16} />}
            disabled={!editing}
          />
          <Input
            label="Company"
            value={form.company || ''}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            icon={<FiBriefcase size={16} />}
            disabled={!editing}
          />
          <Input
            label="Address"
            value={form.address ?? ''}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            icon={<FiMapPin size={16} />}
            disabled={!editing}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Bio</label>
            <textarea
              value={form.bio ?? ''}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              disabled={!editing}
              className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 min-h-20 resize-none disabled:opacity-50"
              placeholder="Tell us about yourself..."
            />
          </div>

          {editing && (
            <Button onClick={handleSave} icon={<FiSave size={16} />} className="w-full" size="lg">
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
        <div className="space-y-3">
          {[
            { label: 'Account ID', value: user?._id },
            { label: 'Role', value: user?.role || '' },
            { label: 'Member Since', value: user?.createdAt ? new Date(user?.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            }) : 'N/A'},
            { label: 'Status', value: user?.status },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm text-white font-medium capitalize">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Profile


