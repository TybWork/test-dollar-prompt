import express from 'express'
import { createSingleUserLogs, getSingleUserLogs } from '../controllers/singleUserLogs.controller.js';
export const singleUserLogsRoutes = express.Router();

singleUserLogsRoutes.post('/create-user-logs', createSingleUserLogs)
singleUserLogsRoutes.get('/fetch-user-logs', getSingleUserLogs)
// singleUserLogsRoutes.put('/updatelog', updateLog)