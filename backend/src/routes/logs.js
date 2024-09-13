import express from 'express'
import { createLog, getLog, updateLog } from '../controllers/singleLog.controller.js';
export const logRoutes = express.Router();

logRoutes.post('/createlog', createLog)
logRoutes.get('/getlog', getLog)
logRoutes.put('/updatelog', updateLog)