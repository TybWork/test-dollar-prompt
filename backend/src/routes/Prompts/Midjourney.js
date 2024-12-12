import express from 'express';
export const route = express.Router();
import { createMidjourney, deleteMidjourney, getAllMidjourney, getFilteredPrompt, getSingleMidjourney, updateMidjourney } from '../../controllers/Prompt/midjourneyPrompt.controller.js';
import multerFunc from '../../middlewares/multer.middle.js';
import { getUserId } from '../../middlewares/verifyToken.middle.js';

route.post('/prompt/midjourney/create', getUserId, multerFunc, createMidjourney),
    route.get('/prompt/midjourney/get', getAllMidjourney),
    route.get('/prompt/midjourney/filter', getFilteredPrompt),
    route.get('/prompt/midjourney/get/:id', getSingleMidjourney),
    route.put('/prompt/midjourney/update/:id', updateMidjourney),
    route.delete('/prompt/midjourney/delete/:id', deleteMidjourney)
