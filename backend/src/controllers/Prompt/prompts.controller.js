// filter prompts

import { DallE } from "../../models/Prompt/dallePrompt.model.js";

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
