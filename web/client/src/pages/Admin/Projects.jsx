import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../lib/api.js';

const initialForm = {
  name: '',
  description: '',
  client: '',
  budget: '',
  startDate: '',
  deadline: '',
  status: 'planning',
  progress: 0,
};

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  const fetchData = async () => {
    try {
      const [projectResponse, customerResponse] = await Promise.all([
        api.get('/admin/projects'),
        api.get('/admin/customers'),
      ]);

      setProjects(projectResponse.data.data || []);
      setCustomers(customerResponse.data.data || []);
    } catch (error) {
      console.error(
        'Failed to load projects:',
        error.response?.data || error.message
      );
      toast.error('Failed to load projects.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditProject(null);
    setForm({
      ...initialForm,
      startDate: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditProject(project);

    setForm({
      name: project.name || '',
      description: project.description || '',
      client: project.client?._id || project.client || '',
      budget: project.budget ?? '',
      startDate: project.startDate
        ? new Date(project.startDate).toISOString().split('T')[0]
        : '',
      deadline: project.deadline
        ? new Date(project.deadline).toISOString().split('T')[0]
        : '',
      status: project.status || 'planning',
      progress: project.progress ?? 0,
    });

    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.client || !form.deadline) {
      toast.error('Project name, client, and deadline are required.');
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      budget: Number(form.budget || 0),
      progress: Number(form.progress || 0),
    };

    setLoading(true);

    try {
      if (editProject) {
        const response = await api.put(
          `/admin/project/${editProject._id}`,
          payload
        );

        const updatedProject = response.data.data;

        setProjects((previous) =>
          previous.map((project) =>
            project._id === editProject._id ? updatedProject : project
          )
        );

        toast.success('Project updated successfully!');
      } else {
        const response = await api.post('/admin/projects', payload);

        setProjects((previous) => [
          response.data.data,
          ...previous,
        ]);

        toast.success('Project created successfully!');
      }

      setModalOpen(false);
    } catch (error) {
      console.error(
        'Failed to save project:',
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || 'Failed to save project.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await api.delete(`/admin/project/${id}`);

      setProjects((previous) =>
        previous.filter((project) => project._id !== id)
      );

      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error(
        'Failed to delete project:',
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || 'Failed to delete project.'
      );
    }
  };

  const tableData = projects.map((project) => ({
    ...project,
    clientName:
      project.client?.name ||
      customers.find(
        (customer) =>
          customer._id === (project.client?._id || project.client)
      )?.name ||
      'Unknown client',
    budgetDisplay: `₹${Number(project.budget || 0).toLocaleString('en-IN')}`,
    deadlineDisplay: project.deadline
      ? new Date(project.deadline).toLocaleDateString('en-IN')
      : '—',
  }));

  const columns = [
    {
      header: 'Project',
      accessor: 'name',
      render: (project) => (
        <div>
          <p className="font-medium text-white">{project.name}</p>
          <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
            {project.description || 'No description'}
          </p>
        </div>
      ),
    },
    {
      header: 'Client',
      accessor: 'clientName',
    },
    {
      header: 'Budget',
      accessor: 'budgetDisplay',
    },
    {
      header: 'Deadline',
      accessor: 'deadlineDisplay',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (project) => {
        const status = statusOptions.find(
          (option) => option.value === project.status
        );

        const colorClasses = {
          planning: 'bg-blue-500/10 text-blue-400',
          in_progress: 'bg-orange-500/10 text-orange-400',
          on_hold: 'bg-yellow-500/10 text-yellow-400',
          completed: 'bg-green-500/10 text-green-400',
          cancelled: 'bg-red-500/10 text-red-400',
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              colorClasses[project.status] ||
              'bg-gray-500/10 text-gray-400'
            }`}
          >
            {status?.label || project.status}
          </span>
        );
      },
    },
    {
      header: 'Progress',
      accessor: 'progress',
      render: (project) => (
        <div className="min-w-24">
          <div className="mb-1 flex justify-between text-xs">
            <span>{project.progress || 0}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, Number(project.progress || 0))
                )}%`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      sortable: false,
      render: (project) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit project"
            onClick={() => openEdit(project)}
            className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            title="Delete project"
            onClick={() => handleDelete(project._id)}
            className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage client projects, budgets, deadlines, and progress.
          </p>
        </div>

        <Button onClick={openAdd} icon={<FiPlus size={18} />}>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-5">
          <p className="text-sm text-gray-400">Total Projects</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-5">
          <p className="text-sm text-gray-400">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-orange-400">
            {projects.filter((project) => project.status === 'in_progress').length}
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-5">
          <p className="text-sm text-gray-400">Completed</p>
          <p className="mt-2 text-2xl font-bold text-green-400">
            {projects.filter((project) => project.status === 'completed').length}
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        searchPlaceholder="Search projects..."
        emptyMessage="No projects yet. Click New Project to create your first one."
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editProject ? 'Edit Project' : 'Create Project'}
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              loading={loading}
            >
              {editProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Business Website"
            required
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Client <span className="text-orange-500">*</span>
            </label>

            <select
              name="client"
              value={form.client}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#151515] px-4 py-2.5 text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select a client</option>

              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                  {customer.email ? ` (${customer.email})` : ''}
                </option>
              ))}
            </select>

            {customers.length === 0 && (
              <p className="mt-1 text-xs text-yellow-400">
                No clients found. Add a client before creating a project.
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the project..."
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#151515] px-4 py-2.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <Input
            label="Budget (₹)"
            name="budget"
            type="number"
            min="0"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g. 25000"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
            />

            <Input
              label="Deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#151515] px-4 py-2.5 text-white focus:border-orange-500 focus:outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Progress: {form.progress}%
            </label>

            <input
              type="range"
              name="progress"
              min="0"
              max="100"
              step="5"
              value={form.progress}
              onChange={handleChange}
              className="w-full accent-orange-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;