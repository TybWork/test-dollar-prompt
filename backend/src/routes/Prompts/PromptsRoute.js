import express from 'express'
import { getPromptsBasedOnUserIdStatusType, getTrendingPrompts, majorFilteredPrompt } from '../../controllers/Prompt/prompts.controller.js'
export const route = express.Router()

route.get('/prompts/get/trending', getTrendingPrompts)
route.get('/prompts/get/all-filterd-prompt', getPromptsBasedOnUserIdStatusType)
route.get('/prompts/get/major-filter', majorFilteredPrompt)