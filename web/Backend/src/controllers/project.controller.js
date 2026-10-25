import Project from '../models/Project.js';

export const createProject = async (req, res, next) => {
  try {
    const { name, description, client, budget, startDate, deadline, status, progress } = req.body;

    if (!name || !client || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Project name, client, and deadline are required.',
      });
    }

    const project = await Project.create({
      name,
      description,
      client,
      budget,
      startDate,
      deadline,
      status,
      progress,
      createdBy: req.user?._id,
    });

    const populatedProject = await Project.findById(project._id)
      .populate('client', 'name email');

    res.status(201).json({
      success: true,
      data: populatedProject,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('client', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('client', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};