import { DallE } from "../models/Prompt/dallePrompt.model.js";
import { Midjourney } from "../models/Prompt/midjourneyPrompt.model.js";
import { GPT } from "../models/Prompt/gptPrompt.model.js";
// get all users

export const getPrompts = async (req, res) => {
    const { promptType, status } = req.query
    try {
        const models = {
            "dall-e": DallE,
            "midjourney": Midjourney,
            "gpt": GPT
        }

        const Model = models[promptType.toLowerCase()]
        const prompts = await Model.find({ status: status });
        return res.status(200).json(prompts)
    } catch (error) {
        return res.status(400).json({ msg: 'Failed to get users' })
    }
}

//update single prompt
export const updateDalleStatus = async (req, res) => {
    const id = req.params.id
    try {
        const updatePrompt = await DallE.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatePrompt);
    } catch (error) {
        res.status(500).json({ msg: `Failde to update dalle prompt:${error}` })
    }
}