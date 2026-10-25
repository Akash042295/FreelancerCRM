import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Client is required'],
    },

    budget: {
      type: Number,
      required: [true, 'Project budget is required'],
      min: [0, 'Budget cannot be negative'],
      default: 0,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
      required: [true, 'Project deadline is required'],
    },

    status: {
      type: String,
      enum: [
        'planning',
        'in_progress',
        'on_hold',
        'completed',
        'cancelled',
      ],
      default: 'planning',
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;