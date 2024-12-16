import mongoose from "mongoose";
import { SellerProfile } from "../models/SellerProfile/sellerProfile.model.js";
import { User } from "../models/User/user.model.js";
import { cloudinaryFunc } from "../utils/cloudinary.utils.js";
import fs from 'fs';
import { DallE } from "../models/Prompt/dallePrompt.model.js";
import { GPT } from "../models/Prompt/gptPrompt.model.js";
import { Midjourney } from "../models/Prompt/midjourneyPrompt.model.js";

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
            profileImage: urls[0],
            profileBanner: urls[1],
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
        const { userId, withPrompts } = req.query; // Assuming userId is passed as a query parameter

        // Validate the userId
        if (!userId || !mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ msg: "Invalid userId" });
        }

        // Fetch the seller profile using the provided userId
        const sellerProfile = await SellerProfile.findOne({ userId });

        if (!sellerProfile) {
            return res.status(404).json({ msg: "Seller profile not found" });
        }


        // Combine seller data with their prompts
        const combinedData = {
            ...sellerProfile.toObject(),
        };

        const includePrompts = withPrompts === 'true';
        if (includePrompts) {
            // Fetch prompts associated with the seller's userId
            const dalle = await DallE.find({ userId: userId });
            const gpt = await GPT.find({ userId: userId })
            const midjourney = await Midjourney.find({ userId: userId })
            combinedData.prompts = {
                dalle: dalle,
                gpt: gpt,
                midjourney: midjourney
            }
        }

        // other data
        // promptsCount

        return res.status(200).json(combinedData);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ msg: `Failed to get Seller: ${error.message}` });
    }
};

export const profileUpdate = async (req, res) => {
    const userId = req.userId;

    try {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ msg: 'No files uploaded.' });
        }

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

        const updateData = {
            ...req.body,
            profileImage: urls[0], // First URL for profileImage
            profileBanner: urls[1], // Second URL for profileBanner
        };

        const updateProfile = await SellerProfile.findOneAndUpdate(
            { userId: userId },
            updateData,
            { new: true }
        );

        return res.status(200).json({ msg: 'Profile updated successfully!!', data: updateProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ msg: 'Failed to update profile', error: error.message });
    }
};

// follower update 

export const addFollower = async (req, res) => {
    const { myId, secondId } = req.query
    try {
        const [myProfile, secondProfile] = await Promise.all(
            [
                SellerProfile.findOne({ userId: myId }),
                SellerProfile.findOne({ userId: secondId })
            ]
        )

        if (!myProfile || !secondProfile) {
            return res.status(400).json({ msg: "The user doesn't exist" })
        }

        if (myProfile.following.includes(secondId)) {
            // unfollow logic
            await Promise.all([
                SellerProfile.updateOne(
                    { userId: myId },
                    { $pull: { following: secondId } }
                ),
                SellerProfile.updateOne(
                    { userId: secondId },
                    { $pull: { followers: myId } }
                )
            ])
            return res.status(204).json({ msg: `You unfollowed ${secondId}` })
        } else {
            await Promise.all([
                SellerProfile.updateOne(
                    { userId: myId },
                    { $addToSet: { following: secondId } }
                ),
                SellerProfile.updateOne(
                    { userId: secondId },
                    { $addToSet: { followers: myId } }
                )
            ])
            return res.status(200).json({ msg: `You are now following ${secondId}` })
        }
    } catch (error) {
        return res.status(400).json({ msg: `An unexpected error occured ${error.message}` })
    }
}