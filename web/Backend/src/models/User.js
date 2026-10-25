import mongoose  from "mongoose";

//name,email,role,department,status,joined,lastlogin
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true   
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function() {
            return this.role !== 'customer';
        },
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'employee'],
        default: 'admin'
    },
    company: {
        type: String,
    },
    department: {
        type: String,
    },
    address: {
        type: String,
    },
    bio: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active',
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

export const User = mongoose.model('User', userSchema);

export default User;