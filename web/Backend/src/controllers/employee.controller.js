import Lead from '../models/Leads.js';
import Task from '../models/Tasks.js';


export const getDashboard = async (req, res, next) => {
  try {
    // Recent Tasks
    const tasks = await Task.find({ assignedTo: req.user.id })
      .sort({ createdAt: -1 });

    // Recent Leads
    const leads = await Lead.find({ assignedTo: req.user.id })
      .sort({ createdAt: -1 });

    // Counts
    const pendingTasks = tasks.filter(
      (task) => task.status !== "completed"
    ).length;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;

    const activeLeads = leads.length;

    const convertedLeads = leads.filter(
      (lead) => lead.status === "converted"
    ).length;

    res.status(200).json({
      success: true,
      data: {
        tasks,
        leads,
        stats: {
          pendingTasks,
          completedTasks,
          activeLeads,
          convertedLeads,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find({ assignedTo: req.user.id });
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        next(error)
    }
};


export const createLead = async (req, res, next) => {
    try {
        req.body.assignedTo = req.user.id;
        const lead = await Lead.create(req.body);
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        next(error)
    }
};


export const updateLead = async (req, res, next) => {
    try {
        const lead = await Lead.findOneAndUpdate(
            { _id: req.params.id, assignedTo: req.user.id },
            req.body,
            {new: true, runValidators: true }
        );
        if(!lead) return res.status(404).json({ success: false, message: 'Lead not found'});
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        next(error)
    }
};

export const getTasks = async (req, res, next) => {
    try {
        if(!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User session not found"
            })
        }
        const tasks = await Task.find({ assignedTo: req.user.id }).populate('createdBy', 'name');
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(error)
    }
};

export const createTask = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id;
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error)
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, assignedTo: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if(!task) return res.status(404).json({ success: false, message: 'Task not found'});
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error)
    }
};

