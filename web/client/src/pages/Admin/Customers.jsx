import React,{useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { getInitials, getStatusColor, formatDate, generateId } from '../../utils/helpers';
import api from '../../lib/api.js'


const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', status: 'active' });

  //api here
  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const response = await api.get('/admin/customers');
      setCustomers(response.data.data || []); 
    } catch (error) {
      toast.error('Failed to load customers');
    }
  };
  fetchCustomers();
}, []);


  const openAdd = () => {
    setEditingCustomer(null);
    setForm({ name: '', email: '', phone: '', company: '', status: 'active' });
    setModalOpen(true);
  }

  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, company: customer.company, status: customer.status });
    setModalOpen(true);
  }

  const handleSubmit = async () => {
  if (!form.name || !form.email) {
    toast.error("Name and email are required");
    return;
  }

  try {
    if (editingCustomer) {
      const response = await api.put(`/admin/customer/${editingCustomer._id}`, form);
      
      const updatedUser = response.data.data;
      setCustomers(customers.map(c => (c._id === editingCustomer._id) ? updatedUser : c));
      toast.success("Customer updated!");
    } else {

      const payload = {
        ...form,
        role: 'customer',
        // password: `Cust!${Math.random().toString(36).slice(-8)}8A`
      };
      const response = await api.post('/admin/customers', payload);

      const newUser = response.data.data || response.data;
      setCustomers([...customers, newUser]);
      toast.success("Customer added!");
    }
    setModalOpen(false);
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  }
};


  const handleDelete = async (target) => {
    const id = typeof target === 'object' ? (target._id || target.id) : target;
  if (window.confirm("Are you sure you want to delete this customer?")) {
    try {
      await api.delete(`/admin/customer/${id}`);
      
      setCustomers(customers.filter(c => c._id !== id && c.id !== id));
      toast.success("Customer deleted!");
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  }
};


  const columns = [
    {
      header: 'Customer',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
            <span className="text-orange-400 text-xs font-semibold">{getInitials(row.name)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-gray-500">{row.company}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (row) => (
        <div className="flex items-center gap-2 text-gray-400">
          <FiMail size={14} />
          <span className="text-sm">{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (row) => (
        <div className="flex items-center gap-2 text-gray-400">
          <FiPhone size={14} />
          <span className="text-sm">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={getStatusColor(row.status)}>{row.status}</span>
      ),
    },
    {
      header: 'Joined',
      accessor: 'createdAt',
      render: (row) => <span className="text-sm text-gray-400">{formatDate(row.createdAt)}</span>,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-colors">
            <FiEdit2 size={15} />
          </button>
          <button onClick={(e) => {e.stopPropagation(); handleDelete(row)}} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/*header row in search and add customer*/}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              All <span className="text-orange-500">Customer</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              {customers.length} customers found
            </p>
          </div>
        <Button onClick={openAdd} icon={<FiPlus size={16} />}>Add Customer</Button>
      </div>
      {/*data table*/}
      <DataTable columns={columns} data={customers} searchPlaceholder="Search customers..." />

      {/*add/edit modal*/}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingCustomer ? 'Update' : 'Add'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Name" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Customer name" />
          <Input label="Email" type="email" name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="Email address" />
          <Input label="Phone" name="phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+92 XXX XXXXXXX" />
          <Input label="Company" name="company" value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} placeholder="Company name" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default Customers
