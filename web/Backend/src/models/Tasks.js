import mongoose, { mongo } from 'mongoose';

// title, description, assignto, customer, priority, status, duedate
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'low',
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['pending', 'to do', 'in_progress', 'completed', 'cancelled'],
        default: 'to do',
        lowercase: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dueDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);

export default Task;