import mongoose from 'mongoose';
import { Message } from '../models/message.model.js';
import { User } from '../models/User/user.model.js';
// import { User } from '../models/user.model.js';

// Send a message
export const sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        await newMessage.save();

        return res.status(200).json({ msg: 'Message sent successfully', newMessage });
    } catch (error) {
        return res.status(500).json({ msg: `Failed to send message: ${error.message}` });
    }
};

// Fetch chat history
export const fetchChat = async (req, res) => {
    const { userId, otherUserId } = req.params;

    try {
        const chatHistory = await Message.find({
            $or: [{
                senderId: userId,
                receiverId: otherUserId
            },
            {
                senderId: otherUserId,
                receiverId: userId
            }]
        }).sort({ createdAt: 1 });

        return res.status(200).json(chatHistory);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to retrieve chat history: ${error.message}` });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    const { messageId } = req.params;

    try {
        await Message.findByIdAndUpdate(messageId, { isRead: true });
        return res.status(200).json({ msg: 'Message marked as read' });
    } catch (error) {
        return res.status(500).json({ msg: `Failed to mark message as read: ${error.message}` });
    }
};

// export const filterSender = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const messages = await Message.find({
//             $or: [
//                 { receiverId: id },
//                 { senderId: id }
//             ]
//         }).sort({ timestamp: 1 }); // Sort by timestamp if needed

//         // Optionally, you can extract unique senders from the messages
//         const currentUser = [...new Set(messages.map(msg => msg.senderId.toString()))];
//         const senders = messages.map(msg => msg.receiverId.toString());
//         const uniqueSenders = [...new Set(senders)]

//         const chats = await Message.find({ $or: [{ senderId: id }, { receiverId: id }] }).populate('message')

//         res.status(200).json({ uniqueSenders, currentUser, chats });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

export const filterSender = async (req, res) => {
    const { userId } = req.params;

    try {
        const messages = await Message.find({ senderId: userId }).sort({ timestamp: 1 });

        const senders = messages.map(msg => msg.receiverId.toString());
        const uniqueSenders = [...new Set(senders)]


        // const chats = await Message.find({ receiverId: uniqueSenders }).populate('message');
        const msgRooms = await Promise.all(
            uniqueSenders.map(async (id) => {
                const userChats = await Message.find({ receiverId: id });
                const user = await User.findById(id).populate('firstName lastName role')
                return {
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    chat: userChats.map((e) => {
                        return {
                            message: e.message,
                            isRead: e.isRead,
                            timestamp: e.timestamp,
                        }
                    })
                }
            })
        );
        // const chats1 = await Message.find({ receiverId: uniqueSenders[1] }).populate('message');

        res.status(200).json({ uniqueSenders, msgRooms });
    } catch (err) {
        res.status(500).json(err);
    }
}