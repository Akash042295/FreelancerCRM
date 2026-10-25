import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: [true, 'Message body cannot be empty'],
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true });

chatSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

export const Chat = mongoose.model('Chat', chatSchema);

export default Chat;