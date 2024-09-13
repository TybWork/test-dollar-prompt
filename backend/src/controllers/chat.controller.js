import { Message } from '../models/message.model.js';
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
            $or: [
                { senderId: userId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json(chatHistory);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to retrieve chat history: ${error.message}` });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    const { messageId } = req.body;

    try {
        await Message.findByIdAndUpdate(messageId, { isRead: true });
        return res.status(200).json({ msg: 'Message marked as read' });
    } catch (error) {
        return res.status(500).json({ msg: `Failed to mark message as read: ${error.message}` });
    }
};
