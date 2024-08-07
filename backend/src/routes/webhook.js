import express from 'express'
import { webhookFunc } from '../controllers/webhook.controller.js';
export const webhookRoute = express.Router();
webhookRoute.post('/webhook', express.raw({ type: 'application/json' }), webhookFunc)