import slugify from "slugify";
import { DallE } from "../../models/Prompt/dallePrompt.model.js";
import { SingleUserLog } from "../../models/singleUserLogs.model.js";
import { cloudinaryFunc } from '../../utils/cloudinary.utils.js'
import fs from 'fs'

// create dalle prompt
export const createDallE = async (req, res) => {
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

        // slug creating

        const title = req.body.title;
        const slugString = slugify(
            title,
            {
                replacement: '-',
                lower: true,
                trim: true,
                remove: /[^a-zA-Z0-9\s-]/g
            }
        )

        // ...............
        const newPrompt = new DallE({
            ...req.body,
            Image_Url: urls,
            userId: req.userId,
            slug: slugString
        })
        const savedPrompt = await newPrompt.save()

        // promptId add to logs
        // userId, promptId, promptType
        await SingleUserLog.findOneAndUpdate({ userId: savedPrompt.userId }, { $push: { 'sellingHistory.dall-e': savedPrompt._id } }, { new: true, upsert: true })

        return res.status(200).json(savedPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create dalle prompt ${error}` })
    }
}

//get all prompts
export const getAllDallE = async (req, res) => {
    try {
        const dallPrompt = await DallE.find();
        return res.status(200).json(dallPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get dallPrompts ${error}` })
    }
}

//get single prompt
export const getSingleDallE = async (req, res) => {
    const slug = req.params.slug;
    try {
        const dallPrompt = await DallE.findOne({ slug: slug });
        return res.status(200).json(dallPrompt);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get single dalle prompt` })
    }
}

// get prompts the basis of userId
export const getFilteredPrompt = async (req, res) => {
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/endpoint?userId=234&username='john'
    try {
        const filter = await DallE.find(req.query);
        return res.status(200).json(filter)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompt` })
    }
}

//update single prompt
export const updateDallE = async (req, res) => {
    const id = req.params.id
    try {
        const updatePrompt = await DallE.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatePrompt);
    } catch (error) {
        res.status(500).json({ msg: `Failde to update dalle prompt:${error}` })
    }
}

//delete single prompt
export const deleteDallE = async (req, res) => {
    const id = req.params.id;
    try {
        await DallE.findByIdAndDelete(id);
        await SingleUserLog.updateOne(
            { 'sellingHistory.dall-e': id },
            { $pull: { 'sellingHistory.dall-e': id } }
        )
        return res.status(200).json({ msg: "Dalle prompt has been deleted successfully" })
    } catch (error) {
        return res.status(400).json({ msg: "Failed to delete prompt" })
    }
}