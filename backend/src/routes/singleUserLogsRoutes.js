import express from 'express'
import { createSingleUserLogs } from '../controllers/singleUserLogs.controller.js';
export const singleUserLogsRoutes = express.Router();

singleUserLogsRoutes.post('/create-user-log', createSingleUserLogs)
// singleUserLogsRoutes.get('/getlog', getLog)
// singleUserLogsRoutes.put('/updatelog', updateLog)