import { cloudinaryFunc } from '../utils/cloudinary.utils.js'
import fs from 'fs'
import { Blog } from '../models/Blog/blog.model.js';

// create Blog
export const createBlog = async (req, res) => {
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
        const newBlog = new Blog({
            ...req.body,
            banner: urls,
            //adminId: req.userId
            adminId: "6662ff2b1c4e19a5896f2bfe"
        })
        const savedBlog = await newBlog.save()
        return res.status(200).json(savedBlog);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create Blog Post ${error}` })
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
    const id = req.params.id;
    try {
        const dallPrompt = await DallE.findById(id);
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
        return res.status(200).json({ msg: "Dalle prompt has been deleted successfully" })
    } catch (error) {
        return res.status(400).json({ msg: "Failed to delete prompt" })
    }
}