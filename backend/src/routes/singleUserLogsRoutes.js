import express from 'express'
import { createSingleUserLogs, deleteSingleUserLog, getSingleUserLogs } from '../controllers/singleUserLogs.controller.js';
export const singleUserLogsRoutes = express.Router();

singleUserLogsRoutes.post('/create-user-logs', createSingleUserLogs)
singleUserLogsRoutes.get('/fetch-user-logs', getSingleUserLogs)
singleUserLogsRoutes.delete('/delete-user-log', deleteSingleUserLog)