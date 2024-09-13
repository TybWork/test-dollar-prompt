import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
