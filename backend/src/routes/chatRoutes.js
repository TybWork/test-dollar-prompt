import express from 'express';
import { sendMessage, fetchChat, markAsRead, filterSender } from '../controllers/chat.controller.js';

export const chatRoutes = express.Router();

chatRoutes.post('/send', sendMessage);
chatRoutes.get('/history/:userId/:otherUserId', fetchChat);
chatRoutes.get('/chatRoom/:userId', filterSender);
chatRoutes.post('/read/:messageId', markAsRead);
// cyber as a service