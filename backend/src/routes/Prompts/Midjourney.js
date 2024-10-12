import express from 'express';
export const route = express.Router();
import multerFunc from '../../../middlewares/multer.middle.js';
import { getUserId } from '../../../middlewares/verifyToken.middle.js';
import { createMidjourney, deleteMidjourney, getAllMidjourney, getSingleMidjourney, updateMidjourney } from '../../controllers/Prompt/midjourneyPrompt.model.js';

route.post('/prompt/midjourney/create', getUserId, multerFunc, createMidjourney),
    route.get('/prompt/midjourney/get', getAllMidjourney),
    route.get('/prompt/midjourney/filter', getFilteredPrompt),
    route.get('/prompt/midjourney/get/:id', getSingleMidjourney),
    route.put('/prompt/midjourney/update/:id', updateMidjourney),
    route.delete('/prompt/midjourney/delete/:id', deleteMidjourney)