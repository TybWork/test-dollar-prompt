import express from 'express';
import { sendMessage, fetchChat, markAsRead } from '../controllers/chat.controller.js';

export const chatRouter = express.Router();

chatRouter.post('/send', sendMessage);
chatRouter.get('/history/:userId/:otherUserId', fetchChat);
chatRouter.post('/read', markAsRead);
