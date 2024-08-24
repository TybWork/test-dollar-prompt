import express from 'express';
import { isSuperAdmin } from '../middlewares/verifyToken.middle.js';
import { superAdminLogin } from '../controllers/user.controller.js';

export const superAdminRoutes = express.Router();

superAdminRoutes.post('/login', superAdminLogin);