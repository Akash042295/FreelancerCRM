import React,{useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiFlag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { formatDate, getStatusColor, getPriorityColor, generateId } from '../../utils/helpers';
import api from '../../lib/api.js';

const Tasks = () => {
  const [tasks, setTasks] = useState([]); 
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form, setForm] = useState({ title: '', description: '', status: 'to do', priority: 'medium', dueDate: '', customer: '', project: '' });
  const openAdd = () => { setEditTask(null); setForm({ title: '', description: '', status: 'to do', priority: 'medium', dueDate: '', customer: '', project: '' }); setModalOpen(true); }
  const openEdit = (task) => { setEditTask(task); setForm({ title: task.title, description: task.description, status: task.status, priority: task.priority, dueDate: task.dueDate, customer: task.customer?._id || '',project: task.project?._id || task.project || '' }); setModalOpen(true); };

  //filter tasks
  const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus);

  //handleChange for cus & emp
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //api call here
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [tasksResponse, customersResponse, projectsResponse] =
  await Promise.all([
    api.get('/admin/tasks'),
    api.get('/admin/customers'),
    api.get('/admin/projects'),
  ]);

setTasks(tasksResponse.data.data || []);
setCustomers(customersResponse.data.data || []);
setProjects(projectsResponse.data.data || []);
      setTasks(tasksResponse.data.data || []);
      setCustomers(customersResponse.data.data || []);
    } catch (error) {
      console.error(
        'Failed to load tasks:',
        error.response?.data || error.message
      );

      toast.error('Failed to load tasks.');
    }
  };

  fetchData();
}, []);
  
  const handleSubmit = async () => {
    if (!form.title) { toast.error('Title is required'); return; }
    
    const payload = {
      ...form,
      assignedTo: null, // You can set this to the current user or leave it null for now
    };

    try {
      if(editTask) {
        const response = await api.put(`/admin/task/${editTask._id}`, payload);
      
        const updateTask = response.data.data;
        setTasks(tasks.map(t => t._id === editTask._id ? updateTask : t));
        toast.success('task updated!');
      } else {
        const response = await api.post('/admin/tasks', payload);

        const newTask = response.data.data || response.data;
        setTasks([...tasks, newTask]);
        toast.success('task added!');
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to save the Tasks!')
    }
  };

const handleDelete = async (id) => {
  if(window.confirm('Are you sure you want to delete this Taks ?')){
    try {
      await api.delete(`/admin/task/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task Deleted Successfully!');
    } catch (error) {
      toast.error(error.response?.data?.data?.message || 'Failed to delete the Task!');
    }
  }
}

  const columns = [
    {
      header: 'Task', accessor: 'title',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-white">{row.title}</p>
          <p className="text-xs text-gray-500 truncate max-w-50">{row.description}</p>
        </div>
      ),
    },
    { header: 'Customer', accessor: 'customer', render: (row) => <span className="text-sm text-gray-300">{row.customer?.name || '—'}</span> },
    {
  header: 'Project',
  accessor: 'project',
  render: (row) => (
    <span className="text-sm text-gray-300">
      {row.project?.name || '—'}
    </span>
  ),
},
    {
      header: 'Priority', accessor: 'priority',
      render: (row) => <span className={getPriorityColor(row.priority)}><FiFlag size={12} className="inline mr-1" />{row.priority}</span>,
    },
    { header: 'Status', accessor: 'status', render: (row) => <span className={getStatusColor(row.status)}>{row.status.replace('_', ' ')}</span> },
    {
      header: 'Due Date', accessor: 'dueDate',
      render: (row) => <span className="text-sm text-gray-400 flex items-center gap-1"><FiCalendar size={12} />{formatDate(row.dueDate)}</span>,
    },
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>{/*main div*/}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              Task <span className="text-orange-500">Management</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              {tasks.length} Total task found.
            </p>
          </div>
        <div className="flex items-center gap-3">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className=" bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 text-sm py-2 w-auto">
            <option value="all">All Status</option>
            <option value="to do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <Button onClick={openAdd} icon={<FiPlus size={16} />}>New Task</Button>
        </div>
      </div>
      
      {/*status summary cards*/}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'To Do', status: 'to do', color: 'amber' },
          { label: 'In Progress', status: 'in_progress', color: 'blue' },
          { label: 'Completed', status: 'completed', color: 'emerald' },
          { label: 'Cancelled', status: 'cancelled', color: 'red' },
        ].map((item) => (
          <div key={item.status} className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-3 text-center cursor-pointer hover:border-orange-500/20 transition-all" onClick={() => setFilterStatus(item.status === filterStatus ? 'all' : item.status)}>
            <p className="text-xl font-bold text-white">{tasks.filter((t) => t.status === item.status).length}</p>
            <p className={`text-xs font-medium text-${item.color}-400 mt-1`}>{item.label}</p>
          </div>
        ))}
      </div>

      {/*add table*/}
      <DataTable columns={columns} data={filteredTasks} searchPlaceholder="Search tasks..." />

      {/*add/edit modal*/}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTask ? 'Edit Task' : 'New Task'} size="lg"
        footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>{editTask ? 'Update' : 'Create'}</Button></>}
      >
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required placeholder="Task title" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 min-h-20 resize-none" placeholder="Task description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="to do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <Input label="Due Date" type="date" value={form.dueDate ? form.dueDate.split('T')[0] : ''} onChange={(e) => setForm({...form, dueDate: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">
              Customer
            </label>
            <div className="flex flex-col gap-1.5">
  <label className="text-sm font-medium text-gray-300">
    Project
  </label>

  <select
    name="project"
    value={form.project}
    onChange={(e) => {
      const selectedProject = projects.find(
        (project) => project._id === e.target.value
      );

      setForm((previous) => ({
        ...previous,
        project: e.target.value,
        customer: selectedProject
          ? (
              selectedProject.client?._id ||
              selectedProject.client ||
              ''
            )
          : '',
      }));
    }}
    className="w-full bg-[#151515] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5"
  >
    <option value="">No Project</option>

    {projects.map((project) => (
      <option key={project._id} value={project._id}>
        {project.name}
      </option>
    ))}
  </select>

  {projects.length === 0 && (
    <p className="text-xs text-gray-500">
      No projects available. Create a project first.
    </p>
  )}
</div>

            <select
              name="customer"
              value={form.customer}
              onChange={handleChange}
              className="w-full bg-[#151515] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5"
            >
              <option value="">Select Customer</option>

              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          </div>
        </div>
      </Modal>

    </motion.div>
  )
}

export default Tasks