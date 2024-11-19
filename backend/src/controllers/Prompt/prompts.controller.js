// filter prompts

import { DallE } from "../../models/Prompt/dallePrompt.model.js";
import { Midjourney } from "../../models/Prompt/midjourneyPrompt.model.js";
import { GPT } from "../../models/Prompt/gptPrompt.model.js";

export const getTrendingPrompts = async (req, res) => {
    try {
        const trendingPrompts = await DallE.aggregate([
            { $match: { isTrending: true } },
            {
                $unionWith: {
                    coll: 'midjourneys',
                    pipeline: [{ $match: { isTrending: true } }]
                }
            },
            {
                $unionWith: {
                    coll: 'gpts',
                    pipeline: [
                        { $match: { isTrending: true } }
                    ]
                }
            },
            { $limit: 5 }
        ])

        const shuffeledArray = trendingPrompts.sort(() => Math.random() - 0.5)
        return res.status(200).json(shuffeledArray)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompt` })
    }
}

// Fetch all prompts on the base of userId and prompt type
export const getPromptsBasedOnUserIdStatusType = async (req, res) => {
    const { promptType, promptStatus, userId } = req.query
    console.log(promptType, promptStatus, userId)

    try {
        const models = {
            "dall-e": DallE,
            "midjourney": Midjourney,
            "gpt": GPT
        }

        let query = {};

        if (promptStatus && userId) {
            query = { userId: userId, status: promptStatus }
        }

        if (promptStatus) {
            query.status = promptStatus;  // Only add status if it's provided
        }

        if (userId) {
            query.userId = userId;  // Only add _id if it's provided
        }

        console.log(promptType, promptStatus, userId)

        const Model = models[promptType.toLowerCase()]
        const prompts = await Model.find(query);
        return res.status(200).json(prompts)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompt ${error}` })
    }
}