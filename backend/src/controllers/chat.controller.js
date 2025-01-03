import { ChatRoom } from "../models/message.model.js"

export const createRoom = async (req, res) => {
    const { senderId, receiverId, message } = req.body
    try {
        const roomId = senderId + receiverId


        let chatRoom = await ChatRoom.findOne({ roomId })
        if (!chatRoom) {
            if (!message) {
                return res.status(400).json({ msg: 'please write message' })
            }
            chatRoom = new ChatRoom({ roomId, senderId, receiverId, messages: [{ senderId, message }] });
            await chatRoom.save()
        }
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status(400).json({ msg: `error is here ${error}` })
    }
}


// export const sendMessage = async (req, res, roomId, senderId, receiverId, message) => {
//     if (!req.body) {
//         return res.status(400).json({ msg: 'Request body is missing.' });
//     }
//     try {

//         if (!message) {
//             return res.status(400).json({ msg: 'please write message' })
//         }

//         let chatRoom = await ChatRoom.findOne({ roomId })
//         if (!chatRoom) {
//             if (!senderId) {
//                 return res.status(400).json({ msg: `failed to get senderId` })
//             }
//             if (!receiverId) {
//                 return res.status(400).json({ msg: `failed to get receiverId` })
//             }
//             const newRoomId = senderId + receiverId
//             chatRoom = new ChatRoom({ roomId: newRoomId, senderId, receiverId, messages: [{ senderId, message }] });
//             await chatRoom.save()
//             return res.status(200).json(chatRoom)
//         }
//         chatRoom.messages.push({ senderId, message })
//         await chatRoom.save()
//         return res.status(200).json(chatRoom)
//     } catch (error) {
//         return res.status(400).json({ msg: `message not send ${error}` })
//     }
// }

export const sendMessage = async (roomId, senderId, receiverId, message) => {
    // Validate input parameters
    if (!message) {
        throw new Error('Please write a message.');
    }

    try {
        let chatRoom = await ChatRoom.findOne({ roomId });
        if (!chatRoom) {
            if (!senderId) {
                throw new Error('Failed to get senderId');
            }
            if (!receiverId) {
                throw new Error('Failed to get receiverId');
            }
            const newRoomId = `${senderId}-${receiverId}`;
            chatRoom = new ChatRoom({
                roomId: newRoomId,
                senderId,
                receiverId,
                messages: [{ senderId, message }],
            });
            await chatRoom.save();
            return chatRoom; // Return the newly created room
        }

        // If the room exists, push the new message
        chatRoom.messages.push({ senderId, message });
        await chatRoom.save();
        return chatRoom; // Return the updated chat room
    } catch (error) {
        throw new Error(`Message not sent: ${error.message}`);
    }
};

export const fetchRooms = async (id) => {
    try {
        const commonRooms = await ChatRoom.find({
            $or: [
                { senderId: id || myId },
                { receiverId: id || myId }
            ],
        })
        return commonRooms;
    } catch (error) {
        // res.status(400).json({ msg: `Failed to fetch rooms ${error}` })
        throw new error(`rooms not fetch ${error}`)
    }
}

export const fetchRoomsController = async (req, res) => {
    const { id } = req.params
    try {
        const commonRooms = await ChatRoom.find({
            $or: [
                { senderId: id || myId },
                { receiverId: id || myId }
            ],
        })
        return res.status(200).json(commonRooms);
    } catch (error) {
        res.status(400).json({ msg: `Failed to fetch rooms ${error}` })
    }
}