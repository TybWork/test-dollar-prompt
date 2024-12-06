// filter prompts

import { DallE } from "../../models/Prompt/dallePrompt.model.js";
import { Midjourney } from "../../models/Prompt/midjourneyPrompt.model.js";
import { GPT } from "../../models/Prompt/gptPrompt.model.js";
export const getTrendingPrompts = async (req, res) => {
    try {
        const trendingPrompts = await DallE.aggregate([
            { $match: { isTrending: true, status: 'active' } },
            {
                $unionWith: {
                    coll: 'midjourneys',
                    pipeline: [{ $match: { isTrending: true, status: 'active' } }]
                }
            },
            {
                $unionWith: {
                    coll: 'gpts',
                    pipeline: [
                        { $match: { isTrending: true, status: 'active' } }
                    ]
                }
            },
            // { $limit: 10 }
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

// Fetch all prompts on the base of userId and prompt type
export const majorFilteredPrompt = async (req, res) => {
    const { category, sort } = req.query;

    try {
        // Define model mapping
        const models = {
            "dall-e": DallE,
            "midjourney": Midjourney,
            "gpt": GPT,
        };

        // Initialize query and sorting conditions
        let query = { status: "active" }; // Default query to filter active prompts
        let sortCondition = {}; // Default no sorting

        // Add filters based on `sort`
        if (sort) {
            if (sort === "trending") {
                query.isTrending = true;
                sortCondition = { createdAt: -1 }; // Sort trending by most recent
            } else if (sort === "popular") {
                query.isPopular = true;
                sortCondition = { views: -1 }; // Sort popular by views
            } else if (sort === "newest") {
                sortCondition = { createdAt: -1 }; // Sort by most recent
            }
        }

        // If category is 'all', handle aggregations
        if (category === "all" && sort) {
            const combinePrompts = await DallE.aggregate([
                { $match: query },
                {
                    $unionWith: {
                        coll: "midjourneys",
                        pipeline: [{ $match: query }],
                    },
                },
                {
                    $unionWith: {
                        coll: "gpts",
                        pipeline: [{ $match: query }],
                    },
                },
                { $sort: sortCondition }, // Apply sorting
                { $limit: 50 }, // Optional: Limit results for better performance
            ]);

            return res.status(200).json(combinePrompts); // Return combined results
        }

        // Handle single model based on category
        const Model = models[category?.toLowerCase()];
        if (!Model) {
            return res.status(404).json({ msg: "Invalid category" });
        }

        // Fetch prompts from the selected model
        const prompts = await Model.find(query).sort(sortCondition)
        return res.status(200).json(prompts);
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get prompts: ${error.message}` });
    }
};
