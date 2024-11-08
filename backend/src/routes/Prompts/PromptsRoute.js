import express from 'express'
import { getTrendingPrompts } from '../../controllers/Prompt/prompts.controller.js'
export const route = express.Router()

route.get('/prompts/get/trending', getTrendingPrompts)