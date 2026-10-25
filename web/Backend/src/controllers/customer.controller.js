import User from '../models/User.js'
import Task from '../models/Tasks.js';
import Lead from '../models/Leads.js';

export const getDashboard = async (req, res, next) => {
  try {
    // Customer ke saare tasks
    const tasks = await Task.find({
      customer: req.user.id,
    }).sort({ createdAt: -1 });

    // Stats
    const pendingTasks = tasks.filter(
      (task) => task.status === "to do"
    ).length;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    
    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: `Hello, ${req.user.name}`,
        tasks,
        stats: {
          totalTasks: tasks.length,
          pendingTasks,
          completedTasks,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getProfile = async (req, res, next) => {
    // try {
    //     const profile = await User.findById(req.params.id);
    //     res.status(200).json({ success: true, data: profile });
    // } catch (error) {
    //     next(error)
    // }

    try {
    const profile = await User.findById(req.user.id).select("-password");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (req, res, next) => {
    // try {
    //     const updates = {
    //         name: req.body.name,
    //         phone: req.body.phone,
    //         email: req.body.email,
    //         company: req.body.company,
    //         address: req.body.address,
    //         bio: req.body.bio,
    //     };
    //     const profile = await User.findByIdAndUpdate(req.params.id, updates, {
    //         new: true,
    //         runValidators: true
    //     });
    //     res.status(200).json({ success: true, data: profile });
    // } catch (error) {
    //     next(error)
    // }

    try {
    const profile = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({
          customer: req.user.id
        }).populate('assignedTo', 'name role');
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(error)
    }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      customer: req.user.id,
      createdBy: req.user.id,
      status: "to do"
    });
    res.status(200).json({ success: true,  data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body , {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error)
  }
};


export const createLead = async (req, res, next) => {
    try {
        const leads = await Lead.create({
          ...req.body,
          customer: req.user.id,
          createdBy: req.user.id,
          status: req.body.status || 'new'
        });
        res.status(200).json({ success: true, data: leads })
    } catch (error) {
        next(error)
    }
}

export const getLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find({ customer: req.user.id }).populate('assignedTo', 'name role');
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        next(error)
    }
};

export const updateLead = async (req, res, next) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!updatedLead) return res.status(404).json({ success: false, message: 'Lead not found'});
        res.status(200).json({ success: true, data: updatedLead })
    } catch (error) {
        next(error)
    }
};


export const deleteLead = async (req, res, next) => {
    try {
        const delLead = await Lead.findByIdAndDelete(req.params.id);
        if(!delLead) return res.status(404).json({ success: false, message: 'Lead not found'});
        res.status(200).json({success: true, data: {} });
    } catch (error) {
        next(error)
    }
};