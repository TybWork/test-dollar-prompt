import { Midjourney } from '../../models/Prompt/midjourneyPrompt.model.js';
import { cloudinaryFunc } from '../../utils/cloudinary.utils.js'
import { SingleUserLog } from '../../models/singleUserLogs.model.js';
import fs from 'fs'

// create midjourney prompt
export const createMidjourney = async (req, res) => {
    try {
        // cloudinary setup
        const urls = [];

        for (const file of req.files) {
            const url = await cloudinaryFunc(file)
            urls.push(url);

            // Delete the file from the server
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        // ...............
        const newPrompt = new Midjourney({
            ...req.body,
            Image_Url: urls,
            userId: req.userId
        })
        const savedPrompt = await newPrompt.save()

        // create midjourney log in userLogInfo
        await SingleUserLog.findOneAndUpdate({ userId: savedPrompt.userId }, { $push: { 'sellingHistory.midjourney': savedPrompt._id } }, { new: true, upsert: true })

        return res.status(200).json(savedPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create midjourney prompt ${error}` })
    }
}

//get all prompts
export const getAllMidjourney = async (req, res) => {
    try {
        const dallPrompt = await Midjourney.find();
        return res.status(200).json(dallPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get dallPrompts ${error}` })
    }
}

//get single prompt
export const getSingleMidjourney = async (req, res) => {
    const id = req.params.id;
    try {
        const dallPrompt = await Midjourney.findById(id);
        return res.status(200).json(dallPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get single midjourney prompt` })
    }
}

// get prompts the basis of userId
export const getFilteredPrompt = async (req, res) => {
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/endpoint?userId=234&username='john'
    try {
        const filter = await Midjourney.find(req.query);
        return res.status(200).json(filter)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompt` })
    }
}

//update single prompt
export const updateMidjourney = async (req, res) => {
    const id = req.params.id
    try {
        const updatePrompt = await Midjourney.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatePrompt);
    } catch (error) {
        res.status(500).json({ msg: `Failde to update midjourney prompt:${error}` })
    }
}

//delete single prompt
export const deleteMidjourney = async (req, res) => {
    const id = req.params.id;
    try {
        await Midjourney.findByIdAndDelete(id);
        return res.status(200).json({ msg: "midjourney prompt has been deleted successfully" })
    } catch (error) {
        return res.status(400).json({ msg: "Failed to delete prompt" })
    }
}