import { GPT } from '../../models/Prompt/gptPrompt.model.js';
import { SingleUserLog } from '../../models/singleUserLogs.model.js';

// create GPT prompt
export const createGPT = async (req, res) => {
    try {
        const newPrompt = new GPT({
            ...req.body,
            userId: req.userId
        })
        const savedPrompt = await newPrompt.save()

        // create log of singleUser when he buy gpt
        await SingleUserLog.findOneAndUpdate({ userId: savedPrompt.userId }, { $push: { 'sellingHistory.gpt': savedPrompt._id } }, { new: true, upsert: true })

        return res.status(200).json(savedPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create gpt prompt ${error}` })
    }
}

//get all prompts
export const getAllGPT = async (req, res) => {
    try {
        const gptPrompt = await GPT.find();
        return res.status(200).json(gptPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get gptPrompts ${error}` })
    }
}

//get single prompt
export const getSingleGPT = async (req, res) => {
    const id = req.params.id;
    try {
        const gptPrompt = await GPT.findById(id);
        return res.status(200).json(gptPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get single GPT prompt` })
    }
}

// get prompts the basis of userId
export const getFilteredPrompt = async (req, res) => {
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/endpoint?userId=234&username='john'
    try {
        const filter = await GPT.find(req.query);
        return res.status(200).json(filter)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompt` })
    }
}

//update single prompt
export const updateGPT = async (req, res) => {
    const id = req.params.id
    try {
        const updatePrompt = await GPT.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatePrompt);
    } catch (error) {
        res.status(500).json({ msg: `Failde to update gpt prompt:${error}` })
    }
}

//delete single prompt
export const deleteGPT = async (req, res) => {
    const id = req.params.id;
    try {
        await GPT.findByIdAndDelete(id);
        await SingleUserLog.findOneAndDelete({ 'sellingHistory.dall-e': id })
        return res.status(200).json({ msg: "GPT prompt has been deleted successfully" })
    } catch (error) {
        return res.status(400).json({ msg: "Failed to delete prompt" })
    }
}