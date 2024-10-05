import express from 'express';
// import { sendMessage, fetchChat, markAsRead, filterSender, createRoom } from '../controllers/chat.controller.js';
import { createRoom, fetchRooms, fetchRoomsController, sendMessage } from '../controllers/chat.controller.js';

export const chatRoutes = express.Router();

// chatRoutes.post('/send', sendMessage);
// chatRoutes.get('/history/:userId/:otherUserId', fetchChat);
// chatRoutes.get('/chatRoom/:userId', filterSender);
// chatRoutes.post('/read/:messageId', markAsRead);
// cyber as a service

chatRoutes.post('/join-room', createRoom)
chatRoutes.post('/send-message', sendMessage)
chatRoutes.get('/fetch-rooms/:id', fetchRoomsController)