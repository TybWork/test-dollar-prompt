import express from 'express';
import { likeFunction, ShareFunction, viewFunction } from '../controllers/Prompt/likeViewShare.controller.js';
export const interactionsRoute = express.Router();


interactionsRoute.post('/view', viewFunction);
interactionsRoute.post('/like', likeFunction);
interactionsRoute.post('/share', ShareFunction);