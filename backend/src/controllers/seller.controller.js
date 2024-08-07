import mongoose from "mongoose";
import { SellerProfile } from "../models/SellerProfile/sellerProfile.model.js";
import { User } from "../models/User/user.model.js";
import { cloudinaryFunc } from "../utils/cloudinary.utils.js";
import fs from 'fs';
import { DallE } from "../models/Prompt/dallePrompt.model.js";

export const postSellerData = async (req, res) => {
    try {
        // cloudinary setup
        const urls = [];
        for (const file of req.files) {
            const url = await cloudinaryFunc(file);
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
        const newSeller = new SellerProfile({
            ...req.body,
            profileBanner: urls[0], // Assuming first image as profile banner
            profileImage: urls[1],
            userId: req.userId,
        })
        const savedSeller = await newSeller.save()
        // change the role of user when he becomes seller
        const userIdObject = new mongoose.Types.ObjectId(req.userId);
        await User.findByIdAndUpdate(userIdObject, { role: "seller" });

        return res.status(200).json(savedSeller);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create new seller ${error}` })
    }
};

// get sellerInfo
export const getSellerInfo = async (req, res) => {
    try {
        const filterSeller = await SellerProfile.find(req.query)
        const sellerId = filterSeller.map(uniqueId => uniqueId.userId)
        // const filteredPrompts = await DallE.find({ userId: sellerId })
        const filteredPrompts = await DallE.find({ userId: { $in: sellerId } })
        const combinedData = filterSeller.map(seller => ({
            ...seller.toObject(), // Convert Mongoose document to a plain object
            prompts: filteredPrompts || [] // Attach prompts to each seller
        }));
        return res.status(200).json(combinedData);
    } catch (error) {
        return res.status(400).json({ msg: "Failed to get Seller" })
    }
}

// export const getSellerInfo = async (req, res) => {
//     try {
//         // Find seller profiles based on query parameters
//         const sellers = await SellerProfile.find(req.query);

//         // Collect all user IDs from the seller profiles
//         const sellerIds = sellers.map(seller => seller.userId);

//         // Find prompts related to the seller user IDs
//         const allPrompts = await DallE.find({ userId: { $in: sellerIds } });

//         // Create a map of prompts grouped by user ID
//         const promptsMap = allPrompts.reduce((acc, prompt) => {
//             if (!acc[prompt.userId]) {
//                 acc[prompt.userId] = [];
//             }
//             acc[prompt.userId].push(prompt);
//             return acc;
//         }, {});

//         // Combine seller data with their respective prompts
//         const combinedData = sellers.map(seller => ({
//             ...seller.toObject(),
//             prompts: promptsMap || []
//         }));

//         return res.status(200).json(combinedData);
//     } catch (error) {
//         console.error('Error fetching seller info:', error);
//         return res.status(400).json({ msg: "Failed to get Seller" });
//     }
// }