import express from 'express'
import { createLog, getLog, updateLog } from '../controllers/singleLog.controller.js';
export const logRouts = express.Router();

logRouts.post('/createlog', createLog)
logRouts.get('/getlog', getLog)
logRouts.put('/updatelog', updateLog)