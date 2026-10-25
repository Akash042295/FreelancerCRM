import mongoose from 'mongoose';

//leadname, company, email, source, value, status, date
const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    source: {
        type: String,
        enum: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email', 'Other'],
        default: 'Website'
    },
    value: {
        type: Number,
        default: 0,
    },
    phone: {
        type: String,
        trim: true,
    },
    currency: {
        type: String,
        default: 'Rs'
    },
    status: {
        type: String,
        enum: ['new', 'contacted' , 'qualified', 'converted', 'lost'],
        default: 'new'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

export const Leads = mongoose.model('Leads', leadSchema);

export default Leads;