import express from 'express';
import { isAdmin } from '../middlewares/verifyToken.middle.js';
import { getPrompts, updateDalleStatus } from '../controllers/admin.controller.js';

export const adminRoutes = express.Router();

adminRoutes.get('/getprompt', isAdmin, getPrompts);
adminRoutes.put('/dalle/update/:id', isAdmin, updateDalleStatus)