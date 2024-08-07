import { DallE } from "../models/Prompt/dallePrompt.model.js";

// get all users
export const getPrompts = async (req, res) => {
    try {
        const prompts = await DallE.find(req.query);
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