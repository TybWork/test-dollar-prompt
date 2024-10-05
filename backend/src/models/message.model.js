import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: {
        // type: Schema.Types.ObjectId,
        // ref: 'User',
        type: 'String',

        required: true
    },
    receiverId: {
        // type: Schema.Types.ObjectId,
        // ref: 'User',
        type: String
        // required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const chatRoomSchema = new Schema({
    roomId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    receiverId: {
        type: String
    },
    messages: {
        type: [messageSchema]
    }
})

// export const Message = mongoose.model('Message', messageSchema);
export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
