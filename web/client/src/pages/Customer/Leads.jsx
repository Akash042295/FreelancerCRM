import React,{useState} from 'react'
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DataTable from '../../components/tables/DataTable'
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { getInitials, formatDate, getStatusColor, generateId } from '../../utils/helpers';
import api from '../../lib/api.js';
import { useEffect } from 'react';

const Leads = () => {
  const [leads, setLeads] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', source: 'Website', status: 'new', value: '', notes: '' });
  const[editLead, setEditLead] = useState(null);
  const openAdd = () => { setEditLead(null); setForm({ name: '', email: '', phone: '', company: '', source: 'Website', status: 'new', value: '', notes: '' }); setModalOpen(true); };
  const openEdit = (lead) => { setEditLead(lead); setForm({ name: lead.name, email: lead.email, phone: lead.phone, company: lead.company, source: lead.source, status: lead.status, value: lead.value, notes: lead.notes }); setModalOpen(true); };

  //api here
  useEffect(() => {
    const cL = async () => {
      try {
        const response = await api.get('/customer/leads');
        setLeads(response.data.data || []);
      } catch (error) {
        toast.error('Failted to load data here')
      }
    };
    
    cL();
  }, []);

  const handleSubmit = async () => {
  if (!form.name || !form.email) {
    toast.error('Name and email required');
    return;
  }

  const payload = {
    ...form,
    value: form.value ? Number(form.value) : 0
  };

  try {
    if (editLead) {
      const response = await api.put(`/customer/lead/${editLead._id}`, payload);
      
      const updatedLead = response.data.data;
      setLeads(leads.map(l => l._id === editLead._id ? updatedLead : l));
      toast.success('Lead updated!');
    } else {
      const response = await api.post('/customer/leads', payload);

      const newLead = response.data.data || response.data;
      setLeads([...leads, newLead]);
      toast.success('Lead added!');
    }
    setModalOpen(false);
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save lead');
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/customer/lead/${id}`);
        setLeads(leads.filter(lead => lead._id !== id));
        toast.success('Lead deleted');
      } catch (error) {
        toast.error(error.response?.data?.data?.message || 'Failed to delete lead');
      }
    }
  };

  const statusColors = {
    new: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400',
    contacted: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400',
    qualified: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400',
    converted: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400',
    lost: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400',
  };

  const columns = [
    {
      header: 'Lead name', accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <span className="text-orange-400 text-xs font-semibold">{getInitials(row.name)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-gray-500">{row.company}</p>
          </div>
        </div>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Source', accessor: 'source', render: (row) => <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">{row.source}</span> },
    { header: 'Value', accessor: 'value', render: (row) => <span className="text-white font-medium">₨ {Number(row.value).toLocaleString()}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <span className={statusColors[row.status] || 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400'}>{row.status}</span> },
    { header: 'Date', accessor: 'createdAt', render: (row) => <span className="text-gray-400 text-sm">{formatDate(row.createdAt)}</span> },
    {
      header: 'Actions', accessor: 'actions', sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors"><FiEdit2 size={15} /></button>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(row._id); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><FiTrash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6"> {/*main div*/}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">My Leads</h2>
          <p className="text-sm text-gray-500">{leads.length} leads assign</p>
        </div>
        <Button onClick={openAdd} icon={<FiPlus size={16} />}>Make Lead</Button>
      </div>

      {/*pipeline summary for future updates*/}
      {/* <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
          <div key={status} className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{leads.filter((l) => l.status === status).length}</p>
            <p className={`text-xs font-medium capitalize mt-1 ${statusColors[status]?.replace('badge-', 'text-') || 'text-gray-400'}`}>{status}</p>
          </div>
        ))}
      </div> */}
        
      <DataTable columns={columns} data={leads} searchPlaceholder="Search leads..." />
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editLead ? 'Edit Lead' : 'Add Lead'} size="lg"
        footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>{editLead ? 'Update' : 'Make Lead'}</Button></>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Lead name" />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="Email" />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" />
          <Input label="Company" value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} placeholder="Company" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Source</label>
            <select value={form.source} onChange={(e) => setForm({...form, source: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
              {['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email', 'Other'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
              {['new', 'contacted', 'qualified', 'converted', 'lost'].map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </div>
          <Input label="Value (₨)" type="number" value={form.value} onChange={(e) => setForm({...form, value: e.target.value})} placeholder="0" />
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200" placeholder="Any notes..." />
          </div>
        </div>
      </Modal>

    </motion.div>
  )
}

export default Leads
