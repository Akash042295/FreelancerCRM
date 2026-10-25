import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

export const Customer = mongoose.model('Customer', customerSchema);

export default Customer;