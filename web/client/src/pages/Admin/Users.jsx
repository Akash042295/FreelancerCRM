import React, { useEffect, useState} from 'react'
import { motion} from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getInitials, formatDate, getStatusColor, generateId } from '../../utils/helpers';
import api from '../../lib/api.js';

const Users = () => {
  const [users, setUsers] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'employee', status: 'active', department: '' });

  const openAdd = () => { setEditUserData(null); setForm({ name: '', email: '', phone: '', role: 'employee', status: 'active', department: '' }); setModalOpen(true); };
  const openEdit = (user) => { setEditUserData(user); setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status, department: user.department || '' }); setModalOpen(true); };

  //api call here
  useEffect(() => {
    const uA = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch the data')
      }
    };
    uA();
  }, []);
  
  const handleSubmit = async () => {
    if (!form.name || !form.email) { toast.error('Name and email required'); return; }
    
    const payload = {
      ...form,
      value: form.value ? Number(form.value) : 0
    };

    try {
      if(editUserData) {
        const response = await api.put(`/admin/user/${editUserData._id}`, payload);

        const updateUser = response.data.data;
        setUsers(users.map(u => u._id === editUserData._id ? updateUser : u));
        toast.success('task updated!');
      } else {
        const response = await api.post('/admin/users', payload);

        const newUser = response.data.data || response.data;
        setUsers(prev => [...prev, newUser]);
        toast.success('task added!');
      };
      setModalOpen(false);
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to save the user!')
    }
  };


  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this user ?")) {
    try {
      await api.delete(`/admin/user/${id}`);
      
      setUsers(users.filter(u => u._id !== id));
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Failed to delete User!");
    }
  }
};

  const roleColors = { admin: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400', employee: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400', customer: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400' };

  const columns = [
    {
      header: 'User', accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-blue-400 text-xs font-semibold">{getInitials(row.name)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: 'Role', accessor: 'role', render: (row) => <span className={roleColors[row.role]}><FiShield size={12} className="inline mr-1" />{row.role}</span> },
    { header: 'Department', accessor: 'department', render: (row) => <span className="text-sm text-gray-300">{row.role === 'customer' ? (row.company || '-') : row.role === 'employee' ? (row.department || '-') : '--'}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <span className={getStatusColor(row.status)}>{row.status}</span> },
    { header: 'Joined', accessor: 'createdAt', render: (row) => <span className="text-sm text-gray-400">{formatDate(row.createdAt)}</span> },
    { header: 'Last Login', accessor: 'lastLogin', render: (row) => <span className="text-sm text-gray-400">{row.lastLogin ? formatDate(row.lastLogin) : 'Never'}</span> },
    {
      header: 'Actions', accessor: 'actions', sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"><FiEdit2 size={15} /></button>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(row._id); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><FiTrash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              User <span className="text-orange-500">Management</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              {users.length} user found.
            </p>
          </div>
        <Button onClick={openAdd} icon={<FiPlus size={16} />}>Add User</Button>
      </div>
      {/*DataTable*/}
      <DataTable columns={columns} data={users} searchPlaceholder="Search users..." />

      {/*modal data here*/}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editUserData ? 'Edit User' : 'Add User'}
        footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>{editUserData ? 'Update' : 'Add'}</Button></>}
      >
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="User name" />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="Email" />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Role</label>
              <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <Input label="Department" value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} disabled={form.role === 'customer'} placeholder="Department" />
        </div>
      </Modal>
    </motion.div>
  )
}

export default Users
