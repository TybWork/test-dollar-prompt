import express from 'express';
export const route = express.Router();
import { createDallE, deleteDallE, getAllDallE, getFilteredPrompt, getSingleDallE, updateDallE } from '../../../controllers/Prompt/dallePrompt.controller.js';
import multerFunc from '../../../middlewares/multer.middle.js';
import { getUserId } from '../../../middlewares/verifyToken.middle.js';

route.post('/prompt/dalle/create', getUserId, multerFunc, createDallE),
    route.get('/prompt/dall-e/get', getAllDallE),
    route.get('/prompt/dall-e/filter', getFilteredPrompt),
    route.get('/prompt/dall-e/get/:id', getSingleDallE),
    route.put('/prompt/dall-e/update/:id', updateDallE),
    route.delete('/prompt/dalle/delete/:id', deleteDallE)