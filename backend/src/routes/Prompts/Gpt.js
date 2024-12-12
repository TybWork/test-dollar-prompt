import express from 'express';
export const route = express.Router();
import { createGPT, deleteGPT, getAllGPT, getFilteredPrompt, getSingleGPT, updateGPT } from '../../controllers/Prompt/gptPrompt.controller.js';
import { getUserId } from '../../middlewares/verifyToken.middle.js';

route.post('/prompt/gpt/create', getUserId, createGPT),
    route.get('/prompt/gpt/get', getAllGPT),
    route.get('/prompt/gpt/filter', getFilteredPrompt),
    route.get('/prompt/gpt/get/:id', getSingleGPT),
    route.put('/prompt/gpt/update/:id', updateGPT),
    route.delete('/prompt/gpt/delete/:id', deleteGPT)


