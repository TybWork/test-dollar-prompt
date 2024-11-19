// import { ProductLog } from "../models/singleLog.model.js"
import { SingleUserLog } from "../models/singleUserLogs.model.js"

export const createSingleUserLogs = async (req, res) => {

    const { isSelling = false, userId, promptType, promptId } = req.query;

    try {
        // If userId is not provided, return an error
        if (!userId) {
            return res.status(404).json({ msg: 'User not found!!!' });
        }

        // Find the existing user log or create a new one if it doesn't exist
        let userLog = await SingleUserLog.findOne({ userId });

        // If no existing log is found, create a new one
        if (!userLog) {
            userLog = new SingleUserLog({
                userId,
                sellingHistory: {},
                buyingHistory: {},
            });
        }

        // Determine the field to update based on the isSelling flag
        const actionType = isSelling ? 'sellingHistory' : 'buyingHistory';

        // If the promptType doesn't exist in the relevant history, initialize it as an empty array
        if (!userLog[actionType][promptType]) {
            userLog[actionType][promptType] = [];
        }

        // Add the promptId to the corresponding history array (buying or selling)
        if (!userLog[actionType][promptType].includes(promptId)) {
            userLog[actionType][promptType].push(promptId);
        }

        // Save the updated user log
        await userLog.save();

        // Return the updated log in the response
        return res.status(200).json(userLog);
    } catch (error) {
        return res.status(400).json({ msg: `Failed to create new log: ${error.message}` });
    }
}


// get singleUserLogs
export const getSingleUserLogs = async (req, res) => {

    const { userId } = req.query; // Assuming userId is passed as a query parameter

    try {
        // If userId is not provided, return an error
        if (!userId) {
            return res.status(404).json({ msg: 'User not found!' });
        }

        // Define common populate fields for each prompt type (dalle, midjourney, gpt)
        const populateFields = [
            // selling history
            { path: 'sellingHistory.dalle', select: 'Image_Url title _id' },
            { path: 'sellingHistory.midjourney', select: 'Image_Url title _id' },
            { path: 'sellingHistory.gpt', select: 'imageUrl title _id' },

            // buying history
            { path: 'buyingHistory.dalle', select: 'Image_Url title _id' },
            { path: 'buyingHistory.midjourney', select: 'Image_Url imageUrl title _id' },
            { path: 'buyingHistory.gpt', select: 'title _id' }
        ];

        // Find the user log by userId and populate the relevant fields
        const userLog = await SingleUserLog.findOne({ userId }).populate(populateFields);

        // If no user log is found, return a 404 error
        if (!userLog) {
            return res.status(404).json({ msg: 'User log not found!' });
        }

        // Return the populated user log
        return res.status(200).json(userLog);
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get user logs: ${error.message}` });
    }
}

// remove any log
export const deleteSingleUserLog = async (req, res) => {
    const { userId, promptId, isSeller = false, promptType } = req.query;

    try {
        // If promptId or promptType is not provided, return an error
        if (!promptId || !promptType) {
            return res.status(400).json({ msg: 'Prompt ID and prompt type are required!' });
        }

        // Define the field to update based on whether it's selling or buying history
        const historyType = isSeller ? 'sellingHistory' : 'buyingHistory';

        // Define the field to target within the history (dalle, midjourney, gpt)
        const targetHistoryField = `${historyType}.${promptType}`;

        // Perform the update to remove the promptId from the relevant history field
        const userLog = await SingleUserLog.findOneAndUpdate(
            { userId: userId },
            { $pull: { [targetHistoryField]: promptId } }, // Use $pull to remove the promptId
            { new: true } // Return the updated document
        );

        // If no user log is found, return a 404 error
        if (!userLog) {
            return res.status(404).json({ msg: 'User log not found!' });
        }

        // Return the updated user log
        return res.status(200).json(userLog);
    } catch (error) {
        return res.status(400).json({ msg: `Failed to delete log: ${error.message}` });
    }
};