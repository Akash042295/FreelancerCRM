import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiFlag, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { formatDate, getStatusColor, getPriorityColor } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import api from '../../lib/api.js';
import { useEffect } from 'react';

const Tasks = () => {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'to do',
    dueDate: '',
  });

  //add tasks
  const openAdd = () => {
    setEditTask(null);
    setForm({ title: '', description: '', priority: 'medium', status: 'to do', dueDate: ''});
    setModalOpen(true);
  };
  
  const myTasks = allTasks;

  //api call here
  useEffect(() => {
    const cT = async () => {
      try {
        const response = await api.get('/customer/tasks');
        setAllTasks(response.data.data || []);
      } catch (error) {
        toast.error('Failed to load data!')
      }
    };
    cT();
  },[])
  

  //handleSubmit
  const handleSubmit = async () => {
    if (!form.title) { toast.error('Title is required'); return; }
    
    const payload = {
      ...form,
      value: form.value ? Number(form.value) : 0
    };

    try {
      if(editTask) {
        const response = await api.put(`/customer/task/${editTask._id}`, payload);
      
        const updateTask = response.data.data;
        setAllTasks(allTasks.map(t => t._id === editTask._id ? updateTask : t));
        toast.success('task updated!');
      } else {
        const response = await api.post('/customer/tasks', payload);

        const newTask = response.data.data || response.data;
        setAllTasks([...allTasks, newTask]);
        toast.success('task added!');
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to save the Tasks!')
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/customer/task/${taskId}`, {
        status: newStatus,
      });

      toast.success('Task updated!');

      setAllTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
        )
      );
    } catch (error) {
      toast.error("Failed to update task");
      console.log(error);
    }
  };

  const statusGroups = [
    {label: 'To Do', status: 'to do', color: 'border-amber-500' },
    {label: 'In Progress', status: 'in_progress', color: 'border-blue-500' },
    {label: 'Completed', status: 'completed', color: 'border-emerald-500' },
  ];


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className="text-lg font-semibold text-white">Assign Tasks</h2>
          <p className="text-sm text-gray-500">{myTasks.length} task assigned to Employee</p>{/* we make it dynamically assign to employee*/}
        </div>
        <Button onClick={openAdd} icon={<FiPlus size={16} />}>Make Task</Button>
      </div>

      {/*add / edit task*/}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTask ? 'Edit Task' : 'New Task'} size="lg"
        footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>{editTask ? 'Update Task' : 'Save Task'}</Button></>}
      >
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required placeholder="Task title" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 min-h-20 resize-none" placeholder="Task description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200">
                <option value="to do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} />
        </div>
      </Modal>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusGroups.map((group) => {
          const groupTasks = myTasks.filter((t) => t.status === group.status);
          return (
            <div key={group.status} className={`bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl p-4 border-t-2 ${group.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">{group.label}</h3>
                <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded-full">{groupTasks.length}</span>
              </div>
              <div className="space-y-3">
                {groupTasks.length > 0 ? groupTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    layout
                    className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4 hover:border-orange-500/20 transition-all"
                  >
                    <h4 className="text-sm font-medium text-white mb-2">{task.title}</h4>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={getPriorityColor(task.priority)}>
                          <FiFlag size={10} className="inline mr-1" />{task.priority}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <FiCalendar size={10} />{formatDate(task.dueDate)}
                      </span>
                    </div>
                    {/* Status change */}
                    <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        className="w-full text-xs bg-[#111111] border border-[#2a2a2a] text-gray-300 rounded px-2 py-1.5 focus:border-orange-500 transition-colors"
                      >
                        <option value="to do">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </motion.div>
                )) : (
                  <p className="text-xs text-gray-500 text-center py-6">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  )
}

export default Tasks
